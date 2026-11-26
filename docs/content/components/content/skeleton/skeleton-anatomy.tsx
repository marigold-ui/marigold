export const SkeletonAnatomy = () => (
  <svg
    viewBox="0 0 660 190"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of Skeleton: a single placeholder whose width and height are set by props, shown as a line and as the rounded variant"
  >
    {/* Default placeholder: a line */}
    <rect
      x="130"
      y="78"
      width="290"
      height="28"
      rx="6"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />

    {/* Rounded variant: a circle */}
    <circle
      cx="530"
      cy="92"
      r="28"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />

    {/* Connectors and dimension lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    >
      {/* Placeholder -> up */}
      <path d="M 190 78 L 190 42" />
      {/* Rounded variant -> up */}
      <path d="M 530 64 L 530 42" />
      {/* Width, below the line */}
      <path d="M 130 132 L 420 132" />
      <path d="M 130 124 L 130 140" />
      <path d="M 420 124 L 420 140" />
      {/* Height, left of the line */}
      <path d="M 104 78 L 104 106" />
      <path d="M 96 78 L 112 78" />
      <path d="M 96 106 L 112 106" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="190" cy="78" r="4" />
      <circle cx="530" cy="64" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="190" y="32" textAnchor="middle">
        Placeholder
      </text>
      <text x="530" y="32" textAnchor="middle">
        Rounded variant
      </text>
      <text x="275" y="160" textAnchor="middle">
        width
      </text>
      <text x="88" y="97" textAnchor="end">
        height
      </text>
    </g>
  </svg>
);
