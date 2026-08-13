export const TooltipAnatomy = () => (
  <svg
    viewBox="140 40 620 300"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trigger the tooltip is attached to */}
    <circle
      cx="450"
      cy="150"
      r="22"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />
    <text
      x="450"
      y="158"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="22"
      fontWeight="700"
      textAnchor="middle"
      className="fill-fd-foreground transition-colors duration-300"
    >
      ?
    </text>

    {/* Caret tip pointing at the trigger */}
    <path
      d="M 434 198 L 450 180 L 466 198 Z"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />
    {/* Tooltip holding the informative text */}
    <rect
      x="290"
      y="196"
      width="320"
      height="110"
      rx="8"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="320" y="230" width="260" height="12" rx="4" />
      <rect x="320" y="254" width="200" height="12" rx="4" />
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
      <path d="M 450 128 L 450 76" />
      {/* Caret tip -> right */}
      <path d="M 462 190 L 620 190" />
      {/* Tooltip -> left */}
      <path d="M 290 250 L 220 250" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="450" cy="128" r="4" />
      <circle cx="462" cy="190" r="4" />
      <circle cx="290" cy="250" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="450" y="68" textAnchor="middle">
        Trigger
      </text>
      <text x="630" y="194" textAnchor="start">
        Caret tip
      </text>
      <text x="210" y="254" textAnchor="end">
        Tooltip
      </text>
    </g>
  </svg>
);
