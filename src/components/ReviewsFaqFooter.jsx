import { useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import {
  CLIENT_REVIEWS,
  DISCIPLINES,
  FAQ_ITEMS,
  STAGE_WORKS,
  STUDIO_LOCATIONS,
  UI_COPY,
} from '../data/sorotData';

export default function ReviewsFaqFooter({ lang = 'en', onChangeLang, onOpenBrief }) {
  const carouselRef = useRef(null);
  const [openFaqId, setOpenFaqId] = useState(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const copy = UI_COPY[lang] || UI_COPY.en;
  const visibleFaqs = showAllFaq ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 6);

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.78, 380);
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <>
      <div className="chapter-solid-light section-light" data-chapter-polarity="light">
        {/* ACT 11A: DIRECTOR REVIEWS HORIZONTAL TONAL GLASS CAROUSEL (low-1440.png twin!) */}
        <section id="reviews" className="reviews-section">
          <div className="container">
            <div className="reviews-head">
              <h2 className="display-section reviews-head__title">
                <span>{copy.reviewsTop}</span>
                <span className="text-vermilion">{copy.reviewsAccent}</span>
              </h2>

              <div className="reviews-controls">
                <button
                  type="button"
                  className="reviews-nav-btn"
                  aria-label="Previous review slide"
                  onClick={() => scrollCarousel(-1)}
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="reviews-nav-btn"
                  aria-label="Next review slide"
                  onClick={() => scrollCarousel(1)}
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="reviews-track"
              tabIndex={0}
              aria-label="Show director reviews"
            >
              {CLIENT_REVIEWS.map((review) => (
                <article key={review.id} className="review-card">
                  <header className="review-card__author">
                    <span
                      className="review-card__badge"
                      style={{ backgroundColor: review.badgeBg }}
                      aria-hidden="true"
                    >
                      {review.badge}
                    </span>
                    <div>
                      <h3 className="review-card__name">{review.name}</h3>
                      <p className="review-card__role">{review.role}</p>
                    </div>
                  </header>

                  <blockquote className="review-card__quote">“{review.quote}”</blockquote>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ACT 11B: NARROW 760PX EDITORIAL FAQ ACCORDION (s11-faq.jpg twin!) */}
        <section id="faq" className="faq-section">
          <div className="container faq-container">
            <div className="faq-head">
              <span className="faq-eyebrow">{copy.faqEyebrow}</span>
              <h2 className="display-section faq-head__title">
                <span>{copy.faqTop}</span>
                <span className="text-vermilion">{copy.faqAccent}</span>
              </h2>
            </div>

            <div className="faq-list">
              {visibleFaqs.map((item) => {
                const isOpen = openFaqId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
                  >
                    <h3 className="faq-item__heading">
                      <button
                        type="button"
                        className="faq-item__trigger"
                        aria-expanded={isOpen}
                        aria-controls={`panel-${item.id}`}
                        onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                        data-faq-btn={item.id}
                      >
                        <span className="faq-item__question">
                          {lang === 'id' ? item.questionId : item.question}
                        </span>
                        <span className="faq-item__icon" aria-hidden="true">
                          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div id={`panel-${item.id}`} className="faq-item__panel" role="region">
                        <p>{lang === 'id' ? item.answerId : item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="faq-more-wrap">
              <button
                type="button"
                className="split-pill split-pill--tonal"
                onClick={() => setShowAllFaq((prev) => !prev)}
              >
                <span className="split-pill__icon" aria-hidden="true">
                  <ChevronDown
                    size={17}
                    style={{
                      transform: showAllFaq ? 'rotate(180deg)' : 'none',
                      transition: 'transform 220ms ease',
                    }}
                  />
                </span>
                <span className="split-pill__label">
                  {showAllFaq ? copy.faqLess : copy.faqMore}
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ACT 12: SIGNAL VERMILION MONOLITH CTA + CANTILEVERED 3D GLASS + FROSTED FOOTER SHEET (footer-1440.png twin!) */}
      <footer
        id="footer"
        className="chapter-footer monolith-footer"
        data-chapter-polarity="vermilion"
      >
        <div className="container monolith-footer__inner">
          <div className="monolith-footer__cta">
            <h2 className="display-monumental monolith-footer__headline">
              <span className="monolith-footer__line-light">{copy.footerTop}</span>
              <span className="monolith-footer__line-mixed">
                <span className="monolith-footer__line-light">{copy.footerBotWhite}</span>
                <span className="monolith-footer__line-dark">{copy.footerBotDark}</span>
              </span>
            </h2>

            <button
              type="button"
              className="split-pill split-pill--light"
              onClick={onOpenBrief}
            >
              <span className="split-pill__icon" aria-hidden="true">
                <ChevronRight size={19} strokeWidth={2.3} />
              </span>
              <span className="split-pill__label">{copy.footerCta}</span>
            </button>
          </div>

          <div className="glass-footer-card">
            <div className="glass-footer-card__grid">
              <div className="glass-footer-card__brand">
                <a href="#hero-stage" className="glass-footer-card__wordmark">
                  <span>sorot</span>
                  <span>scenics®</span>
                </a>

                <div className="footer-lang-switch" role="group" aria-label="Footer language switch">
                  <button
                    type="button"
                    className={`footer-lang-pill ${lang === 'en' ? 'is-active' : ''}`}
                    onClick={() => onChangeLang?.('en')}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    className={`footer-lang-pill ${lang === 'id' ? 'is-active' : ''}`}
                    onClick={() => onChangeLang?.('id')}
                  >
                    ID
                  </button>
                </div>

                <p className="glass-footer-card__cities">
                  {STUDIO_LOCATIONS.join(', ')}
                </p>

                <div className="glass-footer-card__emblems">
                  <span className="footer-emblem">
                    <strong>TUV</strong>
                    <small>BGV-C1:2026</small>
                  </span>
                  <span className="footer-emblem">
                    <strong>MA3</strong>
                    <small>SMPTE Fiber</small>
                  </span>
                  <span className="footer-emblem">
                    <strong>5.0 ★</strong>
                    <small>Show Rating</small>
                  </span>
                </div>
              </div>

              <div className="glass-footer-card__col">
                <h3 className="glass-footer-card__col-title">EXPLORE</h3>
                <ul className="glass-footer-card__links glass-footer-card__links--large">
                  <li>
                    <a href="#hero-stage">Home</a>
                  </li>
                  <li>
                    <a href="#works">Productions</a>
                  </li>
                  <li>
                    <a href="#spotlight">About Studio</a>
                  </li>
                  <li>
                    <a href="#method">Our Method</a>
                  </li>
                  <li>
                    <a href="#resources">Field Notes</a>
                  </li>
                  <li>
                    <a href="#footer">Contact</a>
                  </li>
                </ul>
              </div>

              <div className="glass-footer-card__col">
                <h3 className="glass-footer-card__col-title">DISCIPLINES</h3>
                <ul className="glass-footer-card__links">
                  {DISCIPLINES.map((d) => (
                    <li key={d.id}>
                      <a href="#disciplines">{lang === 'id' ? d.titleId : d.title}</a>
                    </li>
                  ))}
                  <li>
                    <a href="#vr-portal">3D Pre-Vis Twin</a>
                  </li>
                  <li>
                    <a href="#standards">Safety Engineering</a>
                  </li>
                </ul>
              </div>

              <div className="glass-footer-card__col">
                <h3 className="glass-footer-card__col-title">STAGE FORMATS</h3>
                <ul className="glass-footer-card__links">
                  {STAGE_WORKS.slice(0, 7).map((w) => (
                    <li key={w.id}>
                      <a href="#works">{w.tag} Scenography</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="glass-footer-card__bottom">
              <span>©2026 SOROT Scenics Studio</span>

              <div className="glass-footer-card__socials">
                <a href="#footer" aria-label="SOROT LinkedIn">
                  in
                </a>
                <a href="#footer" aria-label="SOROT Showreel">
                  ▶
                </a>
              </div>

              <div className="glass-footer-card__legal">
                <a href="#standards">Rigging Safety</a>
                <a href="#faq">Confidentiality</a>
                <button type="button" className="glass-footer-card__text-btn" onClick={onOpenBrief}>
                  Cue Sheet Brief
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
