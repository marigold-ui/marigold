export const AutocompleteAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of an Autocomplete: a Label above an Input field with a Clear button and a Dropdown arrow, Help text below, and an Overlay listing the options"
    viewBox="0 5 1090 365"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* --- Closed state (left) --- */}
    {/* Field label */}
    <rect
      x="140"
      y="60"
      width="60"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Input field */}
    <rect
      x="140"
      y="86"
      width="300"
      height="48"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Text cursor inside the input */}
    <rect
      x="158"
      y="100"
      width="3"
      height="20"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Help text below the input */}
    <rect
      x="140"
      y="150"
      width="170"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* --- Open state (right) --- */}
    {/* Field label */}
    <rect
      x="560"
      y="60"
      width="60"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Input field */}
    <rect
      x="560"
      y="86"
      width="320"
      height="48"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Text cursor inside the input */}
    <rect
      x="578"
      y="100"
      width="3"
      height="20"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Overlay holding the menu items */}
    <rect
      x="560"
      y="146"
      width="320"
      height="200"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Menu items */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="584" y="176" width="160" height="12" rx="4" />
      <rect x="584" y="224" width="160" height="12" rx="4" />
      <rect x="584" y="272" width="160" height="12" rx="4" />
      <rect x="584" y="320" width="160" height="12" rx="4" />
    </g>

    {/* Clear buttons and dropdown arrows of both fields */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      {/* Clear button (closed state) */}
      <path d="M 364 104 L 376 116" />
      <path d="M 376 104 L 364 116" />
      {/* Dropdown arrow (closed state) */}
      <path d="M 404 106 L 412 116 L 420 106" />
      {/* Clear button (open state) */}
      <path d="M 810 104 L 822 116" />
      <path d="M 822 104 L 810 116" />
      {/* Dropdown arrow (open state) */}
      <path d="M 848 106 L 856 116 L 864 106" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label -> left */}
      <path d="M 140 66 L 90 66" />
      {/* Input field -> up */}
      <path d="M 290 86 L 290 46" />
      {/* Help text -> left */}
      <path d="M 140 155 L 90 155" />
      {/* Label -> left (open state) */}
      <path d="M 560 66 L 500 66" />
      {/* Clear button -> up */}
      <path d="M 816 100 L 816 46" />
      {/* Dropdown arrow -> right */}
      <path d="M 872 116 L 930 116" />
      {/* Overlay -> right */}
      <path d="M 880 250 L 930 250" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="140" cy="66" r="4" />
      <circle cx="290" cy="86" r="4" />
      <circle cx="140" cy="155" r="4" />
      <circle cx="560" cy="66" r="4" />
      <circle cx="816" cy="100" r="4" />
      <circle cx="872" cy="116" r="4" />
      <circle cx="880" cy="250" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="80" y="70">
          Label
        </text>
        <text x="80" y="159">
          Help text
        </text>
        <text x="490" y="70">
          Label
        </text>
      </g>
      <g textAnchor="middle">
        <text x="290" y="38">
          Input field
        </text>
        <text x="816" y="38">
          Clear button
        </text>
      </g>
      <g textAnchor="start">
        <text x="940" y="120">
          Dropdown arrow
        </text>
        <text x="940" y="254">
          Overlay
        </text>
      </g>
    </g>
  </svg>
);
