export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Culturele IntroWeek MBO Logo"
    >
      <defs>
        {/* Halftone pattern for eye */}
        <pattern id="halftone-eye" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.5" fill="currentColor" opacity="0.8" />
        </pattern>

        {/* Halftone pattern for hand */}
        <pattern id="halftone-hand" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1" fill="currentColor" opacity="0.7" />
        </pattern>

        {/* Gradient for Amsterdam canal houses */}
        <linearGradient id="amsterdam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF006E" />
          <stop offset="50%" stopColor="#8338EC" />
          <stop offset="100%" stopColor="#3A86FF" />
        </linearGradient>
      </defs>

      {/* Background circle with Amsterdam colors */}
      <circle cx="100" cy="100" r="95" fill="url(#amsterdam-gradient)" opacity="0.1" />

      {/* Eye (representing "Zien" - Seeing) */}
      <g transform="translate(100, 60)">
        <ellipse cx="0" cy="0" rx="35" ry="20" fill="url(#halftone-eye)" className="text-primary" />
        <circle cx="0" cy="0" r="10" fill="currentColor" className="text-foreground" />
        <circle cx="2" cy="-2" r="4" fill="white" />
      </g>

      {/* Hand (representing "Voelen" - Feeling) */}
      <g transform="translate(50, 130)">
        <path
          d="M 0,0 Q -5,-15 -3,-25 Q -2,-30 2,-28 Q 4,-15 3,0 M 3,0 Q 5,-18 7,-28 Q 9,-33 13,-30 Q 14,-15 12,0 M 12,0 Q 15,-20 18,-28 Q 20,-32 24,-28 Q 24,-12 21,0 M 21,0 Q 24,-15 27,-22 Q 29,-26 32,-22 Q 31,-8 28,0 M 0,0 Q 15,8 28,0"
          fill="url(#halftone-hand)"
          className="text-secondary"
        />
      </g>

      {/* Ear (representing "Horen" - Hearing) */}
      <g transform="translate(150, 130)">
        <path
          d="M 0,0 Q 15,-5 20,-15 Q 22,-25 15,-30 Q 5,-32 -2,-25 Q -5,-15 0,0 M 5,-10 Q 10,-12 12,-18 Q 10,-22 5,-20 Q 2,-15 5,-10"
          fill="url(#halftone-eye)"
          className="text-accent"
        />
      </g>

      {/* Amsterdam canal house silhouettes */}
      <g transform="translate(70, 165)" opacity="0.6">
        <rect x="0" y="0" width="8" height="20" fill="currentColor" className="text-primary" />
        <polygon points="4,0 0,0 0,-8 4,-10 8,-8 8,0" fill="currentColor" className="text-primary" />
      </g>
      <g transform="translate(85, 170)" opacity="0.6">
        <rect x="0" y="0" width="10" height="15" fill="currentColor" className="text-secondary" />
        <polygon points="5,0 0,0 0,-6 5,-8 10,-6 10,0" fill="currentColor" className="text-secondary" />
      </g>
      <g transform="translate(100, 168)" opacity="0.6">
        <rect x="0" y="0" width="9" height="17" fill="currentColor" className="text-accent" />
        <polygon points="4.5,0 0,0 0,-7 4.5,-9 9,-7 9,0" fill="currentColor" className="text-accent" />
      </g>

      {/* X marks (brand element) */}
      <g transform="translate(30, 30)" className="text-primary">
        <line x1="-5" y1="-5" x2="5" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="-5" x2="-5" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g transform="translate(170, 30)" className="text-secondary">
        <line x1="-5" y1="-5" x2="5" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="-5" x2="-5" y2="5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  )
}
