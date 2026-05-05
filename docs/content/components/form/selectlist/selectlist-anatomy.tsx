export const SelectListAnatomy = () => (
  <svg
    viewBox="-20 60 720 380"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="selectlist-anatomy-clip">
        <rect x="200" y="110" width="320" height="300" rx="12" />
      </clipPath>
    </defs>

    {/* Field label */}
    <rect
      x="200"
      y="80"
      width="120"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Container */}
    <rect
      x="200"
      y="110"
      width="320"
      height="300"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Selected row 1 fill (clipped to container so the top corners round) */}
    <g clipPath="url(#selectlist-anatomy-clip)">
      <rect
        x="200"
        y="110"
        width="320"
        height="98"
        className="fill-fd-accent transition-colors duration-300"
      />
    </g>

    {/* Row 1 (selected): radio indicator filled */}
    <circle
      cx="226"
      cy="159"
      r="10"
      className="fill-fd-card stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    <circle
      cx="226"
      cy="159"
      r="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="252"
      y="147"
      width="140"
      height="12"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />
    <rect
      x="252"
      y="167"
      width="180"
      height="10"
      rx="4"
      className="fill-fd-accent-foreground/70 transition-colors duration-300"
    />

    {/* Divider between row 1 and row 2 */}
    <rect
      x="200"
      y="208"
      width="320"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Row 2: radio indicator empty */}
    <circle
      cx="226"
      cy="259"
      r="10"
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      fill="none"
    />
    <rect
      x="252"
      y="247"
      width="130"
      height="12"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="252"
      y="267"
      width="170"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Divider between row 2 and row 3 */}
    <rect
      x="200"
      y="308"
      width="320"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Row 3: radio indicator empty + trailing action */}
    <circle
      cx="226"
      cy="359"
      r="10"
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      fill="none"
    />
    <rect
      x="252"
      y="347"
      width="120"
      height="12"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="252"
      y="367"
      width="160"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    {/* Action: 3 vertical dots (ActionMenu / IconButton placeholder) */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <circle cx="490" cy="349" r="2.2" />
      <circle cx="490" cy="359" r="2.2" />
      <circle cx="490" cy="369" r="2.2" />
    </g>

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label */}
      <path d="M 200 86 L 130 86" />
      {/* List (container outer) */}
      <path d="M 200 110 L 130 110" />
      {/* Selection indicator (Row 1) */}
      <path d="M 216 159 L 130 159" />
      {/* Option (whole Row 2 left edge) */}
      <path d="M 200 259 L 130 259" />

      {/* Text value (Row 1 right edge of text value rect) */}
      <path d="M 392 153 L 590 153" />
      {/* Description (Row 1 right edge of description rect) */}
      <path d="M 432 172 L 590 172" />
      {/* Action (Row 3 right of action dots) */}
      <path d="M 500 359 L 590 359" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="86" r="4" />
      <circle cx="200" cy="110" r="4" />
      <circle cx="216" cy="159" r="4" />
      <circle cx="200" cy="259" r="4" />
      <circle cx="392" cy="153" r="4" />
      <circle cx="432" cy="172" r="4" />
      <circle cx="500" cy="359" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="120"
          y="90"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Label
        </text>
        <text
          x="120"
          y="114"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          List
        </text>
        <text
          x="120"
          y="163"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Selection indicator
        </text>
        <text
          x="120"
          y="263"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Option
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="600"
          y="157"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Text value
        </text>
        <text
          x="600"
          y="176"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
        <text
          x="600"
          y="363"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Action
        </text>
      </g>
    </g>
  </svg>
);
