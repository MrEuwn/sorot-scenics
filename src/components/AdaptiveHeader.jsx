import { useEffect, useRef } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { STAGE_WORKS, STUDIO_LOCATIONS } from '../data/sorotData';
import './AdaptiveHeader.css';

const NAV_ROUTES = [
  { href: '#hero-stage', label: 'STAGE OPTICS', meta: '00' },
  { href: '#works', label: 'SELECTED WORKS', meta: '01' },
  { href: '#method', label: 'PRODUCTION PROOF', meta: '02' },
  { href: '#disciplines', label: 'DISCIPLINES', meta: '03' },
  { href: '#standards', label: 'LIVE STANDARDS', meta: '04' },
  { href: '#reviews', label: 'DIRECTOR REVIEWS', meta: '05' },
  { href: '#faq', label: 'SPEC FAQ', meta: '06' },
];

export default function AdaptiveHeader({
  polarity,
  isScrolled,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onOpenBrief,
}) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onCloseMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen, onCloseMenu]);

  const spotlightWorks = STAGE_WORKS.slice(0, 3);

  return (
    <>
      <header
        className={`adaptive-header adaptive-header--${polarity} ${
          isScrolled ? 'adaptive-header--scrolled' : ''
        }`}
      >
        <div className="adaptive-header__inner">
          <a
            href="#hero-stage"
            className="adaptive-header__brand"
            aria-label="SOROT Home"
            onClick={onCloseMenu}
          >
            <span className="adaptive-header__brand-mark">SOROT</span>
            <span className="adaptive-header__brand-reg" aria-hidden="true">
              ®
            </span>
          </a>

          <button
            type="button"
            className="adaptive-header__menu-pill"
            aria-expanded={menuOpen}
            aria-controls="sorot-bento-menu"
            onClick={onToggleMenu}
          >
            <span className="adaptive-header__dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>

          <button
            type="button"
            className="adaptive-header__cta-pill"
            onClick={onOpenBrief}
          >
            Book Production
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="sorot-bento-menu"
          className="bento-menu"
          role="dialog"
          aria-modal="true"
          aria-label="SOROT Primary Navigation"
        >
          <div className="bento-menu__backdrop" onClick={onCloseMenu} />
          <div className="bento-menu__sheet">
            <div className="bento-menu__topbar">
              <div className="bento-menu__identity">
                <span className="adaptive-header__brand-mark">SOROT®</span>
                <span className="mono-meta bento-menu__sub">
                  KINETIC SCENOGRAPHY · LIVE BROADCAST OPTICS
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                className="bento-menu__close"
                onClick={onCloseMenu}
                aria-label="Close navigation menu"
              >
                <X size={18} aria-hidden="true" />
                <span>Close</span>
              </button>
            </div>

            <div className="bento-menu__grid">
              <nav className="bento-menu__nav" aria-label="Site chapters">
                <span className="eyebrow bento-menu__eyebrow">
                  <span className="eyebrow-dot" />
                  DIRECTORY
                </span>
                <ul className="bento-menu__list">
                  {NAV_ROUTES.map((route) => (
                    <li key={route.href}>
                      <a
                        href={route.href}
                        className="bento-menu__link"
                        onClick={onCloseMenu}
                      >
                        <span className="mono-meta bento-menu__index">{route.meta}</span>
                        <span className="display-section bento-menu__label">
                          {route.label}
                        </span>
                        <ArrowUpRight size={22} className="bento-menu__arrow" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="bento-menu__footer-bar">
                  <div className="mono-meta bento-menu__cities">
                    {STUDIO_LOCATIONS.join(' · ')}
                  </div>
                  <button
                    type="button"
                    className="bento-menu__brief-btn"
                    onClick={() => {
                      onCloseMenu();
                      onOpenBrief();
                    }}
                  >
                    Request Cue Sheet
                  </button>
                </div>
              </nav>

              <div className="bento-menu__spotlights">
                <span className="eyebrow bento-menu__eyebrow">
                  <span className="eyebrow-dot" />
                  LIVE RIG SPOTLIGHTS
                </span>
                <div className="bento-menu__cards">
                  {spotlightWorks.map((work, i) => (
                    <a
                      key={work.id}
                      href="#works"
                      className={`bento-menu__card ${i === 0 ? 'bento-menu__card--lead' : ''}`}
                      onClick={onCloseMenu}
                    >
                      <img src={work.image} alt={work.alt} loading="lazy" />
                      <div className="bento-menu__card-scrim" />
                      <div className="bento-menu__card-content">
                        <span className="mono-meta bento-menu__card-tag">
                          {work.dmx} · {work.lumens}
                        </span>
                        <strong className="display-section bento-menu__card-title">
                          {work.title}
                        </strong>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
