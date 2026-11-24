import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  DISCIPLINES,
  RESOURCE_CARDS,
  SPHERE_SCREENS,
  STANDARDS_FLYING_CARDS,
  UI_COPY,
} from '../data/sorotData';

const TILE_PALETTES = [
  { border: '#FF573B', tagBg: '#D9381E' },
  { border: '#29DAFF', tagBg: '#0984A8' },
  { border: '#FFB800', tagBg: '#B87D00' },
  { border: '#4ADE80', tagBg: '#15803D' },
  { border: '#FFFFFF', tagBg: '#111214' },
];

function CertEmblem({ type }) {
  if (type === 'stars') {
    return (
      <div className="cert-emblem cert-emblem--stars" aria-hidden="true">
        <span className="cert-emblem__big">5/5</span>
        <span className="cert-emblem__stars">★ ★ ★ ★ ★</span>
      </div>
    );
  }
  if (type === 'iso') {
    return (
      <div className="cert-emblem cert-emblem--iso" aria-hidden="true">
        <span className="cert-emblem__ring">TUV</span>
        <span className="cert-emblem__sub">BGV-C1 · EN 17206</span>
      </div>
    );
  }
  return (
    <div className="cert-emblem cert-emblem--smpte" aria-hidden="true">
      <span className="cert-emblem__shield">MA3</span>
      <span className="cert-emblem__sub">SMPTE ST 2110</span>
    </div>
  );
}

