import { useEffect, useRef, useState } from 'react';

export default function PrismLoader({ onComplete }) {
  const [phase, setPhase] = useState(() => {
    if (typeof window === 'undefined') return 'done';
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'running';
  });
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('done');
      onCompleteRef.current?.();
      return undefined;
    }

    const runTimer = window.setTimeout(() => {
      setPhase('exiting');
    }, 920);

    const doneTimer = window.setTimeout(() => {
      setPhase('done');
      onCompleteRef.current?.();
    }, 1460);

    return () => {
      window.clearTimeout(runTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`prism-loader ${phase === 'exiting' ? 'prism-loader--exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading SOROT stage optics"
      data-testid="prism-loader"
    >
      <div className="prism-loader__emblem" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="54" height="54" className="prism-loader__svg" data-art="bowtie">
          <polygon className="prism-loader__wing prism-loader__wing--left" points="14,12 32,32 14,44" fill="#FFFFFF" />
          <polygon className="prism-loader__wing prism-loader__wing--right" points="50,20 32,32 50,52" fill="#FFFFFF" />
        </svg>
      </div>
    </div>
  );
}
