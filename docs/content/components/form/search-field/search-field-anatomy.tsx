export const SearchFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a SearchField: a Label above an Input field with a leading Icon and a trailing Dismiss icon"
    viewBox="120 15 620 220"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the input */}
    <rect
      x="260"
      y="70"
      width="80"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Input field */}
    <rect
      x="260"
      y="96"
      width="320"
      height="48"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Search icon at the start of the field */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <circle cx="290" cy="116" r="8" />
      <path d="M 296 122 L 303 129" />
      {/* Dismiss (clear) icon at the end of the field */}
      <path d="M 546 114 L 558 126" />
      <path d="M 558 114 L 546 126" />
    </g>
    {/* Search term typed into the field */}
    <rect
      x="320"
      y="114"
      width="140"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label -> up */}
      <path d="M 300 70 L 300 44" />
      {/* Icon -> left */}
      <path d="M 278 120 L 210 120" />
      {/* Input field -> down */}
      <path d="M 400 144 L 400 186" />
      {/* Dismiss icon -> right */}
      <path d="M 568 120 L 630 120" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="300" cy="70" r="4" />
      <circle cx="278" cy="120" r="4" />
      <circle cx="400" cy="144" r="4" />
      <circle cx="568" cy="120" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="300" y="36">
          Label
        </text>
        <text x="400" y="204">
          Input field
        </text>
      </g>
      <text x="200" y="124" textAnchor="end">
        Icon
      </text>
      <text x="640" y="124" textAnchor="start">
        Dismiss icon
      </text>
    </g>
  </svg>
);
