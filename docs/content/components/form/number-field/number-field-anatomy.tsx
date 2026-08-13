export const NumberFieldAnatomy = () => (
  <svg
    viewBox="120 15 650 230"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the input */}
    <rect
      x="260"
      y="70"
      width="90"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Group holding the steppers and the input */}
    <rect
      x="260"
      y="96"
      width="300"
      height="48"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Dividers separating the steppers from the input */}
    <g
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <path d="M 306 96 L 306 144" />
      <path d="M 514 96 L 514 144" />
    </g>
    {/* Decrement stepper (minus) */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 272 120 L 294 120" />
      {/* Increment stepper (plus) */}
      <path d="M 526 120 L 548 120" />
      <path d="M 537 109 L 537 131" />
    </g>
    {/* Value entered into the input */}
    <rect
      x="322"
      y="114"
      width="120"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Help text (description or error message) below the input */}
    <rect
      x="260"
      y="160"
      width="180"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
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
      {/* Input -> up */}
      <path d="M 460 96 L 460 44" />
      {/* Value -> down */}
      <path d="M 382 126 L 382 196" />
      {/* Help text -> left */}
      <path d="M 260 165 L 210 165" />
      {/* Steppers -> right */}
      <path d="M 560 120 L 620 120" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="300" cy="70" r="4" />
      <circle cx="460" cy="96" r="4" />
      <circle cx="382" cy="126" r="4" />
      <circle cx="260" cy="165" r="4" />
      <circle cx="560" cy="120" r="4" />
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
        <text x="460" y="36">
          Input
        </text>
        <text x="382" y="214">
          Value
        </text>
      </g>
      <text x="200" y="169" textAnchor="end">
        Help text
      </text>
      <text x="630" y="124" textAnchor="start">
        Steppers (optional)
      </text>
    </g>
  </svg>
);
