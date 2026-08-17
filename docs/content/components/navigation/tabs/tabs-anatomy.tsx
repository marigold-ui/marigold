export const TabsAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of Tabs: a Tab list of Tabs with the selected one marked, above the Tab panel showing its content"
    viewBox="100 45 570 330"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Selected tab and its indicator */}
    <rect
      x="300"
      y="120"
      width="70"
      height="14"
      rx="4"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="296"
      y="146"
      width="78"
      height="3"
      rx="1.5"
      className="fill-fd-primary transition-colors duration-300"
    />
    {/* Remaining tabs */}
    <rect
      x="400"
      y="120"
      width="70"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="500"
      y="120"
      width="70"
      height="14"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Tab panel showing the content of the selected tab */}
    <rect
      x="290"
      y="170"
      width="340"
      height="180"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Content inside the panel */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="318" y="204" width="220" height="12" rx="4" />
      <rect x="318" y="232" width="180" height="12" rx="4" />
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
      <path d="M 296 127 L 230 127" />
      {/* Tab (selected) -> up */}
      <path d="M 335 120 L 335 76" />
      {/* Tab -> up */}
      <path d="M 435 120 L 435 76" />
      {/* Tab panel -> left */}
      <path d="M 290 260 L 230 260" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="296" cy="127" r="4" />
      <circle cx="335" cy="120" r="4" />
      <circle cx="435" cy="120" r="4" />
      <circle cx="290" cy="260" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="220" y="131">
          Tab list
        </text>
        <text x="220" y="264">
          Tab panel
        </text>
      </g>
      <g textAnchor="middle">
        <text x="335" y="68">
          Tab (selected)
        </text>
        <text x="435" y="68">
          Tab
        </text>
      </g>
    </g>
  </svg>
);
