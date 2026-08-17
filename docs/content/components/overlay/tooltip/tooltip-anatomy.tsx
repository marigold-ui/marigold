export const TooltipAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Tooltip: a Trigger with a Tooltip attached to it by a Caret tip"
    viewBox="202 47 660 355"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trigger the tooltip is attached to */}
    <circle
      cx="532"
      cy="177"
      r="26"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />
    <text
      x="532"
      y="187"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="26"
      fontWeight="700"
      textAnchor="middle"
      className="fill-fd-foreground transition-colors duration-300"
    >
      ?
    </text>

    {/* Caret tip pointing at the trigger */}
    <path
      d="M 513 234 L 532 213 L 551 234 Z"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />
    {/* Tooltip holding the informative text */}
    <rect
      x="343"
      y="232"
      width="378"
      height="130"
      rx="9"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="378" y="272" width="308" height="14" rx="5" />
      <rect x="378" y="300" width="237" height="14" rx="5" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trigger -> up */}
      <path d="M 532 151 L 532 90" />
      {/* Caret tip -> right */}
      <path d="M 546 225 L 733 225" />
      {/* Tooltip -> left */}
      <path d="M 343 296 L 260 296" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="532" cy="151" r="4" />
      <circle cx="546" cy="225" r="4" />
      <circle cx="343" cy="296" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="532" y="80" textAnchor="middle">
        Trigger
      </text>
      <text x="745" y="229" textAnchor="start">
        Caret tip
      </text>
      <text x="248" y="300" textAnchor="end">
        Tooltip
      </text>
    </g>
  </svg>
);
