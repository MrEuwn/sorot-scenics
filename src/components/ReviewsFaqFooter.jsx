import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import {
  CLIENT_REVIEWS,
  DISCIPLINES,
  FAQ_ITEMS,
  STUDIO_LOCATIONS,
} from '../data/sorotData';

export default function ReviewsFaqFooter({ onOpenBrief }) {
  const carouselRef = useRef(null);
  const [openFaqId, setOpenFaqId] = useState(FAQ_ITEMS[0].id);

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.82, 420);
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <>
      <div className="chapter-solid-light section-light" data-chapter-polarity="light">
        {/* Director Reviews Horizontal Carousel */}
        <section id="reviews" className="reviews-section">
          <div className="container">
            <div className="reviews-head">
              <div>
                <span className="eyebrow section-head__eyebrow">
                  <span className="eyebrow-dot" />
                  SHOW DIRECTOR PERSPECTIVES
                </span>
                <h2 className="display-section reviews-head__title">
                  <span>TRUSTED ON</span>
                  <span className="text-vermilion">LIVE CUE.</span>
                </h2>
              </div>

              <div className="reviews-controls">
                <button
                  type="button"
                  className="reviews-nav-btn"
                  aria-label="Scroll reviews left"
                  onClick={() => scrollCarousel(-1)}
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="reviews-nav-btn"
                  aria-label="Scroll reviews right"
                  onClick={() => scrollCarousel(1)}
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              ref={carouselRef}
              className="reviews-track"
              tabIndex={0}
              aria-label="Client reviews carousel"
            >
              {CLIENT_REVIEWS.map((review) => (
                <article key={review.id} className="review-card">
                  <div className="review-card__author">
                    <span className="review-card__monogram mono-meta" aria-hidden="true">
                      {review.initials}
                    </span>
                    <div>
                      <strong className="review-card__name">{review.name}</strong>
                      <div className="review-card__role">{review.role}</div>
                    </div>
                  </div>

                  <blockquote className="review-card__quote">“{review.quote}”</blockquote>

                  <div className="review-card__project mono-meta">{review.project}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Narrow Editorial FAQ Accordion (Font-Inherited) */}
        <section id="faq" className="faq-section">
          <div className="container faq-container">
            <div className="faq-head">
              <span className="eyebrow section-head__eyebrow">
                <span className="eyebrow-dot" />
                PRODUCTION SPECIFICATION FAQ
              </span>
              <h2 className="display-section faq-head__title">
                TECHNICAL <span className="text-vermilion">ANSWERS.</span>
              </h2>
            </div>

            <div className="faq-list">
              {FAQ_ITEMS.map((item) => {
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
                        <span className="faq-item__question">{item.question}</span>
                        <span className="faq-item__icon" aria-hidden="true">
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </span>
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={`panel-${item.id}`}
                        className="faq-item__panel"
                        role="region"
                      >
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      {/* Closing Monolith Signal Vermilion CTA & High-Contrast Frosted Glass Footer */}
      <footer
        id="footer"
        className="chapter-footer monolith-footer"
        data-chapter-polarity="vermilion"
      >
        <div className="container monolith-footer__inner">
          <div className="monolith-footer__cta">
            <span className="eyebrow monolith-footer__eyebrow">
              <span className="eyebrow-dot" />
              2026 / 2027 BOOKING WINDOW OPEN
            </span>
            <h2 className="display-monumental monolith-footer__headline">
              <span className="monolith-footer__line-light">READY TO SHAPE</span>
              <span className="monolith-footer__line-dark">YOUR NEXT STAGE?</span>
            </h2>

            <button
              type="button"
              className="split-pill split-pill--light"
              onClick={onOpenBrief}
            >
              <span className="split-pill__icon" aria-hidden="true">
                <ChevronRight size={20} strokeWidth={2.4} />
              </span>
              <span className="split-pill__label">Start a Cue Brief</span>
            </button>
          </div>

          {/* High-Contrast Calibrated Frosted Glass Footer Card */}
          <div className="glass-footer-card">
            <div className="glass-footer-card__grid">
              <div className="glass-footer-card__brand">
                <a href="#hero-stage" className="glass-footer-card__wordmark">
                  SOROT®
                </a>
                <p className="glass-footer-card__tagline">
                  Kinetic stage scenography, beveled Fresnel optics, and live broadcast direction
                  engineered to the millisecond.
                </p>
                <div className="glass-footer-card__certs">
                  <span className="glass-footer-card__cert-badge mono-meta">TUV BGV-C1</span>
                  <span className="glass-footer-card__cert-badge mono-meta">SMPTE 12M</span>
                  <span className="glass-footer-card__cert-badge mono-meta">ECO-LED</span>
                </div>
              </div>

              <div className="glass-footer-card__col">
                <h3 className="mono-meta glass-footer-card__col-title">EXPLORE</h3>
                <ul className="glass-footer-card__links">
                  <li>
                    <a href="#hero-stage">Stage Optics</a>
                  </li>
                  <li>
                    <a href="#works">Selected Works</a>
                  </li>
                  <li>
                    <a href="#method">Telemetry Proof</a>
                  </li>
                  <li>
                    <a href="#standards">Live Standards</a>
                  </li>
                  <li>
                    <a href="#reviews">Director Reviews</a>
                  </li>
                  <li>
                    <a href="#faq">Spec FAQ</a>
                  </li>
                </ul>
              </div>

              <div className="glass-footer-card__col">
                <h3 className="mono-meta glass-footer-card__col-title">DISCIPLINES</h3>
                <ul className="glass-footer-card__links">
                  {DISCIPLINES.map((d) => (
                    <li key={d.id}>
                      <a href="#disciplines">{d.title}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="glass-footer-card__col">
                <h3 className="mono-meta glass-footer-card__col-title">LOCATIONS</h3>
                <p className="glass-footer-card__cities">
                  {STUDIO_LOCATIONS.join(' · ')}
                </p>
                <div className="glass-footer-card__contact">
                  <a href="mailto:cuesheet@sorot.studio">cuesheet@sorot.studio</a>
                  <span className="mono-meta">+62 21 5098 4410 · JKT HUB</span>
                </div>
              </div>
            </div>

            <div className="glass-footer-card__bottom">
              <span className="mono-meta">© 2026 SOROT SCENICS STUDIO</span>
              <div className="glass-footer-card__legal">
                <a href="#standards">Safety & Rigging Compliance</a>
                <a href="#faq">Production Terms</a>
                <button type="button" className="glass-footer-card__text-btn" onClick={onOpenBrief}>
                  Book Pre-Vis Session
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
