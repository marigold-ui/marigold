export const ConceptsStructure = () => (
  <svg
    viewBox="-10 10 820 380"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* AppLayout container */}
    <rect
      x="150"
      y="30"
      width="540"
      height="340"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Sidebar container */}
    <rect
      x="170"
      y="50"
      width="110"
      height="300"
      rx="6"
      className="fill-fd-muted/40 stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />
    {/* Sidebar logo */}
    <rect
      x="186"
      y="62"
      width="60"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Sidebar active item */}
    <rect
      x="178"
      y="90"
      width="94"
      height="22"
      rx="4"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="186"
      y="97"
      width="70"
      height="8"
      rx="3"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />
    {/* Sidebar items */}
    <rect
      x="186"
      y="126"
      width="78"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="186"
      y="146"
      width="70"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="186"
      y="166"
      width="82"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="186"
      y="186"
      width="66"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Topbar */}
    <rect
      x="300"
      y="50"
      width="370"
      height="32"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    {/* Topbar page title */}
    <rect
      x="316"
      y="62"
      width="96"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Topbar action pill */}
    <rect
      x="598"
      y="60"
      width="32"
      height="12"
      rx="6"
      className="fill-fd-muted/60 stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />
    {/* Topbar avatar */}
    <circle
      cx="648"
      cy="66"
      r="8"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Panel 1 */}
    <rect
      x="300"
      y="94"
      width="370"
      height="123"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    {/* Panel 1 title */}
    <rect
      x="318"
      y="108"
      width="90"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Panel 1 header divider */}
    <line
      x1="300"
      y1="132"
      x2="670"
      y2="132"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />
    {/* Panel 1 content lines */}
    <rect
      x="318"
      y="146"
      width="310"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="318"
      y="160"
      width="280"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="318"
      y="174"
      width="300"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="318"
      y="188"
      width="250"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Panel 2 */}
    <rect
      x="300"
      y="227"
      width="370"
      height="123"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    {/* Panel 2 title */}
    <rect
      x="318"
      y="241"
      width="80"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Panel 2 header divider */}
    <line
      x1="300"
      y1="265"
      x2="670"
      y2="265"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />
    {/* Panel 2 content lines */}
    <rect
      x="318"
      y="279"
      width="290"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="318"
      y="293"
      width="260"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="318"
      y="307"
      width="310"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="318"
      y="321"
      width="240"
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
      {/* AppLayout -> left */}
      <path d="M 150 45 L 90 45" />
      {/* Sidebar -> left */}
      <path d="M 170 200 L 90 200" />
      {/* Topbar -> right */}
      <path d="M 670 66 L 740 66" />
      {/* Panel -> right */}
      <path d="M 670 155 L 740 155" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="150" cy="45" r="4" />
      <circle cx="170" cy="200" r="4" />
      <circle cx="670" cy="66" r="4" />
      <circle cx="670" cy="155" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="80"
          y="49"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          AppLayout
        </text>
        <text
          x="80"
          y="204"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Sidebar
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="750"
          y="70"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Topbar
        </text>
        <text
          x="750"
          y="159"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Panel
        </text>
      </g>
    </g>
  </svg>
);
