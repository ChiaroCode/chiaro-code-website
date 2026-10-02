export function BrandMark({ className = 'brand-mark', label }: { className?: string; label?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 60" aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} focusable="false">
      <g className="mark-grid" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
        <rect x="3.5" y="8.5" width="31" height="43" rx="6" />
        <path d="M13.8 9v42M24.2 9v42M4 22.8h30M4 37.2h30" />
      </g>
      <g className="mark-staff" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.8">
        <path d="M31 15.5h37M31 23h37M31 30.5h37M31 38h37M31 45.5h37" />
      </g>
      <g className="mark-notes" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="45" cy="30.5" rx="4.7" ry="3.4" transform="rotate(-22 45 30.5)" />
        <path d="M49 29V8.5" fill="none" strokeWidth="2.8" />
        <ellipse cx="61" cy="23" rx="4.7" ry="3.4" transform="rotate(-22 61 23)" />
        <path d="M65 21.5V6" fill="none" strokeWidth="2.8" />
      </g>
    </svg>
  );
}
