export const CheckboxAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Checkbox group: a Group label above rows that each pair a Checkbox input with its Checkbox label"
    viewBox="297 53 660 273"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Group label above the checkboxes */}
    <rect
      x="533"
      y="69"
      width="120"
      height="19"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Unchecked checkbox */}
    <rect
      x="533"
      y="133"
      width="37"
      height="37"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Checked checkboxes */}
    <g className="fill-fd-primary transition-colors duration-300">
      <rect x="533" y="200" width="37" height="37" rx="8" />
      <rect x="533" y="267" width="37" height="37" rx="8" />
    </g>
    {/* Checkmarks inside the checked boxes */}
    <g
      className="stroke-fd-primary-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 543 219 L 549 227 L 561 211" />
      <path d="M 543 285 L 549 293 L 561 277" />
    </g>

    {/* Checkbox labels next to each box */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="592" y="144" width="93" height="16" rx="5" />
      <rect x="592" y="211" width="93" height="16" rx="5" />
      <rect x="592" y="277" width="93" height="16" rx="5" />
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
      <path d="M 533 79 L 440 79" />
      {/* Checkbox label -> right */}
      <path d="M 699 152 L 800 152" />
      {/* Checkbox input -> left */}
      <path d="M 533 285 L 440 285" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="533" cy="79" r="4" />
      <circle cx="699" cy="152" r="4" />
      <circle cx="533" cy="285" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="427" y="84">
          Group label
        </text>
        <text x="427" y="291">
          Checkbox input
        </text>
      </g>
      <text x="813" y="157" textAnchor="start">
        Checkbox label
      </text>
    </g>
  </svg>
);
