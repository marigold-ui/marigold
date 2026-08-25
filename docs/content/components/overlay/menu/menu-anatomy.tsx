export const MenuAnatomy = () => (
  <svg
    viewBox="0 0 660 275"
    viewBox="0 0 660 275"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of a Menu: Trigger, Section, Menu item, Shortcut, Divider, and Selected item"
  >
    {/* Trigger button */}
    <rect
      x="275"
      y="31.17"
      width="119.17"
      height="34.83"
      rx="7.33"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="291.5"
      y="43.08"
      width="58.67"
      height="11"
      rx="3.67"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Menu surface */}
    <rect
      x="275"
      y="80.67"
      width="192.5"
      height="163.17"
      rx="11"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Section header */}
    <rect
      x="291.5"
      y="95.33"
      width="55"
      height="8.25"
      rx="2.75"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Item A: icon + label + shortcut */}
    <rect
      x="291.5"
      y="115.5"
      width="12.83"
      height="12.83"
      rx="3.67"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />
    <rect
      x="311.67"
      y="118.25"
      width="71.5"
      height="8.25"
      rx="2.75"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="414.33"
      y="118.25"
      width="22"
      height="8.25"
      rx="2.75"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Item B: plain label */}
    <rect
      x="291.5"
      y="144.83"
      width="88"
      height="8.25"
      rx="2.75"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Divider */}
    <rect
      x="284.17"
      y="168.67"
      width="174.17"
      height="1.83"
      rx="0.92"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Selected item: highlight + checkmark + label */}
    <rect
      x="284.17"
      y="181.5"
      width="174.17"
      height="25.67"
      rx="5.5"
      className="fill-fd-muted transition-colors duration-300"
    />
    <path
      d="M 293.33 194.33 l 3.67 3.67 l 7.33 -8.25"
      className="stroke-fd-foreground transition-colors duration-300"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="313.5"
      y="189.75"
      width="73.33"
      height="8.25"
      rx="2.75"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Item D: plain label */}
    <rect
      x="291.5"
      y="223.67"
      width="80.67"
      height="8.25"
      rx="2.75"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 275 48.58 L 229.17 48.58" />
      <path d="M 275 99 L 229.17 99" />
      <path d="M 275 148.5 L 229.17 148.5" />
      <path d="M 436.33 121.92 L 495 121.92" />
      <path d="M 458.33 169.58 L 495 169.58" />
      <path d="M 458.33 194.33 L 495 194.33" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="275" cy="48.58" r="4" />
      <circle cx="275" cy="99" r="4" />
      <circle cx="275" cy="148.5" r="4" />
      <circle cx="436.33" cy="121.92" r="4" />
      <circle cx="458.33" cy="169.58" r="4" />
      <circle cx="458.33" cy="194.33" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="220" y="52.25">
          Trigger
        </text>
        <text x="220" y="102.67">
          Section
        </text>
        <text x="220" y="152.17">
          Menu item
        </text>
      </g>
      <g textAnchor="start">
        <text x="504.17" y="125.58">
          Shortcut
        </text>
        <text x="504.17" y="173.25">
          Divider
        </text>
        <text x="504.17" y="198">
          Selected item
        </text>
      </g>
    </g>
  </svg>
);
