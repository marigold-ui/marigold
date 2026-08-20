export const ToastAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Toast: an Icon beside the message, with a Close button"
    viewBox="79 34 660 162"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Toast container */}
    <rect
      x="171"
      y="51"
      width="443"
      height="119"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Status icon */}
    <circle
      cx="213"
      cy="85"
      r="19"
      className="fill-fd-primary transition-colors duration-300"
    />
    <path
      d="M 205 85 L 211 92 L 223 79"
      className="stroke-fd-primary-foreground transition-colors duration-300"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Title */}
    <rect
      x="249"
      y="75"
      width="77"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Description */}
    <rect
      x="249"
      y="95"
      width="119"
      height="10"
      rx="3"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Close button */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 569 75 L 583 89" />
      <path d="M 583 75 L 569 89" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Icon -> left */}
      <path d="M 194 85 L 136 85" />
      {/* Close button -> right */}
      <path d="M 590 82 L 648 82" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="194" cy="85" r="4" />
      <circle cx="590" cy="82" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="128" y="89" textAnchor="end">
        Icon
      </text>
      <text x="656" y="85" textAnchor="start">
        Close button
      </text>
    </g>
  </svg>
);
