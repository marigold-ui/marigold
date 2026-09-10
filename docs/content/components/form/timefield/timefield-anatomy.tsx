export const TimeFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a TimeField: a Label above a Field made up of editable Segments"
    viewBox="194 20 660 288"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the segments */}
    <rect
      x="340"
      y="92"
      width="118"
      height="16"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Field (the group holding all segments) */}
    <rect
      x="340"
      y="126"
      width="393"
      height="63"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Focused segment (hour) */}
    <rect
      x="361"
      y="141"
      width="47"
      height="31"
      rx="5"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="372"
      y="152"
      width="26"
      height="10"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Remaining time segments */}
    <g className="fill-fd-foreground transition-colors duration-300">
      {/* Minute */}
      <rect x="422" y="152" width="26" height="10" rx="4" />
      {/* Second */}
      <rect x="461" y="152" width="26" height="10" rx="4" />
    </g>
    {/* Literal separators between the segments */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="411" y="160" width="5" height="5" rx="3" />
      <rect x="450" y="160" width="5" height="5" rx="3" />
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
      <path d="M 393 92 L 393 58" />
      {/* Field -> up */}
      <path d="M 655 126 L 655 58" />
      {/* Segment -> down */}
      <path d="M 385 173 L 385 244" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="393" cy="92" r="4" />
      <circle cx="655" cy="126" r="4" />
      <circle cx="385" cy="173" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="393" y="47">
        Label
      </text>
      <text x="655" y="47">
        Field
      </text>
      <text x="385" y="267">
        Segment
      </text>
    </g>
  </svg>
);
