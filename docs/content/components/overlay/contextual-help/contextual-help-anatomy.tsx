export const ContextualHelpAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a ContextualHelp: a Trigger button opening a Popover that holds the Dialog content"
    viewBox="120 30 740 370"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trigger button that opens the popover */}
    <circle
      cx="450"
      cy="140"
      r="22"
      className="fill-fd-card stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Info glyph inside the trigger */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <circle cx="450" cy="130" r="2.5" />
      <rect x="448" y="137" width="4" height="14" rx="2" />
    </g>

    {/* Popover holding the help content */}
    <rect
      x="290"
      y="186"
      width="380"
      height="190"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Dialog content: heading and text */}
    <rect
      x="320"
      y="214"
      width="110"
      height="16"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="320" y="248" width="300" height="11" rx="4" />
      <rect x="320" y="270" width="320" height="11" rx="4" />
      <rect x="320" y="292" width="280" height="11" rx="4" />
      <rect x="320" y="314" width="200" height="11" rx="4" />
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
      <path d="M 450 118 L 450 66" />
      {/* Popover -> left */}
      <path d="M 290 230 L 220 230" />
      {/* Dialog content -> right */}
      <path d="M 640 297 L 740 297" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="450" cy="118" r="4" />
      <circle cx="290" cy="230" r="4" />
      <circle cx="640" cy="297" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="450" y="58" textAnchor="middle">
        Trigger button
      </text>
      <text x="210" y="234" textAnchor="end">
        Popover
      </text>
      <text x="750" y="301" textAnchor="start">
        Dialog content
      </text>
    </g>
  </svg>
);
