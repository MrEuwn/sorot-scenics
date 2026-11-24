import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CUE_SHADER_PROFILES = {
  vermilion: {
    glassTint: new THREE.Color('#E8472A'),
    shadowTint: new THREE.Color('#7C1909'),
    edgeColor: new THREE.Color('#FFF4EE'),
    iceColor: new THREE.Color('#CFF4FF'),
    opacityScale: 0.92,
    specularBoost: 1.25,
    ambientLift: 0.24,
  },
  daylight: {
    glassTint: new THREE.Color('#E4E8EE'),
    shadowTint: new THREE.Color('#8E97A6'),
    edgeColor: new THREE.Color('#FFFFFF'),
    iceColor: new THREE.Color('#9EDAF2'),
    opacityScale: 0.88,
    specularBoost: 1.45,
    ambientLift: 0.34,
  },
  chiaroscuro: {
    glassTint: new THREE.Color('#19212D'),
    shadowTint: new THREE.Color('#07090D'),
    edgeColor: new THREE.Color('#CFF4FF'),
    iceColor: new THREE.Color('#6CE6FF'),
    opacityScale: 1.0,
    specularBoost: 1.85,
    ambientLift: 0.12,
  },
};

const VERTEX_SHADER = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vLocalPos = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uGlassTint;
  uniform vec3 uShadowTint;
  uniform vec3 uEdgeColor;
  uniform vec3 uIceColor;
  uniform float uOpacityScale;
  uniform float uSpecularBoost;
  uniform float uAmbientLift;
  uniform float uTime;
  uniform vec2 uPointer;

  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;
  varying vec2 vUv;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(vViewDir);

    // Three directional arena studio lights shifted subtly by pointer
    vec3 L1 = normalize(vec3(0.65 + uPointer.x * 0.35, 0.82 - uPointer.y * 0.25, 0.72));
    vec3 L2 = normalize(vec3(-0.85, -0.35, 0.55));
    vec3 L3 = normalize(vec3(0.15, -0.92, 0.42));

    float ndotv = clamp(abs(dot(N, V)), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 2.35);

    // Detect beveled rim facets (normals tilted away from flat Z face)
    float bevelMask = smoothstep(0.15, 0.78, 1.0 - abs(N.z));

    // Diffuse glass depth shading
    float diff1 = max(dot(N, L1), 0.0);
    float diff2 = max(dot(N, L2), 0.0);
    float faceGrad = clamp(0.45 + vLocalPos.y * 0.14 - vLocalPos.x * 0.08, 0.0, 1.0);

    vec3 bodyColor = mix(uShadowTint, uGlassTint, clamp(diff1 * 0.62 + faceGrad * 0.45 + uAmbientLift, 0.0, 1.0));

    // Subtle optical Fresnel fluting ribs across the glass surface
    float ribPhase = (vLocalPos.x * 0.72 + vLocalPos.y * 0.72) * 5.2 + uTime * 0.18;
    float fresnelRibs = sin(ribPhase) * 0.5 + 0.5;
    bodyColor += uEdgeColor * (fresnelRibs * 0.045 * (1.0 - bevelMask));

    // Sharp architectural specular reflections on beveled chamfers
    vec3 H1 = normalize(L1 + V);
    vec3 H2 = normalize(L2 + V);
    vec3 H3 = normalize(L3 + V);

    float spec1 = pow(max(dot(N, H1), 0.0), 42.0) * 1.15;
    float spec2 = pow(max(dot(N, H2), 0.0), 26.0) * 0.65;
    float spec3 = pow(max(dot(N, H3), 0.0), 20.0) * 0.45;

    // Crisp rim reflection along bevels + subtle dichroic ice dispersion
    vec3 bevelLight = uEdgeColor * (bevelMask * (0.42 + diff1 * 0.68)) + uIceColor * (bevelMask * diff2 * 0.52);
    vec3 specLight = uEdgeColor * (spec1 * uSpecularBoost) + uIceColor * ((spec2 + spec3) * 0.85 * uSpecularBoost);

    // Thin glossy sweep across flat face
    float faceSweep = smoothstep(0.62, 0.96, dot(reflect(-V, N), L1));
    vec3 finalColor = bodyColor + bevelLight + specLight + uEdgeColor * (fresnel * 0.32 + faceSweep * 0.16);

    // Calibrated optical alpha: translucent interior, crisp dense bevels
    float baseAlpha = mix(0.26, 0.78, bevelMask);
    float alpha = clamp((baseAlpha + fresnel * 0.34 + spec1 * 0.38) * uOpacityScale, 0.16, 0.96);

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

