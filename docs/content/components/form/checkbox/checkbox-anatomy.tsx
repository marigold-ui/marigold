export const CheckboxAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Checkbox group: a Group label above rows that each pair a Checkbox input with its Checkbox label"
    viewBox="195 40 550 205"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Group label above the checkboxes */}
    <rect
      x="400"
      y="52"
      width="90"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Unchecked checkbox */}
    <rect
      x="400"
      y="100"
      width="28"
      height="28"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Checked checkboxes */}
    <g className="fill-fd-primary transition-colors duration-300">
      <rect x="400" y="150" width="28" height="28" rx="6" />
      <rect x="400" y="200" width="28" height="28" rx="6" />
    </g>
    {/* Checkmarks inside the checked boxes */}
    <g
      className="stroke-fd-primary-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 407 164 L 412 170 L 421 158" />
      <path d="M 407 214 L 412 220 L 421 208" />
    </g>

    {/* Checkbox labels next to each box */}
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
      {/* Checkbox label -> right */}
      <path d="M 524 114 L 600 114" />
      {/* Checkbox input -> left */}
      <path d="M 400 214 L 330 214" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="400" cy="59" r="4" />
      <circle cx="524" cy="114" r="4" />
      <circle cx="400" cy="214" r="4" />
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
        <text x="320" y="218">
          Checkbox input
        </text>
      </g>
      <text x="610" y="118" textAnchor="start">
        Checkbox label
      </text>
    </g>
  </svg>
);
