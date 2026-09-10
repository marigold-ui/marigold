export const ActionBarAnatomy = () => (
  <svg
    viewBox="0 0 660 204"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* ActionBar container */}
    <rect
      x="175"
      y="89"
      width="311"
      height="47"
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
      <path d="M193 108 l10 10" />
      <path d="M203 108 l-10 10" />
    </g>

    {/* Selection count */}
    <text
      x="219"
      y="117"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      className="fill-fd-foreground transition-colors duration-300"
    >
      3 selected
    </text>

    {/* Divider between selection summary and toolbar */}
    <path
      d="M303 99 L303 126"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Toolbar wrapper around the action buttons */}
    <rect
      x="314"
      y="97"
      width="159"
      height="31"
      rx="8"
      className="stroke-fd-border transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeDasharray="4 4"
    />

    {/* Action buttons */}
    <rect
      x="322"
      y="103"
      width="45"
      height="19"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />
    <rect
      x="375"
      y="103"
      width="45"
      height="19"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />
    <rect
      x="427"
      y="103"
      width="39"
      height="19"
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
      <path d="M198 103 L198 56 L146 56" />
      {/* Selection count -> up-right */}
      <path d="M248 101 L248 56 L320 56" />
      {/* Toolbar -> down-left */}
      <path d="M330 128 L330 169 L291 169" />
      {/* Action button -> down-right */}
      <path d="M444 122 L444 169 L505 169" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="198" cy="103" r="4" />
      <circle cx="248" cy="101" r="4" />
      <circle cx="330" cy="128" r="4" />
      <circle cx="444" cy="122" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="138" y="60" textAnchor="end">
        Clear button
      </text>
      <text x="328" y="60" textAnchor="start">
        Selection count
      </text>
      <text x="283" y="173" textAnchor="end">
        Toolbar
      </text>
      <text x="512" y="173" textAnchor="start">
        Action
      </text>
    </g>
  </svg>
);