function createRoundedTriangleGeometry(width, height, radius, depth, bevelSize) {
  const shape = new THREE.Shape();
  const x0 = -width * 0.5;
  const y0 = -height * 0.5;
  const x1 = width * 0.5;
  const y1 = height * 0.5;
  const r = Math.min(radius, width * 0.16, height * 0.16);

  // Right triangle with rounded architectural corners (classic prism louver silhouette)
  shape.moveTo(x0 + r, y0);
  shape.lineTo(x1 - r, y0);
  shape.quadraticCurveTo(x1, y0, x1, y0 + r);
  shape.lineTo(x1, y1 - r * 1.35);
  shape.quadraticCurveTo(x1, y1, x1 - r * 1.35, y1 - r * 0.4);
  shape.lineTo(x0 + r * 0.45, y0 + r * 1.25);
  shape.quadraticCurveTo(x0, y0 + r * 0.55, x0 + r, y0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevelSize * 1.15,
    bevelSize,
    bevelOffset: 0,
    bevelSegments: 5,
    curveSegments: 16,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

function createBeveledBeamGeometry(width, height, radius, depth, bevelSize) {
  const shape = new THREE.Shape();
  const hw = width * 0.5;
  const hh = height * 0.5;
  const r = Math.min(radius, hw * 0.4, hh * 0.4);

  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r);
  shape.lineTo(hw, hh - r);
  shape.quadraticCurveTo(hw, hh, hw - r, hh);
  shape.lineTo(-hw + r, hh);
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r);
  shape.lineTo(-hw, -hh + r);
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevelSize * 1.1,
    bevelSize,
    bevelSegments: 5,
    curveSegments: 12,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

export default function FresnelStageCanvas({ activeCueId }) {
  const canvasRef = useRef(null);
  const cueRef = useRef(activeCueId);

  useEffect(() => {
    cueRef.current = activeCueId;
  }, [activeCueId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 13.5);

    const initialProfile = CUE_SHADER_PROFILES[cueRef.current] || CUE_SHADER_PROFILES.vermilion;

    const createPrismMaterial = (opacityMult = 1.0) =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uGlassTint: { value: initialProfile.glassTint.clone() },
          uShadowTint: { value: initialProfile.shadowTint.clone() },
          uEdgeColor: { value: initialProfile.edgeColor.clone() },
          uIceColor: { value: initialProfile.iceColor.clone() },
          uOpacityScale: { value: initialProfile.opacityScale * opacityMult },
          uSpecularBoost: { value: initialProfile.specularBoost },
          uAmbientLift: { value: initialProfile.ambientLift },
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
        },
      });

    const heroMaterial = createPrismMaterial(1.0);
    const footerMaterial = createPrismMaterial(0.95);
    const allMaterials = [heroMaterial, footerMaterial];

    // HERO GROUP: Sculptural beveled architectural Fresnel triangular louvers
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    const triGeoLarge = createRoundedTriangleGeometry(4.4, 4.1, 0.24, 0.24, 0.085);
    const triGeoMed = createRoundedTriangleGeometry(3.2, 3.0, 0.2, 0.22, 0.075);
    const triGeoWide = createRoundedTriangleGeometry(5.1, 3.3, 0.26, 0.26, 0.09);

    // Carefully composed constellation framing the hero with crisp diagonals
    const heroSpecs = [
      { geo: triGeoLarge, pos: [-5.1, 2.75, -0.8], rot: [0.14, 0.22, Math.PI], scale: 1.08, speed: 0.42 },
      { geo: triGeoMed, pos: [-0.95, 3.55, -1.6], rot: [-0.12, 0.28, 0.06], scale: 0.96, speed: 0.35 },
      { geo: triGeoLarge, pos: [5.25, 2.85, -0.5], rot: [0.18, -0.26, 0.0], scale: 1.06, speed: 0.48 },
      { geo: triGeoWide, pos: [-5.65, -0.75, 0.2], rot: [-0.15, 0.34, Math.PI * 0.5], scale: 0.92, speed: 0.38 },
      { geo: triGeoLarge, pos: [1.35, -1.65, -0.45], rot: [0.22, -0.18, 0.03], scale: 0.94, speed: 0.52 },
      { geo: triGeoMed, pos: [5.5, -1.05, 0.35], rot: [-0.18, -0.32, Math.PI * 0.5], scale: 1.04, speed: 0.44 },
      { geo: triGeoMed, pos: [-2.75, -3.45, -1.1], rot: [0.25, 0.2, Math.PI], scale: 0.98, speed: 0.33 },
      { geo: triGeoWide, pos: [4.8, -3.75, -0.9], rot: [-0.14, -0.24, Math.PI], scale: 0.88, speed: 0.4 },
    ];

    const heroMeshes = heroSpecs.map((spec) => {
      const mesh = new THREE.Mesh(spec.geo, heroMaterial);
      mesh.position.set(...spec.pos);
      mesh.rotation.set(...spec.rot);
      mesh.scale.setScalar(spec.scale);
      mesh.userData = {
        basePos: new THREE.Vector3(...spec.pos),
        baseRot: new THREE.Euler(...spec.rot),
        speed: spec.speed,
      };
      heroGroup.add(mesh);
      return mesh;
    });

    // FOOTER GROUP: Cantilevered horizontal architectural glass prism slabs
    const footerGroup = new THREE.Group();
    footerGroup.visible = false;
    scene.add(footerGroup);

    const beamGeoLong = createBeveledBeamGeometry(11.4, 1.35, 0.14, 0.32, 0.085);
    const beamGeoShort = createBeveledBeamGeometry(6.8, 1.05, 0.12, 0.28, 0.075);

    const footerSpecs = [
      { geo: beamGeoLong, pos: [-2.6, 0.35, 0.2], rot: [0.24, 0.18, -0.06], scale: 1.0 },
      { geo: beamGeoShort, pos: [4.8, 0.95, -0.9], rot: [-0.22, -0.28, 0.19], scale: 0.96 },
      { geo: beamGeoLong, pos: [1.8, -1.55, -1.6], rot: [0.32, -0.14, 0.04], scale: 1.08 },
      { geo: triGeoMed, pos: [-6.1, 2.25, -1.2], rot: [0.16, 0.3, -0.25], scale: 0.85 },
      { geo: triGeoMed, pos: [6.4, -2.4, -0.7], rot: [-0.18, -0.28, 0.35], scale: 0.9 },
    ];

    const footerMeshes = footerSpecs.map((spec) => {
      const mesh = new THREE.Mesh(spec.geo, footerMaterial);
      mesh.position.set(...spec.pos);
      mesh.rotation.set(...spec.rot);
      mesh.scale.setScalar(spec.scale);
      mesh.userData = {
        basePos: new THREE.Vector3(...spec.pos),
        baseRot: new THREE.Euler(...spec.rot),
      };
      footerGroup.add(mesh);
      return mesh;
    });

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);

    const handlePointerMove = (e) => {
      pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.position.z = w < 640 ? 18.2 : w < 1024 ? 15.6 : 13.5;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    handleResize();
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let rafId = 0;
    const clock = new THREE.Clock();

    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const reduced = reducedMotionQuery.matches;

      // Determine visibility zone (Hero vs Middle vs Footer)
      const heroEl = document.getElementById('hero-stage');
      const footerEl = document.getElementById('footer');
      const vh = window.innerHeight || 900;

      let heroVisibility = 0;
      let heroScrollOffset = 0;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        if (rect.bottom > -80 && rect.top < vh) {
          heroVisibility = THREE.MathUtils.clamp((rect.bottom + 80) / (vh * 0.85), 0, 1);
          heroScrollOffset = THREE.MathUtils.clamp(-rect.top / vh, 0, 1.5);
        }
      }

      let footerVisibility = 0;
      let footerScrollOffset = 0;
      if (footerEl) {
        const rect = footerEl.getBoundingClientRect();
        if (rect.top < vh + 120) {
          footerVisibility = THREE.MathUtils.clamp((vh + 120 - rect.top) / (vh * 0.72), 0, 1);
          footerScrollOffset = THREE.MathUtils.clamp((vh - rect.top) / (rect.height || vh), 0, 1.2);
        }
      }

      const showFooter = footerVisibility > heroVisibility && footerVisibility > 0.02;
      const layerOpacity = showFooter ? footerVisibility : heroVisibility;
      canvas.style.opacity = layerOpacity.toFixed(3);

      heroGroup.visible = !showFooter && heroVisibility > 0.01;
      footerGroup.visible = showFooter;

      // Smooth cue uniform transitions (Hero uses active Cue; Footer stays Signal Vermilion)
      const activeHeroProfile = CUE_SHADER_PROFILES[cueRef.current] || CUE_SHADER_PROFILES.vermilion;
      const lerpRate = reduced ? 1.0 : Math.min(1, dt * 6.5);

      heroMaterial.uniforms.uGlassTint.value.lerp(activeHeroProfile.glassTint, lerpRate);
      heroMaterial.uniforms.uShadowTint.value.lerp(activeHeroProfile.shadowTint, lerpRate);
      heroMaterial.uniforms.uEdgeColor.value.lerp(activeHeroProfile.edgeColor, lerpRate);
      heroMaterial.uniforms.uIceColor.value.lerp(activeHeroProfile.iceColor, lerpRate);
      heroMaterial.uniforms.uOpacityScale.value = THREE.MathUtils.lerp(
        heroMaterial.uniforms.uOpacityScale.value,
        activeHeroProfile.opacityScale,
        lerpRate
      );
      heroMaterial.uniforms.uSpecularBoost.value = THREE.MathUtils.lerp(
        heroMaterial.uniforms.uSpecularBoost.value,
        activeHeroProfile.specularBoost,
        lerpRate
      );
      heroMaterial.uniforms.uAmbientLift.value = THREE.MathUtils.lerp(
        heroMaterial.uniforms.uAmbientLift.value,
        activeHeroProfile.ambientLift,
        lerpRate
      );

      // Footer always reflects Signal Vermilion
      const vermilionProfile = CUE_SHADER_PROFILES.vermilion;
      footerMaterial.uniforms.uGlassTint.value.copy(vermilionProfile.glassTint);
      footerMaterial.uniforms.uShadowTint.value.copy(vermilionProfile.shadowTint);
      footerMaterial.uniforms.uEdgeColor.value.copy(vermilionProfile.edgeColor);
      footerMaterial.uniforms.uIceColor.value.copy(vermilionProfile.iceColor);

      // Pointer easing
      if (!reduced) {
        pointerCurrent.lerp(pointerTarget, Math.min(1, dt * 4.5));
      } else {
        pointerCurrent.set(0, 0);
      }

      for (const mat of allMaterials) {
        mat.uniforms.uTime.value = reduced ? 0 : elapsed;
        mat.uniforms.uPointer.value.copy(pointerCurrent);
      }

      if (heroGroup.visible) {
        heroGroup.rotation.y = pointerCurrent.x * 0.08;
        heroGroup.rotation.x = -pointerCurrent.y * 0.06;

        heroMeshes.forEach((mesh, idx) => {
          const { basePos, baseRot, speed } = mesh.userData;
          const phase = elapsed * speed + idx * 1.15;
          const floatY = reduced ? 0 : Math.sin(phase) * 0.16;
          const floatRot = reduced ? 0 : Math.cos(phase * 0.8) * 0.045;
          const scrollSpread = heroScrollOffset * (idx % 2 === 0 ? 1.45 : -1.25);

          mesh.position.x = basePos.x + scrollSpread * 0.55;
          mesh.position.y = basePos.y + floatY + heroScrollOffset * 1.65;
          mesh.rotation.x = baseRot.x + floatRot + heroScrollOffset * 0.18;
          mesh.rotation.y = baseRot.y + floatRot * 1.2 + pointerCurrent.x * 0.12;
          mesh.rotation.z = baseRot.z + (reduced ? 0 : Math.sin(phase * 0.5) * 0.03);
        });
      }

      if (footerGroup.visible) {
        footerGroup.rotation.y = pointerCurrent.x * 0.06;
        footerGroup.rotation.x = -pointerCurrent.y * 0.04;

        footerMeshes.forEach((mesh, idx) => {
          const { basePos, baseRot } = mesh.userData;
          const drift = reduced ? 0 : Math.sin(elapsed * 0.55 + idx * 1.4) * 0.14;
          mesh.position.x = basePos.x + (idx % 2 === 0 ? 1 : -1) * (1 - footerScrollOffset) * 0.45;
          mesh.position.y = basePos.y + drift;
          mesh.rotation.x = baseRot.x + (reduced ? 0 : Math.cos(elapsed * 0.4 + idx) * 0.035);
          mesh.rotation.y = baseRot.y + pointerCurrent.x * 0.1;
        });
      }

      if (layerOpacity > 0.01) {
        renderer.render(scene, camera);
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      triGeoLarge.dispose();
      triGeoMed.dispose();
      triGeoWide.dispose();
      beamGeoLong.dispose();
      beamGeoShort.dispose();
      heroMaterial.dispose();
      footerMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fresnel-canvas-layer"
      aria-hidden="true"
      data-webgl-cue={activeCueId}
    />
  );
}
