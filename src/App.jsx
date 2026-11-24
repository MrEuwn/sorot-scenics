import { useEffect, useState } from 'react';
import { LIGHTING_CUES } from './data/sorotData';
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
  const [headerPolarity, setHeaderPolarity] = useState('vermilion');
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [briefOpen, setBriefOpen] = useState(false);

  const activeCue = LIGHTING_CUES.find((c) => c.id === activeCueId) || LIGHTING_CUES[0];

  // Live mutate Hero CSS custom properties when cue switches
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--hero-bg', activeCue.heroBg);
    root.style.setProperty('--hero-ink', activeCue.heroInk);
    root.style.setProperty('--hero-secondary-ink', activeCue.heroSecondaryInk);

    // If user is currently at the top Hero chapter, sync header polarity immediately
    if (window.scrollY < window.innerHeight * 0.65) {
      setHeaderPolarity(activeCue.polarity);
    }
  }, [activeCue]);

  // IntersectionObserver multi-chapter header polarity tracking + scroll backdrop detection
  useEffect(() => {
    const chapters = Array.from(document.querySelectorAll('[data-chapter-polarity]'));

    const computePolarity = () => {
      const y = window.scrollY;
      setIsScrolled(y > 36);

      const probeY = 64;
      for (const el of chapters) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          const next = el.getAttribute('data-chapter-polarity');
          if (next) setHeaderPolarity(next);
          return;
        }
      }
    };

    const observer = new IntersectionObserver(
      () => {
        computePolarity();
      },
      {
        rootMargin: '-60px 0px -85% 0px',
        threshold: [0, 0.1, 0.5],
      }
    );

    chapters.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', computePolarity, { passive: true });
    computePolarity();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', computePolarity);
    };
  }, [activeCue.polarity]);

  return (
    <div className="sorot-app" data-active-cue={activeCue.id}>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Single Shared Three.js WebGL2 Architectural Fresnel Glass Prism Canvas */}
      <FresnelStageCanvas activeCueId={activeCue.id} />

      <AdaptiveHeader
        polarity={headerPolarity}
        isScrolled={isScrolled}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={() => setMenuOpen(false)}
        onOpenBrief={() => setBriefOpen(true)}
      />

      <main id="main-content">
        <HeroStage activeCue={activeCue} onOpenBrief={() => setBriefOpen(true)} />
        <WorksAndMethod onOpenBrief={() => setBriefOpen(true)} />
        <DisciplinesStandards onOpenBrief={() => setBriefOpen(true)} />
        <ReviewsFaqFooter onOpenBrief={() => setBriefOpen(true)} />
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
