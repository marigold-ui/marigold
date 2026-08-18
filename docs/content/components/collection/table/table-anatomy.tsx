export const TableAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Table: sticky Header with selection checkbox and columns, Body with selectable rows and cells, and a sticky Footer summary row"
    viewBox="-42 -6 660 214"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Table outline */}
    <rect
      x="139"
      y="49"
      width="292"
      height="131"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Header background */}
    <rect
      x="139"
      y="49"
      width="292"
      height="28"
      className="fill-fd-muted transition-colors duration-300"
    />

    {/* Selected row background */}
    <rect
      x="139"
      y="101"
      width="292"
      height="25"
      className="fill-fd-accent/50 transition-colors duration-300"
    />

    {/* Footer background */}
    <rect
      x="139"
      y="151"
      width="292"
      height="28"
      className="fill-fd-muted transition-colors duration-300"
    />

    {/* Row dividers */}
    <g className="stroke-fd-border transition-colors duration-300">
      <path d="M 139 76 L 431 76" strokeWidth="1.5" />
      <path d="M 139 101 L 431 101" strokeWidth="1" />
      <path d="M 139 126 L 431 126" strokeWidth="1" />
      <path d="M 139 151 L 431 151" strokeWidth="2" />
    </g>

    {/* Header checkbox (select all) */}
    <rect
      x="147"
      y="58"
      width="10"
      height="10"
      rx="2"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Header column labels */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="174" y="58" width="49" height="8" rx="2" />
      <rect x="261" y="58" width="31" height="8" rx="2" />
      <rect x="324" y="58" width="38" height="8" rx="2" />
      <rect x="399" y="58" width="21" height="8" rx="2" />
    </g>

    {/* Row checkboxes */}
    <g
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <rect
        x="147"
        y="84"
        width="10"
        height="10"
        rx="2"
        className="fill-fd-card"
      />
      <rect
        x="147"
        y="109"
        width="10"
        height="10"
        rx="2"
        className="fill-fd-primary"
      />
      <rect
        x="147"
        y="134"
        width="10"
        height="10"
        rx="2"
        className="fill-fd-card"
      />
    </g>

    {/* Row cell content */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="174" y="85" width="63" height="7" rx="2" />
      <rect x="261" y="85" width="38" height="7" rx="2" />
      <rect x="324" y="85" width="45" height="7" rx="2" />
      <rect x="395" y="85" width="24" height="7" rx="2" />

      <rect x="174" y="110" width="63" height="7" rx="2" />
      <rect x="261" y="110" width="38" height="7" rx="2" />
      <rect x="324" y="110" width="45" height="7" rx="2" />
      <rect x="395" y="110" width="24" height="7" rx="2" />

      <rect x="174" y="135" width="63" height="7" rx="2" />
      <rect x="261" y="135" width="38" height="7" rx="2" />
      <rect x="324" y="135" width="45" height="7" rx="2" />
      <rect x="395" y="135" width="24" height="7" rx="2" />
    </g>

    {/* Footer content */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="174" y="161" width="35" height="8" rx="2" />
      <rect x="389" y="161" width="31" height="8" rx="2" />
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
      <path d="M 139 63 L 90 63" />
      {/* Body (left edge) */}
      <path d="M 139 114 L 90 114" />
      {/* Footer (left edge) */}
      <path d="M 139 165 L 90 165" />
      {/* Selection checkbox (up from top border) */}
      <path d="M 151 49 L 151 18" />
      {/* Column (up from top border) */}
      <path d="M 277 49 L 277 18" />
      {/* Row (right edge) */}
      <path d="M 431 114 L 479 114" />
      {/* Cell (right edge) */}
      <path d="M 420 135 L 479 135" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="139" cy="63" r="4" />
      <circle cx="139" cy="114" r="4" />
      <circle cx="139" cy="165" r="4" />
      <circle cx="151" cy="49" r="4" />
      <circle cx="277" cy="49" r="4" />
      <circle cx="431" cy="114" r="4" />
      <circle cx="420" cy="135" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="fill-fd-primary transition-colors duration-300"
      fontSize="14"
      fontWeight="600"
    >
      <g textAnchor="end">
        <text x="83" y="65">
          Header
        </text>
        <text x="83" y="117">
          Body
        </text>
        <text x="83" y="168">
          Footer
        </text>
      </g>
      <g textAnchor="middle">
        <text x="151" y="11">
          Selection checkbox
        </text>
        <text x="277" y="11">
          Column
        </text>
      </g>
      <g textAnchor="start">
        <text x="486" y="117">
          Row
        </text>
        <text x="486" y="138">
          Cell
        </text>
      </g>
    </g>
  </svg>
);
