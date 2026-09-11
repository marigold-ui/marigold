export const ListViewAnatomy = () => (
  <svg
    viewBox="-25 -15 740 315"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of a ListView: List container holding Item rows, each with an optional selection indicator, a text value, a description, and the row's actions"
  >
    {/* List container */}
    <rect
      x="180"
      y="30"
      width="340"
      height="260"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Row 1 (highlighted Item) */}
    <rect
      x="192"
      y="42"
      width="316"
      height="72"
      rx="8"
      className="fill-fd-accent/10 stroke-fd-primary transition-colors duration-300"
      strokeWidth="1.5"
      strokeDasharray="4 4"
    />
    {/* Row 1 selection indicator (checked) */}
    <rect
      x="207"
      y="70"
      width="18"
      height="18"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <path
      d="M211 79 L215 83 L221 75"
      className="stroke-fd-card transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect
      x="239"
      y="66"
      width="120"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="239"
      y="84"
      width="90"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="458"
      y="60"
      width="24"
      height="36"
      rx="6"
      className="fill-fd-muted-foreground/10 transition-colors duration-300"
    />
    <g className="fill-fd-muted-foreground/60 transition-colors duration-300">
      <circle cx="470" cy="68" r="2.2" />
      <circle cx="470" cy="78" r="2.2" />
      <circle cx="470" cy="88" r="2.2" />
    </g>

    {/* Divider */}
    <rect
      x="192"
      y="122"
      width="316"
      height="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Row 2 */}
    {/* Row 2 selection indicator */}
    <rect
      x="207"
      y="150"
      width="18"
      height="18"
      rx="4"
      className="stroke-fd-muted-foreground transition-colors duration-300"
      fill="none"
      strokeWidth="2"
    />
    <rect
      x="239"
      y="146"
      width="100"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="239"
      y="164"
      width="140"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="458"
      y="140"
      width="24"
      height="36"
      rx="6"
      className="fill-fd-muted-foreground/10 transition-colors duration-300"
    />
    <g className="fill-fd-muted-foreground/60 transition-colors duration-300">
      <circle cx="470" cy="148" r="2.2" />
      <circle cx="470" cy="158" r="2.2" />
      <circle cx="470" cy="168" r="2.2" />
    </g>

    {/* Divider */}
    <rect
      x="192"
      y="202"
      width="316"
      height="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Row 3 */}
    {/* Row 3 selection indicator */}
    <rect
      x="207"
      y="230"
      width="18"
      height="18"
      rx="4"
      className="stroke-fd-muted-foreground transition-colors duration-300"
      fill="none"
      strokeWidth="2"
    />
    <rect
      x="239"
      y="226"
      width="130"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="239"
      y="244"
      width="80"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="458"
      y="220"
      width="24"
      height="36"
      rx="6"
      className="fill-fd-muted-foreground/10 transition-colors duration-300"
    />
    <g className="fill-fd-muted-foreground/60 transition-colors duration-300">
      <circle cx="470" cy="228" r="2.2" />
      <circle cx="470" cy="238" r="2.2" />
      <circle cx="470" cy="248" r="2.2" />
    </g>

    {/* Connector lines (all horizontal) */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M350 30 L350 4" />
      <path d="M192 55 L100 55" />
      <path d="M207 159 L100 159" />
      <path d="M359 71 L560 71" />
      <path d="M329 96 L560 96" />
      <path d="M482 158 L560 158" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="350" cy="30" r="4" />
      <circle cx="192" cy="55" r="4" />
      <circle cx="207" cy="159" r="4" />
      <circle cx="359" cy="71" r="4" />
      <circle cx="329" cy="96" r="4" />
      <circle cx="482" cy="158" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="90" y="59" textAnchor="end">
        Item
      </text>
      <text x="90" y="155" textAnchor="end">
        Selection
      </text>
      <text x="90" y="171" textAnchor="end">
        indicator
      </text>
      <text x="350" y="0" textAnchor="middle">
        List
      </text>
      <text x="570" y="75" textAnchor="start">
        Text value
      </text>
      <text x="570" y="100" textAnchor="start">
        Description
      </text>
      <text x="570" y="155" textAnchor="start">
        Actions
      </text>
      <text
        x="570"
        y="171"
        textAnchor="start"
        fontSize="12"
        fontWeight="400"
        className="fill-fd-muted-foreground transition-colors duration-300"
      >
        (e.g. Button, ActionMenu)
      </text>
    </g>
  </svg>
);
