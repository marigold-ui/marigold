export const RadioAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Radio group: a Group label above rows that each pair a Radio button input with its Radio button label"
    viewBox="175 40 590 205"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Group label above the radio buttons */}
    <rect
      x="400"
      y="52"
      width="100"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Selected radio button */}
    <circle
      cx="414"
      cy="114"
      r="14"
      className="fill-fd-primary transition-colors duration-300"
    />
    <circle
      cx="414"
      cy="114"
      r="5"
      className="fill-fd-primary-foreground transition-colors duration-300"
    />
    {/* Unselected radio buttons */}
    <g
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <circle cx="414" cy="164" r="14" />
      <circle cx="414" cy="214" r="14" />
    </g>

    {/* Radio button labels next to each input */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="444" y="108" width="70" height="12" rx="4" />
      <rect x="444" y="158" width="70" height="12" rx="4" />
      <rect x="444" y="208" width="70" height="12" rx="4" />
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
      <path d="M 400 59 L 330 59" />
      {/* Radio button label -> right */}
      <path d="M 524 114 L 600 114" />
      {/* Radio button input -> left */}
      <path d="M 400 164 L 330 164" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="400" cy="59" r="4" />
      <circle cx="524" cy="114" r="4" />
      <circle cx="400" cy="164" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="320" y="63">
          Group label
        </text>
        <text x="320" y="168">
          Radio button input
        </text>
      </g>
      <text x="610" y="118" textAnchor="start">
        Radio button label
      </text>
    </g>
  </svg>
);
