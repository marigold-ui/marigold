export const SectionMessageAnatomy = () => (
  <svg
    viewBox="-20 55 760 250"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Container */}
    <rect
      x="160"
      y="130"
      width="400"
      height="160"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Icon */}
    <circle
      cx="196"
      cy="166"
      r="14"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Title */}
    <rect
      x="222"
      y="160"
      width="160"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Content lines */}
    <rect
      x="222"
      y="196"
      width="300"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="222"
      y="214"
      width="280"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="222"
      y="232"
      width="240"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Close Button */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 528 160 L 540 172" />
      <path d="M 540 160 L 528 172" />
    </g>

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Icon -> left */}
      <path d="M 182 166 L 100 166" />
      {/* Container -> bottom left */}
      <path d="M 160 268 L 100 268" />
      {/* Title -> top */}
      <path d="M 302 160 L 302 90" />
      {/* Content -> right */}
      <path d="M 522 219 L 620 219" />
      {/* Close button -> right */}
      <path d="M 542 166 L 620 166" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="182" cy="166" r="4" />
      <circle cx="160" cy="268" r="4" />
      <circle cx="302" cy="160" r="4" />
      <circle cx="522" cy="219" r="4" />
      <circle cx="542" cy="166" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="90"
          y="170"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Icon
        </text>
        <text
          x="90"
          y="272"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Container
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="630"
          y="170"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Close button
        </text>
        <text
          x="630"
          y="223"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Content
        </text>
      </g>
      <text
        x="302"
        y="78"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Title
      </text>
    </g>
  </svg>
);
