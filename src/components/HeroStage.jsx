import { useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { UI_COPY } from '../data/sorotData';

export default function HeroStage({ activeCue, lang = 'en', onOpenBrief }) {
  const trackRef = useRef(null);
  const archRef = useRef(null);
  const posterRef = useRef(null);
  const leftBlockRef = useRef(null);
  const rightBlockRef = useRef(null);
  const thesisRef = useRef(null);

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
        if (archRef.current) archRef.current.style.transform = 'translate3d(0, 108%, 0)';
        if (posterRef.current) posterRef.current.style.opacity = '0';
        if (thesisRef.current) {
          thesisRef.current.style.opacity = '1';
          thesisRef.current.style.transform = 'translate3d(0, 0, 0)';
        }
        return;
      }

      // Beat 2 (0.08 -> 0.56): Long cinematic 2-block poster headline travel with subtle horizontal counter-drift
      if (posterRef.current) {
        const enterP = isMobile ? 1 : Math.max(0, Math.min(1, (p - 0.08) / 0.24));
        const exitP = Math.max(0, Math.min(1, (p - 0.48) / 0.10));
        const travel = (p - 0.08) / 0.50;
        const yOffset = isMobile ? -p * 260 : (1 - enterP) * 440 - travel * 360;
        const opacity = (isMobile ? 1 : Math.min(1, enterP * 1.45)) * (1 - exitP);
        posterRef.current.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
        posterRef.current.style.opacity = opacity.toFixed(3);

        if (leftBlockRef.current && !isMobile) {
          const driftX = (1 - enterP) * -42;
          leftBlockRef.current.style.transform = `translate3d(${driftX.toFixed(1)}px, 0, 0)`;
        }
        if (rightBlockRef.current && !isMobile) {
          const driftX = (1 - enterP) * 42;
          rightBlockRef.current.style.transform = `translate3d(${driftX.toFixed(1)}px, 0, 0)`;
        }
      }

      // Beat 3 (0.52 -> 0.84): Centered H1 Editorial Thesis Statement on the Vermilion / Cue Stage!
      if (thesisRef.current) {
        const inP = Math.max(0, Math.min(1, (p - 0.52) / 0.14));
        const outP = Math.max(0, Math.min(1, (p - 0.80) / 0.10));
        const yShift = (1 - inP) * 52 - outP * 36;
        const alpha = inP * (1 - outP);
        thesisRef.current.style.opacity = alpha.toFixed(3);
        thesisRef.current.style.transform = `translate3d(0, ${yShift.toFixed(1)}px, 0)`;
        thesisRef.current.style.pointerEvents = alpha > 0.5 ? 'auto' : 'none';
      }

      // Beat 4 (0.78 -> 0.99): Full-Screen 100vw Curved Warm Stage Amber Arch rising into Act 2!
      if (archRef.current) {
        const archP = Math.max(0, Math.min(1, (p - 0.78) / 0.21));
        const yPct = (1 - archP) * 108;
        archRef.current.style.transform = `translate3d(0, ${yPct.toFixed(2)}%, 0)`;
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
        {/* Monumental Two-Block Staggered Condensed Poster Headline */}
        <div ref={posterRef} className="container hero-poster-wrap" aria-hidden="true">
          <div ref={leftBlockRef} className="hero-poster-block hero-poster-block--left">
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

          <div ref={rightBlockRef} className="hero-poster-block hero-poster-block--right">
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

        {/* Centered H1 Editorial Thesis Statement */}
        <div ref={thesisRef} className="container hero-thesis-overlay">
          <h1 className="hero-thesis__h1">{copy.heroThesis}</h1>
          <button
            type="button"
            className={`split-pill ${
              activeCue.polarity === 'light' ? 'split-pill--dark' : 'split-pill--light'
            }`}
            onClick={onOpenBrief}
          >
            <span className="split-pill__icon" aria-hidden="true">
              <ChevronRight size={19} strokeWidth={2.3} />
            </span>
            <span className="split-pill__label">{copy.ctaTop}</span>
          </button>
        </div>

        {/* Rising Full-Screen 100vw Curved Warm Amber Arch handing off seamlessly into Act 2 */}
        <div ref={archRef} className="hero-arch-dome hero-arch-dome--amber" aria-hidden="true" />
      </div>
    </section>
  );
}
