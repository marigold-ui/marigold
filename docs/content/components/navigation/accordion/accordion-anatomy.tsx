export const AccordionAnatomy = () => (
  <svg
    viewBox="70 50 760 255"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Header of the expanded item */}
    <rect
      x="220"
      y="70"
      width="460"
      height="64"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Title inside the header */}
    <rect
      x="246"
      y="96"
      width="90"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Panel holding the content of the expanded item */}
    <rect
      x="220"
      y="142"
      width="460"
      height="72"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Content inside the panel */}
    <rect
      x="246"
      y="170"
      width="120"
      height="12"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />

    {/* Header of the collapsed item */}
    <rect
      x="220"
      y="222"
      width="460"
      height="64"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="246"
      y="248"
      width="90"
      height="12"
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
      <path d="M 638 97 L 648 107 L 658 97" />
      <path d="M 643 244 L 653 254 L 643 264" />
    </g>

    {/* Bracket grouping header and panel into one item */}
    <path
      d="M 700 70 L 712 70 L 712 214 L 700 214"
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
      <path d="M 220 102 L 160 102" />
      {/* Content -> left */}
      <path d="M 220 176 L 160 176" />
      {/* Item -> right */}
      <path d="M 712 142 L 760 142" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="220" cy="102" r="4" />
      <circle cx="220" cy="176" r="4" />
      <circle cx="712" cy="142" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="150" y="106">
          Header
        </text>
        <text x="150" y="180">
          Content
        </text>
      </g>
      <text x="770" y="146" textAnchor="start">
        Item
      </text>
    </g>
  </svg>
);
