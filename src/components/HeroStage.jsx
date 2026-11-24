import { ChevronRight } from 'lucide-react';

export default function HeroStage({ activeCue, onOpenBrief }) {
  return (
    <section
      id="hero-stage"
      data-chapter-polarity={activeCue.polarity}
      className={`chapter-hero hero-stage hero-stage--${activeCue.id}`}
    >
      <div className="hero-stage__viewport">
        <div className="container hero-stage__content">
          <div className="hero-stage__meta-bar">
            <span className="hero-stage__spec-pill mono-meta">
              CUE {activeCue.code} · {activeCue.name}
            </span>
            <span className="hero-stage__spec-pill mono-meta">
              {activeCue.spec} · {activeCue.lumens}
            </span>
          </div>

          <h1 className="display-monumental hero-stage__headline">
            <span className="hero-stage__line">LIGHT SHAPES</span>
            <span className="hero-stage__line">ARCHITECTURAL</span>
            <span className="hero-stage__line hero-stage__line--accent">SPACE</span>
          </h1>

          <div className="hero-stage__subbar">
            <p className="hero-stage__lead">
              Kinetic stage scenography, beveled Fresnel optics, and zero-drift DMX broadcast
              architecture engineered for arenas, museums, and live cinema.
            </p>
            <button
              type="button"
              className={`split-pill ${
                activeCue.polarity === 'light' ? 'split-pill--dark' : 'split-pill--light'
              }`}
              onClick={onOpenBrief}
            >
              <span className="split-pill__icon" aria-hidden="true">
                <ChevronRight size={20} strokeWidth={2.4} />
              </span>
              <span className="split-pill__label">Request Cue Sheet</span>
            </button>
          </div>
        </div>

        {/* Bottom-right rotating circular SCROLL stamp */}
        <a
          href="#works"
          className="scroll-stamp"
          aria-label="Scroll to selected stage works"
        >
          <svg
            viewBox="0 0 116 116"
            width="92"
            height="92"
            className="scroll-stamp__svg"
            aria-hidden="true"
          >
            <defs>
              <path
                id="sorot-scroll-ring"
                d="M 58, 58 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
              />
            </defs>
            <text className="scroll-stamp__text">
              <textPath href="#sorot-scroll-ring" startOffset="0%">
                SCROLL · SCROLL · SCROLL · SCROLL ·
              </textPath>
            </text>
          </svg>
          <span className="scroll-stamp__center" aria-hidden="true">
            ↓
          </span>
        </a>
      </div>

      {/* Rising Curved Chalk Dome Boundary into Editorial Thesis */}
      <div className="hero-dome-transition" data-chapter-polarity="light">
        <div className="hero-dome-transition__arc" aria-hidden="true" />
        <div className="container hero-thesis">
          <span className="eyebrow hero-thesis__eyebrow">
            <span className="eyebrow-dot" />
            SOROT® SCENOGRAPHY STUDIO
          </span>
          <p className="hero-thesis__statement">
            The only independent stage architecture practice combining{' '}
            <span className="hero-thesis__highlight">TUV-certified kinetic rigging</span>, custom
            beveled borosilicate Fresnel louvers, and millisecond-locked DMX broadcast optics.
          </p>
          <div className="hero-thesis__specs">
            <span className="mono-meta">JAKARTA · SINGAPORE · TOKYO · BERLIN</span>
            <span className="mono-meta">SMPTE 12M / BGV-C1 / REC.2020 CALIBRATED</span>
          </div>
        </div>
      </div>
    </section>
  );
}
