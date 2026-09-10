export const ContextualHelpAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a ContextualHelp: a Trigger button opening a Popover below it that holds the Dialog content"
    viewBox="0 14 660 236"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trigger button that opens the popover */}
    <circle
      cx="190"
      cy="48"
      r="18"
      className="fill-fd-card stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Info glyph inside the trigger */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <circle cx="190" cy="40" r="2" />
      <rect x="188" y="46" width="4" height="12" rx="2" />
    </g>

    {/* Popover holding the help content. Its start edge lines up with the
        trigger's, since a contextual help defaults to `placement="bottom start"` */}
    <rect
      x="172"
      y="84"
      width="330"
      height="150"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Dialog content: heading and text */}
    <rect
      x="196"
      y="106"
      width="96"
      height="13"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="196" y="134" width="264" height="10" rx="4" />
      <rect x="196" y="152" width="282" height="10" rx="4" />
      <rect x="196" y="170" width="246" height="10" rx="4" />
      <rect x="196" y="188" width="175" height="10" rx="4" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trigger button -> right */}
      <path d="M 208 48 L 392 48" />
      {/* Popover -> left */}
      <path d="M 172 120 L 108 120" />
      {/* Dialog content -> right */}
      <path d="M 478 170 L 524 170" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="208" cy="48" r="4" />
      <circle cx="172" cy="120" r="4" />
      <circle cx="478" cy="170" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="401" y="52" textAnchor="start">
        Trigger button
      </text>
      <text x="100" y="124" textAnchor="end">
        Popover
      </text>
      <text x="533" y="174" textAnchor="start">
        Dialog content
      </text>
    </g>
  </svg>
);
