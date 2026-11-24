import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { LIGHTING_CUES } from './data/sorotData';
import PrismLoader from './components/PrismLoader';
import FresnelStageCanvas from './components/FresnelStageCanvas';
import AdaptiveHeader from './components/AdaptiveHeader';
import LiveCueWidget from './components/LiveCueWidget';
import HeroStage from './components/HeroStage';
import WorksAndMethod from './components/WorksAndMethod';
import DisciplinesStandards from './components/DisciplinesStandards';
import ReviewsFaqFooter from './components/ReviewsFaqFooter';
import BriefModal from './components/BriefModal';

export default function App() {
  const [activeCueId, setActiveCueId] = useState(LIGHTING_CUES[0].id);
  const [lang, setLang] = useState('en');
  const [headerPolarity, setHeaderPolarity] = useState('vermilion');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);

  const activeCue = LIGHTING_CUES.find((c) => c.id === activeCueId) || LIGHTING_CUES[0];

  // Lenis smooth inertia scroll matching laboiteaslides.fr feel
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Mutate Hero CSS custom properties live when active cue switches
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--hero-bg', activeCue.heroBg);
    root.style.setProperty('--hero-ink', activeCue.heroInk);
    root.style.setProperty('--hero-secondary-ink', activeCue.heroSecondaryInk);

    if (window.scrollY < window.innerHeight * 0.45) {
      setHeaderPolarity(activeCue.polarity);
    }
  }, [activeCue]);

  // Multi-chapter header polarity tracking (including rising white arch inside Hero!)
  useEffect(() => {
    const computePolarity = () => {
      const y = window.scrollY;
      const vh = window.innerHeight || 900;
      setIsScrolled(y > 36);

      const heroEl = document.getElementById('hero-stage');
      if (heroEl) {
        const hr = heroEl.getBoundingClientRect();
        if (hr.bottom > 80) {
          const heroProg = Math.max(0, -hr.top / Math.max(1, hr.height - vh));
          setHeaderPolarity(heroProg > 0.84 ? 'light' : activeCue.polarity);
          return;
        }
      }

      const vrEl = document.getElementById('vr-portal');
      if (vrEl) {
        const vr = vrEl.getBoundingClientRect();
        if (vr.top <= 64 && vr.bottom >= 64) {
          const vp = Math.max(0, -vr.top / Math.max(1, vr.height - vh));
          if (vp > 0.22 && vp < 0.97) {
            setHeaderPolarity('dark');
            return;
          }
        }
      }

      const chapters = Array.from(document.querySelectorAll('[data-chapter-polarity]'));
      const probeY = 64;
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = chapters[i];
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          const next = el.getAttribute('data-chapter-polarity');
          if (next) setHeaderPolarity(next);
          return;
        }
      }
    };

    window.addEventListener('scroll', computePolarity, { passive: true });
    window.addEventListener('resize', computePolarity, { passive: true });
    computePolarity();

    return () => {
      window.removeEventListener('scroll', computePolarity);
      window.removeEventListener('resize', computePolarity);
    };
  }, [activeCue.polarity]);

  return (
    <div className="sorot-app" data-active-cue={activeCue.id}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Act 0: Fast Geometric Bowtie Prism Preloader */}
      <PrismLoader />

      {/* Single Shared Three.js WebGL2 Refractive Prism & Beam Canvas */}
      <FresnelStageCanvas activeCueId={activeCue.id} lang={lang} />

      <AdaptiveHeader
        polarity={headerPolarity}
        isScrolled={isScrolled}
        lang={lang}
        onChangeLang={setLang}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenBrief={() => setBriefOpen(true)}
      />

      <main id="main-content">
        <HeroStage activeCue={activeCue} lang={lang} onOpenBrief={() => setBriefOpen(true)} />
        <WorksAndMethod lang={lang} onOpenBrief={() => setBriefOpen(true)} />
        <DisciplinesStandards lang={lang} onOpenBrief={() => setBriefOpen(true)} />
        <ReviewsFaqFooter
          lang={lang}
          onChangeLang={setLang}
          onOpenBrief={() => setBriefOpen(true)}
        />
      </main>

      <LiveCueWidget
        activeCueId={activeCue.id}
        onSelectCue={setActiveCueId}
        onOpenBrief={() => setBriefOpen(true)}
      />

      <BriefModal
        open={briefOpen}
        activeCue={activeCue}
        onClose={() => setBriefOpen(false)}
      />
    </div>
  );
}
