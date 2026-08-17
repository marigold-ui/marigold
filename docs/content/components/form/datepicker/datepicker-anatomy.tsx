export const DatePickerAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a DatePicker: a Label above a Date field with a Calendar button, opening a popover whose Header sits above the calendar grid"
    viewBox="120 5 790 505"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the date field */}
    <rect
      x="300"
      y="60"
      width="100"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Date field (segments the user can type into) */}
    <rect
      x="300"
      y="90"
      width="420"
      height="52"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Date value inside the field */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="320" y="110" width="24" height="12" rx="4" />
      <rect x="356" y="110" width="24" height="12" rx="4" />
      <rect x="392" y="110" width="40" height="12" rx="4" />
    </g>
    {/* Calendar button that opens the popover */}
    <rect
      x="666"
      y="106"
      width="20"
      height="20"
      rx="4"
      className="fill-fd-card stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="666"
      y="106"
      width="20"
      height="7"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Popover holding the calendar */}
    <rect
      x="300"
      y="154"
      width="420"
      height="316"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Calendar header: month and year select boxes */}
    <rect
      x="322"
      y="176"
      width="90"
      height="36"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="336"
      y="188"
      width="34"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="424"
      y="176"
      width="90"
      height="36"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="438"
      y="188"
      width="38"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Chevrons of the select boxes */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 386 190 L 392 197 L 398 190" />
      <path d="M 490 190 L 496 197 L 502 190" />
    </g>
    {/* Step buttons of the calendar header */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 606 186 L 596 194 L 606 202" />
      <path d="M 642 186 L 652 194 L 642 202" />
    </g>

    {/* Weekday headers */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      {[340, 396, 452, 508, 564, 620, 676].map(x => (
        <rect key={x} x={x - 10} y="238" width="20" height="9" rx="3" />
      ))}
    </g>
    {/* Dates of the grid (7 columns x 5 weeks) */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      {[276, 316, 356, 396, 436].map(y =>
        [340, 396, 452, 508, 564, 620, 676].map(x => (
          <rect
            key={`${x}-${y}`}
            x={x - 9}
            y={y}
            width="18"
            height="9"
            rx="3"
          />
        ))
      )}
    </g>
    {/* Selected date */}
    <circle
      cx="676"
      cy="320"
      r="15"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="667"
      y="316"
      width="18"
      height="9"
      rx="3"
      className="fill-fd-primary-foreground transition-colors duration-300"
    />

    {/* Bracket grouping the calendar header */}
    <path
      d="M 320 170 L 312 170 L 312 218 L 320 218"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label -> up */}
      <path d="M 350 60 L 350 34" />
      {/* Date field -> left */}
      <path d="M 300 116 L 240 116" />
      {/* Calendar button -> right */}
      <path d="M 700 116 L 770 116" />
      {/* Header -> left */}
      <path d="M 312 194 L 240 194" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="350" cy="60" r="4" />
      <circle cx="300" cy="116" r="4" />
      <circle cx="700" cy="116" r="4" />
      <circle cx="312" cy="194" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="350" y="26" textAnchor="middle">
        Label
      </text>
      <g textAnchor="end">
        <text x="230" y="120">
          Date field
        </text>
        <text x="230" y="198">
          Header
        </text>
      </g>
      <text x="780" y="120" textAnchor="start">
        Calendar button
      </text>
    </g>
  </svg>
);
