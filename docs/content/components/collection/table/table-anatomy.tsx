export const TableAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Table: sticky Header with selection checkbox and columns, Body with selectable rows and cells, and a sticky Footer summary row"
    viewBox="-60 0 950 300"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Table outline */}
    <rect
      x="200"
      y="70"
      width="420"
      height="188"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Header background */}
    <rect
      x="200"
      y="70"
      width="420"
      height="40"
      className="fill-fd-muted transition-colors duration-300"
    />

    {/* Selected row background */}
    <rect
      x="200"
      y="146"
      width="420"
      height="36"
      className="fill-fd-accent/50 transition-colors duration-300"
    />

    {/* Footer background */}
    <rect
      x="200"
      y="218"
      width="420"
      height="40"
      className="fill-fd-muted transition-colors duration-300"
    />

    {/* Row dividers */}
    <g className="stroke-fd-border transition-colors duration-300">
      <path d="M 200 110 L 620 110" strokeWidth="1.5" />
      <path d="M 200 146 L 620 146" strokeWidth="1" />
      <path d="M 200 182 L 620 182" strokeWidth="1" />
      <path d="M 200 218 L 620 218" strokeWidth="2" />
    </g>

    {/* Header checkbox (select all) */}
    <rect
      x="211"
      y="83"
      width="14"
      height="14"
      rx="3"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Header column labels */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="250" y="84" width="70" height="12" rx="3" />
      <rect x="376" y="84" width="45" height="12" rx="3" />
      <rect x="466" y="84" width="55" height="12" rx="3" />
      <rect x="574" y="84" width="30" height="12" rx="3" />
    </g>

    {/* Row checkboxes */}
    <g
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <rect
        x="211"
        y="121"
        width="14"
        height="14"
        rx="3"
        className="fill-fd-card"
      />
      <rect
        x="211"
        y="157"
        width="14"
        height="14"
        rx="3"
        className="fill-fd-primary"
      />
      <rect
        x="211"
        y="193"
        width="14"
        height="14"
        rx="3"
        className="fill-fd-card"
      />
    </g>

    {/* Row cell content */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="250" y="123" width="90" height="10" rx="3" />
      <rect x="376" y="123" width="55" height="10" rx="3" />
      <rect x="466" y="123" width="65" height="10" rx="3" />
      <rect x="569" y="123" width="35" height="10" rx="3" />

      <rect x="250" y="159" width="90" height="10" rx="3" />
      <rect x="376" y="159" width="55" height="10" rx="3" />
      <rect x="466" y="159" width="65" height="10" rx="3" />
      <rect x="569" y="159" width="35" height="10" rx="3" />

      <rect x="250" y="195" width="90" height="10" rx="3" />
      <rect x="376" y="195" width="55" height="10" rx="3" />
      <rect x="466" y="195" width="65" height="10" rx="3" />
      <rect x="569" y="195" width="35" height="10" rx="3" />
    </g>

    {/* Footer content */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="250" y="232" width="50" height="12" rx="3" />
      <rect x="560" y="232" width="44" height="12" rx="3" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Header (left edge) */}
      <path d="M 200 90 L 130 90" />
      {/* Body (left edge) */}
      <path d="M 200 164 L 130 164" />
      {/* Footer (left edge) */}
      <path d="M 200 238 L 130 238" />
      {/* Selection checkbox (up from top border) */}
      <path d="M 217 70 L 217 26" />
      {/* Column (up from top border) */}
      <path d="M 398 70 L 398 26" />
      {/* Row (right edge) */}
      <path d="M 620 164 L 690 164" />
      {/* Cell (right edge) */}
      <path d="M 604 195 L 690 195" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="90" r="4" />
      <circle cx="200" cy="164" r="4" />
      <circle cx="200" cy="238" r="4" />
      <circle cx="217" cy="70" r="4" />
      <circle cx="398" cy="70" r="4" />
      <circle cx="620" cy="164" r="4" />
      <circle cx="604" cy="195" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="fill-fd-primary transition-colors duration-300"
      fontSize="14"
      fontWeight="600"
    >
      <g textAnchor="end">
        <text x="120" y="94">
          Header
        </text>
        <text x="120" y="168">
          Body
        </text>
        <text x="120" y="242">
          Footer
        </text>
      </g>
      <g textAnchor="middle">
        <text x="217" y="16">
          Selection checkbox
        </text>
        <text x="398" y="16">
          Column
        </text>
      </g>
      <g textAnchor="start">
        <text x="700" y="168">
          Row
        </text>
        <text x="700" y="199">
          Cell
        </text>
      </g>
    </g>
  </svg>
);
