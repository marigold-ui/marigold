export const ToolbarAnatomy = () => (
  <svg
    viewBox="0 0 640 160"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Toolbar container outline */}
    <rect
      x="120"
      y="56"
      width="400"
      height="52"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
      strokeDasharray="4 4"
    />

    {/* Search / input */}
    <rect
      x="136"
      y="68"
      width="130"
      height="28"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />

    {/* Separator */}
    <line
      x1="282"
      y1="66"
      x2="282"
      y2="98"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Action 1 */}
    <rect
      x="300"
      y="68"
      width="64"
      height="28"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />
    {/* Action 2 */}
    <rect
      x="372"
      y="68"
      width="64"
      height="28"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />

    {/* More */}
    <rect
      x="452"
      y="68"
      width="52"
      height="28"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />
    <g className="fill-fd-foreground/40 transition-colors duration-300">
      <circle cx="478" cy="76" r="2" />
      <circle cx="478" cy="82" r="2" />
      <circle cx="478" cy="88" r="2" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M 120 82 L 60 82" />
      <path d="M 520 82 L 584 82" />
      <path d="M 218 56 L 218 34" />
      <path d="M 282 108 L 282 134" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="120" cy="82" r="4" />
      <circle cx="520" cy="82" r="4" />
      <circle cx="218" cy="56" r="4" />
      <circle cx="282" cy="108" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="52" y="86" textAnchor="end">
        Toolbar
      </text>
      <text x="592" y="86" textAnchor="start">
        More
      </text>
      <text x="218" y="26" textAnchor="middle">
        Controls
      </text>
      <text x="282" y="150" textAnchor="middle">
        Separator
      </text>
    </g>
  </svg>
);
