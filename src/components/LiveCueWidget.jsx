import { useEffect, useState } from 'react';
import { Plus, Radio, Sliders, X } from 'lucide-react';
import { LIGHTING_CUES } from '../data/sorotData';
import './LiveCueWidget.css';

function formatTimecode(baseStr, frameOffset) {
  const parts = baseStr.split(':').map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return baseStr;
  let [hh, mm, ss, ff] = parts;
  const totalFrames = ff + frameOffset;
  ff = totalFrames % 30;
  const addSec = Math.floor(totalFrames / 30);
  const totalSec = ss + addSec;
  ss = totalSec % 60;
  const addMin = Math.floor(totalSec / 60);
  mm = (mm + addMin) % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

export default function LiveCueWidget({ activeCueId, onSelectCue, onOpenBrief }) {
  const [frameTick, setFrameTick] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [manualExpanded, setManualExpanded] = useState(false);

  const activeCue = LIGHTING_CUES.find((c) => c.id === activeCueId) || LIGHTING_CUES[0];
  const isCompact = scrolledPastHero && !manualExpanded;

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.62;
      setScrolledPastHero(past);
      if (!past) setManualExpanded(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;
    const timer = window.setInterval(() => {
      setFrameTick((prev) => (prev + 3) % 900);
    }, 100);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const liveTimecode = formatTimecode(activeCue.timecodeStart, frameTick);

  return (
    <>
      <aside
        className={`live-cue-dock ${isCompact ? 'live-cue-dock--compact' : ''}`}
        aria-label="Live Lighting Cue Console"
        data-active-cue={activeCue.id}
      >
        {isCompact ? (
          <button
            type="button"
            className="live-cue-compact-pill"
            onClick={() => setManualExpanded(true)}
            aria-label={`Expand Live Lighting Cue Console, active cue ${activeCue.code} ${activeCue.shortName}`}
          >
            <span className="live-cue-widget__live-pill mono-meta">
              <Radio size={11} aria-hidden="true" />
              <span>DMX</span>
            </span>
            <span className="mono-meta live-cue-compact-pill__label">
              {activeCue.code} {activeCue.shortName}
            </span>
            <span
              className="cue-switch__led"
              style={{ '--led-color': activeCue.accentHex, background: activeCue.accentHex }}
              aria-hidden="true"
            />
          </button>
        ) : (
        <div className="live-cue-widget">
          <div className="live-cue-widget__header">
            <span className="live-cue-widget__live-pill mono-meta">
              <Radio size={11} aria-hidden="true" />
              <span>DMX LIVE</span>
            </span>
            <span className="live-cue-widget__tc mono-meta" aria-live="off">
              TC {liveTimecode}
            </span>
            {scrolledPastHero && (
              <button
                type="button"
                className="live-cue-widget__min-btn"
                onClick={() => setManualExpanded(false)}
                aria-label="Minimize cue console"
              >
                <X size={13} aria-hidden="true" />
              </button>
            )}
          </div>

          <div
            className={`live-cue-widget__stage live-cue-widget__stage--${activeCue.id}`}
            aria-hidden="true"
          >
            <div className="live-cue-widget__beam live-cue-widget__beam--a" />
            <div className="live-cue-widget__beam live-cue-widget__beam--b" />
            <div className="live-cue-widget__beam live-cue-widget__beam--c" />
            <div className="live-cue-widget__prism-wire" />
            <div className="live-cue-widget__stage-caption">
              <span className="mono-meta">{activeCue.lumens}</span>
              <span className="mono-meta">{activeCue.rigLoad}</span>
            </div>
          </div>

          <div
            className="live-cue-widget__switches"
            role="group"
            aria-label="Select active stage lighting cue"
          >
            {LIGHTING_CUES.map((cue) => {
              const isSelected = cue.id === activeCue.id;
              return (
                <button
                  key={cue.id}
                  type="button"
                  className={`cue-switch ${isSelected ? 'cue-switch--active' : ''}`}
                  aria-pressed={isSelected}
                  onClick={() => onSelectCue(cue.id)}
                  data-cue-btn={cue.id}
                >
                  <span className="cue-switch__code mono-meta">{cue.code}</span>
                  <span className="cue-switch__name">{cue.name}</span>
                  <span
                    className="cue-switch__led"
                    style={{ '--led-color': cue.accentHex }}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </div>
        )}

        <button
          type="button"
          className="live-cue-dock__expand"
          aria-label="Open live cue rig specification drawer"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          {drawerOpen ? <X size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
        </button>
      </aside>

      {drawerOpen && (
        <div
          className="cue-drawer-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Active Stage Cue Technical Specification"
        >
          <div className="cue-drawer-backdrop" onClick={() => setDrawerOpen(false)} />
          <div className="cue-drawer">
            <div className="cue-drawer__top">
              <span className="eyebrow">
                <Sliders size={13} aria-hidden="true" />
                CUE SHEET // {activeCue.code}
              </span>
              <button
                type="button"
                className="cue-drawer__close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close cue specification drawer"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <h3 className="display-section cue-drawer__title">{activeCue.name}</h3>
            <p className="cue-drawer__desc">{activeCue.description}</p>

            <div className="cue-drawer__specs">
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">COLOR CALIBRATION</span>
                <strong>{activeCue.spec}</strong>
              </div>
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">TOTAL OUTPUT</span>
                <strong>{activeCue.lumens}</strong>
              </div>
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">DMX PATCH</span>
                <strong>{activeCue.dmx}</strong>
              </div>
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">OVERHEAD RIG LOAD</span>
                <strong>{activeCue.rigLoad}</strong>
              </div>
              <div className="cue-drawer__spec-row">
                <span className="mono-meta">ACTIVE TIMECODE</span>
                <strong className="mono-meta">TC {liveTimecode}</strong>
              </div>
            </div>

            <div className="cue-drawer__modes">
              <span className="mono-meta">SWITCH ACTIVE RIG CUE</span>
              <div className="cue-drawer__mode-pills">
                {LIGHTING_CUES.map((cue) => (
                  <button
                    key={cue.id}
                    type="button"
                    className={`cue-drawer__pill ${
                      cue.id === activeCue.id ? 'cue-drawer__pill--active' : ''
                    }`}
                    onClick={() => onSelectCue(cue.id)}
                  >
                    {cue.code} {cue.shortName}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="cue-drawer__cta"
              onClick={() => {
                setDrawerOpen(false);
                onOpenBrief();
              }}
            >
              Request Custom Rig Spec Sheet
            </button>
          </div>
        </div>
      )}
    </>
  );
}
