export const BreadcrumbsAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of Breadcrumbs: Breadcrumbs items joined by Separators"
    viewBox="60 40 580 145"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Breadcrumb items (the last one is the current page) */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="260" y="140" width="60" height="12" rx="4" />
      <rect x="366" y="140" width="90" height="12" rx="4" />
    </g>
    <rect
      x="502"
      y="140"
      width="80"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Separators between the items */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 340 140 L 348 146 L 340 152" />
      <path d="M 476 140 L 484 146 L 476 152" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Separator -> up */}
      <path d="M 344 136 L 344 78" />
      {/* Breadcrumbs item -> left */}
      <path d="M 260 146 L 200 146" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="344" cy="136" r="4" />
      <circle cx="260" cy="146" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="344" y="70" textAnchor="middle">
        Separator
      </text>
      <text x="190" y="150" textAnchor="end">
        Breadcrumbs item
      </text>
    </g>
  </svg>
);
