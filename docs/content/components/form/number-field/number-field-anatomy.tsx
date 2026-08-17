export const NumberFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a NumberField: a Label above an Input holding the Value, flanked by optional Steppers, with Help text below"
    viewBox="157 16 660 252"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the input */}
    <rect
      x="285"
      y="77"
      width="98"
      height="13"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Group holding the steppers and the input */}
    <rect
      x="285"
      y="105"
      width="328"
      height="53"
      rx="9"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Dividers separating the steppers from the input */}
    <g
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <path d="M 335 105 L 335 158" />
      <path d="M 563 105 L 563 158" />
    </g>
    {/* Decrement stepper (minus) */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 298 131 L 322 131" />
      {/* Increment stepper (plus) */}
      <path d="M 576 131 L 600 131" />
      <path d="M 588 119 L 588 143" />
    </g>
    {/* Value entered into the input */}
    <rect
      x="352"
      y="125"
      width="131"
      height="13"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Help text (description or error message) below the input */}
    <rect
      x="285"
      y="175"
      width="197"
      height="11"
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
      <path d="M 328 77 L 328 48" />
      {/* Input -> up */}
      <path d="M 503 105 L 503 48" />
      {/* Value -> down */}
      <path d="M 418 138 L 418 214" />
      {/* Help text -> left */}
      <path d="M 285 181 L 230 181" />
      {/* Steppers -> right */}
      <path d="M 613 131 L 679 131" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="328" cy="77" r="4" />
      <circle cx="503" cy="105" r="4" />
      <circle cx="418" cy="138" r="4" />
      <circle cx="285" cy="181" r="4" />
      <circle cx="613" cy="131" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="328" y="39">
          Label
        </text>
        <text x="503" y="39">
          Input
        </text>
        <text x="418" y="234">
          Value
        </text>
      </g>
      <text x="219" y="185" textAnchor="end">
        Help text
      </text>
      <text x="689" y="136" textAnchor="start">
        Steppers (optional)
      </text>
    </g>
  </svg>
);
