export const SegmentedControlAnatomy = () => (
  <svg
    viewBox="47 66 660 151"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of a SegmentedControl: Label, Track, Segment, Selection indicator, and Description"
  >
    {/* Field label */}
    <rect
      x="207"
      y="87"
      width="85"
      height="11"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Track */}
    <rect
      x="207"
      y="117"
      width="302"
      height="55"
      rx="11"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Selection indicator (raised over the first segment) */}
    <rect
      x="213"
      y="123"
      width="92"
      height="43"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />

    {/* Segment 1 label (selected) */}
    <rect
      x="237"
      y="139"
      width="45"
      height="11"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Segment 2 label */}
    <rect
      x="335"
      y="139"
      width="45"
      height="11"
      rx="4"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Segment 3 label */}
    <rect
      x="436"
      y="139"
      width="45"
      height="11"
      rx="4"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Description */}
    <rect
      x="207"
      y="185"
      width="160"
      height="9"
      rx="4"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
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
      <path d="M 207 92 L 151 92" />
      {/* Track (left edge) */}
      <path d="M 207 144 L 151 144" />
      {/* Description */}
      <path d="M 207 190 L 151 190" />
      {/* Selection indicator (right edge) */}
      <path d="M 305 136 L 547 136" />
      {/* Segment (segment 3) */}
      <path d="M 458 158 L 547 158" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="207" cy="92" r="4" />
      <circle cx="207" cy="144" r="4" />
      <circle cx="207" cy="190" r="4" />
      <circle cx="305" cy="136" r="4" />
      <circle cx="458" cy="158" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="141"
          y="96"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Label
        </text>
        <text
          x="141"
          y="148"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Track
        </text>
        <text
          x="141"
          y="193"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="556"
          y="140"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Selection indicator
        </text>
        <text
          x="556"
          y="162"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Segment
        </text>
      </g>
    </g>
  </svg>
);
