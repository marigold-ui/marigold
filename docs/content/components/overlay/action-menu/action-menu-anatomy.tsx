export const ActionMenuAnatomy = () => (
  <svg
    viewBox="-10 10 660 250"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trigger button (kebab) */}
    <rect
      x="276"
      y="30"
      width="36"
      height="36"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Three vertical dots */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <circle cx="294" cy="40" r="2" />
      <circle cx="294" cy="48" r="2" />
      <circle cx="294" cy="56" r="2" />
    </g>

    {/* Connector from trigger to popover */}
    <path
      d="M 294 66 L 294 88"
      className="stroke-fd-muted-foreground/50 transition-colors duration-300"
      fill="none"
      strokeWidth="1.5"
      strokeDasharray="3 3"
    />

    {/* Popover */}
    <rect
      x="232"
      y="92"
      width="200"
      height="124"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Item rows */}
    <rect
      x="248"
      y="106"
      width="120"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="248"
      y="138"
      width="160"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="248"
      y="170"
      width="100"
      height="10"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Destructive item indicator */}
    <rect
      x="248"
      y="194"
      width="80"
      height="10"
      rx="3"
      className="fill-fd-primary/60 transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trigger -> right */}
      <path d="M 312 48 L 540 48" />
      {/* Popover -> left */}
      <path d="M 232 110 L 100 110" />
      {/* Items -> right */}
      <path d="M 432 154 L 540 154" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="312" cy="48" r="4" />
      <circle cx="232" cy="110" r="4" />
      <circle cx="432" cy="154" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="550"
        y="52"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Trigger
      </text>
      <text
        x="90"
        y="114"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Popover
      </text>
      <text
        x="550"
        y="158"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Menu items
      </text>
    </g>
  </svg>
);
