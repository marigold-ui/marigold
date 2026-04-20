export const PanelCollapsibleAnatomy = () => (
  <svg
    viewBox="-10 10 660 210"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Header container */}
    <rect
      x="200"
      y="30"
      width="260"
      height="54"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Title placeholder */}
    <rect
      x="220"
      y="44"
      width="120"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Description placeholder */}
    <rect
      x="220"
      y="62"
      width="170"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    {/* Caret */}
    <path
      d="M 434 55 L 439 60 L 444 55"
      className="stroke-fd-muted-foreground/60 transition-colors duration-300"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Content container */}
    <rect
      x="200"
      y="96"
      width="260"
      height="80"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Content placeholder lines */}
    <rect
      x="220"
      y="112"
      width="220"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="220"
      y="130"
      width="200"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="220"
      y="148"
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
      {/* Title -> left */}
      <path d="M 220 49 L 170 49" />
      {/* Description -> left */}
      <path d="M 220 66 L 170 66" />
      {/* Header -> right */}
      <path d="M 460 57 L 510 57" />
      {/* Content -> right */}
      <path d="M 460 136 L 510 136" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="220" cy="49" r="4" />
      <circle cx="220" cy="66" r="4" />
      <circle cx="460" cy="57" r="4" />
      <circle cx="460" cy="136" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="160"
          y="53"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="160"
          y="70"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="520"
          y="61"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Header
        </text>
        <text
          x="520"
          y="140"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Content
        </text>
      </g>
    </g>
  </svg>
);
