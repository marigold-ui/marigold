export const DescriptionAnatomy = () => (
  <svg
    viewBox="-10 10 660 130"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Paragraph lines */}
    <rect
      x="240"
      y="38"
      width="220"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="240"
      y="55"
      width="200"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="240"
      y="72"
      width="160"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Text -> left */}
      <path d="M 240 60 L 100 60" />
      {/* Variant -> right top */}
      <path d="M 460 42 L 540 42" />
      {/* Element -> bottom right */}
      <path d="M 400 76 L 400 100 L 540 100" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="240" cy="60" r="4" />
      <circle cx="460" cy="42" r="4" />
      <circle cx="400" cy="76" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="90"
        y="64"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Text content
      </text>
      <text
        x="550"
        y="46"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Variant
      </text>
      <text
        x="550"
        y="104"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Element
      </text>
    </g>
  </svg>
);
