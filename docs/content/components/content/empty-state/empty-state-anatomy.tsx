export const EmptyStateAnatomy = () => (
  <svg
    viewBox="75 25 545 285"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of an EmptyState: a centered container holding the built-in illustration, a title, a description, and an action"
  >
    {/* Container: a centered column that paints no surface of its own */}
    <rect
      x="230"
      y="40"
      width="280"
      height="254"
      rx="8"
      className="stroke-fd-border transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeDasharray="4 4"
    />

    {/* Illustration: placeholder standing in for the built-in artwork */}
    <rect
      x="295"
      y="64"
      width="150"
      height="84"
      rx="8"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />
    <circle
      cx="340"
      cy="94"
      r="7"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <path
      d="M 320 128 L 352 100 L 372 118 L 392 98 L 420 128 Z"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Title */}
    <rect
      x="295"
      y="172"
      width="150"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Description lines */}
    <rect
      x="270"
      y="190"
      width="200"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="300"
      y="206"
      width="140"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Action */}
    <rect
      x="320"
      y="240"
      width="100"
      height="30"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="344"
      y="251"
      width="52"
      height="8"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Illustration -> left */}
      <path d="M 295 106 L 180 106" />
      {/* Description -> left */}
      <path d="M 270 195 L 180 195" />
      {/* Container -> bottom left */}
      <path d="M 230 276 L 180 276" />
      {/* Title -> right */}
      <path d="M 445 179 L 550 179" />
      {/* Action -> right */}
      <path d="M 420 255 L 550 255" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="295" cy="106" r="4" />
      <circle cx="270" cy="195" r="4" />
      <circle cx="230" cy="276" r="4" />
      <circle cx="445" cy="179" r="4" />
      <circle cx="420" cy="255" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="170"
          y="110"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Illustration
        </text>
        <text
          x="170"
          y="199"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
        <text
          x="170"
          y="280"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Container
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="560"
          y="183"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="560"
          y="259"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Action
        </text>
      </g>
    </g>
  </svg>
);
