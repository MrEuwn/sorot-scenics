import { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { STUDIO_LOCATIONS } from '../data/sorotData';
import './BriefModal.css';

export default function BriefModal({ open, activeCue, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    organization: '',
    email: '',
    city: STUDIO_LOCATIONS[0],
    discipline: 'Arena Scenography',
    notes: '',
  });

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="brief-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="brief-modal-heading"
    >
      <div className="brief-modal__backdrop" onClick={resetAndClose} />
      <div className="brief-modal__card">
        <div className="brief-modal__top">
          <span className="eyebrow brief-modal__eyebrow">
            <span className="eyebrow-dot" />
            PRODUCTION CUE BRIEF · ACTIVE RIG: {activeCue?.name}
          </span>
          <button
            type="button"
            className="brief-modal__close"
            onClick={resetAndClose}
            aria-label="Close production brief dialog"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {submitted ? (
          <div className="brief-modal__success">
            <CheckCircle2 size={44} className="brief-modal__check" aria-hidden="true" />
            <h3 id="brief-modal-heading" className="display-section brief-modal__title">
              CUE BRIEF RECEIVED
            </h3>
            <p className="brief-modal__copy">
              Our lead lighting director in {formState.city} has logged your specification for{' '}
              <strong>{formState.discipline}</strong>. We respond within 24 hours with a preliminary
              rigging load envelope and pre-vis schedule.
            </p>
            <button type="button" className="brief-modal__submit" onClick={resetAndClose}>
              Return to Stage
            </button>
          </div>
        ) : (
          <form className="brief-modal__form" onSubmit={handleSubmit}>
            <h3 id="brief-modal-heading" className="display-section brief-modal__title">
              START A CUE BRIEF
            </h3>
            <p className="brief-modal__copy">
              Share your venue footprint, broadcast schedule, or touring window. We return a CAD
              rigging concept and DMX universe map.
            </p>

            <div className="brief-modal__row">
              <label className="brief-modal__field">
                <span className="mono-meta">YOUR NAME</span>
                <input
                  type="text"
                  required
                  placeholder="Rendra Kusuma"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </label>
              <label className="brief-modal__field">
                <span className="mono-meta">STUDIO OR PRODUCTION</span>
                <input
                  type="text"
                  required
                  placeholder="Nusantara Live Productions"
                  value={formState.organization}
                  onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                />
              </label>
            </div>

            <div className="brief-modal__row">
              <label className="brief-modal__field">
                <span className="mono-meta">PRODUCTION EMAIL</span>
                <input
                  type="email"
                  required
                  placeholder="director@production.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </label>
              <label className="brief-modal__field">
                <span className="mono-meta">NEAREST SOROT HUB</span>
                <select
                  value={formState.city}
                  onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                >
                  {STUDIO_LOCATIONS.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="brief-modal__field">
              <span className="mono-meta">PRIMARY DISCIPLINE</span>
              <select
                value={formState.discipline}
                onChange={(e) => setFormState({ ...formState, discipline: e.target.value })}
              >
                <option value="Arena Scenography">Arena Scenography</option>
                <option value="Kinetic Rigging">Kinetic Rigging</option>
                <option value="Broadcast Visuals">Broadcast Visuals</option>
                <option value="Museum Pavilions">Museum Pavilions</option>
                <option value="Realtime DMX + XR">Realtime DMX + XR</option>
              </select>
            </label>

            <label className="brief-modal__field">
              <span className="mono-meta">VENUE SPECS / LOAD-IN WINDOW</span>
              <textarea
                rows={3}
                placeholder="Ceiling trim height, target load-in dates, broadcast camera package..."
                value={formState.notes}
                onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
              />
            </label>

            <button type="submit" className="brief-modal__submit">
              Dispatch Cue Brief
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
