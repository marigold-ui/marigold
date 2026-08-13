export const DialogAnatomy = () => (
  <svg
    viewBox="40 20 870 425"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Underlay dimming the page behind the dialog */}
    <rect
      x="140"
      y="40"
      width="680"
      height="380"
      rx="8"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />

    {/* Dialog */}
    <rect
      x="240"
      y="80"
      width="480"
      height="300"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Title */}
    <rect
      x="272"
      y="112"
      width="180"
      height="18"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Close button */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 668 112 L 684 128" />
      <path d="M 684 112 L 668 128" />
    </g>
    {/* Content */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="272" y="170" width="380" height="12" rx="4" />
      <rect x="272" y="194" width="300" height="12" rx="4" />
    </g>
    {/* Actions (secondary and primary button) */}
    <rect
      x="452"
      y="310"
      width="110"
      height="40"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="480"
      y="325"
      width="54"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="580"
      y="310"
      width="110"
      height="40"
      rx="8"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="608"
      y="325"
      width="54"
      height="10"
      rx="4"
      className="fill-fd-primary-foreground transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Title -> left */}
      <path d="M 272 121 L 190 121" />
      {/* Content -> left */}
      <path d="M 272 176 L 190 176" />
      {/* Underlay -> left */}
      <path d="M 200 400 L 120 400" />
      {/* Close button -> right */}
      <path d="M 690 120 L 780 120" />
      {/* Actions -> right */}
      <path d="M 690 330 L 780 330" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="272" cy="121" r="4" />
      <circle cx="272" cy="176" r="4" />
      <circle cx="200" cy="400" r="4" />
      <circle cx="690" cy="120" r="4" />
      <circle cx="690" cy="330" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="180" y="125">
          Title
        </text>
        <text x="180" y="180">
          Content
        </text>
        <text x="110" y="404">
          Underlay
        </text>
      </g>
      <g textAnchor="start">
        <text x="790" y="124">
          Close button
        </text>
        <text x="790" y="334">
          Actions
        </text>
      </g>
    </g>
  </svg>
);
