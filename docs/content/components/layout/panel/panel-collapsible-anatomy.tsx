export const PanelCollapsibleAnatomy = () => (
  <svg
    viewBox="-10 10 820 360"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Panel container */}
    <rect
      x="280"
      y="30"
      width="280"
      height="320"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Panel title placeholder */}
    <rect
      x="300"
      y="50"
      width="120"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Panel description placeholder */}
    <rect
      x="300"
      y="70"
      width="180"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Panel header/content divider */}
    <line
      x1="280"
      y1="98"
      x2="560"
      y2="98"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />

    {/* Panel content placeholder lines */}
    <rect
      x="300"
      y="118"
      width="240"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="300"
      y="136"
      width="220"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="300"
      y="154"
      width="180"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Collapsible Header container */}
    <rect
      x="300"
      y="182"
      width="240"
      height="50"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    {/* Collapsible title placeholder */}
    <rect
      x="315"
      y="195"
      width="110"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Collapsible description placeholder */}
    <rect
      x="315"
      y="212"
      width="150"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    {/* Caret */}
    <path
      d="M 510 203 L 515 208 L 520 203"
      className="stroke-fd-muted-foreground/60 transition-colors duration-300"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Collapsible Content container */}
    <rect
      x="300"
      y="244"
      width="240"
      height="80"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    {/* Collapsible content placeholder lines */}
    <rect
      x="315"
      y="260"
      width="200"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="315"
      y="278"
      width="180"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="315"
      y="296"
      width="160"
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
      <path d="M 315 200 L 250 200" />
      {/* Description -> left */}
      <path d="M 315 216 L 250 216" />
      {/* Header -> right */}
      <path d="M 540 207 L 600 207" />
      {/* Content -> right */}
      <path d="M 540 284 L 600 284" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="315" cy="200" r="4" />
      <circle cx="315" cy="216" r="4" />
      <circle cx="540" cy="207" r="4" />
      <circle cx="540" cy="284" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="240"
          y="204"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="240"
          y="220"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="610"
          y="211"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Header
        </text>
        <text
          x="610"
          y="288"
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
