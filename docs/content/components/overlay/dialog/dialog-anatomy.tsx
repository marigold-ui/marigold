export const DialogAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Dialog: a Title, Content, a Close button and Actions, sitting on the Underlay"
    viewBox="22 15 660 315"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Underlay dimming the page behind the dialog */}
    <rect
      x="104"
      y="30"
      width="504"
      height="282"
      rx="6"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />

    {/* Dialog */}
    <rect
      x="178"
      y="59"
      width="356"
      height="223"
      rx="9"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Title */}
    <rect
      x="202"
      y="83"
      width="134"
      height="13"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Close button */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 495 83 L 507 95" />
      <path d="M 507 83 L 495 95" />
    </g>
    {/* Content */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="202" y="126" width="282" height="9" rx="3" />
      <rect x="202" y="144" width="223" height="9" rx="3" />
    </g>
    {/* Actions (secondary and primary button) */}
    <rect
      x="335"
      y="230"
      width="82"
      height="30"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="356"
      y="241"
      width="40"
      height="7"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="430"
      y="230"
      width="82"
      height="30"
      rx="6"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="451"
      y="241"
      width="40"
      height="7"
      rx="3"
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
      <path d="M 202 90 L 141 90" />
      {/* Content -> left */}
      <path d="M 202 131 L 141 131" />
      {/* Underlay -> left */}
      <path d="M 148 297 L 89 297" />
      {/* Close button -> right */}
      <path d="M 512 89 L 579 89" />
      {/* Actions -> right */}
      <path d="M 512 245 L 579 245" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="202" cy="90" r="4" />
      <circle cx="202" cy="131" r="4" />
      <circle cx="148" cy="297" r="4" />
      <circle cx="512" cy="89" r="4" />
      <circle cx="512" cy="245" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="134" y="93">
          Title
        </text>
        <text x="134" y="134">
          Content
        </text>
        <text x="82" y="300">
          Underlay
        </text>
      </g>
      <g textAnchor="start">
        <text x="586" y="92">
          Close button
        </text>
        <text x="586" y="248">
          Actions
        </text>
      </g>
    </g>
  </svg>
);
