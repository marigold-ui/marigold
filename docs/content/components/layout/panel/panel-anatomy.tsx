export const PanelAnatomy = () => (
  <svg
    viewBox="-8 8 660 274"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Panel container */}
    <rect
      x="225"
      y="24"
      width="225"
      height="233"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Title placeholder */}
    <rect
      x="241"
      y="40"
      width="97"
      height="11"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Description placeholder */}
    <rect
      x="241"
      y="56"
      width="145"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    {/* HeaderActions placeholder (pill button) */}
    <rect
      x="402"
      y="39"
      width="32"
      height="18"
      rx="5"
      className="fill-fd-muted/50 stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />

    {/* Header/Content divider */}
    <line
      x1="225"
      y1="79"
      x2="451"
      y2="79"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />

    {/* Content placeholder lines */}
    <rect
      x="241"
      y="95"
      width="193"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="241"
      y="109"
      width="177"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="241"
      y="124"
      width="209"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="241"
      y="138"
      width="161"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Content/Footer divider */}
    <line
      x1="225"
      y1="203"
      x2="451"
      y2="203"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />

    {/* Footer button placeholder */}
    <rect
      x="378"
      y="219"
      width="56"
      height="18"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Title -> left */}
      <path d="M 241 46 L 201 46" />
      {/* Description -> left, routed down so the label clears "Title" */}
      <path d="M 241 60 L 224 60 L 224 68 L 201 68" />
      {/* Content -> left (in gap between placeholder lines) */}
      <path d="M 241 105 L 201 105" />
      {/* Footer -> left (from footer button left edge) */}
      <path d="M 378 228 L 201 228" />
      {/* HeaderActions -> right */}
      <path d="M 435 47 L 483 47" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="241" cy="46" r="4" />
      <circle cx="241" cy="60" r="4" />
      <circle cx="241" cy="105" r="4" />
      <circle cx="378" cy="228" r="4" />
      <circle cx="435" cy="47" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="193"
          y="49"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="193"
          y="71"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
        <text
          x="193"
          y="109"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Content
        </text>
        <text
          x="193"
          y="231"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Footer
        </text>
      </g>
      <text
        x="491"
        y="51"
        fontSize="14"
        fontWeight="600"
        textAnchor="start"
        className="fill-fd-primary"
      >
        Header actions
      </text>
    </g>
  </svg>
);
