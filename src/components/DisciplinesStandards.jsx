import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DISCIPLINES, STANDARDS_CARDS } from '../data/sorotData';

export default function DisciplinesStandards({ onOpenBrief }) {
  const [activeDisciplineId, setActiveDisciplineId] = useState(DISCIPLINES[0].id);

  const activeDiscipline =
    DISCIPLINES.find((d) => d.id === activeDisciplineId) || DISCIPLINES[0];

  return (
    <>
      {/* Monumental Disciplines Hover Index (#F6F5F0 Chalk Paper) */}
      <section
        id="disciplines"
        className="chapter-solid-light section-light disciplines-section"
        data-chapter-polarity="light"
      >
        <div className="container">
          <div className="disciplines-layout">
            <div className="disciplines-list-col">
              <span className="eyebrow section-head__eyebrow">
                <span className="eyebrow-dot" />
                OUR DISCIPLINES
              </span>

              <div className="disciplines-index" role="list">
                {DISCIPLINES.map((item) => {
                  const isActive = item.id === activeDiscipline.id;
                  return (
                    <div
                      key={item.id}
                      role="listitem"
                      className={`discipline-row ${isActive ? 'discipline-row--active' : ''}`}
                    >
                      <button
                        type="button"
                        className="discipline-row__btn"
                        aria-expanded={isActive}
                        onMouseEnter={() => setActiveDisciplineId(item.id)}
                        onFocus={() => setActiveDisciplineId(item.id)}
                        onClick={() => setActiveDisciplineId(item.id)}
                      >
                        <span className="mono-meta discipline-row__index">{item.index}</span>
                        <span className="display-section discipline-row__title">
                          {item.title}
                        </span>
                        <ArrowUpRight
                          size={28}
                          className="discipline-row__arrow"
                          aria-hidden="true"
                        />
                      </button>

                      {/* Clean mobile tap-preview fallback */}
                      <div className="discipline-row__mobile-preview">
                        <div className="discipline-row__mobile-img">
                          <img src={item.image} alt={item.alt} loading="lazy" />
                        </div>
                        <span className="mono-meta discipline-row__spec">{item.spec}</span>
                        <p className="discipline-row__summary">{item.summary}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sticky Desktop Floating Preview Plate */}
            <div className="disciplines-preview-col" aria-live="polite">
              <div className="discipline-plate">
                <div className="discipline-plate__image">
                  <img
                    key={activeDiscipline.id}
                    src={activeDiscipline.image}
                    alt={activeDiscipline.alt}
                  />
                  <span className="discipline-plate__badge mono-meta">
                    {activeDiscipline.spec}
                  </span>
                </div>
                <div className="discipline-plate__body">
                  <span className="mono-meta discipline-plate__code">
                    DISCIPLINE // {activeDiscipline.index}
                  </span>
                  <h3 className="display-section discipline-plate__title">
                    {activeDiscipline.title}
                  </h3>
                  <p className="discipline-plate__summary">{activeDiscipline.summary}</p>
                  <button
                    type="button"
                    className="discipline-plate__cta"
                    onClick={onOpenBrief}
                  >
                    Spec this discipline
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Carbon Obsidian Standards Glass Wall (#111214) */}
      <section
        id="standards"
        className="chapter-solid-dark standards-section"
        data-chapter-polarity="dark"
      >
        <div className="standards-section__ambient" aria-hidden="true" />
        <div className="container standards-section__inner">
          <div className="standards-section__head">
            <span className="eyebrow standards-section__eyebrow">
              <span className="eyebrow-dot" />
              CERTIFIED STAGE ENGINEERING
            </span>
            <h2 className="display-monumental standards-section__display">
              <span className="standards-section__line-white">BUILT FOR</span>
              <span className="standards-section__line-vermilion">LIVE PRECISION</span>
            </h2>
          </div>

          <div className="standards-cards">
            {STANDARDS_CARDS.map((card, index) => (
              <article
                key={card.code}
                className={`standard-glass-card standard-glass-card--${index + 1}`}
              >
                <div className="standard-glass-card__top">
                  <span className="mono-meta standard-glass-card__code">{card.code}</span>
                  <span className="mono-meta standard-glass-card__metric">{card.metric}</span>
                </div>
                <h3 className="display-section standard-glass-card__title">{card.title}</h3>
                <p className="standard-glass-card__desc">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
