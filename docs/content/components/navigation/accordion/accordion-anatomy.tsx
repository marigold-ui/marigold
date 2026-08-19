export const AccordionAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of an Accordion: Items that each pair a Header with the Content it expands"
    viewBox="83 46 660 234"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Header of the expanded item */}
    <rect
      x="202"
      y="64"
      width="422"
      height="59"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Title inside the header */}
    <rect
      x="226"
      y="88"
      width="83"
      height="11"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Panel holding the content of the expanded item */}
    <rect
      x="202"
      y="130"
      width="422"
      height="66"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Content inside the panel */}
    <rect
      x="226"
      y="156"
      width="110"
      height="11"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />

    {/* Header of the collapsed item */}
    <rect
      x="202"
      y="204"
      width="422"
      height="59"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="226"
      y="227"
      width="83"
      height="11"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Chevrons indicating the expanded / collapsed state */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 585 89 L 594 98 L 603 89" />
      <path d="M 589 224 L 599 233 L 589 242" />
    </g>

    {/* Bracket grouping header and panel into one item */}
    <path
      d="M 642 64 L 653 64 L 653 196 L 642 196"
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
      {/* Header -> left */}
      <path d="M 202 94 L 147 94" />
      {/* Content -> left */}
      <path d="M 202 161 L 147 161" />
      {/* Item -> right */}
      <path d="M 653 130 L 697 130" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="202" cy="94" r="4" />
      <circle cx="202" cy="161" r="4" />
      <circle cx="653" cy="130" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="12"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="138" y="97">
          Header
        </text>
        <text x="138" y="165">
          Content
        </text>
      </g>
      <text x="706" y="134" textAnchor="start">
        Item
      </text>
    </g>
  </svg>
);
