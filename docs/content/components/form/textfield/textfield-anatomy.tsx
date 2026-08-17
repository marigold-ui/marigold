export const TextFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a TextField: a Label above an Input holding the Value, with Help text below"
    viewBox="120 15 490 185"
    className="mx-auto h-auto w-full max-w-[90%]"
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

    {/* Input (the container the user types into) */}
    <rect
      x="260"
      y="96"
      width="280"
      height="48"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Value entered into the input */}
    <rect
      x="280"
      y="114"
      width="150"
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
      <path d="M 490 96 L 490 44" />
      {/* Value -> left */}
      <path d="M 280 120 L 210 120" />
      {/* Help text -> left */}
      <path d="M 260 165 L 210 165" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="300" cy="70" r="4" />
      <circle cx="490" cy="96" r="4" />
      <circle cx="280" cy="120" r="4" />
      <circle cx="260" cy="165" r="4" />
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
        <text x="490" y="36">
          Input
        </text>
      </g>
      <g textAnchor="end">
        <text x="200" y="124">
          Value
        </text>
        <text x="200" y="169">
          Help text
        </text>
      </g>
    </g>
  </svg>
);
