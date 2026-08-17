export const BreadcrumbsAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of Breadcrumbs: Breadcrumbs items joined by Separators"
    viewBox="113 51 660 183"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Breadcrumb items (the last one is the current page) */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="329" y="177" width="76" height="15" rx="5" />
      <rect x="463" y="177" width="114" height="15" rx="5" />
    </g>
    <rect
      x="635"
      y="177"
      width="101"
      height="15"
      rx="5"
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
      <path d="M 430 177 L 440 185 L 430 192" />
      <path d="M 602 177 L 612 185 L 602 192" />
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
      <path d="M 435 172 L 435 99" />
      {/* Breadcrumbs item -> left */}
      <path d="M 329 185 L 253 185" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="435" cy="172" r="4" />
      <circle cx="329" cy="185" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="435" y="89" textAnchor="middle">
        Separator
      </text>
      <text x="240" y="190" textAnchor="end">
        Breadcrumbs item
      </text>
    </g>
  </svg>
);
