import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronRight, Pause, Play, X } from 'lucide-react';
import { MARQUEE_TOKENS, STAGE_WORKS, UI_COPY } from '../data/sorotData';

export default function WorksAndMethod({ lang = 'en', onOpenBrief }) {
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  const taglineTrackRef = useRef(null);
  const taglineWordsRef = useRef([]);
  const worksGridRef = useRef(null);
  const skillsTrackRef = useRef(null);
  const skillItemsRef = useRef([]);

  const copy = UI_COPY[lang] || UI_COPY.en;
  const taglineWords = useMemo(() => copy.taglineTitle.split(' '), [copy.taglineTitle]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const updateScrollBeats = () => {
      const vh = window.innerHeight || 900;

      // Act 2: Word-by-word opacity scrub inside Warm Amber Sticker Track
      if (taglineTrackRef.current && taglineWordsRef.current.length > 0) {
        const rect = taglineTrackRef.current.getBoundingClientRect();
        const total = Math.max(1, rect.height - vh * 0.65);
        const p = reduced ? 1 : Math.max(0, Math.min(1, (vh * 0.35 - rect.top) / total));
        const count = taglineWordsRef.current.length;

        taglineWordsRef.current.forEach((span, idx) => {
          if (!span) return;
          const threshold = idx / count;
          const wordAlpha = reduced
            ? 1
            : Math.max(0.24, Math.min(1, (p - threshold * 0.78) * 6.5 + 0.24));
          span.style.opacity = wordAlpha.toFixed(2);
        });
      }

      // Act 3: Subtle odd/even column parallax on 2x4 Works Grid
      if (worksGridRef.current && window.innerWidth > 768 && !reduced) {
        const rect = worksGridRef.current.getBoundingClientRect();
        const norm = (vh * 0.5 - rect.top) / Math.max(1, rect.height);
        const shift = Math.max(-28, Math.min(28, norm * 34 - 14));
        worksGridRef.current.style.setProperty('--col-parallax', `${shift.toFixed(1)}px`);
      }

      // Act 5: Staggered reveal inside Dichroic Ice-Cyan Skills Sticker Track
      if (skillsTrackRef.current && skillItemsRef.current.length > 0) {
        const rect = skillsTrackRef.current.getBoundingClientRect();
        const total = Math.max(1, rect.height - vh * 0.7);
        const p = reduced ? 1 : Math.max(0, Math.min(1, (vh * 0.45 - rect.top) / total));

        skillItemsRef.current.forEach((el, idx) => {
          if (!el) return;
          const start = idx * 0.26;
          const itemP = reduced ? 1 : Math.max(0, Math.min(1, (p - start) / 0.38));
          const y = (1 - itemP) * 34;
          el.style.opacity = (0.22 + itemP * 0.78).toFixed(2);
          el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
        });
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(updateScrollBeats);
    };

    updateScrollBeats();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [taglineWords]);

  return (
    <div className="chapter-solid-light section-light" data-chapter-polarity="light">
      {/* ACT 2: PINNED WARM AMBER CHROMATIC STICKER MANIFESTO (s02-tagline.jpg twin!) */}
      <section id="tagline" ref={taglineTrackRef} className="sticker-track sticker-track--amber">
        <div className="sticker-sticky">
          <div className="sticker-card sticker-card--amber">
            <div className="sticker-card__inner">
              <h2 className="tagline-scrub-heading">
                {taglineWords.map((word, idx) => (
                  <span
                    key={`${word}-${idx}`}
                    ref={(el) => {
                      taglineWordsRef.current[idx] = el;
                    }}
                    className="tagline-scrub-word"
                  >
                    {word}{' '}
                  </span>
                ))}
              </h2>
              <p className="tagline-subcopy">{copy.taglineBody}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ACT 3: PANORAMIC 2x4 SQUARE-ISH STAGE WORKS GRID (s03-works.jpg & s04-works-cards.jpg twin!) */}
      <section id="works" className="works-section">
        <div className="container works-container">
          <div className="works-header">
            <h2 className="display-section works-section__title">
              <span>{copy.worksTitleTop}</span>
              <span className="text-vermilion">{copy.worksTitleAccent}</span>
            </h2>
          </div>

          <nav
            ref={worksGridRef}
            className="works-grid"
            aria-label="Selected stage productions"
          >
            {STAGE_WORKS.map((work, idx) => (
              <article
                key={work.id}
                className={`work-card ${idx % 2 === 1 ? 'work-card--even' : ''}`}
              >
                <button
                  type="button"
                  className="work-card__trigger"
                  onClick={() => setSelectedWork(work)}
                  aria-label={`Inspect technical dossier for ${work.title}`}
                >
                  <div className="work-card__media">
                    <img
                      src={work.image}
                      alt={work.alt}
                      style={{ objectPosition: work.cropPos || '50% 50%' }}
                      loading={idx < 4 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                    <div className="work-card__scrim" aria-hidden="true" />
                  </div>

                  <div className="work-card__footer">
                    <h3 className="display-section work-card__title">{work.title}</h3>
                    <span className="work-card__tag">{work.tag}</span>
                  </div>
                </button>
              </article>
            ))}
          </nav>
        </div>
      </section>

      {/* ACT 4: GIANT 144PX VERMILION MARQUEE + CENTERED EDITORIAL METHOD & 4 CHECKMARKS (s05-method.jpg twin!) */}
      <section id="method" className="method-section">
        <div className="marquee-band">
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
                      <span className="marquee-dot" aria-hidden="true" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="container marquee-controls-row">
            <button
              type="button"
              className="marquee-pause-btn"
              aria-pressed={marqueePaused}
              onClick={() => setMarqueePaused((p) => !p)}
              data-marquee-toggle
            >
              {marqueePaused ? <Play size={12} /> : <Pause size={12} />}
              <span>{marqueePaused ? 'Resume ticker' : 'Pause ticker'}</span>
            </button>
          </div>
        </div>

        <div className="container method-editorial">
          <p className="method-editorial__lead">{copy.methodTitle}</p>
          <p className="method-editorial__body">{copy.methodBody}</p>

          <ul className="method-editorial__checks">
            {copy.methodChecks.map((line) => (
              <li key={line}>
                <span className="method-check-badge" aria-hidden="true">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ACT 5: PINNED DICHROIC ICE-CYAN STICKER - 3 STAGGERED PROOF STATEMENTS (s06-skills.jpg twin!) */}
      <section id="skills" ref={skillsTrackRef} className="sticker-track sticker-track--cyan">
        <div className="sticker-sticky">
          <div className="sticker-card sticker-card--cyan">
            <ul className="skills-list">
              {copy.skills.map((item, idx) => (
                <li
                  key={item.text}
                  ref={(el) => {
                    skillItemsRef.current[idx] = el;
                  }}
                  className={`skills-item skills-item--${item.align}`}
                >
                  <h3 className="skills-item__title">{item.text}</h3>

                  {item.chips ? (
                    <div className="skills-item__chips" aria-hidden="true">
                      {item.chips.map((chip) => (
                        <span key={chip} className="skills-chip mono-meta">
                          {chip}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <a href="#works" className="split-pill split-pill--tonal-cyan">
                      <span className="split-pill__icon" aria-hidden="true">
                        <ChevronRight size={18} strokeWidth={2.3} />
                      </span>
                      <span className="split-pill__label">{item.cta}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
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
                {selectedWork.tag} · {selectedWork.client}
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
                  <ChevronRight size={19} strokeWidth={2.3} />
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