export default function DisciplinesStandards({ lang = 'en', onOpenBrief }) {
  const [activeDiscIdx, setActiveDiscIdx] = useState(1);

  const vrTrackRef = useRef(null);
  const vrIntroTitleRef = useRef(null);
  const vrHeadsetRef = useRef(null);
  const vrVoidRef = useRef(null);
  const vrPerspectiveRef = useRef(null);
  const vrGlobeRef = useRef(null);
  const vrDarkCopyRef = useRef(null);
  const vrExitArchRef = useRef(null);

  const qualityTrackRef = useRef(null);
  const flyingCardsRef = useRef([]);

  const copy = UI_COPY[lang] || UI_COPY.en;
  const activeDisc = DISCIPLINES[activeDiscIdx] || DISCIPLINES[0];

  // Build dense 64-tile 3D Spherical Galaxy (5 latitude bands x 12-14 longitudes) for full-screen 360° coverage!
  const sphereTiles = useMemo(() => {
    const tiles = [];
    const bands = [
      { lat: -42, count: 10 },
      { lat: -21, count: 14 },
      { lat: 0, count: 16 },
      { lat: 21, count: 14 },
      { lat: 42, count: 10 },
    ];
    let globalIdx = 0;
    bands.forEach((band, bIdx) => {
      for (let c = 0; c < band.count; c++) {
        const src = SPHERE_SCREENS[globalIdx % SPHERE_SCREENS.length];
        const pal = TILE_PALETTES[globalIdx % TILE_PALETTES.length];
        const lon = (360 / band.count) * c + (bIdx % 2 === 1 ? 11.25 : 0);
        tiles.push({
          key: `orb-${bIdx}-${c}`,
          lat: band.lat,
          lon,
          border: pal.border,
          tagBg: pal.tagBg,
          ...src,
        });
        globalIdx += 1;
      }
    });
    return tiles;
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const updateChoreo = () => {
      const vh = window.innerHeight || 900;

      // ACT 7: 600VH XR VISOR FLY-THROUGH -> FULL-SCREEN 100VW X 100VH 360° DARK STAGE GALAXY (Video 00:08 -> 00:20!)
      if (vrTrackRef.current) {
        const rect = vrTrackRef.current.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - vh);
        const p = Math.max(0, Math.min(1, -rect.top / scrollable));

        if (reduced) {
          if (vrVoidRef.current) vrVoidRef.current.style.opacity = '1';
          if (vrHeadsetRef.current) vrHeadsetRef.current.style.opacity = '0';
          if (vrIntroTitleRef.current) vrIntroTitleRef.current.style.opacity = '0';
          if (vrGlobeRef.current) {
            if (vrPerspectiveRef.current) vrPerspectiveRef.current.style.opacity = '1';
            vrGlobeRef.current.style.transform = 'scale3d(1.28, 1.28, 1.28) rotateX(-8deg) rotateY(28deg)';
          }
          if (vrDarkCopyRef.current) {
            vrDarkCopyRef.current.style.opacity = '1';
            vrDarkCopyRef.current.style.pointerEvents = 'auto';
          }
        } else {
          // Phase 1 (0.00 -> 0.22): Intro Headline on White Studio Paper
          if (vrIntroTitleRef.current) {
            const fadeOut = 1 - Math.max(0, Math.min(1, (p - 0.12) / 0.10));
            const lift = -p * 180;
            vrIntroTitleRef.current.style.opacity = fadeOut.toFixed(3);
            vrIntroTitleRef.current.style.transform = `translate3d(0, ${lift.toFixed(1)}px, 0)`;
          }

          // Phase 1B & 2 (0.04 -> 0.30): 3D XR Stage Visor rises & camera zooms straight through right lens!
          if (vrHeadsetRef.current) {
            const enterP = Math.max(0, Math.min(1, (p - 0.03) / 0.13));
            const zoomP = Math.max(0, Math.min(1, (p - 0.16) / 0.14));
            const visorFadeOut = 1 - Math.max(0, Math.min(1, (p - 0.25) / 0.05));
            const yRise = (1 - enterP) * 78;
            const scale = 0.78 + enterP * 0.32 + Math.pow(zoomP, 2.35) * 14.5;
            const visorAlpha = Math.min(1, enterP * 2.2) * visorFadeOut;

            vrHeadsetRef.current.style.opacity = visorAlpha.toFixed(3);
            vrHeadsetRef.current.style.transform = `translate3d(0, ${yRise.toFixed(1)}vh, 0) scale(${scale.toFixed(3)})`;
            vrHeadsetRef.current.dataset.chromatic = zoomP > 0.08 ? 'true' : 'false';
          }

          // Phase 2 -> 5 (0.21 -> 1.00): Full-Screen 100vw x 100vh Pitch-Black Stage Void (#040508)
          if (vrVoidRef.current) {
            const voidIn = Math.max(0, Math.min(1, (p - 0.20) / 0.08));
            vrVoidRef.current.style.opacity = voidIn.toFixed(3);
          }

          // Phase 3 & 4 (0.26 -> 0.88): Compact central 3D sphere (scale 0.66, 00:17) expands cleanly to 2.55x (R=663px < perspective 900px, zero clipping, 100% symmetric 100vw x 100vh 360° galaxy, 00:18 - 00:19)!
          if (vrGlobeRef.current) {
            const orbIn = Math.max(0, Math.min(1, (p - 0.25) / 0.10));
            const expandP = Math.max(0, Math.min(1, (p - 0.42) / 0.24));
            const easedExpand = 1 - Math.pow(1 - expandP, 2.35);
            const scale = 0.26 + orbIn * 0.08 + easedExpand * 0.98;
            const rotY = (p - 0.25) * 210;
            const rotX = -5 + Math.sin(p * Math.PI * 2) * 7;

            const s = scale.toFixed(3);
            if (vrPerspectiveRef.current) {
              vrPerspectiveRef.current.style.opacity = orbIn.toFixed(3);
            }
            vrGlobeRef.current.style.transform = `scale3d(${s}, ${s}, ${s}) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`;
          }

          // Phase 4B (0.58 -> 0.86): Crisp White Off-Center Statement + Split-Pill inside the 360° Screen Galaxy (00:13 & 00:19)!
          if (vrDarkCopyRef.current) {
            const copyIn = Math.max(0, Math.min(1, (p - 0.58) / 0.10));
            const copyOut = Math.max(0, Math.min(1, (p - 0.83) / 0.06));
            const alpha = copyIn * (1 - copyOut);
            const yShift = (1 - copyIn) * 34 - copyOut * 28;
            vrDarkCopyRef.current.style.opacity = alpha.toFixed(3);
            vrDarkCopyRef.current.style.transform = `translate3d(0, ${yShift.toFixed(1)}px, 0)`;
            vrDarkCopyRef.current.style.pointerEvents = alpha > 0.5 ? 'auto' : 'none';
          }

          // Phase 5 (0.86 -> 0.99): Full-Screen 100vw Curved White Studio Paper Arch rising with Cyan Rim (Video 00:20)!
          if (vrExitArchRef.current) {
            const archP = Math.max(0, Math.min(1, (p - 0.86) / 0.13));
            vrExitArchRef.current.style.transform = `translate3d(0, ${((1 - archP) * 108).toFixed(2)}%, 0)`;
          }
        }
      }

      // ACT 10: PINNED 430VH DEEP CARBON WALL + 3 FLYING SUPERGLASS CERTIFICATION CARDS (Video 00:21!)
      if (qualityTrackRef.current && flyingCardsRef.current.length > 0) {
        const rect = qualityTrackRef.current.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - vh);
        const p = Math.max(0, Math.min(1, -rect.top / scrollable));

        flyingCardsRef.current.forEach((cardEl, idx) => {
          if (!cardEl) return;
          const spec = STANDARDS_FLYING_CARDS[idx];
          if (reduced) {
            cardEl.style.opacity = idx === 0 ? '1' : '0';
            cardEl.style.transform = 'translate3d(0, 0, 0)';
            return;
          }

          const start = 0.12 + idx * 0.27;
          const localP = (p - start) / 0.34;
          const yVh = (0.5 - localP) * 165;
          const visible = localP > -0.22 && localP < 1.22;
          const alpha = visible
            ? Math.min(1, Math.max(0, 1 - Math.abs(localP - 0.5) * 1.65))
            : 0;
          const rot = spec.tilt * (0.4 + localP * 0.8);

          cardEl.style.opacity = alpha.toFixed(3);
          cardEl.style.transform = `translate3d(${spec.offsetX}, ${yVh.toFixed(2)}vh, 0) rotate(${rot.toFixed(2)}deg)`;
        });
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateChoreo);
    };

    updateChoreo();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div className="chapter-solid-light section-light" data-chapter-polarity="light">
        {/* ACT 6: CENTERED GIANT FADED DISCIPLINES STACK + TILTED FLOATING STAGE CARD (Exact Video 00:07!) */}
        <section id="disciplines" className="expertises-section">
          <div className="container expertises-centered">
            <h2 className="expertises-eyebrow">{copy.expertisesEyebrow}</h2>

            <div className="expertises-hover-arena">
              <nav className="expertises-stack" aria-label="Core stage disciplines">
                {DISCIPLINES.map((item, idx) => {
                  const isActive = idx === activeDiscIdx;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`expertise-giant-row ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveDiscIdx(idx)}
                      onFocus={() => setActiveDiscIdx(idx)}
                      onClick={() => setActiveDiscIdx(idx)}
                    >
                      <span className="display-section expertise-giant-row__text">
                        {lang === 'id' ? item.titleId : item.title}
                      </span>
                    </button>
                  );
                })}
              </nav>

              <aside
                className="expertise-floating-plate"
                style={{ '--float-row': activeDiscIdx }}
                aria-live="polite"
              >
                <img key={activeDisc.id} src={activeDisc.image} alt={activeDisc.alt} />
                <div className="expertise-floating-plate__scrim" />
                <span className="expertise-floating-plate__badge mono-meta">
                  {activeDisc.spec}
                </span>
              </aside>
            </div>
          </div>
        </section>

        {/* ACT 7: PINNED 600VH XR VISOR ZOOM-THROUGH -> FULL-SCREEN 100VW X 100VH 360° DARK STAGE GALAXY (Video 00:08 -> 00:20!) */}
        <section id="vr-portal" ref={vrTrackRef} className="vr-portal-track">
          <div className="vr-portal-sticky">
            {/* Layer 1: Intro Centered Headline on White Studio Paper (00:08) */}
            <div ref={vrIntroTitleRef} className="container vr-intro-header">
              <h2 className="display-section vr-portal__title">
                <span>{copy.vrTitleTop}</span>
                <span>
                  {copy.vrTitleMidPrefix}
                  <em className="text-vermilion">{copy.vrTitleMidAccent}</em>
                </span>
                <span className="text-vermilion">{copy.vrTitleBotAccent}</span>
              </h2>
            </div>

            {/* Layer 2: Sculptural 3D XR Stage Visor zooming into right optical lens (00:15 -> 00:16) */}
            <div ref={vrHeadsetRef} className="vr-visor-rig" aria-hidden="true">
              <svg
                viewBox="0 0 920 520"
                className="vr-visor-svg"
                aria-hidden="true"
                data-art="vr-visor"
              >
                <defs>
                  <linearGradient id="visorStrapMetal" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#F5F6F8" />
                    <stop offset="48%" stopColor="#B8BEC9" />
                    <stop offset="100%" stopColor="#6D7380" />
                  </linearGradient>
                  <radialGradient id="visorCushion" cx="50%" cy="38%" r="60%">
                    <stop offset="0%" stopColor="#2A2D35" />
                    <stop offset="55%" stopColor="#14161B" />
                    <stop offset="100%" stopColor="#07080B" />
                  </radialGradient>
                  <radialGradient id="visorInnerCavity" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#181B22" />
                    <stop offset="100%" stopColor="#040507" />
                  </radialGradient>
                  <radialGradient id="visorLensPortal" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#020305" />
                    <stop offset="78%" stopColor="#05070C" />
                    <stop offset="94%" stopColor="#1B2230" />
                    <stop offset="100%" stopColor="#353E50" />
                  </radialGradient>
                </defs>

                {/* Brushed Aluminum Left Side Strap Arm (Exact Video 00:15 - 00:16 detail!) */}
                <path
                  d="M 18 190 Q 95 162 175 186 L 168 362 Q 86 382 14 344 Z"
                  fill="url(#visorStrapMetal)"
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />
                <rect
                  x="44"
                  y="214"
                  width="96"
                  height="116"
                  rx="26"
                  fill="#AEB5C0"
                  stroke="#E8ECF2"
                  strokeWidth="2"
                />

                {/* Chromatic RGB Optical Dispersion Rim Glow (00:16) */}
                <path
                  className="vr-visor-SvgChromaWarm"
                  d="M 152 162 C 152 68, 784 68, 784 162 L 792 356 C 792 448, 608 468, 536 392 C 502 356, 434 356, 400 392 C 328 468, 144 448, 144 356 Z"
                  fill="none"
                  stroke="#FF573B"
                  strokeWidth="12"
                />
                <path
                  className="vr-visor-SvgChromaCool"
                  d="M 160 168 C 160 74, 792 74, 792 168 L 800 362 C 800 454, 616 474, 544 398 C 510 362, 442 362, 408 398 C 336 474, 152 454, 152 362 Z"
                  fill="none"
                  stroke="#29DAFF"
                  strokeWidth="10"
                />

                {/* Outer Ergonomic Cushioned Carbon Gasket */}
                <path
                  d="M 156 165 C 156 70, 788 70, 788 165 L 796 358 C 796 450, 612 470, 540 394 C 506 358, 438 358, 404 394 C 332 470, 148 450, 148 358 Z"
                  fill="url(#visorCushion)"
                  stroke="#3A3F4B"
                  strokeWidth="3"
                />

                {/* Inner Sculpted Matte-Black Optical Chamber */}
                <path
                  d="M 218 192 C 218 126, 726 126, 726 192 L 732 332 C 732 398, 596 410, 540 350 C 504 312, 440 312, 404 350 C 348 410, 212 398, 212 332 Z"
                  fill="url(#visorInnerCavity)"
                  stroke="#232730"
                  strokeWidth="2.5"
                />

                {/* Left Optical Lens Barrel */}
                <ellipse cx="342" cy="264" rx="84" ry="92" fill="url(#visorLensPortal)" />
                <ellipse
                  cx="342"
                  cy="264"
                  rx="84"
                  ry="92"
                  fill="none"
                  stroke="#2B3240"
                  strokeWidth="5"
                />
                <path
                  d="M 284 224 Q 312 192 358 198"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Right Optical Lens Barrel (Camera Zoom Target at cx=600, cy=264!) */}
                <ellipse cx="600" cy="264" rx="86" ry="94" fill="url(#visorLensPortal)" />
                <ellipse
                  cx="600"
                  cy="264"
                  rx="86"
                  ry="94"
                  fill="none"
                  stroke="#2B3240"
                  strokeWidth="5"
                />
                <path
                  d="M 542 224 Q 570 192 616 198"
                  fill="none"
                  stroke="rgba(255,255,255,0.22)"
                  strokeWidth="5"
                  strokeLinecap="round"
                />

                {/* Proximity Sensor Pill Between Lenses */}
                <rect x="456" y="196" width="32" height="14" rx="7" fill="#0B0D12" stroke="#2D3340" />
              </svg>
            </div>

            {/* Layer 3: FULL-SCREEN 100VW X 100VH PITCH-BLACK 360° STAGE GALAXY (Video 00:09, 00:13, 00:14, 00:17 - 00:19!) */}
            <div ref={vrVoidRef} className="vr-dark-void">
              {/* Rainbow Dichroic Caustic Arc in Bottom-Right Corner (Exact Video 00:09 & 00:17!) */}
              <div className="vr-dark-void__caustic-arc" aria-hidden="true" />

              {/* 3D Rotating Sphere that expands from tight central orb to full-screen 360° screen galaxy! */}
              <div ref={vrPerspectiveRef} className="vr-galaxy-perspective" aria-hidden="true">
                <div ref={vrGlobeRef} className="vr-galaxy-sphere">
                  {sphereTiles.map((tile) => (
                    <div
                      key={tile.key}
                      className="vr-galaxy-tile"
                      style={{
                        transform: `rotateY(${tile.lon}deg) rotateX(${tile.lat}deg) translateZ(540px)`,
                        borderColor: tile.border,
                      }}
                    >
                      <img src={tile.image} alt="" loading="eager" />
                      <span
                        className="vr-galaxy-tile__badge"
                        style={{ backgroundColor: tile.tagBg }}
                      >
                        {tile.cue}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crisp White Editorial Overlay inside Full-Screen Dark Galaxy (Video 00:13 & 00:19!) */}
              <div ref={vrDarkCopyRef} className="container vr-dark-copy-wrap">
                <div className="vr-dark-copy">
                  <p className="vr-dark-copy__lead">{copy.vrLead}</p>
                  <button
                    type="button"
                    className="split-pill split-pill--light"
                    onClick={onOpenBrief}
                  >
                    <span className="split-pill__icon" aria-hidden="true">
                      <ChevronRight size={18} strokeWidth={2.3} />
                    </span>
                    <span className="split-pill__label">{copy.vrCta}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Layer 4: Rising Full-Screen Curved White Studio Paper Arch with Cyan Rim (Video 00:20!) */}
            <div
              ref={vrExitArchRef}
              className="chapter-arch-wipe chapter-arch-wipe--vr-exit"
              aria-hidden="true"
            />
          </div>
        </section>

        {/* ACT 8: STUDIO CULTURE SPOTLIGHT */}
        <section id="spotlight" className="spotlight-section">
          <div className="container spotlight-grid">
            <div className="spotlight-copy-col">
              <div className="spotlight-bowtie" aria-hidden="true">
                <svg viewBox="0 0 40 40" width="32" height="32" data-art="bowtie">
                  <polygon points="8,18 20,20 18,32" fill="#FFB800" />
                  <polygon points="20,8 32,20 20,20" fill="#D9381E" />
                </svg>
              </div>

              <h2 className="display-section spotlight__title">
                <span>{copy.spotlightTop}</span>
                <span>
                  {copy.spotlightMidPrefix}
                  <em className="text-vermilion">{copy.spotlightMidAccent}</em>
                </span>
                <span className="text-vermilion">{copy.spotlightBotAccent}</span>
              </h2>

              <p className="spotlight__body">{copy.spotlightBody}</p>

              <button
                type="button"
                className="split-pill split-pill--tonal"
                onClick={onOpenBrief}
              >
                <span className="split-pill__icon" aria-hidden="true">
                  <ChevronRight size={18} strokeWidth={2.3} />
                </span>
                <span className="split-pill__label">{copy.spotlightCta}</span>
              </button>
            </div>

            <div className="spotlight-visual-col">
              <div className="spotlight-prism-plate">
                <img
                  src="./media/projection-pavilion.jpg"
                  alt="Architectural vermilion light facade projection"
                  loading="lazy"
                />
                <div className="spotlight-prism-plate__glass-wedge" aria-hidden="true" />
                <div className="spotlight-prism-plate__caption mono-meta">
                  <span>JKT · SGP · TYO · BER</span>
                  <span>TUV BGV-C1 PRACTICE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACT 9: LATEST FIELD RESOURCES 3-COLUMN TALL CARDS (Video 00:10: Dark | Photo | 3D Book!) */}
        <section id="resources" className="resources-section">
          <div className="container">
            <header className="resources-header">
              <h2 className="display-section resources-header__title">
                <span>{copy.resourcesTop}</span>
                <span className="text-vermilion">{copy.resourcesAccent}</span>
              </h2>

              <button
                type="button"
                className="split-pill split-pill--tonal"
                onClick={onOpenBrief}
              >
                <span className="split-pill__icon" aria-hidden="true">
                  <ChevronRight size={18} strokeWidth={2.3} />
                </span>
                <span className="split-pill__label">{copy.resourcesCta}</span>
              </button>
            </header>

            <div className="resources-grid">
              {RESOURCE_CARDS.map((card, idx) => (
                <article
                  key={card.id}
                  className={`resource-card resource-card--${
                    idx === 1 ? 'photo' : card.variant
                  }`}
                  onClick={onOpenBrief}
                >
                  {idx === 1 && (
                    <>
                      <img
                        src="./media/foh-grandma.jpg"
                        alt=""
                        className="resource-card__bg-photo"
                        loading="lazy"
                      />
                      <div className="resource-card__bg-scrim" aria-hidden="true" />
                    </>
                  )}

                  <div className="resource-card__meta">
                    <span className="resource-card__pill">
                      {lang === 'id' ? card.typeId : card.type}
                    </span>
                    <span className="resource-card__date">{card.date}</span>
                  </div>

                  {card.variant === 'book' ? (
                    <div className="resource-book-cover">
                      <div className="resource-book-cover__pages" aria-hidden="true" />
                      <div className="resource-book-cover__front">
                        <h3 className="display-section resource-book-cover__title">
                          {lang === 'id' ? card.titleId : card.title}
                        </h3>
                        <div className="resource-book-cover__emboss" aria-hidden="true" />
                      </div>
                    </div>
                  ) : (
                    <h3 className="display-section resource-card__title">
                      {lang === 'id' ? card.titleId : card.title}
                    </h3>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ACT 10: PINNED 430VH DEEP CARBON WALL + 3 FLYING SUPERGLASS CERTIFICATION CARDS (Video 00:21!) */}
      <section
        id="standards"
        ref={qualityTrackRef}
        className="chapter-solid-dark quality-wall-track"
        data-chapter-polarity="dark"
      >
        <div className="quality-wall-sticky">
          <div className="quality-wall__glow" aria-hidden="true" />

          <h2 className="display-monumental quality-wall__display">
            <span className="quality-wall__line-white">{copy.qualityTop}</span>
            <span className="quality-wall__line-accent">{copy.qualityAccent}</span>
          </h2>

          <div className="quality-flying-stage" aria-label="Studio certifications">
            {STANDARDS_FLYING_CARDS.map((card, idx) => (
              <article
                key={card.id}
                ref={(el) => {
                  flyingCardsRef.current[idx] = el;
                }}
                className="quality-glass-card"
              >
                <CertEmblem type={card.iconType} />
                <h3 className="display-section quality-glass-card__title">
                  {lang === 'id' ? card.titleId : card.title}
                </h3>
                <span className="quality-glass-card__badge">
                  {lang === 'id' ? card.badgeId : card.badge}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
