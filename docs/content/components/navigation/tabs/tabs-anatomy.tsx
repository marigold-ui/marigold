export const TabsAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of Tabs: a Tab list of Tabs with the selected one marked, above the Tab panel showing its content"
    viewBox="165 58 660 425"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Selected tab and its indicator */}
    <rect
      x="386"
      y="154"
      width="90"
      height="18"
      rx="5"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="381"
      y="188"
      width="100"
      height="4"
      rx="2"
      className="fill-fd-primary transition-colors duration-300"
    />
    {/* Remaining tabs */}
    <rect
      x="515"
      y="154"
      width="90"
      height="18"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="643"
      y="154"
      width="90"
      height="18"
      rx="5"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Tab panel showing the content of the selected tab */}
    <rect
      x="373"
      y="219"
      width="437"
      height="232"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Content inside the panel */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="409" y="262" width="283" height="15" rx="5" />
      <rect x="409" y="298" width="232" height="15" rx="5" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Tab list -> left */}
      <path d="M 381 163 L 296 163" />
      {/* Tab (selected) -> up */}
      <path d="M 431 154 L 431 98" />
      {/* Tab -> up */}
      <path d="M 560 154 L 560 98" />
      {/* Tab panel -> left */}
      <path d="M 373 335 L 296 335" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="381" cy="163" r="4" />
      <circle cx="431" cy="154" r="4" />
      <circle cx="560" cy="154" r="4" />
      <circle cx="373" cy="335" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="283" y="169">
          Tab list
        </text>
        <text x="283" y="340">
          Tab panel
        </text>
      </g>
      <g textAnchor="middle">
        <text x="431" y="87">
          Tab (selected)
        </text>
        <text x="560" y="87">
          Tab
        </text>
      </g>
    </g>
  </svg>
);
