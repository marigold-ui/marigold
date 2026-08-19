export const PaginationAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Pagination: a Previous button, Page buttons from the First page to the Last page with an Ellipsis for the hidden ones, and a Next button"
    viewBox="-31 56 660 155"
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

    {/* Selected page gets a filled, bordered control; the rest are plain numbers */}
    <rect
      x="157"
      y="118"
      width="31"
      height="30"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />

    {/* Page numbers */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="13"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-foreground transition-colors duration-300"
    >
      {/* First page (selected) */}
      <text x="172.5" y="138">
        1
      </text>
      <text x="212.5" y="138">
        2
      </text>
      <text x="252.5" y="138">
        3
      </text>
      <text x="292.5" y="138">
        4
      </text>
      <text x="331.5" y="138">
        5
      </text>
      {/* Last page */}
      <text x="411.5" y="138">
        24
      </text>
    </g>

    {/* Ellipsis hiding the remaining pages */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <circle cx="367" cy="135" r="2" />
      <circle cx="372" cy="135" r="2" />
      <circle cx="377" cy="135" r="2" />
    </g>

    {/* Bracket spanning all page buttons */}
    <path
      d="M 155 160 L 155 166 L 424 166 L 424 160"
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
      <path d="M 118 133 L 80 133" />
      {/* Next button -> right */}
      <path d="M 466 133 L 505 133" />
      {/* First page -> up */}
      <path d="M 172.5 118 L 172.5 80" />
      {/* Last page -> up */}
      <path d="M 411.5 122 L 411.5 80" />
      {/* Ellipsis -> up */}
      <path d="M 372 131 L 372 100" />
      {/* Page buttons -> down */}
      <path d="M 289.5 166 L 289.5 186" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="118" cy="133" r="4" />
      <circle cx="466" cy="133" r="4" />
      <circle cx="172.5" cy="118" r="4" />
      <circle cx="411.5" cy="122" r="4" />
      <circle cx="372" cy="131" r="4" />
      <circle cx="289.5" cy="166" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="12"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="172.5" y="74">
          First page
        </text>
        <text x="411.5" y="74">
          Last page
        </text>
        <text x="372" y="94">
          Ellipsis
        </text>
        <text x="289.5" y="198">
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
