export const DateRangePickerAnatomy = () => (
  <svg
    viewBox="-20 64 780 226"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label */}
    <rect
      x="210"
      y="116"
      width="96"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Field (the bordered group) */}
    <rect
      x="210"
      y="150"
      width="350"
      height="52"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Start date segments (DD MM YYYY) */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="230" y="168" width="20" height="16" rx="3" />
      <rect x="256" y="168" width="20" height="16" rx="3" />
      <rect x="282" y="168" width="34" height="16" rx="3" />
    </g>

    {/* Separator */}
    <rect
      x="326"
      y="174"
      width="14"
      height="4"
      rx="2"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* End date segments (DD MM YYYY) */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="350" y="168" width="20" height="16" rx="3" />
      <rect x="376" y="168" width="20" height="16" rx="3" />
      <rect x="402" y="168" width="34" height="16" rx="3" />
    </g>

    {/* Calendar button */}
    <rect
      x="508"
      y="160"
      width="34"
      height="34"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Calendar glyph */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <rect x="517" y="171" width="16" height="14" rx="2" />
      <path d="M 521 168 L 521 172" />
      <path d="M 529 168 L 529 172" />
      <path d="M 517 177 L 533 177" />
    </g>

    {/* Description (help text below the field) */}
    <rect
      x="210"
      y="220"
      width="176"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label */}
      <path d="M 210 122 L 160 122" />
      {/* Field (left edge) */}
      <path d="M 210 176 L 160 176" />
      {/* Description */}
      <path d="M 210 225 L 160 225" />
      {/* Start date (up from top border) */}
      <path d="M 273 150 L 273 96" />
      {/* End date (up from top border) */}
      <path d="M 393 150 L 393 96" />
      {/* Separator (down from bottom border) */}
      <path d="M 333 202 L 333 250" />
      {/* Calendar button (right edge) */}
      <path d="M 542 177 L 600 177" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="210" cy="122" r="4" />
      <circle cx="210" cy="176" r="4" />
      <circle cx="210" cy="225" r="4" />
      <circle cx="273" cy="150" r="4" />
      <circle cx="393" cy="150" r="4" />
      <circle cx="333" cy="202" r="4" />
      <circle cx="542" cy="177" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="fill-fd-primary transition-colors duration-300"
      fontSize="14"
      fontWeight="600"
    >
      <g textAnchor="end">
        <text x="150" y="126">
          Label
        </text>
        <text x="150" y="180">
          Field
        </text>
        <text x="150" y="229">
          Description
        </text>
      </g>
      <g textAnchor="middle">
        <text x="273" y="88">
          Start date
        </text>
        <text x="393" y="88">
          End date
        </text>
        <text x="333" y="266">
          Separator
        </text>
      </g>
      <text x="610" y="181" textAnchor="start">
        Calendar button
      </text>
    </g>
  </svg>
);
