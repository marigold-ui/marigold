export const DrawerAnatomy = () => (
  <svg
    viewBox="0 0 660 354"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Page area (active page content) */}
    <rect
      x="145"
      y="24"
      width="402"
      height="306"
      rx="10"
      className="fill-fd-muted/40 stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Page content placeholders */}
    <rect
      x="161"
      y="48"
      width="145"
      height="10"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="161"
      y="69"
      width="113"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="161"
      y="89"
      width="129"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="161"
      y="108"
      width="97"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Drawer panel */}
    <rect
      x="354"
      y="24"
      width="193"
      height="306"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Title */}
    <rect
      x="370"
      y="50"
      width="97"
      height="11"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Close button */}
    <circle
      cx="525"
      cy="37"
      r="11"
      className="fill-fd-muted/60 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M 520 32 L 530 42" />
      <path d="M 530 32 L 520 42" />
    </g>

    {/* Content placeholder lines */}
    <rect
      x="370"
      y="97"
      width="161"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="370"
      y="118"
      width="145"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="370"
      y="138"
      width="161"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="370"
      y="159"
      width="121"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Actions area separator (subtle) */}
    <rect
      x="370"
      y="274"
      width="161"
      height="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Cancel button */}
    <rect
      x="370"
      y="288"
      width="72"
      height="26"
      rx="5"
      className="stroke-fd-border fill-transparent transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="390"
      y="298"
      width="32"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Primary button */}
    <rect
      x="459"
      y="288"
      width="72"
      height="26"
      rx="5"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="479"
      y="298"
      width="32"
      height="6"
      rx="2"
      className="fill-fd-primary-foreground/80 transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 233 77 L 137 77" />
      <path d="M 354 177 L 137 177" />
      <path d="M 467 56 L 555 56" />
      <path d="M 536 37 L 555 37" />
      <path d="M 531 121 L 555 121" />
      <path d="M 531 301 L 555 301" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="233" cy="77" r="4" />
      <circle cx="354" cy="177" r="4" />
      <circle cx="467" cy="56" r="4" />
      <circle cx="536" cy="37" r="4" />
      <circle cx="531" cy="121" r="4" />
      <circle cx="531" cy="301" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="129"
          y="80"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Page content
        </text>
        <text
          x="129"
          y="180"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Drawer
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="563"
          y="40"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Close button
        </text>
        <text
          x="563"
          y="60"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="563"
          y="124"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Content
        </text>
        <text
          x="563"
          y="304"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Actions
        </text>
      </g>
    </g>
  </svg>
);
