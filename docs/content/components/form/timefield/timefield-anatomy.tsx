export const TimeFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a TimeField: a Label above a Field made up of editable Segments"
    viewBox="120 15 560 220"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the segments */}
    <rect
      x="260"
      y="70"
      width="90"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Field (the group holding all segments) */}
    <rect
      x="260"
      y="96"
      width="300"
      height="48"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Focused segment (hour) */}
    <rect
      x="276"
      y="108"
      width="36"
      height="24"
      rx="4"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="284"
      y="116"
      width="20"
      height="8"
      rx="3"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Remaining time segments */}
    <g className="fill-fd-foreground transition-colors duration-300">
      {/* Minute */}
      <rect x="322" y="116" width="20" height="8" rx="3" />
      {/* Second */}
      <rect x="352" y="116" width="20" height="8" rx="3" />
    </g>
    {/* Literal separators between the segments */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="314" y="122" width="4" height="4" rx="2" />
      <rect x="344" y="122" width="4" height="4" rx="2" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label -> up */}
      <path d="M 300 70 L 300 44" />
      {/* Field -> up */}
      <path d="M 500 96 L 500 44" />
      {/* Segment -> down */}
      <path d="M 294 132 L 294 186" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="300" cy="70" r="4" />
      <circle cx="500" cy="96" r="4" />
      <circle cx="294" cy="132" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="300" y="36">
        Label
      </text>
      <text x="500" y="36">
        Field
      </text>
      <text x="294" y="204">
        Segment
      </text>
    </g>
  </svg>
);
