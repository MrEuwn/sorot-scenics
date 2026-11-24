import { useEffect, useRef } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { DISCIPLINES, STUDIO_LOCATIONS, UI_COPY } from '../data/sorotData';
import './AdaptiveHeader.css';

const PRIMARY_NAV = [
  { href: '#hero-stage', en: 'Home', id: 'Beranda' },
  { href: '#works', en: 'Productions', id: 'Produksi' },
  { href: '#spotlight', en: 'About Studio', id: 'Tentang Studio' },
  { href: '#method', en: 'Our Method', id: 'Metode Kami' },
  { href: '#resources', en: 'Field Notes', id: 'Catatan Riset' },
  { href: '#standards', en: 'Live Standards', id: 'Standar Live' },
  { href: '#footer', en: 'Contact', id: 'Kontak' },
];

export default function AdaptiveHeader({
  polarity,
  isScrolled,
  lang = 'en',
  onChangeLang,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  onOpenBrief,
}) {
  const closeBtnRef = useRef(null);
  const copy = UI_COPY[lang] || UI_COPY.en;

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
            aria-label="SOROT Scenics Home"
            onClick={onCloseMenu}
          >
            <span className="adaptive-header__brand-stack">
              <span className="adaptive-header__brand-top">
                sor
                <span className="adaptive-header__prism-o">
                  o
                  <svg viewBox="0 0 10 10" width="7" height="7" aria-hidden="true" data-art="logo">
                    <polygon points="0,0 10,5 0,10" fill="currentColor" />
                  </svg>
                </span>
                t
              </span>
              <span className="adaptive-header__brand-bot">scenics®</span>
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
            <span>{menuOpen ? copy.closeBtn : copy.menuBtn}</span>
          </button>

          <button
            type="button"
            className="adaptive-header__cta-pill"
            onClick={onOpenBrief}
          >
            {copy.ctaTop}
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

          {/* Floating White Rounded Bento Menu Sheet (Exact menu-1440.png architecture!) */}
          <div className="bento-menu__sheet">
            <div className="bento-menu__topbar">
              <span className="bento-menu__brand-label">sorot scenics®</span>

              <div className="bento-menu__topbar-actions">
                <div className="bento-menu__lang-switch" role="group" aria-label="Language switch">
                  <button
                    type="button"
                    className={`bento-menu__lang-btn ${lang === 'en' ? 'is-active' : ''}`}
                    onClick={() => onChangeLang?.('en')}
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    className={`bento-menu__lang-btn ${lang === 'id' ? 'is-active' : ''}`}
                    onClick={() => onChangeLang?.('id')}
                  >
                    ID
                  </button>
                </div>

                <button
                  ref={closeBtnRef}
                  type="button"
                  className="bento-menu__close"
                  onClick={onCloseMenu}
                  aria-label="Close navigation menu"
                >
                  <X size={16} aria-hidden="true" />
                  <span>{copy.closeBtn}</span>
                </button>
              </div>
            </div>

            <div className="bento-menu__columns">
              {/* Col 1: Primary Navigation */}
              <nav className="bento-menu__col" aria-label="Site chapters">
                <span className="bento-menu__eyebrow">EXPLORE</span>
                <ul className="bento-menu__primary-list">
                  {PRIMARY_NAV.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} onClick={onCloseMenu}>
                        {lang === 'id' ? item.id : item.en}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="bento-menu__cities">{STUDIO_LOCATIONS.join(', ')}</p>
              </nav>

              {/* Col 2: Disciplines */}
              <div className="bento-menu__col">
                <span className="bento-menu__eyebrow">{copy.expertisesEyebrow}</span>
                <ul className="bento-menu__sub-list">
                  {DISCIPLINES.map((d) => (
                    <li key={d.id}>
                      <a href="#disciplines" onClick={onCloseMenu}>
                        {lang === 'id' ? d.titleId : d.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="bento-menu__quote-btn"
                  onClick={() => {
                    onCloseMenu();
                    onOpenBrief();
                  }}
                >
                  {copy.ctaTop}
                </button>
              </div>

              {/* Col 3: 2x2 Bento Visual Widgets (Exact menu-1440.png widget structure!) */}
              <div className="bento-menu__widgets">
                <a
                  href="#vr-portal"
                  className="bento-widget bento-widget--wide"
                  onClick={onCloseMenu}
                >
                  <img
                    src="./media/foh-grandma.jpg"
                    alt="Interactive 3D DMX pre-visualization console"
                    loading="lazy"
                  />
                  <div className="bento-widget__scrim" />
                  <div className="bento-widget__center">
                    <strong className="display-section bento-widget__hero-title">
                      INTERACTIVE 3D PRE-VIS
                    </strong>
                    <span className="bento-widget__discover-pill">
                      <span className="bento-widget__discover-dot">
                        <ChevronRight size={14} />
                      </span>
                      <span>Discover</span>
                    </span>
                  </div>
                </a>

                <a
                  href="#resources"
                  className="bento-widget bento-widget--paper"
                  onClick={onCloseMenu}
                >
                  <span className="bento-widget__tag">White Paper</span>
                  <strong className="display-section bento-widget__paper-title">
                    25KHZ BROADCAST OPTICS GUIDE
                  </strong>
                  <span className="bento-widget__meta">Read dossier →</span>
                </a>

                <a
                  href="#works"
                  className="bento-widget bento-widget--dark"
                  onClick={onCloseMenu}
                >
                  <img
                    src="./media/concert-crowd.jpg"
                    alt="Istora Symphony Arena stage production"
                    loading="lazy"
                  />
                  <div className="bento-widget__scrim" />
                  <span className="bento-widget__tag bento-widget__tag--light">Case Study</span>
                  <strong className="display-section bento-widget__dark-title">
                    ISTORA 16T ARENA RIG
                  </strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
