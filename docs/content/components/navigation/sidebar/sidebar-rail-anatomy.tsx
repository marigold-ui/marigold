export const SidebarRailAnatomy = () => (
  <svg
    viewBox="40 58 640 385"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shell container: rail + panel */}
    <rect
      x="220"
      y="70"
      width="280"
      height="360"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Divider between rail and panel */}
    <rect
      x="316"
      y="70"
      width="2"
      height="360"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Rail tile 1 (active section) */}
    <rect
      x="228"
      y="86"
      width="82"
      height="56"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="261"
      y="96"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-accent-foreground/70 transition-colors duration-300"
    />
    <rect
      x="245"
      y="120"
      width="48"
      height="8"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Rail tile 2 */}
    <rect
      x="261"
      y="162"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="249"
      y="186"
      width="40"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Rail tile 3 */}
    <rect
      x="261"
      y="228"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="249"
      y="252"
      width="40"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Pinned footer tile */}
    <rect
      x="261"
      y="384"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="249"
      y="408"
      width="40"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Panel title */}
    <rect
      x="334"
      y="92"
      width="110"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Panel row 1 (active leaf) */}
    <rect
      x="326"
      y="120"
      width="158"
      height="30"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="338"
      y="130"
      width="100"
      height="10"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Panel rows 2 + 3 */}
    <rect
      x="338"
      y="166"
      width="84"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="338"
      y="196"
      width="110"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 249 190 L 160 190" />
      <path d="M 228 300 L 160 300" />
      <path d="M 249 412 L 160 412" />
      <path d="M 444 98 L 590 98" />
      <path d="M 484 135 L 590 135" />
      <path d="M 500 300 L 560 300" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="249" cy="190" r="4" />
      <circle cx="228" cy="300" r="4" />
      <circle cx="249" cy="412" r="4" />
      <circle cx="444" cy="98" r="4" />
      <circle cx="484" cy="135" r="4" />
      <circle cx="560" cy="300" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="150"
          y="194"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Rail item
        </text>
        <text
          x="150"
          y="304"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Rail
        </text>
        <text
          x="150"
          y="416"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Pinned item
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="600"
          y="102"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Panel title
        </text>
        <text
          x="600"
          y="139"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Item
        </text>
        <text
          x="570"
          y="304"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Section panel
        </text>
      </g>
    </g>
  </svg>
);
