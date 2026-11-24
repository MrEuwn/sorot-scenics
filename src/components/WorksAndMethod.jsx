import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronRight, Pause, Play, X } from 'lucide-react';
import { MARQUEE_TOKENS, STAGE_WORKS, UI_COPY } from '../data/sorotData';

export default function WorksAndMethod({ lang = 'en', onOpenBrief }) {
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  const taglineTrackRef = useRef(null);
  const taglineWordsRef = useRef([]);
  const taglineSubRef = useRef(null);
  const taglineExitArchRef = useRef(null);

  const worksGridRef = useRef(null);

  const methodLeadRef = useRef(null);
  const methodWordsRef = useRef([]);

  const skillsTrackRef = useRef(null);
  const skillsEntryArchRef = useRef(null);
  const skillsExitArchRef = useRef(null);
  const skillSlidesRef = useRef([]);

  const copy = UI_COPY[lang] || UI_COPY.en;
  const taglineWords = useMemo(() => copy.taglineTitle.split(' '), [copy.taglineTitle]);
  const methodWords = useMemo(() => copy.methodTitle.split(' '), [copy.methodTitle]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;

    const updateScrollBeats = () => {
      const vh = window.innerHeight || 900;

      // ACT 2: Full-Screen 100vw x 100vh Pinned Amber Manifesto (440vh long!) + Curved White Exit Arch into Productions!
      if (taglineTrackRef.current) {
        const rect = taglineTrackRef.current.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - vh);
        const p = reduced ? 0.7 : Math.max(0, Math.min(1, -rect.top / scrollable));

        const count = taglineWordsRef.current.length;
        const scrubP = Math.max(0, Math.min(1, (p - 0.04) / 0.56));
        taglineWordsRef.current.forEach((span, idx) => {
          if (!span) return;
          const threshold = idx / Math.max(1, count);
          const alpha = reduced
            ? 1
            : Math.max(0.22, Math.min(1, (scrubP - threshold * 0.84) * 7.0 + 0.22));
          span.style.opacity = alpha.toFixed(2);
        });

        if (taglineSubRef.current) {
          const subP = reduced ? 1 : Math.max(0, Math.min(1, (p - 0.46) / 0.20));
          taglineSubRef.current.style.opacity = subP.toFixed(2);
          taglineSubRef.current.style.transform = `translate3d(0, ${((1 - subP) * 26).toFixed(1)}px, 0)`;
        }

        if (taglineExitArchRef.current && !reduced) {
          const archP = Math.max(0, Math.min(1, (p - 0.80) / 0.19));
          taglineExitArchRef.current.style.transform = `translate3d(0, ${((1 - archP) * 108).toFixed(2)}%, 0)`;
        }
      }

      // ACT 3: Odd/even column parallax on 2x4 Works Grid
      if (worksGridRef.current && window.innerWidth > 768 && !reduced) {
        const rect = worksGridRef.current.getBoundingClientRect();
        const norm = (vh * 0.5 - rect.top) / Math.max(1, rect.height);
        const shift = Math.max(-32, Math.min(32, norm * 38 - 16));
        worksGridRef.current.style.setProperty('--col-parallax', `${shift.toFixed(1)}px`);
      }

      // ACT 4: Word-by-word scrub on left-aligned Method Lead (Video 00:01!)
      if (methodLeadRef.current && methodWordsRef.current.length > 0) {
        const rect = methodLeadRef.current.getBoundingClientRect();
        const p = reduced ? 1 : Math.max(0, Math.min(1, (vh * 0.82 - rect.top) / (vh * 0.55)));
        const count = methodWordsRef.current.length;
        methodWordsRef.current.forEach((span, idx) => {
          if (!span) return;
          const threshold = idx / Math.max(1, count);
          const alpha = reduced
            ? 1
            : Math.max(0.22, Math.min(1, (p - threshold * 0.82) * 6.5 + 0.22));
          span.style.opacity = alpha.toFixed(2);
        });
      }

      // ACT 5: Full-Screen 100vw x 100vh Pinned Cyan Stage (460vh!) with Curved Entry/Exit Arches & 3 Sequential Pinned Slides (Video 00:03 - 00:06!)
      if (skillsTrackRef.current) {
        const rect = skillsTrackRef.current.getBoundingClientRect();
        const scrollable = Math.max(1, rect.height - vh);
        const p = reduced ? 0.25 : Math.max(0, Math.min(1, -rect.top / scrollable));

        if (skillsEntryArchRef.current && !reduced) {
          const inArch = Math.max(0, Math.min(1, p / 0.14));
          skillsEntryArchRef.current.style.transform = `translate3d(0, ${((1 - inArch) * 104).toFixed(2)}%, 0)`;
        }

        const ranges = [
          [0.12, 0.38],
          [0.39, 0.65],
          [0.66, 0.88],
        ];
        skillSlidesRef.current.forEach((el, idx) => {
          if (!el) return;
          if (reduced) {
            el.style.opacity = idx === 0 ? '1' : '0';
            el.style.pointerEvents = idx === 0 ? 'auto' : 'none';
            return;
          }
          const [s, e] = ranges[idx];
          const enter = Math.max(0, Math.min(1, (p - s) / 0.07));
          const exit = idx === 2 ? Math.max(0, Math.min(1, (p - 0.84) / 0.06)) : Math.max(0, Math.min(1, (p - (e - 0.06)) / 0.06));
          const alpha = enter * (1 - exit);
          const y = (1 - enter) * 32 - exit * 28;
          el.style.opacity = alpha.toFixed(3);
          el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
          el.style.pointerEvents = alpha > 0.5 ? 'auto' : 'none';
        });

        if (skillsExitArchRef.current && !reduced) {
          const outArch = Math.max(0, Math.min(1, (p - 0.86) / 0.13));
          skillsExitArchRef.current.style.transform = `translate3d(0, ${((1 - outArch) * 108).toFixed(2)}%, 0)`;
        }
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
  }, [taglineWords, methodWords]);

  return (
    <div className="chapter-solid-light section-light" data-chapter-polarity="light">
      {/* ACT 2: FULL-SCREEN 100VW X 100VH PINNED AMBER MANIFESTO CHAPTER (440vh!) */}
      <section id="tagline" ref={taglineTrackRef} className="fullscreen-amber-track">
        <div className="fullscreen-amber-sticky">
          <div className="container fullscreen-amber__inner">
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
            <p ref={taglineSubRef} className="tagline-subcopy">
              {copy.taglineBody}
            </p>
          </div>

          {/* Rising Full-Screen White Studio Paper Arch unveiling Productions! */}
          <div
            ref={taglineExitArchRef}
            className="chapter-arch-wipe chapter-arch-wipe--paper"
            aria-hidden="true"
          />
        </div>
      </section>

      {/* ACT 3: PANORAMIC 2x4 SQUARE-ISH STAGE WORKS GRID */}
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

      {/* ACT 4: GIANT 144PX VERMILION MARQUEE + ASYMMETRIC LEFT/RIGHT EDITORIAL METHOD (Video 00:01 - 00:02!) */}
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

        <div className="container method-asymmetric">
          <p ref={methodLeadRef} className="method-editorial__lead">
            {methodWords.map((word, idx) => (
              <span
                key={`${word}-${idx}`}
                ref={(el) => {
                  methodWordsRef.current[idx] = el;
                }}
                className="tagline-scrub-word"
              >
                {word}{' '}
              </span>
            ))}
          </p>

          <div className="method-editorial__right-col">
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
        </div>
      </section>

      {/* ACT 5: FULL-SCREEN 100VW X 100VH PINNED CYAN CHAPTER + 3D PINWHEEL + 3 SEQUENTIAL SLIDES (Video 00:03 - 00:06!) */}
      <section id="skills" ref={skillsTrackRef} className="fullscreen-cyan-track">
        <div className="fullscreen-cyan-sticky">
          {/* Rising Full-Screen Curved Cyan Arch Entry */}
          <div
            ref={skillsEntryArchRef}
            className="chapter-arch-wipe chapter-arch-wipe--cyan"
            aria-hidden="true"
          >
            <div className="container fullscreen-cyan__grid">
              {/* Left 50% reserved for WebGL 3D 4-Blade Cyan Pinwheel Rosette! */}
              <div className="fullscreen-cyan__pinwheel-spacer" aria-hidden="true" />

              {/* Right 50%: 3 Sequentially Crossfading Proof Statements in the exact same pinned slot! */}
              <div className="fullscreen-cyan__slides">
                {copy.skills.map((item, idx) => (
                  <div
                    key={item.text}
                    ref={(el) => {
                      skillSlidesRef.current[idx] = el;
                    }}
                    className="cyan-proof-slide"
                  >
                    <h3 className="skills-item__title">{item.text}</h3>

                    {item.chips ? (
                      <div className="skills-item__chips" aria-hidden="true">
                        <span className="skills-cert-tile">
                          <strong>TUV</strong>
                          <small>BGV-C1:2026</small>
                        </span>
                        <span className="skills-cert-tile">
                          <strong>MA3</strong>
                          <small>{item.chips[0]}</small>
                        </span>
                        <span className="skills-cert-tile">
                          <strong>5.0 ★</strong>
                          <small>{item.chips[2]}</small>
                        </span>
                      </div>
                    ) : (
                      <a href="#works" className="split-pill split-pill--tonal-cyan">
                        <span className="split-pill__icon" aria-hidden="true">
                          <ChevronRight size={18} strokeWidth={2.3} />
                        </span>
                        <span className="split-pill__label">{item.cta}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rising Full-Screen White Studio Paper Exit Arch (Video 00:06!) */}
          <div
            ref={skillsExitArchRef}
            className="chapter-arch-wipe chapter-arch-wipe--paper-top"
            aria-hidden="true"
          />
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
