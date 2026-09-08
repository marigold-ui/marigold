export const RangeCalendarAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a RangeCalendar: a Header with a Month select box, a Year select box and Step buttons, above a Grid whose selected Range runs from a Start date to an End date"
    viewBox="109 -2 660 522"
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
    {/* Chevrons of the two select boxes */}
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

    {/* Highlighted band spanning the selected range */}
    <rect
      x="388"
      y="378"
      width="209"
      height="32"
      rx="8"
      className="fill-fd-accent transition-colors duration-300"
    />
    {/* Start and end date of the range */}
    <g className="fill-fd-primary transition-colors duration-300">
      <rect x="388" y="378" width="32" height="32" rx="8" />
      <rect x="565" y="378" width="32" height="32" rx="8" />
    </g>

    {/* Dates of the grid (7 columns x 5 weeks) */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      {[212, 256, 300, 345, 389].map(y =>
        [276, 335, 394, 453, 512, 571, 630].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="20" height="10" rx="3" />
        ))
      )}
    </g>
    {/* Dates sitting on the start and end of the range */}
    <g className="fill-fd-primary-foreground transition-colors duration-300">
      <rect x="394" y="389" width="20" height="10" rx="3" />
      <rect x="571" y="389" width="20" height="10" rx="3" />
    </g>

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
      <path d="M 236 110 L 205 110" />
      {/* Grid -> left */}
      <path d="M 236 285 L 205 285" />
      {/* Month select box -> up */}
      <path d="M 320 89 L 320 65" />
      {/* Year select box -> up */}
      <path d="M 444 89 L 444 30" />
      {/* Step buttons -> up */}
      <path d="M 579 98 L 579 65" />
      {/* Start date -> down */}
      <path d="M 404 410 L 404 448" />
      {/* End date -> down */}
      <path d="M 581 410 L 581 448" />
      {/* Range -> down */}
      <path d="M 492 410 L 492 483" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="236" cy="110" r="4" />
      <circle cx="236" cy="285" r="4" />
      <circle cx="320" cy="89" r="4" />
      <circle cx="444" cy="89" r="4" />
      <circle cx="579" cy="98" r="4" />
      <circle cx="404" cy="410" r="4" />
      <circle cx="581" cy="410" r="4" />
      <circle cx="492" cy="410" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="195" y="114">
          Header
        </text>
        <text x="195" y="289">
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
        <text x="579" y="57">
          Step buttons
        </text>
        <text x="404" y="470">
          Start date
        </text>
        <text x="581" y="470">
          End date
        </text>
        <text x="492" y="505">
          Range
        </text>
      </g>
    </g>
  </svg>
);
