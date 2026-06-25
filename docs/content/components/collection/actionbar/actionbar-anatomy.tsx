export const ActionBarAnatomy = () => (
  <svg
    viewBox="0 0 680 210"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* ActionBar container */}
    <rect
      x="180"
      y="92"
      width="320"
      height="48"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Clear button */}
    <g
      className="stroke-fd-foreground/60 transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M199 111 l10 10" />
      <path d="M209 111 l-10 10" />
    </g>

    {/* Selection count */}
    <text
      x="226"
      y="121"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      className="fill-fd-foreground transition-colors duration-300"
    >
      3 selected
    </text>

    {/* Divider between selection summary and toolbar */}
    <path
      d="M312 102 L312 130"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Toolbar wrapper around the action buttons */}
    <rect
      x="324"
      y="100"
      width="164"
      height="32"
      rx="8"
      className="stroke-fd-border transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeDasharray="4 4"
    />

    {/* Action buttons */}
    <rect
      x="332"
      y="106"
      width="46"
      height="20"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />
    <rect
      x="386"
      y="106"
      width="46"
      height="20"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />
    <rect
      x="440"
      y="106"
      width="40"
      height="20"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Clear button -> up-left */}
      <path d="M204 106 L204 58 L150 58" />
      {/* Selection count -> up-right */}
      <path d="M256 104 L256 58 L330 58" />
      {/* Toolbar -> down-left */}
      <path d="M340 132 L340 174 L300 174" />
      {/* Action button -> down-right */}
      <path d="M457 126 L457 174 L520 174" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="204" cy="106" r="4" />
      <circle cx="256" cy="104" r="4" />
      <circle cx="340" cy="132" r="4" />
      <circle cx="457" cy="126" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="142" y="62" textAnchor="end">
        Clear button
      </text>
      <text x="338" y="62" textAnchor="start">
        Selection count
      </text>
      <text x="292" y="178" textAnchor="end">
        Toolbar
      </text>
      <text x="528" y="178" textAnchor="start">
        Action
      </text>
    </g>
  </svg>
);
