import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { UI_COPY } from '../data/sorotData';

export default function HeroStage({ activeCue, lang = 'en', onOpenBrief }) {
  const trackRef = useRef(null);
  const archRef = useRef(null);
  const posterRef = useRef(null);
  const thesisRef = useRef(null);
  const stampRef = useRef(null);

  const copy = UI_COPY[lang] || UI_COPY.en;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const updateHero = () => {
      const track = trackRef.current;
      if (!track) return;

      const vh = window.innerHeight || 900;
      const isMobile = window.innerWidth < 768;
      const rect = track.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - vh);
      const p = Math.max(0, Math.min(1, -rect.top / scrollable));

      if (reduced) {
        if (archRef.current) archRef.current.style.transform = 'translate3d(0, 56%, 0)';
        if (posterRef.current) {
          posterRef.current.style.opacity = '1';
          posterRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
        if (thesisRef.current) {
          thesisRef.current.style.opacity = '1';
          thesisRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
        return;
      }

      // 1. Curved White Arch Dome rising smoothly from the bottom (upper-mid-1440.png twin!)
      if (archRef.current) {
        const archP = Math.max(0, Math.min(1, (p - 0.14) / 0.56));
        const yPct = (1 - archP) * 108;
        archRef.current.style.transform = `translate3d(0, ${yPct.toFixed(2)}%, 0)`;
      }

      // 2. Giant 2-Block Staggered Poster Headline (starts below on desktop so y=0 shows pure 3D glass prism field!)
      if (posterRef.current) {
        const enterP = isMobile ? 1 : Math.max(0, Math.min(1, (p - 0.02) / 0.34));
        const exitP = Math.max(0, Math.min(1, (p - 0.54) / 0.18));
        const yOffset = isMobile ? -p * 220 : (1 - enterP) * 420 - p * 260;
        const opacity = (isMobile ? 1 : Math.min(1, enterP * 1.45)) * (1 - exitP);
        posterRef.current.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
        posterRef.current.style.opacity = opacity.toFixed(3);
        posterRef.current.dataset.onPaper = p > 0.42 ? 'true' : 'false';
      }

      // 3. Centered H1 Editorial Thesis Statement revealing cleanly in Act 1 finale
      if (thesisRef.current) {
        const inP = Math.max(0, Math.min(1, (p - 0.56) / 0.22));
        const yShift = (1 - inP) * 48;
        thesisRef.current.style.opacity = inP.toFixed(3);
        thesisRef.current.style.transform = `translate3d(0, ${yShift.toFixed(1)}px, 0)`;
        thesisRef.current.style.pointerEvents = inP > 0.4 ? 'auto' : 'none';
      }

      // 4. Bottom-right rotating Scroll ring fades gently as arch completes
      if (stampRef.current) {
        const fade = 1 - Math.max(0, Math.min(1, (p - 0.28) / 0.25));
        stampRef.current.style.opacity = fade.toFixed(3);
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateHero);
    };

    updateHero();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      id="hero-stage"
      ref={trackRef}
      data-chapter-polarity={activeCue.polarity}
      className={`chapter-hero hero-track hero-track--${activeCue.id}`}
    >
      <div className="hero-sticky-stage">
        {/* Rising Curved White Studio Paper Arch Dome */}
        <div ref={archRef} className="hero-arch-dome" aria-hidden="true" />

        {/* Monumental Two-Block Staggered Condensed Poster Headline (Refracted through 3D Glass Prisms!) */}
        <div ref={posterRef} className="container hero-poster-wrap" aria-hidden="true">
          <div className="hero-poster-block hero-poster-block--left">
            {copy.heroBlockLeft.map((line, idx) => (
              <span
                key={line}
                className={`display-monumental hero-poster-line ${
                  idx === copy.heroBlockLeft.length - 1 ? 'hero-poster-line--punch' : ''
                }`}
              >
                {line}
              </span>
            ))}
          </div>

          <div className="hero-poster-block hero-poster-block--right">
            {copy.heroBlockRight.map((line, idx) => (
              <span
                key={line}
                className={`display-monumental hero-poster-line ${
                  idx === copy.heroBlockRight.length - 1 ? 'hero-poster-line--punch' : ''
                }`}
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Centered H1 Editorial Thesis Statement (Revealed cleanly on scroll!) */}
        <div ref={thesisRef} className="container hero-thesis-overlay">
          <h1 className="hero-thesis__h1">{copy.heroThesis}</h1>
          <button type="button" className="split-pill split-pill--dark" onClick={onOpenBrief}>
            <span className="split-pill__icon" aria-hidden="true">
              <ChevronRight size={19} strokeWidth={2.3} />
            </span>
            <span className="split-pill__label">{copy.ctaTop}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
