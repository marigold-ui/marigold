export const CommandPaletteAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a CommandPalette: a Button above the open palette, which sits on the Underlay and holds a Search field, Groups of Items with an Active row, the List and a Legend"
    viewBox="0 0 660 320"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Button: looks like a search field, with a compass and the shortcut */}
    <rect
      x="255"
      y="14"
      width="150"
      height="28"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <circle cx="270" cy="28" r="6" />
      <path d="M 272.5 25.5 L 271 29.5 L 267.5 30.5 L 269 26.5 Z" />
    </g>
    <rect
      x="283"
      y="24"
      width="56"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="370"
      y="21"
      width="26"
      height="14"
      rx="3"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />

    {/* Underlay dimming the page behind the palette */}
    <rect
      x="170"
      y="56"
      width="320"
      height="260"
      rx="6"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />

    {/* Palette */}
    <rect
      x="200"
      y="72"
      width="260"
      height="228"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Search field: icon and query */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    >
      <circle cx="218" cy="90" r="5" />
      <path d="M 221.5 93.5 L 225 97" />
    </g>
    <rect
      x="234"
      y="86"
      width="110"
      height="9"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="200"
      y="108"
      width="260"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Group 1 title */}
    <rect
      x="216"
      y="121"
      width="50"
      height="7"
      rx="3"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Active row: highlight, icon and label */}
    <rect
      x="208"
      y="136"
      width="244"
      height="28"
      rx="6"
      className="fill-fd-muted transition-colors duration-300"
    />
    <rect
      x="216"
      y="144"
      width="12"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="236"
      y="146"
      width="90"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Item */}
    <rect
      x="216"
      y="176"
      width="12"
      height="12"
      rx="3"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="236"
      y="178"
      width="70"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Group 2 title and items */}
    <rect
      x="216"
      y="204"
      width="44"
      height="7"
      rx="3"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />
    <g className="fill-fd-muted-foreground/50 transition-colors duration-300">
      <rect x="216" y="219" width="12" height="12" rx="3" />
      <rect x="216" y="243" width="12" height="12" rx="3" />
    </g>
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="236" y="221" width="100" height="8" rx="3" />
      <rect x="236" y="245" width="80" height="8" rx="3" />
    </g>

    {/* Legend: key caps with their labels, in the footer */}
    <rect
      x="200"
      y="266"
      width="260"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />
    <g
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    >
      <rect x="318" y="278" width="12" height="11" rx="2.5" />
      <rect x="364" y="278" width="12" height="11" rx="2.5" />
      <rect x="408" y="278" width="12" height="11" rx="2.5" />
    </g>
    <g className="fill-fd-muted-foreground/70 transition-colors duration-300">
      <rect x="334" y="280.5" width="22" height="6" rx="2.5" />
      <rect x="380" y="280.5" width="20" height="6" rx="2.5" />
      <rect x="424" y="280.5" width="24" height="6" rx="2.5" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Button -> left */}
      <path d="M 255 28 L 160 28" />
      {/* Search field -> left */}
      <path d="M 200 90 L 160 90" />
      {/* Group -> left */}
      <path d="M 216 124.5 L 160 124.5" />
      {/* Underlay -> left */}
      <path d="M 185 300 L 160 300" />
      {/* Active row -> right */}
      <path d="M 452 150 L 500 150" />
      {/* Item -> right */}
      <path d="M 452 182 L 500 182" />
      {/* List -> right */}
      <path d="M 460 236 L 500 236" />
      {/* Legend -> right */}
      <path d="M 448 283.5 L 500 283.5" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="255" cy="28" r="4" />
      <circle cx="200" cy="90" r="4" />
      <circle cx="216" cy="124.5" r="4" />
      <circle cx="185" cy="300" r="4" />
      <circle cx="452" cy="150" r="4" />
      <circle cx="452" cy="182" r="4" />
      <circle cx="460" cy="236" r="4" />
      <circle cx="448" cy="283.5" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="152" y="33">
          Button
        </text>
        <text x="152" y="95">
          Search field
        </text>
        <text x="152" y="129">
          Group
        </text>
        <text x="152" y="305">
          Underlay
        </text>
      </g>
      <g textAnchor="start">
        <text x="508" y="155">
          Active row
        </text>
        <text x="508" y="187">
          Item
        </text>
        <text x="508" y="241">
          List
        </text>
        <text x="508" y="288">
          Legend
        </text>
      </g>
    </g>
  </svg>
);
