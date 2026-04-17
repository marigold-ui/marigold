export const PanelCollapsibleAnatomy = () => (
  <svg
    viewBox="-10 10 660 170"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trigger container */}
    <rect
      x="200"
      y="30"
      width="260"
      height="34"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Trigger label */}
    <rect
      x="220"
      y="42"
      width="140"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Chevron */}
    <path
      d="M 428 44 L 436 52 L 444 44"
      className="stroke-fd-foreground transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Content container */}
    <rect
      x="200"
      y="74"
      width="260"
      height="70"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Content placeholder lines */}
    <rect
      x="220"
      y="88"
      width="220"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="220"
      y="106"
      width="200"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="220"
      y="124"
      width="180"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trigger -> left */}
      <path d="M 200 47 L 150 47" />
      {/* Content -> right */}
      <path d="M 460 109 L 510 109" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="47" r="4" />
      <circle cx="460" cy="109" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="140"
        y="51"
        fontSize="14"
        fontWeight="600"
        textAnchor="end"
        className="fill-fd-primary"
      >
        Trigger
      </text>
      <text
        x="520"
        y="113"
        fontSize="14"
        fontWeight="600"
        textAnchor="start"
        className="fill-fd-primary"
      >
        Content
      </text>
    </g>
  </svg>
);
