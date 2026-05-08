export const CardAnatomy = () => (
  <svg
    viewBox="40 20 640 340"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Card Container */}
    <rect
      x="240"
      y="40"
      width="220"
      height="300"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Preview area (top corners rounded only) */}
    <path
      d="M 240 52 Q 240 40 252 40 L 448 40 Q 460 40 460 52 L 460 130 L 240 130 Z"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />

    {/* Image icon inside Preview */}
    <circle
      cx="335"
      cy="72"
      r="5"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <path
      d="M 310 108 L 336 82 L 356 100 L 374 86 L 390 108 Z"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Header - title placeholder */}
    <rect
      x="260"
      y="150"
      width="120"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Header - badge placeholder */}
    <rect
      x="398"
      y="148"
      width="42"
      height="18"
      rx="9"
      className="fill-fd-accent transition-colors duration-300"
    />

    {/* Body - text lines */}
    <rect
      x="260"
      y="190"
      width="180"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="260"
      y="208"
      width="160"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="260"
      y="226"
      width="170"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="260"
      y="244"
      width="140"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Separator above Footer */}
    <rect
      x="260"
      y="280"
      width="180"
      height="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Footer - primary button */}
    <rect
      x="260"
      y="298"
      width="80"
      height="28"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="278"
      y="308"
      width="44"
      height="8"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Footer - secondary button */}
    <rect
      x="350"
      y="298"
      width="64"
      height="28"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <rect
      x="364"
      y="308"
      width="36"
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
      <path d="M 240 85 L 160 85" />
      {/* Body -> left */}
      <path d="M 240 220 L 160 220" />
      {/* Card -> top right */}
      <path d="M 450 50 L 560 50" />
      {/* Header -> right */}
      <path d="M 460 156 L 560 156" />
      {/* Footer -> right */}
      <path d="M 460 312 L 560 312" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="240" cy="85" r="4" />
      <circle cx="240" cy="220" r="4" />
      <circle cx="450" cy="50" r="4" />
      <circle cx="460" cy="156" r="4" />
      <circle cx="460" cy="312" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="150"
          y="89"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card.Preview
        </text>
        <text
          x="150"
          y="224"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card.Body
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="570"
          y="54"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card
        </text>
        <text
          x="570"
          y="160"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Card.Header
        </text>
        <text
          x="570"
          y="316"
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
