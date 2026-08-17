export const SectionMessageAnatomy = () => (
  <svg
    viewBox="-17 48 660 217"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Container */}
    <rect
      x="139"
      y="113"
      width="347"
      height="139"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Icon */}
    <circle
      cx="170"
      cy="144"
      r="12"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Title */}
    <rect
      x="193"
      y="139"
      width="139"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Content lines */}
    <rect
      x="193"
      y="170"
      width="261"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="193"
      y="186"
      width="243"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="193"
      y="201"
      width="208"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Close Button */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 459 139 L 469 149" />
      <path d="M 469 139 L 459 149" />
    </g>

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Icon -> left */}
      <path d="M 158 144 L 87 144" />
      {/* Container -> bottom left */}
      <path d="M 139 233 L 87 233" />
      {/* Title -> top */}
      <path d="M 262 139 L 262 78" />
      {/* Content -> right */}
      <path d="M 453 190 L 538 190" />
      {/* Close button -> right */}
      <path d="M 471 144 L 538 144" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="158" cy="144" r="4" />
      <circle cx="139" cy="233" r="4" />
      <circle cx="262" cy="139" r="4" />
      <circle cx="453" cy="190" r="4" />
      <circle cx="471" cy="144" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="78"
          y="148"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Icon
        </text>
        <text
          x="78"
          y="236"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Container
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="547"
          y="148"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Close button
        </text>
        <text
          x="547"
          y="194"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Content
        </text>
      </g>
      <text
        x="262"
        y="68"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Title
      </text>
    </g>
  </svg>
);
