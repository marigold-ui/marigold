export const AppFrameStructure = () => (
  <svg
    viewBox="40 58 640 385"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* App frame container */}
    <rect
      x="200"
      y="70"
      width="330"
      height="360"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Top bar divider */}
    <rect
      x="200"
      y="118"
      width="330"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Top bar: logo */}
    <rect
      x="216"
      y="88"
      width="36"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Top bar: toggle */}
    <rect
      x="262"
      y="86"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    {/* Top bar: breadcrumbs */}
    <rect
      x="290"
      y="90"
      width="70"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    {/* Top bar: user menu */}
    <circle
      cx="506"
      cy="94"
      r="9"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Divider between rail and panel */}
    <rect
      x="264"
      y="120"
      width="2"
      height="310"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Rail tile 1 (active section) */}
    <rect
      x="208"
      y="134"
      width="48"
      height="42"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="224"
      y="141"
      width="14"
      height="14"
      rx="4"
      className="fill-fd-accent-foreground/70 transition-colors duration-300"
    />
    <rect
      x="217"
      y="161"
      width="30"
      height="7"
      rx="3.5"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Rail tile 2 */}
    <rect
      x="224"
      y="196"
      width="14"
      height="14"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="218"
      y="216"
      width="28"
      height="7"
      rx="3.5"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Rail tile 3 */}
    <rect
      x="224"
      y="246"
      width="14"
      height="14"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="218"
      y="266"
      width="28"
      height="7"
      rx="3.5"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Divider between panel and page */}
    <rect
      x="360"
      y="120"
      width="2"
      height="310"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Panel title */}
    <rect
      x="278"
      y="138"
      width="56"
      height="9"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Panel row 1 (active leaf) */}
    <rect
      x="272"
      y="160"
      width="82"
      height="22"
      rx="5"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="280"
      y="167"
      width="50"
      height="8"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Panel rows 2 + 3 */}
    <rect
      x="280"
      y="196"
      width="44"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="280"
      y="218"
      width="58"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Page: heading + description */}
    <rect
      x="378"
      y="140"
      width="90"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="378"
      y="158"
      width="120"
      height="7"
      rx="3.5"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Page: content panels */}
    <rect
      x="378"
      y="182"
      width="136"
      height="64"
      rx="8"
      className="fill-fd-muted-foreground/10 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <rect
      x="378"
      y="258"
      width="136"
      height="64"
      rx="8"
      className="fill-fd-muted-foreground/10 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 200 94 L 160 94" />
      <path d="M 232 300 L 160 300" />
      <path d="M 300 400 L 160 400" />
      <path d="M 530 220 L 590 220" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="94" r="4" />
      <circle cx="232" cy="300" r="4" />
      <circle cx="300" cy="400" r="4" />
      <circle cx="530" cy="220" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="150"
          y="98"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Top Navigation
        </text>
        <text
          x="150"
          y="304"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Rail
        </text>
        <text
          x="150"
          y="404"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Section panel
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="600"
          y="224"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Page
        </text>
      </g>
    </g>
  </svg>
);

export const AppFrameStructureSingle = () => (
  <svg
    viewBox="40 58 675 385"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* App frame container */}
    <rect
      x="200"
      y="70"
      width="330"
      height="360"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Divider between sidebar and the rest */}
    <rect
      x="290"
      y="70"
      width="2"
      height="360"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Sidebar header: logo + title */}
    <rect
      x="214"
      y="88"
      width="18"
      height="18"
      rx="5"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="240"
      y="93"
      width="40"
      height="9"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Sidebar item 1 (active) */}
    <rect
      x="208"
      y="130"
      width="74"
      height="24"
      rx="5"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="216"
      y="138"
      width="44"
      height="8"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Sidebar items 2 + 3 */}
    <rect
      x="216"
      y="170"
      width="40"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="216"
      y="196"
      width="52"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Sidebar footer */}
    <rect
      x="200"
      y="380"
      width="90"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />
    <circle
      cx="222"
      cy="404"
      r="9"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="238"
      y="400"
      width="36"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Top bar divider */}
    <rect
      x="292"
      y="118"
      width="238"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Top bar: toggle */}
    <rect
      x="306"
      y="86"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    {/* Top bar: breadcrumbs */}
    <rect
      x="334"
      y="90"
      width="64"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    {/* Top bar: user menu */}
    <circle
      cx="506"
      cy="94"
      r="9"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Page: heading + description */}
    <rect
      x="308"
      y="140"
      width="90"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="308"
      y="158"
      width="120"
      height="7"
      rx="3.5"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Page: content panels */}
    <rect
      x="308"
      y="182"
      width="206"
      height="64"
      rx="8"
      className="fill-fd-muted-foreground/10 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <rect
      x="308"
      y="258"
      width="206"
      height="64"
      rx="8"
      className="fill-fd-muted-foreground/10 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 245 300 L 160 300" />
      <path d="M 530 94 L 590 94" />
      <path d="M 530 220 L 590 220" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="245" cy="300" r="4" />
      <circle cx="530" cy="94" r="4" />
      <circle cx="530" cy="220" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="150"
          y="304"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Sidebar
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="600"
          y="98"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Top Navigation
        </text>
        <text
          x="600"
          y="224"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Page
        </text>
      </g>
    </g>
  </svg>
);
