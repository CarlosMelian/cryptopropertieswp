interface BridgeMarkProps {
  className?: string;
}

/**
 * The brand mark: a minimal cable-stayed bridge, literalizing the company's
 * core metaphor of bridging two asset classes. Used in the navbar, footer,
 * and as a recurring structural motif across the page.
 */
export function BridgeMark({ className = "h-7 w-7" }: BridgeMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4.5" cy="23" r="1.6" fill="currentColor" />
      <circle cx="27.5" cy="23" r="1.6" fill="currentColor" />
      <path
        d="M4.5 23H27.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M11 23V8M21 23V8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M11 8L4.5 23M11 8L17 23M21 8L27.5 23M21 8L15 23"
        stroke="currentColor"
        strokeWidth="0.85"
        strokeLinecap="round"
        opacity="0.65"
      />
    </svg>
  );
}
