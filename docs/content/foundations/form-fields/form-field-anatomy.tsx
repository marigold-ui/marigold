export const FormFieldAnatomy = () => (
  <svg
    viewBox="-10 10 660 180"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Label placeholder */}
    <rect
      x="300"
      y="40"
      width="100"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Field (input) */}
    <rect
      x="300"
      y="66"
      width="240"
      height="44"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Placeholder text inside field */}
    <rect
      x="316"
      y="82"
      width="140"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Description / help text placeholder */}
    <rect
      x="300"
      y="124"
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
      {/* Label -> left */}
      <path d="M 300 46 L 250 46" />
      {/* Field -> left */}
      <path d="M 300 88 L 250 88" />
      {/* Description -> left */}
      <path d="M 300 129 L 250 129" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="300" cy="46" r="4" />
      <circle cx="300" cy="88" r="4" />
      <circle cx="300" cy="129" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="240"
          y="50"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Label
        </text>
        <text
          x="240"
          y="92"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Field
        </text>
        <text
          x="240"
          y="133"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Help text
        </text>
      </g>
    </g>
  </svg>
);
