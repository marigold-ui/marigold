export const SegmentedControlAnatomy = () => (
  <svg
    viewBox="50 70 700 160"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of a SegmentedControl: Label, Track, Segment, Selection indicator, and Description"
  >
    {/* Field label */}
    <rect
      x="220"
      y="92"
      width="90"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Track */}
    <rect
      x="220"
      y="124"
      width="320"
      height="58"
      rx="12"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Selection indicator (raised over the first segment) */}
    <rect
      x="226"
      y="130"
      width="98"
      height="46"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />

    {/* Segment 1 label (selected) */}
    <rect
      x="251"
      y="147"
      width="48"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Segment 2 label */}
    <rect
      x="355"
      y="147"
      width="48"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Segment 3 label */}
    <rect
      x="462"
      y="147"
      width="48"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Description */}
    <rect
      x="220"
      y="196"
      width="170"
      height="10"
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
      <path d="M 220 98 L 160 98" />
      {/* Track (left edge) */}
      <path d="M 220 153 L 160 153" />
      {/* Description */}
      <path d="M 220 201 L 160 201" />
      {/* Selection indicator (right edge) */}
      <path d="M 324 144 L 580 144" />
      {/* Segment (segment 3) */}
      <path d="M 486 168 L 580 168" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="220" cy="98" r="4" />
      <circle cx="220" cy="153" r="4" />
      <circle cx="220" cy="201" r="4" />
      <circle cx="324" cy="144" r="4" />
      <circle cx="486" cy="168" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="150"
          y="102"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Label
        </text>
        <text
          x="150"
          y="157"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Track
        </text>
        <text
          x="150"
          y="205"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="590"
          y="148"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Selection indicator
        </text>
        <text
          x="590"
          y="172"
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
