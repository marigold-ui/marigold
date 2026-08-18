export const EmptyStateAnatomy = () => (
  <svg
    viewBox="91 30 660 345"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of an EmptyState: a centered container holding the built-in illustration, a title, a description, and an action"
  >
    {/* Container: a centered column that paints no surface of its own */}
    <rect
      x="279"
      y="48"
      width="339"
      height="308"
      rx="10"
      className="stroke-fd-border transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeDasharray="4 4"
    />

    {/* Illustration: placeholder standing in for the built-in artwork */}
    <rect
      x="357"
      y="78"
      width="182"
      height="102"
      rx="10"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />
    <circle
      cx="412"
      cy="114"
      r="8"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <path
      d="M 388 155 L 426 121 L 450 143 L 475 119 L 509 155 Z"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Title */}
    <rect
      x="357"
      y="208"
      width="182"
      height="17"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Description lines */}
    <rect
      x="327"
      y="230"
      width="242"
      height="12"
      rx="5"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="363"
      y="249"
      width="170"
      height="12"
      rx="5"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Action */}
    <rect
      x="388"
      y="291"
      width="121"
      height="36"
      rx="7"
      className="fill-fd-accent stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="417"
      y="304"
      width="63"
      height="10"
      rx="5"
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
      <path d="M 357 128 L 218 128" />
      {/* Description -> left */}
      <path d="M 327 236 L 218 236" />
      {/* Container -> bottom left */}
      <path d="M 279 334 L 218 334" />
      {/* Title -> right */}
      <path d="M 539 217 L 666 217" />
      {/* Action -> right */}
      <path d="M 509 309 L 666 309" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="357" cy="128" r="4" />
      <circle cx="327" cy="236" r="4" />
      <circle cx="279" cy="334" r="4" />
      <circle cx="539" cy="217" r="4" />
      <circle cx="509" cy="309" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="206"
          y="133"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Illustration
        </text>
        <text
          x="206"
          y="241"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
        <text
          x="206"
          y="339"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Container
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="678"
          y="222"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="678"
          y="314"
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
