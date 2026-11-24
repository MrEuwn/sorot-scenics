import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import {
  DISCIPLINES,
  RESOURCE_CARDS,
  SPHERE_SCREENS,
  STANDARDS_FLYING_CARDS,
  UI_COPY,
} from '../data/sorotData';

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
  const [activeDiscId, setActiveDiscId] = useState(DISCIPLINES[0].id);
  const vrTrackRef = useRef(null);
  const globeRef = useRef(null);
  const vrCopyRef = useRef(null);
  const qualityTrackRef = useRef(null);
  const flyingCardsRef = useRef([]);

  const copy = UI_COPY[lang] || UI_COPY.en;
  const activeDisc = DISCIPLINES.find((d) => d.id === activeDiscId) || DISCIPLINES[0];

  // Build 18-tile 3D Spherical Mosaic coordinates (3 latitude bands x 6 longitudes)
  const sphereTiles = useMemo(() => {
    const tiles = [];
    const lats = [-34, 0, 34];
    for (let r = 0; r < lats.length; r++) {
      const count = 6;
      for (let c = 0; c < count; c++) {
        const idx = r * count + c;
        const src = SPHERE_SCREENS[idx % SPHERE_SCREENS.length];
        const lon = (360 / count) * c + (r % 2 === 1 ? 30 : 0);
        tiles.push({
          key: `tile-${r}-${c}`,
          lat: lats[r],
          lon,
          ...src,
        });
      }
    }
    return tiles;
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const updateChoreo = () => {
      const vh = window.innerHeight || 900;

      // Act 7: 3D Spherical Stage-Screen Globe spin & expansion on scroll (mid-1440.png + vr-1440.png twin!)
      if (vrTrackRef.current && globeRef.current) {
        const rect = vrTrackRef.current.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - vh);
        const p = Math.max(0, Math.min(1, -rect.top / scrollable));

        if (!reduced) {
          const rotY = p * 235 + 18;
          const rotX = -12 + p * 24;
          const scale = 0.72 + Math.sin(p * Math.PI) * 0.42;
          globeRef.current.style.transform = `scale(${scale.toFixed(3)}) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`;
        }

        if (vrCopyRef.current && !reduced) {
          const lift = (0.5 - p) * 44;
          vrCopyRef.current.style.transform = `translate3d(0, ${lift.toFixed(1)}px, 0)`;
        }
      }

      // Act 10: Pinned Deep Carbon Wall + 3 Flying Frosted superGlass Cards (quality-1440.png & s10-quality-cards.jpg twin!)
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

          // Stagger 3 cards cleanly across scroll progress [0.12 -> 0.94] so at p=0 the giant 210px headline shines pure!
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
        {/* ACT 6: MONUMENTAL 88PX KINETIC DISCIPLINES ROUTER + FLOATING PREVIEW PLATE */}
        <section id="disciplines" className="expertises-section">
          <div className="container">
            <h2 className="expertises-eyebrow">{copy.expertisesEyebrow}</h2>

            <div className="expertises-stage">
              <nav className="expertises-router" aria-label="Core stage disciplines">
                {DISCIPLINES.map((item) => {
                  const isActive = item.id === activeDisc.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={`expertise-link ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => setActiveDiscId(item.id)}
                      onFocus={() => setActiveDiscId(item.id)}
                      onClick={() => setActiveDiscId(item.id)}
                    >
                      <span className="display-section expertise-link__label">
                        {lang === 'id' ? item.titleId : item.title}
                      </span>
                      <span className="mono-meta expertise-link__spec">{item.spec}</span>
                    </button>
                  );
                })}
              </nav>

              <aside className="expertise-preview-card" aria-live="polite">
                <div className="expertise-preview-card__img">
                  <img key={activeDisc.id} src={activeDisc.image} alt={activeDisc.alt} />
                  <span className="expertise-preview-card__pill mono-meta">{activeDisc.spec}</span>
                </div>
                <p className="expertise-preview-card__desc">{activeDisc.summary}</p>
              </aside>
            </div>
          </div>
        </section>

        {/* ACT 7: PINNED 300VH 3D ORBITAL STAGE-SCREEN SPHERE PORTAL (vr-1440.png & mid-1440.png twin!) */}
        <section id="vr-portal" ref={vrTrackRef} className="vr-portal-track">
          <div className="vr-portal-sticky">
            {/* 3D Spherical Mosaic Orb of Live Stage Cues */}
            <div className="vr-globe-scene" aria-hidden="true">
              <div ref={globeRef} className="vr-globe">
                <div className="vr-globe__core" />
                {sphereTiles.map((tile) => (
                  <div
                    key={tile.key}
                    className="vr-globe__tile"
                    style={{
                      transform: `rotateY(${tile.lon}deg) rotateX(${tile.lat}deg) translateZ(148px)`,
                    }}
                  >
                    <img src={tile.image} alt="" loading="lazy" />
                    <span className="vr-globe__cue">{tile.cue}</span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={vrCopyRef} className="container vr-portal-content">
              <h2 className="display-section vr-portal__title">
                <span>{copy.vrTitleTop}</span>
                <span>
                  {copy.vrTitleMidPrefix}
                  <em className="text-vermilion">{copy.vrTitleMidAccent}</em>
                </span>
                <span className="text-vermilion">{copy.vrTitleBotAccent}</span>
              </h2>

              <div className="vr-portal__offset-col">
                <p className="vr-portal__lead">{copy.vrLead}</p>
                <button
                  type="button"
                  className="split-pill split-pill--paper"
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
        </section>

        {/* ACT 8: STUDIO CULTURE SPOTLIGHT (s08-spotlight.jpg twin!) */}
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

        {/* ACT 9: LATEST FIELD RESOURCES 3-COLUMN TALL EDITORIAL CARDS (s09-resources.jpg twin!) */}
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
              {RESOURCE_CARDS.map((card) => (
                <article
                  key={card.id}
                  className={`resource-card resource-card--${card.variant}`}
                  onClick={onOpenBrief}
                >
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

      {/* ACT 10: PINNED 360VH DEEP CARBON WALL + 3 FLYING SUPERGLASS CERTIFICATION CARDS (quality-1440.png & s10-quality-cards.jpg twin!) */}
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
