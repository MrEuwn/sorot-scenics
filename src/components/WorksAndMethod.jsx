import { useState } from 'react';
import { ChevronRight, Pause, Play, X } from 'lucide-react';
import { MARQUEE_TOKENS, PROOF_METRICS, STAGE_WORKS } from '../data/sorotData';

export default function WorksAndMethod({ onOpenBrief }) {
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  return (
    <div className="chapter-solid-light section-light" data-chapter-polarity="light">
      {/* Selected Stage Works 2x3 Grid */}
      <section id="works" className="works-section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow section-head__eyebrow">
              <span className="eyebrow-dot" />
              SELECTED STAGE PRODUCTIONS
            </span>
            <h2 className="display-section works-section__title">
              <span>ONE LIGHT RIG.</span>
              <span className="text-vermilion">INFINITE SPACES.</span>
            </h2>
          </div>

          <div className="works-grid">
            {STAGE_WORKS.map((work) => (
              <article key={work.id} className="work-card">
                <button
                  type="button"
                  className="work-card__trigger"
                  onClick={() => setSelectedWork(work)}
                  aria-label={`Inspect technical dossier for ${work.title}`}
                >
                  <div className="work-card__media">
                    <img src={work.image} alt={work.alt} loading="eager" decoding="async" />
                    <div className="work-card__scrim" aria-hidden="true" />
                  </div>

                  <div className="work-card__top-tags">
                    <span className="work-card__pill mono-meta">{work.dmx}</span>
                    <span className="work-card__pill mono-meta">{work.lumens}</span>
                  </div>

                  <div className="work-card__body">
                    <span className="work-card__cat mono-meta">
                      {work.category} · {work.year}
                    </span>
                    <h3 className="display-section work-card__title">{work.title}</h3>
                    <span className="work-card__client">{work.client}</span>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pauseable Kinetic Metrics Marquee & Pinned Production Proof */}
      <section id="method" className="method-section">
        <div className="marquee-band">
          <div className="container marquee-band__controls">
            <span className="eyebrow section-head__eyebrow">
              <span className="eyebrow-dot" />
              TELEMETRY & RIG BENCHMARKS
            </span>
            <button
              type="button"
              className="marquee-pause-btn"
              aria-pressed={marqueePaused}
              onClick={() => setMarqueePaused((p) => !p)}
              data-marquee-toggle
            >
              {marqueePaused ? (
                <>
                  <Play size={14} aria-hidden="true" />
                  <span>Play Ticker</span>
                </>
              ) : (
                <>
                  <Pause size={14} aria-hidden="true" />
                  <span>Pause Ticker</span>
                </>
              )}
            </button>
          </div>

          <div
            className={`marquee-track-wrap ${marqueePaused ? 'marquee-track-wrap--paused' : ''}`}
            data-marquee-paused={marqueePaused ? 'true' : 'false'}
          >
            <div className="marquee-track">
              {[0, 1].map((dupIdx) => (
                <div
                  key={dupIdx}
                  className="marquee-group"
                  aria-hidden={dupIdx === 1 ? 'true' : undefined}
                >
                  {MARQUEE_TOKENS.map((token) => (
                    <span key={`${dupIdx}-${token}`} className="display-monumental marquee-item">
                      {token}
                      <span className="marquee-sep" aria-hidden="true">
                        ·
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container proof-block">
          <div className="proof-grid">
            {PROOF_METRICS.map((item) => (
              <div key={item.label} className="proof-card">
                <span className="mono-meta proof-card__tag">{item.tag}</span>
                <div className="display-monumental proof-card__value">{item.value}</div>
                <h3 className="proof-card__label">{item.label}</h3>
                <p className="proof-card__detail">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="proof-cta-bar">
            <p className="proof-cta-bar__note">
              Every SOROT rig ships with complete CAD rigging plots, pre-vis digital twins, and
              redundant fiber showfiles.
            </p>
            <button type="button" className="split-pill split-pill--dark" onClick={onOpenBrief}>
              <span className="split-pill__icon" aria-hidden="true">
                <ChevronRight size={20} strokeWidth={2.4} />
              </span>
              <span className="split-pill__label">Explore Productions</span>
            </button>
          </div>
        </div>
      </section>

      {/* Work Technical Dossier Modal */}
      {selectedWork && (
        <div
          className="work-dossier-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedWork.title} Technical Dossier`}
        >
          <div
            className="work-dossier-modal__backdrop"
            onClick={() => setSelectedWork(null)}
          />
          <div className="work-dossier-modal__card">
            <button
              type="button"
              className="work-dossier-modal__close"
              onClick={() => setSelectedWork(null)}
              aria-label="Close production dossier"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <div className="work-dossier-modal__media">
              <img src={selectedWork.image} alt={selectedWork.alt} />
            </div>
            <div className="work-dossier-modal__body">
              <span className="mono-meta work-dossier-modal__cat">
                {selectedWork.category} · {selectedWork.client}
              </span>
              <h3 className="display-section work-dossier-modal__title">{selectedWork.title}</h3>
              <p className="work-dossier-modal__summary">{selectedWork.summary}</p>
              <div className="work-dossier-modal__specs">
                <span className="mono-meta">{selectedWork.dmx}</span>
                <span className="mono-meta">{selectedWork.lumens}</span>
                <span className="mono-meta">{selectedWork.rigLoad}</span>
              </div>
              <button
                type="button"
                className="split-pill split-pill--vermilion"
                onClick={() => {
                  setSelectedWork(null);
                  onOpenBrief();
                }}
              >
                <span className="split-pill__icon" aria-hidden="true">
                  <ChevronRight size={20} strokeWidth={2.4} />
                </span>
                <span className="split-pill__label">Commission Similar Rig</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
