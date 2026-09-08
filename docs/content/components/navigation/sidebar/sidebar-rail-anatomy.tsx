export const SidebarRailAnatomy = () => (
  <svg
    viewBox="41 60 660 397"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shell container: rail + panel */}
    <rect
      x="227"
      y="72"
      width="289"
      height="371"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Divider between rail and panel */}
    <rect
      x="326"
      y="72"
      width="2"
      height="371"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Rail tile 1 (active section) */}
    <rect
      x="235"
      y="89"
      width="85"
      height="58"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="269"
      y="99"
      width="17"
      height="17"
      rx="4"
      className="fill-fd-accent-foreground/70 transition-colors duration-300"
    />
    <rect
      x="253"
      y="124"
      width="50"
      height="8"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Rail tile 2 */}
    <rect
      x="269"
      y="167"
      width="17"
      height="17"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="257"
      y="192"
      width="41"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Rail tile 3 */}
    <rect
      x="269"
      y="235"
      width="17"
      height="17"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="257"
      y="260"
      width="41"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Pinned footer tile */}
    <rect
      x="269"
      y="396"
      width="17"
      height="17"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="257"
      y="421"
      width="41"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Panel title */}
    <rect
      x="344"
      y="95"
      width="113"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Panel row 1 (active leaf) */}
    <rect
      x="336"
      y="124"
      width="163"
      height="31"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="349"
      y="134"
      width="103"
      height="10"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Panel rows 2 + 3 */}
    <rect
      x="349"
      y="171"
      width="87"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="349"
      y="202"
      width="113"
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
      <path d="M 257 196 L 165 196" />
      <path d="M 235 309 L 165 309" />
      <path d="M 257 425 L 165 425" />
      <path d="M 458 101 L 608 101" />
      <path d="M 499 139 L 608 139" />
      <path d="M 516 309 L 578 309" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="257" cy="196" r="4" />
      <circle cx="235" cy="309" r="4" />
      <circle cx="257" cy="425" r="4" />
      <circle cx="458" cy="101" r="4" />
      <circle cx="499" cy="139" r="4" />
      <circle cx="578" cy="309" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="155"
          y="200"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Rail item
        </text>
        <text
          x="155"
          y="314"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Rail
        </text>
        <text
          x="155"
          y="429"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Pinned item
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="619"
          y="105"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Panel title
        </text>
        <text
          x="619"
          y="143"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Item
        </text>
        <text
          x="588"
          y="314"
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
