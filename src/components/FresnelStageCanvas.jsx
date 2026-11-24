import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { UI_COPY } from '../data/sorotData';

const CUE_PROFILES = {
  vermilion: {
    bgHex: '#D9381E',
    glassTint: new THREE.Color('#E84327'),
    shadowTint: new THREE.Color('#8A1A08'),
    edgeColor: new THREE.Color('#FFF6F0'),
    iceColor: new THREE.Color('#FFD9C7'),
    punchHex: '#111214',
    mainHex: '#FFFFFF',
  },
  daylight: {
    bgHex: '#ECEAE4',
    glassTint: new THREE.Color('#F5F4F0'),
    shadowTint: new THREE.Color('#C5C8D2'),
    edgeColor: new THREE.Color('#FFFFFF'),
    iceColor: new THREE.Color('#D9381E'),
    punchHex: '#D9381E',
    mainHex: '#111214',
  },
  chiaroscuro: {
    bgHex: '#0E1015',
    glassTint: new THREE.Color('#1B2330'),
    shadowTint: new THREE.Color('#06080C'),
    edgeColor: new THREE.Color('#CFF4FF'),
    iceColor: new THREE.Color('#29DAFF'),
    punchHex: '#29DAFF',
    mainHex: '#FFFFFF',
  },
};

const VERTEX_SHADER = /* glsl */ `
  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;
  varying vec4 vClipPos;

  void main() {
    vLocalPos = position;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    vClipPos = projectionMatrix * viewMatrix * worldPosition;
    gl_Position = vClipPos;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform sampler2D uBackdropTex;
  uniform float uUseBackdrop;
  uniform float uPaperMix;
  uniform vec3 uGlassTint;
  uniform vec3 uShadowTint;
  uniform vec3 uEdgeColor;
  uniform vec3 uIceColor;
  uniform float uAmbientMode;
  uniform vec2 uPointer;

  varying vec3 vWorldNormal;
  varying vec3 vViewDir;
  varying vec3 vLocalPos;
  varying vec4 vClipPos;

  void main() {
    vec3 N = normalize(vWorldNormal);
    vec3 V = normalize(vViewDir);

    vec3 L1 = normalize(vec3(0.58 + uPointer.x * 0.28, 0.84 - uPointer.y * 0.22, 0.76));
    vec3 L2 = normalize(vec3(-0.82, -0.42, 0.56));

    float ndotv = clamp(abs(dot(N, V)), 0.0, 1.0);
    float fresnel = pow(1.0 - ndotv, 2.5);
    float bevelMask = smoothstep(0.14, 0.76, 1.0 - abs(N.z));

    float diff1 = max(dot(N, L1), 0.0);
    float diff2 = max(dot(N, L2), 0.0);
    float faceGrad = clamp(0.48 + vLocalPos.y * 0.11 - vLocalPos.x * 0.07, 0.0, 1.0);

    vec2 screenUv = (vClipPos.xy / max(vClipPos.w, 0.0001)) * 0.5 + 0.5;
    vec2 refractOffset = N.xy * (0.052 + bevelMask * 0.045) + vec2(vLocalPos.x, -vLocalPos.y) * 0.008;

    vec3 refracted = vec3(0.0);
    if (uUseBackdrop > 0.01) {
      float r = texture2D(uBackdropTex, clamp(screenUv + refractOffset * 1.12, 0.002, 0.998)).r;
      float g = texture2D(uBackdropTex, clamp(screenUv + refractOffset * 1.00, 0.002, 0.998)).g;
      float b = texture2D(uBackdropTex, clamp(screenUv + refractOffset * 0.88, 0.002, 0.998)).b;
      refracted = vec3(r, g, b);
    }

    vec3 activeTint = mix(uGlassTint, vec3(0.955, 0.952, 0.945), uPaperMix * 0.88);
    vec3 activeShadow = mix(uShadowTint, vec3(0.81, 0.82, 0.85), uPaperMix * 0.88);
    vec3 activeEdge = mix(uEdgeColor, vec3(1.0, 1.0, 1.0), uPaperMix * 0.7);

    vec3 bodyGlass = mix(activeShadow, activeTint, clamp(diff1 * 0.58 + faceGrad * 0.48, 0.0, 1.0));
    vec3 baseCol = mix(bodyGlass, mix(refracted, bodyGlass, 0.24 + bevelMask * 0.34), uUseBackdrop);

    vec3 H1 = normalize(L1 + V);
    vec3 H2 = normalize(L2 + V);
    float spec1 = pow(max(dot(N, H1), 0.0), 48.0) * 1.25;
    float spec2 = pow(max(dot(N, H2), 0.0), 24.0) * 0.55;

    vec3 bevelRim = activeEdge * (bevelMask * (0.52 + diff1 * 0.72)) + uIceColor * (bevelMask * diff2 * 0.32 * (1.0 - uPaperMix * 0.6));
    vec3 finalCol = baseCol + bevelRim + activeEdge * (spec1 + fresnel * 0.28) + uIceColor * (spec2 * 0.45);

    if (uAmbientMode > 0.5) {
      vec3 paperBody = mix(vec3(0.925, 0.922, 0.912), vec3(0.992, 0.991, 0.988), clamp(diff1 * 0.65 + faceGrad * 0.42, 0.0, 1.0));
      finalCol = paperBody + vec3(1.0) * (bevelMask * 0.35 + spec1 * 0.45);
      float ambAlpha = clamp(0.18 + bevelMask * 0.28 + fresnel * 0.14, 0.0, 0.52);
      gl_FragColor = vec4(finalCol, ambAlpha);
      return;
    }

    float alpha = mix(0.84, 0.97, bevelMask);
    alpha = mix(alpha, clamp(0.76 + bevelMask * 0.22 + spec1 * 0.25, 0.0, 0.98), uUseBackdrop);
    gl_FragColor = vec4(finalCol, alpha);
  }
`;

