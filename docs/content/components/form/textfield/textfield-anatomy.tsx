export const TextFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a TextField: a Label above an Input holding the Value, with Help text below"
    viewBox="162 20 660 249"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the input */}
    <rect
      x="350"
      y="94"
      width="121"
      height="16"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Input (the container the user types into) */}
    <rect
      x="350"
      y="129"
      width="377"
      height="65"
      rx="11"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Value entered into the input */}
    <rect
      x="377"
      y="154"
      width="202"
      height="16"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Help text (description or error message) below the input */}
    <rect
      x="350"
      y="216"
      width="242"
      height="13"
      rx="5"
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
      <path d="M 404 94 L 404 59" />
      {/* Input -> up */}
      <path d="M 660 129 L 660 59" />
      {/* Value -> left */}
      <path d="M 377 162 L 283 162" />
      {/* Help text -> left */}
      <path d="M 350 222 L 283 222" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="404" cy="94" r="4" />
      <circle cx="660" cy="129" r="4" />
      <circle cx="377" cy="162" r="4" />
      <circle cx="350" cy="222" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="404" y="48">
          Label
        </text>
        <text x="660" y="48">
          Input
        </text>
      </g>
      <g textAnchor="end">
        <text x="269" y="167">
          Value
        </text>
        <text x="269" y="228">
          Help text
        </text>
      </g>
    </g>
  </svg>
);
