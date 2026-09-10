export const CardAnatomy = () => (
  <svg
    viewBox="41 21 660 351"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of a Card: Media, Header with Title and Description, Content, and Footer regions"
  >
    {/* Card Container */}
    <rect
      x="248"
      y="41"
      width="227"
      height="309"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Preview area (top corners rounded only) */}
    <path
      d="M 248 54 Q 248 41 260 41 L 462 41 Q 474 41 474 54 L 474 134 L 248 134 Z"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />

    {/* Image icon inside Preview */}
    <circle
      cx="345"
      cy="74"
      r="5"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <path
      d="M 320 111 L 347 85 L 367 103 L 386 89 L 402 111 Z"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Header - title placeholder */}
    <rect
      x="268"
      y="153"
      width="124"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Header - description placeholder */}
    <rect
      x="268"
      y="171"
      width="165"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Body - text lines */}
    <rect
      x="268"
      y="196"
      width="186"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="268"
      y="215"
      width="165"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="268"
      y="233"
      width="175"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="268"
      y="252"
      width="144"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Separator above Footer */}
    <rect
      x="268"
      y="289"
      width="186"
      height="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Footer - primary button */}
    <rect
      x="268"
      y="307"
      width="83"
      height="29"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="287"
      y="318"
      width="45"
      height="8"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Footer - secondary button */}
    <rect
      x="361"
      y="307"
      width="66"
      height="29"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <rect
      x="375"
      y="318"
      width="37"
      height="8"
      rx="4"
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
      {/* Preview -> left */}
      <path d="M 248 88 L 165 88" />
      {/* Title -> left */}
      <path d="M 268 159 L 165 159" />
      {/* Description -> left */}
      <path d="M 268 175 L 165 175" />
      {/* Body -> left */}
      <path d="M 248 227 L 165 227" />
      {/* Card -> top right */}
      <path d="M 464 52 L 578 52" />
      {/* Header -> right */}
      <path d="M 474 161 L 578 161" />
      {/* Footer -> right */}
      <path d="M 474 322 L 578 322" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="248" cy="88" r="4" />
      <circle cx="268" cy="159" r="4" />
      <circle cx="268" cy="175" r="4" />
      <circle cx="248" cy="227" r="4" />
      <circle cx="464" cy="52" r="4" />
      <circle cx="474" cy="161" r="4" />
      <circle cx="474" cy="322" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="155"
          y="92"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card.Media
        </text>
        <text
          x="155"
          y="163"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="155"
          y="179"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
        <text
          x="155"
          y="231"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card.Content
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="588"
          y="56"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card
        </text>
        <text
          x="588"
          y="165"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card.Header
        </text>
        <text
          x="588"
          y="326"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card.Footer
        </text>
      </g>
    </g>
  </svg>
);
