export const DateRangePickerAnatomy = () => (
  <svg
    viewBox="-17 54 660 191"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label */}
    <rect
      x="178"
      y="98"
      width="81"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Field (the bordered group) */}
    <rect
      x="178"
      y="127"
      width="296"
      height="44"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Start date segments (DD MM YYYY) */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="195" y="142" width="17" height="14" rx="3" />
      <rect x="217" y="142" width="17" height="14" rx="3" />
      <rect x="239" y="142" width="29" height="14" rx="3" />
    </g>

    {/* Separator */}
    <rect
      x="276"
      y="147"
      width="12"
      height="3"
      rx="2"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* End date segments (DD MM YYYY) */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="296" y="142" width="17" height="14" rx="3" />
      <rect x="318" y="142" width="17" height="14" rx="3" />
      <rect x="340" y="142" width="29" height="14" rx="3" />
    </g>

    {/* Calendar button */}
    <rect
      x="430"
      y="135"
      width="29"
      height="29"
      rx="7"
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
      <rect x="437" y="145" width="14" height="12" rx="2" />
      <path d="M 441 142 L 441 146" />
      <path d="M 448 142 L 448 146" />
      <path d="M 437 150 L 451 150" />
    </g>

    {/* Description (help text below the field) */}
    <rect
      x="178"
      y="186"
      width="149"
      height="8"
      rx="3"
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
      <path d="M 178 103 L 135 103" />
      {/* Field (left edge) */}
      <path d="M 178 149 L 135 149" />
      {/* Description */}
      <path d="M 178 190 L 135 190" />
      {/* Start date (up from top border) */}
      <path d="M 231 127 L 231 81" />
      {/* End date (up from top border) */}
      <path d="M 333 127 L 333 81" />
      {/* Separator (down from bottom border) */}
      <path d="M 282 171 L 282 212" />
      {/* Calendar button (right edge) */}
      <path d="M 459 150 L 508 150" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="178" cy="103" r="4" />
      <circle cx="178" cy="149" r="4" />
      <circle cx="178" cy="190" r="4" />
      <circle cx="231" cy="127" r="4" />
      <circle cx="333" cy="127" r="4" />
      <circle cx="282" cy="171" r="4" />
      <circle cx="459" cy="150" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="fill-fd-primary transition-colors duration-300"
      fontSize="14"
      fontWeight="600"
    >
      <g textAnchor="end">
        <text x="127" y="107">
          Label
        </text>
        <text x="127" y="152">
          Field
        </text>
        <text x="127" y="194">
          Description
        </text>
      </g>
      <g textAnchor="middle">
        <text x="231" y="74">
          Start date
        </text>
        <text x="333" y="74">
          End date
        </text>
        <text x="282" y="225">
          Separator
        </text>
      </g>
      <text x="516" y="153" textAnchor="start">
        Calendar button
      </text>
    </g>
  </svg>
);
