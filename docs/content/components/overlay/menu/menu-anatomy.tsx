export const MenuAnatomy = () => (
  <svg
    viewBox="0 0 720 300"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of a Menu: Trigger, Section, Menu item, Shortcut, Divider, and Selected item"
  >
    {/* Trigger button */}
    <rect
      x="300"
      y="34"
      width="130"
      height="38"
      rx="8"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="318"
      y="47"
      width="64"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Menu surface */}
    <rect
      x="300"
      y="88"
      width="210"
      height="178"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Section header */}
    <rect
      x="318"
      y="104"
      width="60"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Item A: icon + label + shortcut */}
    <rect
      x="318"
      y="126"
      width="14"
      height="14"
      rx="4"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />
    <rect
      x="340"
      y="129"
      width="78"
      height="9"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="452"
      y="129"
      width="24"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Item B: plain label */}
    <rect
      x="318"
      y="158"
      width="96"
      height="9"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Divider */}
    <rect
      x="310"
      y="184"
      width="190"
      height="2"
      rx="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Selected item: highlight + checkmark + label */}
    <rect
      x="310"
      y="198"
      width="190"
      height="28"
      rx="6"
      className="fill-fd-muted transition-colors duration-300"
    />
    <path
      d="M 320 212 l 4 4 l 8 -9"
      className="stroke-fd-foreground transition-colors duration-300"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="342"
      y="207"
      width="80"
      height="9"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Item D: plain label */}
    <rect
      x="318"
      y="244"
      width="88"
      height="9"
      rx="3"
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
      <path d="M 300 53 L 250 53" />
      <path d="M 300 108 L 250 108" />
      <path d="M 300 162 L 250 162" />
      <path d="M 476 133 L 540 133" />
      <path d="M 500 185 L 540 185" />
      <path d="M 500 212 L 540 212" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="300" cy="53" r="4" />
      <circle cx="300" cy="108" r="4" />
      <circle cx="300" cy="162" r="4" />
      <circle cx="476" cy="133" r="4" />
      <circle cx="500" cy="185" r="4" />
      <circle cx="500" cy="212" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="240" y="57">
          Trigger
        </text>
        <text x="240" y="112">
          Section
        </text>
        <text x="240" y="166">
          Menu item
        </text>
      </g>
      <g textAnchor="start">
        <text x="550" y="137">
          Shortcut
        </text>
        <text x="550" y="189">
          Divider
        </text>
        <text x="550" y="216">
          Selected item
        </text>
      </g>
    </g>
  </svg>
);
