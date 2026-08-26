export const TooltipAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Tooltip: a Tooltip sitting above its Trigger, attached to it by a Caret tip"
    viewBox="0 14 660 221"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Tooltip surface and its caret, drawn as one group: overlapping translucent
        shapes would otherwise double up into a visible seam where they meet. */}
    <g
      className="fill-fd-muted-foreground transition-colors duration-300"
      opacity="0.2"
    >
      <rect x="160" y="30" width="340" height="108" rx="9" />
      {/* Caret points down, since a tooltip defaults to `placement="top"` */}
      <path d="M 311 137 L 330 157 L 349 137 Z" />
    </g>
    {/* Informative text the tooltip holds */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="194" y="64" width="272" height="12" rx="5" />
      <rect x="194" y="90" width="210" height="12" rx="5" />
    </g>

    {/* Trigger the tooltip is attached to */}
    <circle
      cx="330"
      cy="195"
      r="24"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />
    <text
      x="330"
      y="204"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="24"
      fontWeight="700"
      textAnchor="middle"
      className="fill-fd-foreground transition-colors duration-300"
    >
      ?
    </text>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Tooltip -> left */}
      <path d="M 160 84 L 96 84" />
      {/* Caret tip -> right */}
      <path d="M 340 147 L 520 147" />
      {/* Trigger -> left */}
      <path d="M 306 195 L 96 195" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="160" cy="84" r="4" />
      <circle cx="340" cy="147" r="4" />
      <circle cx="306" cy="195" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="88" y="88" textAnchor="end">
        Tooltip
      </text>
      <text x="529" y="151" textAnchor="start">
        Caret tip
      </text>
      <text x="88" y="199" textAnchor="end">
        Trigger
      </text>
    </g>
  </svg>
);
