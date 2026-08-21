export const CalendarAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Calendar: a Header with a Month select box, a Year select box and Step buttons, above a Grid of selectable Dates"
    viewBox="123 5 660 433"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Header: month select box */}
    <rect
      x="266"
      y="89"
      width="108"
      height="43"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="282"
      y="104"
      width="39"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Header: year select box */}
    <rect
      x="390"
      y="89"
      width="108"
      height="43"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="406"
      y="104"
      width="43"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Chevrons of the two select boxes and the step buttons */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 345 106 L 351 114 L 356 106" />
      <path d="M 469 106 L 475 114 L 481 106" />
    </g>
    {/* Step buttons (previous / next month) */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 561 98 L 549 110 L 561 122" />
      <path d="M 597 98 L 609 110 L 597 122" />
    </g>

    {/* Weekday headers of the grid */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="275" y="167" width="22" height="10" rx="3" />
      <rect x="334" y="167" width="22" height="10" rx="3" />
      <rect x="393" y="167" width="22" height="10" rx="3" />
      <rect x="452" y="167" width="22" height="10" rx="3" />
      <rect x="511" y="167" width="22" height="10" rx="3" />
      <rect x="570" y="167" width="22" height="10" rx="3" />
      <rect x="629" y="167" width="22" height="10" rx="3" />
    </g>

    {/* Dates of the grid (7 columns x 5 weeks) */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      {[212, 256, 300, 345, 389].map(y =>
        [276, 335, 394, 453, 512, 571, 630].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="20" height="10" rx="3" />
        ))
      )}
    </g>
    {/* Selected date */}
    <circle
      cx="640"
      cy="261"
      r="16"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="630"
      y="256"
      width="20"
      height="10"
      rx="3"
      className="fill-fd-primary-foreground transition-colors duration-300"
    />

    {/* Brackets grouping the header and the grid */}
    <g
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      {/* Header */}
      <path d="M 244 83 L 236 83 L 236 138 L 244 138" />
      {/* Grid */}
      <path d="M 244 156 L 236 156 L 236 414 L 244 414" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Header -> left */}
      <path d="M 236 110 L 187 110" />
      {/* Grid -> left */}
      <path d="M 236 285 L 187 285" />
      {/* Month select box -> up */}
      <path d="M 320 89 L 320 65" />
      {/* Year select box -> up */}
      <path d="M 444 89 L 444 30" />
      {/* Step buttons -> right */}
      <path d="M 618 110 L 689 110" />
      {/* Date -> right */}
      <path d="M 656 261 L 689 261" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="236" cy="110" r="4" />
      <circle cx="236" cy="285" r="4" />
      <circle cx="320" cy="89" r="4" />
      <circle cx="444" cy="89" r="4" />
      <circle cx="618" cy="110" r="4" />
      <circle cx="656" cy="261" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="177" y="114">
          Header
        </text>
        <text x="177" y="289">
          Grid
        </text>
      </g>
      <g textAnchor="middle">
        <text x="320" y="57">
          Month select box
        </text>
        <text x="444" y="22">
          Year select box
        </text>
      </g>
      <g textAnchor="start">
        <text x="699" y="114">
          Step buttons
        </text>
        <text x="699" y="265">
          Date
        </text>
      </g>
    </g>
  </svg>
);
