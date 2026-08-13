export const ToastAnatomy = () => (
  <svg
    viewBox="80 40 800 190"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Toast container */}
    <rect
      x="200"
      y="60"
      width="520"
      height="140"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Status icon */}
    <circle
      cx="250"
      cy="100"
      r="22"
      className="fill-fd-primary transition-colors duration-300"
    />
    <path
      d="M 240 100 L 247 108 L 261 93"
      className="stroke-fd-primary-foreground transition-colors duration-300"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Title */}
    <rect
      x="292"
      y="88"
      width="90"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Description */}
    <rect
      x="292"
      y="112"
      width="140"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Close button */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 668 88 L 684 104" />
      <path d="M 684 88 L 668 104" />
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
      <path d="M 228 100 L 160 100" />
      {/* Close button -> right */}
      <path d="M 692 96 L 760 96" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="228" cy="100" r="4" />
      <circle cx="692" cy="96" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="150" y="104" textAnchor="end">
        Icon
      </text>
      <text x="770" y="100" textAnchor="start">
        Close button
      </text>
    </g>
  </svg>
);
