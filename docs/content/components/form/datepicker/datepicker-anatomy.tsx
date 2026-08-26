export const DatePickerAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a DatePicker: a Label above a Date field with a Calendar button, opening a popover whose Header sits above the calendar grid"
    viewBox="48 -2 660 435"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the date field */}
    <rect
      x="255"
      y="51"
      width="85"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Date field (segments the user can type into) */}
    <rect
      x="255"
      y="76"
      width="357"
      height="44"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Date value inside the field */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="272" y="93" width="20" height="10" rx="3" />
      <rect x="302" y="93" width="20" height="10" rx="3" />
      <rect x="333" y="93" width="34" height="10" rx="3" />
    </g>
    {/* Calendar button that opens the popover */}
    <rect
      x="566"
      y="90"
      width="17"
      height="17"
      rx="3"
      className="fill-fd-card stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="566"
      y="90"
      width="17"
      height="6"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Popover holding the calendar */}
    <rect
      x="255"
      y="131"
      width="357"
      height="268"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Calendar header: month and year select boxes */}
    <rect
      x="273"
      y="149"
      width="76"
      height="31"
      rx="5"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="285"
      y="160"
      width="29"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="360"
      y="149"
      width="76"
      height="31"
      rx="5"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="372"
      y="160"
      width="32"
      height="8"
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
      <path d="M 328 161 L 333 167 L 338 161" />
      <path d="M 416 161 L 421 167 L 426 161" />
    </g>
    {/* Step buttons of the calendar header */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 515 158 L 506 165 L 515 172" />
      <path d="M 545 158 L 554 165 L 545 172" />
    </g>

    {/* Weekday headers */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      {[289, 336, 384, 431, 479, 527, 574].map(x => (
        <rect key={x} x={x - 8} y="202" width="17" height="8" rx="3" />
      ))}
    </g>
    {/* Dates of the grid (7 columns x 5 weeks) */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      {[234, 268, 302, 336, 370].map(y =>
        [289, 336, 384, 431, 479, 527, 574].map(x => (
          <rect
            key={`${x}-${y}`}
            x={x - 8}
            y={y}
            width="15"
            height="8"
            rx="3"
          />
        ))
      )}
    </g>
    {/* Selected date */}
    <circle
      cx="574"
      cy="272"
      r="13"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="567"
      y="268"
      width="15"
      height="8"
      rx="3"
      className="fill-fd-primary-foreground transition-colors duration-300"
    />

    {/* Bracket grouping the calendar header */}
    <path
      d="M 272 144 L 265 144 L 265 185 L 272 185"
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
      <path d="M 297 51 L 297 29" />
      {/* Date field -> left */}
      <path d="M 255 99 L 204 99" />
      {/* Calendar button -> up, off the top border above the button */}
      <path d="M 575 76 L 575 30" />
      {/* Header -> left */}
      <path d="M 265 165 L 204 165" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="297" cy="51" r="4" />
      <circle cx="255" cy="99" r="4" />
      <circle cx="575" cy="76" r="4" />
      <circle cx="265" cy="165" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="297" y="22">
          Label
        </text>
        <text x="575" y="22">
          Calendar button
        </text>
      </g>
      <g textAnchor="end">
        <text x="195" y="102">
          Date field
        </text>
        <text x="195" y="168">
          Header
        </text>
      </g>
    </g>
  </svg>
);
