export const PanelCollapsibleAnatomy = () => (
  <svg
    viewBox="-8 8 660 290"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Panel container */}
    <rect
      x="225"
      y="24"
      width="225"
      height="258"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Panel title placeholder */}
    <rect
      x="241"
      y="40"
      width="97"
      height="11"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Panel description placeholder */}
    <rect
      x="241"
      y="56"
      width="145"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Panel header/content divider */}
    <line
      x1="225"
      y1="79"
      x2="451"
      y2="79"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />

    {/* Panel content placeholder lines */}
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
      width="145"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Collapsible Header container */}
    <rect
      x="241"
      y="146"
      width="193"
      height="40"
      rx="5"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    {/* Collapsible title placeholder */}
    <rect
      x="254"
      y="157"
      width="89"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Collapsible description placeholder */}
    <rect
      x="254"
      y="171"
      width="121"
      height="6"
      rx="3"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    {/* Caret */}
    <path
      d="M 410 163 L 415 167 L 419 163"
      className="stroke-fd-muted-foreground/60 transition-colors duration-300"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Collapsible Content container */}
    <rect
      x="241"
      y="196"
      width="193"
      height="64"
      rx="5"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    {/* Collapsible content placeholder lines */}
    <rect
      x="254"
      y="209"
      width="161"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="254"
      y="224"
      width="145"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="254"
      y="238"
      width="129"
      height="6"
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
      <path d="M 254 161 L 201 161" />
      {/* Description -> left, routed down so the label clears "Title" */}
      <path d="M 254 174 L 232 174 L 232 182 L 201 182" />
      {/* Header -> right */}
      <path d="M 435 167 L 483 167" />
      {/* Content -> right */}
      <path d="M 435 229 L 483 229" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="254" cy="161" r="4" />
      <circle cx="254" cy="174" r="4" />
      <circle cx="435" cy="167" r="4" />
      <circle cx="435" cy="229" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="193"
          y="164"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="193"
          y="185"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="491"
          y="170"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Header
        </text>
        <text
          x="491"
          y="232"
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
