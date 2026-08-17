export const CalendarAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Calendar: a Header with a Month select box, a Year select box and Step buttons, above a Grid of selectable Dates"
    viewBox="110 5 700 440"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Header: month select box */}
    <rect
      x="270"
      y="90"
      width="110"
      height="44"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="286"
      y="106"
      width="40"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Header: year select box */}
    <rect
      x="396"
      y="90"
      width="110"
      height="44"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="412"
      y="106"
      width="44"
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
      <path d="M 350 108 L 356 116 L 362 108" />
      <path d="M 476 108 L 482 116 L 488 108" />
    </g>
    {/* Step buttons (previous / next month) */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 570 100 L 558 112 L 570 124" />
      <path d="M 606 100 L 618 112 L 606 124" />
    </g>

    {/* Weekday headers of the grid */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="279" y="170" width="22" height="10" rx="3" />
      <rect x="339" y="170" width="22" height="10" rx="3" />
      <rect x="399" y="170" width="22" height="10" rx="3" />
      <rect x="459" y="170" width="22" height="10" rx="3" />
      <rect x="519" y="170" width="22" height="10" rx="3" />
      <rect x="579" y="170" width="22" height="10" rx="3" />
      <rect x="639" y="170" width="22" height="10" rx="3" />
    </g>

    {/* Dates of the grid (7 columns x 5 weeks) */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      {[215, 260, 305, 350, 395].map(y =>
        [280, 340, 400, 460, 520, 580, 640].map(x => (
          <rect key={`${x}-${y}`} x={x} y={y} width="20" height="10" rx="3" />
        ))
      )}
    </g>
    {/* Selected date */}
    <circle
      cx="650"
      cy="265"
      r="16"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="640"
      y="260"
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
      <path d="M 248 84 L 240 84 L 240 140 L 248 140" />
      {/* Grid */}
      <path d="M 248 158 L 240 158 L 240 420 L 248 420" />
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
      <path d="M 240 112 L 190 112" />
      {/* Grid -> left */}
      <path d="M 240 289 L 190 289" />
      {/* Month select box -> up */}
      <path d="M 325 90 L 325 66" />
      {/* Year select box -> up */}
      <path d="M 451 90 L 451 30" />
      {/* Step buttons -> right */}
      <path d="M 628 112 L 700 112" />
      {/* Date -> right */}
      <path d="M 666 265 L 700 265" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="240" cy="112" r="4" />
      <circle cx="240" cy="289" r="4" />
      <circle cx="325" cy="90" r="4" />
      <circle cx="451" cy="90" r="4" />
      <circle cx="628" cy="112" r="4" />
      <circle cx="666" cy="265" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="180" y="116">
          Header
        </text>
        <text x="180" y="293">
          Grid
        </text>
      </g>
      <g textAnchor="middle">
        <text x="325" y="58">
          Month select box
        </text>
        <text x="451" y="22">
          Year select box
        </text>
      </g>
      <g textAnchor="start">
        <text x="710" y="116">
          Step buttons
        </text>
        <text x="710" y="269">
          Date
        </text>
      </g>
    </g>
  </svg>
);
