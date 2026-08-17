export const PaginationAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Pagination: a Previous button, Page buttons from the First page to the Last page with an Ellipsis for the hidden ones, and a Next button"
    viewBox="-31 56 660 143"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Previous and next buttons */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 137 126 L 130 133 L 137 139" />
      <path d="M 448 126 L 454 133 L 448 139" />
    </g>

    {/* Page buttons */}
    <g className="fill-fd-foreground transition-colors duration-300">
      {/* First page */}
      <rect x="168" y="128" width="9" height="9" rx="3" />
      <rect x="208" y="128" width="9" height="9" rx="3" />
      <rect x="248" y="128" width="9" height="9" rx="3" />
      <rect x="288" y="128" width="9" height="9" rx="3" />
      <rect x="327" y="128" width="9" height="9" rx="3" />
      {/* Last page */}
      <rect x="407" y="128" width="9" height="9" rx="3" />
    </g>
    {/* Ellipsis hiding the remaining pages */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <circle cx="367" cy="135" r="2" />
      <circle cx="372" cy="135" r="2" />
      <circle cx="377" cy="135" r="2" />
    </g>

    {/* Bracket spanning all page buttons */}
    <path
      d="M 163 147 L 163 153 L 421 153 L 421 147"
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Previous button -> left */}
      <path d="M 126 133 L 80 133" />
      {/* Next button -> right */}
      <path d="M 458 133 L 505 133" />
      {/* First page -> up */}
      <path d="M 173 128 L 173 80" />
      {/* Last page -> up */}
      <path d="M 412 128 L 412 80" />
      {/* Ellipsis -> up */}
      <path d="M 372 131 L 372 100" />
      {/* Page buttons -> down */}
      <path d="M 292 153 L 292 173" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="126" cy="133" r="4" />
      <circle cx="458" cy="133" r="4" />
      <circle cx="173" cy="128" r="4" />
      <circle cx="412" cy="128" r="4" />
      <circle cx="372" cy="131" r="4" />
      <circle cx="292" cy="153" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="173" y="74">
          First page
        </text>
        <text x="412" y="74">
          Last page
        </text>
        <text x="372" y="94">
          Ellipsis
        </text>
        <text x="292" y="185">
          Page buttons
        </text>
      </g>
      <text x="73" y="135" textAnchor="end">
        Previous button
      </text>
      <text x="511" y="135" textAnchor="start">
        Next button
      </text>
    </g>
  </svg>
);
