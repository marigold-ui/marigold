export const MenuAnatomy = () => (
  <svg
    viewBox="0 0 660 275"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of a Menu: Trigger, Section, Menu item, Shortcut, Divider, and Selected item"
  >
    {/* Trigger button */}
    <rect
      x="275"
      y="31"
      width="119"
      height="35"
      rx="7"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="292"
      y="43"
      width="59"
      height="11"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Menu surface */}
    <rect
      x="275"
      y="81"
      width="193"
      height="163"
      rx="11"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Section header */}
    <rect
      x="292"
      y="95"
      width="55"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Item A: icon + label + shortcut */}
    <rect
      x="292"
      y="116"
      width="13"
      height="13"
      rx="4"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />
    <rect
      x="312"
      y="118"
      width="72"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="414"
      y="118"
      width="22"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Item B: plain label */}
    <rect
      x="292"
      y="145"
      width="88"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Divider */}
    <rect
      x="284"
      y="169"
      width="174"
      height="2"
      rx="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Selected item: highlight + checkmark + label */}
    <rect
      x="284"
      y="182"
      width="174"
      height="26"
      rx="6"
      className="fill-fd-muted transition-colors duration-300"
    />
    <path
      d="M 293 194 l 4 4 l 7 -8"
      className="stroke-fd-foreground transition-colors duration-300"
      fill="none"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="314"
      y="190"
      width="73"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Item D: plain label */}
    <rect
      x="292"
      y="224"
      width="81"
      height="8"
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
      <path d="M 275 49 L 229 49" />
      <path d="M 275 99 L 229 99" />
      <path d="M 275 149 L 229 149" />
      <path d="M 436 122 L 495 122" />
      <path d="M 458 170 L 495 170" />
      <path d="M 458 194 L 495 194" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="275" cy="49" r="4" />
      <circle cx="275" cy="99" r="4" />
      <circle cx="275" cy="149" r="4" />
      <circle cx="436" cy="122" r="4" />
      <circle cx="458" cy="170" r="4" />
      <circle cx="458" cy="194" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="220" y="52">
          Trigger
        </text>
        <text x="220" y="103">
          Section
        </text>
        <text x="220" y="152">
          Menu item
        </text>
      </g>
      <g textAnchor="start">
        <text x="504" y="126">
          Shortcut
        </text>
        <text x="504" y="173">
          Divider
        </text>
        <text x="504" y="198">
          Selected item
        </text>
      </g>
    </g>
  </svg>
);
