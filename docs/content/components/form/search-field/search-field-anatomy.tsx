export const SearchFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a SearchField: a Label above an Input field with a leading Icon and a trailing Dismiss icon"
    viewBox="179 18 660 260"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the input */}
    <rect
      x="308"
      y="83"
      width="95"
      height="14"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Input field */}
    <rect
      x="308"
      y="114"
      width="378"
      height="57"
      rx="9"
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
      <circle cx="343" cy="137" r="9" />
      <path d="M 350 144 L 358 153" />
      {/* Dismiss (clear) icon at the end of the field */}
      <path d="M 646 135 L 660 149" />
      <path d="M 660 135 L 646 149" />
    </g>
    {/* Search term typed into the field */}
    <rect
      x="378"
      y="135"
      width="166"
      height="14"
      rx="5"
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
      <path d="M 355 83 L 355 52" />
      {/* Icon -> left */}
      <path d="M 329 142 L 248 142" />
      {/* Input field -> down */}
      <path d="M 473 170 L 473 220" />
      {/* Dismiss icon -> right */}
      <path d="M 672 142 L 745 142" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="355" cy="83" r="4" />
      <circle cx="329" cy="142" r="4" />
      <circle cx="473" cy="170" r="4" />
      <circle cx="672" cy="142" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="355" y="43">
          Label
        </text>
        <text x="473" y="241">
          Input field
        </text>
      </g>
      <text x="237" y="147" textAnchor="end">
        Icon
      </text>
      <text x="757" y="147" textAnchor="start">
        Dismiss icon
      </text>
    </g>
  </svg>
);
