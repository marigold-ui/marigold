export const RadioAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Radio group: a Group label above rows that each pair a Radio button input with its Radio button label"
    viewBox="254 50 660 255"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Group label above the radio buttons */}
    <rect
      x="497"
      y="65"
      width="124"
      height="17"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Selected radio button */}
    <circle
      cx="515"
      cy="142"
      r="17"
      className="fill-fd-primary transition-colors duration-300"
    />
    <circle
      cx="515"
      cy="142"
      r="6"
      className="fill-fd-primary-foreground transition-colors duration-300"
    />
    {/* Unselected radio buttons */}
    <g
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <circle cx="515" cy="204" r="17" />
      <circle cx="515" cy="266" r="17" />
    </g>

    {/* Radio button labels next to each input */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="552" y="134" width="87" height="15" rx="5" />
      <rect x="552" y="196" width="87" height="15" rx="5" />
      <rect x="552" y="259" width="87" height="15" rx="5" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Group label -> left */}
      <path d="M 497 73 L 410 73" />
      {/* Radio button label -> right */}
      <path d="M 651 142 L 746 142" />
      {/* Radio button input -> left */}
      <path d="M 497 204 L 410 204" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="497" cy="73" r="4" />
      <circle cx="651" cy="142" r="4" />
      <circle cx="497" cy="204" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="398" y="78">
          Group label
        </text>
        <text x="398" y="209">
          Radio button input
        </text>
      </g>
      <text x="758" y="147" textAnchor="start">
        Radio button label
      </text>
    </g>
  </svg>
);
