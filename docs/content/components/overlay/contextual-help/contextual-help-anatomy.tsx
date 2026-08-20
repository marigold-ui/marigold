export const ContextualHelpAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a ContextualHelp: a Trigger button opening a Popover that holds the Dialog content"
    viewBox="112 27 660 334"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trigger button that opens the popover */}
    <circle
      cx="406"
      cy="126"
      r="20"
      className="fill-fd-card stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Info glyph inside the trigger */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <circle cx="406" cy="117" r="2" />
      <rect x="404" y="124" width="4" height="13" rx="2" />
    </g>

    {/* Popover holding the help content */}
    <rect
      x="262"
      y="168"
      width="343"
      height="171"
      rx="7"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Dialog content: heading and text */}
    <rect
      x="289"
      y="193"
      width="99"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="289" y="224" width="271" height="10" rx="4" />
      <rect x="289" y="243" width="289" height="10" rx="4" />
      <rect x="289" y="263" width="253" height="10" rx="4" />
      <rect x="289" y="283" width="180" height="10" rx="4" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trigger button -> up */}
      <path d="M 406 106 L 406 60" />
      {/* Popover -> left */}
      <path d="M 262 207 L 198 207" />
      {/* Dialog content -> right */}
      <path d="M 577 268 L 667 268" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="406" cy="106" r="4" />
      <circle cx="262" cy="207" r="4" />
      <circle cx="577" cy="268" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="406" y="52" textAnchor="middle">
        Trigger button
      </text>
      <text x="189" y="211" textAnchor="end">
        Popover
      </text>
      <text x="676" y="271" textAnchor="start">
        Dialog content
      </text>
    </g>
  </svg>
);