function createPlayPrismGeometry(size, depth, bevelSize) {
  const shape = new THREE.Shape();
  const s = size * 0.5;
  const r = size * 0.045;

  // Crisp architectural 45-deg right-triangle plate matching laboiteaslides hero-1440.png
  shape.moveTo(-s + r, -s);
  shape.lineTo(s - r * 1.4, -s);
  shape.quadraticCurveTo(s, -s, s - r * 0.35, -s + r * 1.05);
  shape.lineTo(-s + r * 1.05, s - r * 0.35);
  shape.quadraticCurveTo(-s, s, -s, s - r * 1.4);
  shape.lineTo(-s, -s + r);
  shape.quadraticCurveTo(-s, -s, -s + r, -s);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: bevelSize * 1.2,
    bevelSize,
    bevelSegments: 5,
    curveSegments: 14,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

function createBeveledBeamGeometry(width, height, depth, bevelSize) {
  const shape = new THREE.Shape();
  const hw = width * 0.5;
  const hh = height * 0.5;
  const r = Math.min(0.12, hh * 0.35);

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
    bevelThickness: bevelSize * 1.15,
    bevelSize,
    bevelSegments: 5,
    curveSegments: 10,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

export default function FresnelStageCanvas({ activeCueId, lang = 'en' }) {
  const canvasRef = useRef(null);
  const cueRef = useRef(activeCueId);
  const langRef = useRef(lang);

  useEffect(() => {
    cueRef.current = activeCueId;
  }, [activeCueId]);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

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

    // Offscreen 2D CanvasTexture for genuine optical refraction of Hero Poster Text + Rising White Arch!
    const backdropCanvas = document.createElement('canvas');
    backdropCanvas.width = 1440;
    backdropCanvas.height = 900;
    const bCtx = backdropCanvas.getContext('2d');
    const backdropTex = new THREE.CanvasTexture(backdropCanvas);
    backdropTex.minFilter = THREE.LinearFilter;
    backdropTex.magFilter = THREE.LinearFilter;

    const drawBackdrop = (heroProg, profile, copy) => {
      if (!bCtx) return;
      const W = backdropCanvas.width;
      const H = backdropCanvas.height;

      bCtx.fillStyle = profile.bgHex;
      bCtx.fillRect(0, 0, W, H);

      // Rising white studio paper arch (matches .hero-arch-dome exactly)
      const archProgress = THREE.MathUtils.clamp((heroProg - 0.14) / 0.56, 0, 1);
      if (archProgress > 0.005) {
        const archTopY = H * (1.06 - archProgress * 1.18);
        bCtx.fillStyle = '#F7F6F2';
        bCtx.beginPath();
        bCtx.moveTo(-120, H + 40);
        bCtx.lineTo(-120, archTopY + 130);
        bCtx.quadraticCurveTo(W * 0.5, archTopY - 120, W + 120, archTopY + 130);
        bCtx.lineTo(W + 120, H + 40);
        bCtx.closePath();
        bCtx.fill();
      }

      // Giant 2-block condensed poster headline for authentic glass refraction!
      const textReveal = THREE.MathUtils.clamp((heroProg - 0.03) / 0.52, 0, 1);
      const textFadeOut = 1 - THREE.MathUtils.clamp((heroProg - 0.56) / 0.18, 0, 1);
      if (textReveal > 0.01 && textFadeOut > 0.01) {
        bCtx.save();
        bCtx.globalAlpha = textFadeOut;
        const baseShiftY = (1 - textReveal) * 460 - heroProg * 280;
        bCtx.font = '900 156px "Big Shoulders Display", Impact, sans-serif';
        bCtx.textBaseline = 'top';

        const onPaper = archProgress > 0.52;
        const primaryInk = onPaper ? '#111214' : profile.mainHex;
        const punchInk = onPaper ? '#D9381E' : profile.punchHex;

        // Left block
        const leftLines = copy.heroBlockLeft || ['GREAT STAGES', 'SHAPE THE', 'FUTURE'];
        leftLines.forEach((line, i) => {
          bCtx.fillStyle = i === leftLines.length - 1 ? punchInk : primaryInk;
          bCtx.textAlign = 'left';
          bCtx.fillText(line, 148, 86 + baseShiftY + i * 118);
        });

        // Right block
        const rightLines = copy.heroBlockRight || ['WHEN LIGHT', 'COMMANDS', 'EVERY CUE'];
        rightLines.forEach((line, i) => {
          bCtx.fillStyle = i === rightLines.length - 1 ? punchInk : primaryInk;
          bCtx.textAlign = 'right';
          bCtx.fillText(line, W - 148, 410 + baseShiftY + i * 118);
        });
        bCtx.restore();
      }

      backdropTex.needsUpdate = true;
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 14);

    const initProf = CUE_PROFILES[cueRef.current] || CUE_PROFILES.vermilion;

    const createMat = () =>
      new THREE.ShaderMaterial({
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        uniforms: {
          uBackdropTex: { value: backdropTex },
          uUseBackdrop: { value: 1.0 },
          uPaperMix: { value: 0.0 },
          uGlassTint: { value: initProf.glassTint.clone() },
          uShadowTint: { value: initProf.shadowTint.clone() },
          uEdgeColor: { value: initProf.edgeColor.clone() },
          uIceColor: { value: initProf.iceColor.clone() },
          uAmbientMode: { value: 0.0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
        },
      });

    const heroMat = createMat();
    const ambientMat = createMat();
    ambientMat.uniforms.uUseBackdrop.value = 0.0;
    ambientMat.uniforms.uAmbientMode.value = 1.0;

    const footerMat = createMat();
    footerMat.uniforms.uUseBackdrop.value = 0.0;

    // HERO DENSE PRISM MOSAIC (Exact architectural diagonal cadence of laboiteaslides hero-1440.png!)
    const heroGroup = new THREE.Group();
    scene.add(heroGroup);

    const prismXL = createPlayPrismGeometry(4.9, 0.24, 0.085);
    const prismLG = createPlayPrismGeometry(3.85, 0.22, 0.075);
    const prismMD = createPlayPrismGeometry(3.05, 0.2, 0.068);

    const heroSpecs = [
      { geo: prismXL, pos: [-5.35, 3.05, -0.4], rot: [0.06, 0.12, Math.PI * 0.5], scale: 1.08, dir: -1.1 },
      { geo: prismLG, pos: [-0.75, 3.35, -0.9], rot: [-0.05, 0.14, -Math.PI * 0.5], scale: 1.02, dir: -0.6 },
      { geo: prismXL, pos: [5.45, 3.15, -0.3], rot: [0.07, -0.14, Math.PI * 0.5], scale: 1.06, dir: 1.15 },
      { geo: prismLG, pos: [-4.55, -0.55, -0.6], rot: [-0.06, 0.16, 0], scale: 0.96, dir: -1.25 },
      { geo: prismXL, pos: [-0.85, -0.15, 0.45], rot: [0.08, -0.1, -Math.PI * 0.5], scale: 1.02, dir: -0.45 },
      { geo: prismLG, pos: [1.55, -1.65, 0.65], rot: [-0.08, -0.14, Math.PI * 0.5], scale: 0.98, dir: 0.55 },
      { geo: prismLG, pos: [4.65, -0.75, -0.4], rot: [0.05, -0.18, -Math.PI * 0.5], scale: 0.96, dir: 1.2 },
      { geo: prismMD, pos: [-1.45, -4.15, -0.5], rot: [0.09, 0.1, -Math.PI * 0.5], scale: 1.04, dir: -0.8 },
      { geo: prismXL, pos: [5.35, -4.35, -0.3], rot: [-0.06, -0.12, Math.PI * 0.5], scale: 1.05, dir: 1.0 },
    ];

    const heroMeshes = heroSpecs.map((s) => {
      const m = new THREE.Mesh(s.geo, heroMat);
      m.position.set(...s.pos);
      m.rotation.set(...s.rot);
      m.scale.setScalar(s.scale);
      m.userData = {
        basePos: new THREE.Vector3(...s.pos),
        baseRot: new THREE.Euler(...s.rot),
        dir: s.dir,
      };
      heroGroup.add(m);
      return m;
    });

    // AMBIENT PAPER SCULPTURAL TRIANGLES (Subtle white-on-paper relief during middle chapters)
    const ambientGroup = new THREE.Group();
    ambientGroup.visible = false;
    scene.add(ambientGroup);

    const ambSpecs = [
      { geo: prismXL, pos: [-5.8, 2.2, -1.5], rot: [0.22, 0.28, 0.4], scale: 1.35 },
      { geo: prismXL, pos: [5.9, -1.8, -1.2], rot: [-0.18, -0.32, -0.6], scale: 1.42 },
    ];
    const ambMeshes = ambSpecs.map((s) => {
      const m = new THREE.Mesh(s.geo, ambientMat);
      m.position.set(...s.pos);
      m.rotation.set(...s.rot);
      m.scale.setScalar(s.scale);
      m.userData = { basePos: new THREE.Vector3(...s.pos), baseRot: new THREE.Euler(...s.rot) };
      ambientGroup.add(m);
      return m;
    });

    // FOOTER CANTILEVERED GLASS BEAMS (Exact architectural beams of footer-1440.png!)
    const footerGroup = new THREE.Group();
    footerGroup.visible = false;
    scene.add(footerGroup);

    const beamLong = createBeveledBeamGeometry(12.2, 1.38, 0.34, 0.085);
    const beamShort = createBeveledBeamGeometry(7.2, 1.05, 0.28, 0.072);

    const footerSpecs = [
      { geo: beamLong, pos: [-2.8, 0.55, 0.25], rot: [0.22, 0.16, -0.04], scale: 1.02 },
      { geo: prismMD, pos: [-5.4, 1.65, -0.55], rot: [0.18, 0.32, -0.38], scale: 0.92 },
      { geo: beamShort, pos: [5.2, -0.35, -0.75], rot: [-0.2, -0.26, 0.16], scale: 0.98 },
    ];
    const footerMeshes = footerSpecs.map((s) => {
      const m = new THREE.Mesh(s.geo, footerMat);
      m.position.set(...s.pos);
      m.rotation.set(...s.rot);
      m.scale.setScalar(s.scale);
      m.userData = { basePos: new THREE.Vector3(...s.pos), baseRot: new THREE.Euler(...s.rot) };
      footerGroup.add(m);
      return m;
    });

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);

    const onPointerMove = (e) => {
      pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.position.z = w < 640 ? 18.8 : w < 1024 ? 16.0 : 14.0;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    onResize();
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clock = new THREE.Clock();
    let rafId = 0;
    let lastBackdropKey = '';

    const renderFrame = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();
      const reduced = reducedMotionQuery.matches;
      const vh = window.innerHeight || 900;

      const heroTrack = document.getElementById('hero-stage');
      const footerEl = document.getElementById('footer');
      const qualityEl = document.getElementById('standards');

      let heroProg = 0;
      let inHero = false;
      if (heroTrack) {
        const r = heroTrack.getBoundingClientRect();
        const scrollable = Math.max(1, r.height - vh);
        heroProg = THREE.MathUtils.clamp(-r.top / scrollable, 0, 1.15);
        inHero = r.bottom > vh * 0.12 && r.top < vh;
      }

      let footerVis = 0;
      if (footerEl) {
        const r = footerEl.getBoundingClientRect();
        if (r.top < vh + 80) {
          footerVis = THREE.MathUtils.clamp((vh + 80 - r.top) / (vh * 0.65), 0, 1);
        }
      }

      let inDarkQuality = false;
      if (qualityEl) {
        const r = qualityEl.getBoundingClientRect();
        inDarkQuality = r.top < vh * 0.5 && r.bottom > vh * 0.5;
      }

      if (!reduced) {
        pointerCurrent.lerp(pointerTarget, Math.min(1, dt * 4.5));
      } else {
        pointerCurrent.set(0, 0);
      }

      const activeProf = CUE_PROFILES[cueRef.current] || CUE_PROFILES.vermilion;
      const lerpRate = reduced ? 1.0 : Math.min(1, dt * 6.5);

      heroMat.uniforms.uGlassTint.value.lerp(activeProf.glassTint, lerpRate);
      heroMat.uniforms.uShadowTint.value.lerp(activeProf.shadowTint, lerpRate);
      heroMat.uniforms.uEdgeColor.value.lerp(activeProf.edgeColor, lerpRate);
      heroMat.uniforms.uIceColor.value.lerp(activeProf.iceColor, lerpRate);
      heroMat.uniforms.uPointer.value.copy(pointerCurrent);
      ambientMat.uniforms.uPointer.value.copy(pointerCurrent);
      footerMat.uniforms.uPointer.value.copy(pointerCurrent);

      const vermProf = CUE_PROFILES.vermilion;
      footerMat.uniforms.uGlassTint.value.copy(vermProf.glassTint);
      footerMat.uniforms.uShadowTint.value.copy(vermProf.shadowTint);
      footerMat.uniforms.uEdgeColor.value.copy(vermProf.edgeColor);
      footerMat.uniforms.uIceColor.value.copy(vermProf.iceColor);

      if (inHero && footerVis < 0.2) {
        // Foreground refractive mode in Hero!
        canvas.style.zIndex = '6';
        const fadeEnd = 1 - THREE.MathUtils.clamp((heroProg - 0.54) / 0.16, 0, 1);
        canvas.style.opacity = fadeEnd.toFixed(3);

        heroGroup.visible = fadeEnd > 0.01;
        ambientGroup.visible = false;
        footerGroup.visible = false;

        const paperMix = THREE.MathUtils.clamp((heroProg - 0.22) / 0.42, 0, 1);
        heroMat.uniforms.uPaperMix.value = paperMix;

        const backdropKey = `${cueRef.current}-${langRef.current}-${Math.round(heroProg * 250)}`;
        if (backdropKey !== lastBackdropKey) {
          lastBackdropKey = backdropKey;
          const copy = UI_COPY[langRef.current] || UI_COPY.en;
          drawBackdrop(heroProg, activeProf, copy);
        }

        heroGroup.rotation.y = pointerCurrent.x * 0.06;
        heroGroup.rotation.x = -pointerCurrent.y * 0.05;

        const partPhase = THREE.MathUtils.clamp((heroProg - 0.42) / 0.48, 0, 1);
        const isMobile = window.innerWidth < 768;

        heroMeshes.forEach((m, idx) => {
          const { basePos, baseRot, dir } = m.userData;
          const drift = reduced ? 0 : Math.sin(elapsed * 0.55 + idx * 0.9) * 0.11;
          const mobileSpread = isMobile ? dir * 1.65 : 0;
          m.position.x = basePos.x + mobileSpread + dir * partPhase * 5.2 + heroProg * dir * 0.65;
          m.position.y = basePos.y + drift + heroProg * (idx % 2 === 0 ? 1.15 : -0.75);
          m.rotation.x = baseRot.x + heroProg * 0.42 + (reduced ? 0 : Math.cos(elapsed * 0.45 + idx) * 0.03);
          m.rotation.y = baseRot.y + heroProg * dir * 0.48 + pointerCurrent.x * 0.09;
          m.rotation.z = baseRot.z + partPhase * dir * 0.35;
        });
      } else if (footerVis > 0.04) {
        canvas.style.zIndex = '4';
        canvas.style.opacity = footerVis.toFixed(3);
        heroGroup.visible = false;
        ambientGroup.visible = false;
        footerGroup.visible = true;

        footerGroup.rotation.y = pointerCurrent.x * 0.05;
        footerMeshes.forEach((m, idx) => {
          const { basePos, baseRot } = m.userData;
          m.position.y = basePos.y + (reduced ? 0 : Math.sin(elapsed * 0.5 + idx * 1.3) * 0.12);
          m.rotation.y = baseRot.y + pointerCurrent.x * 0.08;
        });
      } else if (!inDarkQuality) {
        // Subtle background sculptural triangles on studio paper chapters
        canvas.style.zIndex = '1';
        canvas.style.opacity = '0.65';
        heroGroup.visible = false;
        ambientGroup.visible = true;
        footerGroup.visible = false;

        const scrollNorm = (window.scrollY || 0) * 0.0004;
        ambMeshes.forEach((m, idx) => {
          const { basePos, baseRot } = m.userData;
          m.position.y = basePos.y + Math.sin(scrollNorm + idx * 2.1) * 0.9;
          m.rotation.z = baseRot.z + scrollNorm * (idx === 0 ? 0.35 : -0.35);
          m.rotation.y = baseRot.y + pointerCurrent.x * 0.06;
        });
      } else {
        canvas.style.opacity = '0';
        heroGroup.visible = false;
        ambientGroup.visible = false;
        footerGroup.visible = false;
      }

      if (heroGroup.visible || ambientGroup.visible || footerGroup.visible) {
        renderer.render(scene, camera);
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    rafId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      prismXL.dispose();
      prismLG.dispose();
      prismMD.dispose();
      beamLong.dispose();
      beamShort.dispose();
      backdropTex.dispose();
      heroMat.dispose();
      ambientMat.dispose();
      footerMat.dispose();
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
