export const PaginationAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Pagination: a Previous button, Page buttons from the First page to the Last page with an Ellipsis for the hidden ones, and a Next button"
    viewBox="0 85 900 215"
    className="mx-auto h-auto w-full max-w-[100%]"
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
      <path d="M 206 190 L 196 200 L 206 210" />
      <path d="M 674 190 L 684 200 L 674 210" />
    </g>

    {/* Page buttons */}
    <g className="fill-fd-foreground transition-colors duration-300">
      {/* First page */}
      <rect x="253" y="193" width="14" height="14" rx="4" />
      <rect x="313" y="193" width="14" height="14" rx="4" />
      <rect x="373" y="193" width="14" height="14" rx="4" />
      <rect x="433" y="193" width="14" height="14" rx="4" />
      <rect x="493" y="193" width="14" height="14" rx="4" />
      {/* Last page */}
      <rect x="613" y="193" width="14" height="14" rx="4" />
    </g>
    {/* Ellipsis hiding the remaining pages */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <circle cx="552" cy="204" r="3" />
      <circle cx="560" cy="204" r="3" />
      <circle cx="568" cy="204" r="3" />
    </g>

    {/* Bracket spanning all page buttons */}
    <path
      d="M 246 222 L 246 230 L 634 230 L 634 222"
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
      <path d="M 190 200 L 120 200" />
      {/* Next button -> right */}
      <path d="M 690 200 L 760 200" />
      {/* First page -> up */}
      <path d="M 260 193 L 260 120" />
      {/* Last page -> up */}
      <path d="M 620 193 L 620 120" />
      {/* Ellipsis -> up */}
      <path d="M 560 198 L 560 150" />
      {/* Page buttons -> down */}
      <path d="M 440 230 L 440 260" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="190" cy="200" r="4" />
      <circle cx="690" cy="200" r="4" />
      <circle cx="260" cy="193" r="4" />
      <circle cx="620" cy="193" r="4" />
      <circle cx="560" cy="198" r="4" />
      <circle cx="440" cy="230" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="260" y="112">
          First page
        </text>
        <text x="620" y="112">
          Last page
        </text>
        <text x="560" y="142">
          Ellipsis
        </text>
        <text x="440" y="278">
          Page buttons
        </text>
      </g>
      <text x="110" y="204" textAnchor="end">
        Previous button
      </text>
      <text x="770" y="204" textAnchor="start">
        Next button
      </text>
    </g>
  </svg>
);
