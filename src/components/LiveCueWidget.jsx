import { useEffect, useState } from 'react';
import { Plus, Sliders, X } from 'lucide-react';
import { LIGHTING_CUES } from '../data/sorotData';
import './LiveCueWidget.css';

export default function LiveCueWidget({ activeCueId, onSelectCue, onOpenBrief }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [inFooter, setInFooter] = useState(false);
  const [onDarkStage, setOnDarkStage] = useState(true);
  const activeCue = LIGHTING_CUES.find((c) => c.id === activeCueId) || LIGHTING_CUES[0];

  const cycleNextCue = () => {
    const idx = LIGHTING_CUES.findIndex((c) => c.id === activeCue.id);
    const next = LIGHTING_CUES[(idx + 1) % LIGHTING_CUES.length];
    onSelectCue(next.id);
  };

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 900;
      const footerEl = document.getElementById('footer');
      const heroEl = document.getElementById('hero-stage');
      const qualEl = document.getElementById('standards');

      if (footerEl) {
        const fr = footerEl.getBoundingClientRect();
        setInFooter(fr.top < vh * 0.78);
      }

      let dark = false;
      if (heroEl) {
        const hr = heroEl.getBoundingClientRect();
        const prog = -hr.top / Math.max(1, hr.height - vh);
        if (hr.bottom > vh * 0.4 && prog < 0.82 && activeCue.polarity !== 'light') {
          dark = true;
        }
      }
      const vrEl = document.getElementById('vr-portal');
      if (vrEl) {
        const vr = vrEl.getBoundingClientRect();
        const vp = -vr.top / Math.max(1, vr.height - vh);
        if (vr.top < vh * 0.5 && vr.bottom > vh * 0.5 && vp > 0.22 && vp < 0.88) {
          dark = true;
        }
      }
      if (qualEl) {
        const qr = qualEl.getBoundingClientRect();
        if (qr.top < vh * 0.5 && qr.bottom > vh * 0.5) {
          dark = true;
        }
      }
      setOnDarkStage(dark);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [activeCue.polarity]);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  return (
    <>
      {/* Sleek Bottom-Left Showreel Story Card + "+" Pill (Auto-hides cleanly in Footer like laboiteaslides!) */}
      <aside
        className={`live-cue-dock ${inFooter ? 'live-cue-dock--hidden' : ''}`}
        aria-label="Live Stage Showreel and Cue Switcher"
        data-active-cue={activeCue.id}
      >
        <div className="story-reel-card">
          <div className="story-reel-card__top">
            <span className="story-reel-card__author">
              <span className="story-reel-card__dot" aria-hidden="true" />
              <span>{activeCue.director}</span>
            </span>
            <svg viewBox="0 0 16 16" width="11" height="11" aria-hidden="true" data-art="bowtie">
              <polygon points="2,2 8,8 2,12" fill="#29DAFF" />
              <polygon points="14,4 8,8 14,14" fill="#FF573B" />
            </svg>
          </div>

          <button
            type="button"
            className="story-reel-card__frame"
            onClick={cycleNextCue}
            aria-label={`Switch live lighting cue, currently ${activeCue.shortName}`}
          >
            <img src={activeCue.reelImage} alt="" aria-hidden="true" />
            <div className="story-reel-card__beam" aria-hidden="true" />
            <span className="story-reel-card__caption">{activeCue.reelCaption}</span>
          </button>

          <div className="story-reel-card__bottom">
            <span className="story-reel-card__brand">sorot®</span>
            <div className="story-reel-card__cues" role="group" aria-label="Lighting cues">
              {LIGHTING_CUES.map((cue) => (
                <button
                  key={cue.id}
                  type="button"
                  className={`story-reel-card__cue-dot ${
                    cue.id === activeCue.id ? 'is-active' : ''
                  }`}
                  onClick={() => onSelectCue(cue.id)}
                  aria-label={`Activate cue ${cue.code} ${cue.shortName}`}
                  aria-pressed={cue.id === activeCue.id}
                  data-cue-btn={cue.id}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="live-cue-dock__expand"
          aria-label="Open live lighting cue console"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          {drawerOpen ? <X size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
        </button>
      </aside>

      {/* Fixed Bottom-Right Rotating Scroll Ring (Visible on Hero & Quality Monolith like laboiteaslides!) */}
      <div
        className={`fixed-scroll-ring ${onDarkStage && !inFooter ? 'is-visible' : ''}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 116 116" width="82" height="82" className="fixed-scroll-ring__svg">
          <defs>
            <path
              id="sorot-fixed-ring"
              d="M 58, 58 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            />
          </defs>
          <text className="fixed-scroll-ring__text">
            <textPath href="#sorot-fixed-ring" startOffset="0%">
              Scroll · Scroll · Scroll · Scroll ·
            </textPath>
          </text>
        </svg>
      </div>

      {drawerOpen && (
        <div
          className="cue-drawer-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Active Stage Cue Technical Specification"
        >
          <div className="cue-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <div className="cue-drawer">
            <div className="cue-drawer__top">
              <span className="eyebrow">
                <Sliders size={13} aria-hidden="true" />
                LIVE CUE RIG // {activeCue.code}
              </span>
              <button
                type="button"
                className="cue-drawer__close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close cue specification drawer"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <h3 className="display-section cue-drawer__title">{activeCue.name}</h3>
            <p className="cue-drawer__desc">{activeCue.description}</p>

            <div className="cue-drawer__specs">
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">COLOR CALIBRATION</span>
                <strong>{activeCue.spec}</strong>
              </div>
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">TOTAL OUTPUT</span>
                <strong>{activeCue.lumens}</strong>
              </div>
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">DMX PATCH</span>
                <strong>{activeCue.dmx}</strong>
              </div>
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">OVERHEAD RIG LOAD</span>
                <strong>{activeCue.rigLoad}</strong>
              </div>
            </div>

            <div className="cue-drawer__modes">
              <span className="mono-meta">SWITCH ACTIVE HERO LIGHTING RIG</span>
              <div className="cue-drawer__mode-pills">
                {LIGHTING_CUES.map((cue) => (
                  <button
                    key={cue.id}
                    type="button"
                    className={`cue-drawer__pill ${
                      cue.id === activeCue.id ? 'cue-drawer__pill--active' : ''
                    }`}
                    onClick={() => onSelectCue(cue.id)}
                  >
                    {cue.code} {cue.shortName}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="cue-drawer__cta"
              onClick={() => {
                setDrawerOpen(false);
                onOpenBrief();
              }}
            >
              Request Custom Rig Spec Sheet
            </button>
          </div>
        </div>
      )}
    </>
  );
}
