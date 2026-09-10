export const SelectListAnatomy = () => (
  <svg
    viewBox="-18 55 660 348"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="selectlist-anatomy-clip">
        <rect x="183" y="101" width="293" height="275" rx="11" />
      </clipPath>
    </defs>

    {/* Field label */}
    <rect
      x="183"
      y="73"
      width="110"
      height="11"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Container */}
    <rect
      x="183"
      y="101"
      width="293"
      height="275"
      rx="11"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Selected row 1 fill (clipped to container so the top corners round) */}
    <g clipPath="url(#selectlist-anatomy-clip)">
      <rect
        x="183"
        y="101"
        width="293"
        height="90"
        className="fill-fd-accent transition-colors duration-300"
      />
    </g>

    {/* Row 1 (selected): radio indicator filled */}
    <circle
      cx="207"
      cy="146"
      r="9"
      className="fill-fd-card stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    <circle
      cx="207"
      cy="146"
      r="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="231"
      y="135"
      width="128"
      height="11"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />
    <rect
      x="231"
      y="153"
      width="165"
      height="9"
      rx="4"
      className="fill-fd-accent-foreground/70 transition-colors duration-300"
    />

    {/* Divider between row 1 and row 2 */}
    <rect
      x="183"
      y="191"
      width="293"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Row 2: radio indicator empty */}
    <circle
      cx="207"
      cy="237"
      r="9"
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      fill="none"
    />
    <rect
      x="231"
      y="226"
      width="119"
      height="11"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="231"
      y="245"
      width="156"
      height="9"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Divider between row 2 and row 3 */}
    <rect
      x="183"
      y="282"
      width="293"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Row 3: radio indicator empty + trailing action */}
    <circle
      cx="207"
      cy="329"
      r="9"
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      fill="none"
    />
    <rect
      x="231"
      y="318"
      width="110"
      height="11"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="231"
      y="336"
      width="147"
      height="9"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    {/* Action: 3 vertical dots (ActionMenu / IconButton placeholder) */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <circle cx="449" cy="320" r="2" />
      <circle cx="449" cy="329" r="2" />
      <circle cx="449" cy="338" r="2" />
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
      <path d="M 183 79 L 119 79" />
      {/* List (container outer) */}
      <path d="M 183 101 L 119 101" />
      {/* Selection indicator (Row 1) */}
      <path d="M 198 146 L 119 146" />
      {/* Option (whole Row 2 left edge) */}
      <path d="M 183 237 L 119 237" />

      {/* Text value (Row 1 right edge of text value rect) */}
      <path d="M 359 140 L 541 140" />
      {/* Description (Row 1 right edge of description rect) */}
      <path d="M 396 158 L 541 158" />
      {/* Action (Row 3 right of action dots) */}
      <path d="M 458 329 L 541 329" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="183" cy="79" r="4" />
      <circle cx="183" cy="101" r="4" />
      <circle cx="198" cy="146" r="4" />
      <circle cx="183" cy="237" r="4" />
      <circle cx="359" cy="140" r="4" />
      <circle cx="396" cy="158" r="4" />
      <circle cx="458" cy="329" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="110"
          y="83"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Label
        </text>
        <text
          x="110"
          y="105"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          List
        </text>
        <text
          x="110"
          y="149"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Selection indicator
        </text>
        <text
          x="110"
          y="241"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Option
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="550"
          y="144"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Text value
        </text>
        <text
          x="550"
          y="161"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
        <text
          x="550"
          y="333"
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
