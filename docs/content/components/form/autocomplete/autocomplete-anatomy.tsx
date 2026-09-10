export const AutocompleteAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of an Autocomplete: a Label above an Input field with a Clear button and a Dropdown arrow, Help text below, and an Overlay listing the options"
    viewBox="-22 3 660 206"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* --- Closed state (left) --- */}
    {/* Field label */}
    <rect
      x="79"
      y="34"
      width="34"
      height="7"
      rx="2"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Input field */}
    <rect
      x="79"
      y="49"
      width="170"
      height="27"
      rx="5"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Text cursor inside the input */}
    <rect
      x="89"
      y="57"
      width="2"
      height="11"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Help text below the input */}
    <rect
      x="79"
      y="85"
      width="96"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* --- Open state (right) --- */}
    {/* Field label */}
    <rect
      x="316"
      y="34"
      width="34"
      height="7"
      rx="2"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Input field */}
    <rect
      x="316"
      y="49"
      width="181"
      height="27"
      rx="5"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Text cursor inside the input */}
    <rect
      x="327"
      y="57"
      width="2"
      height="11"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Overlay holding the menu items */}
    <rect
      x="316"
      y="83"
      width="181"
      height="113"
      rx="5"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Menu items */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="330" y="99" width="90" height="7" rx="2" />
      <rect x="330" y="127" width="90" height="7" rx="2" />
      <rect x="330" y="154" width="90" height="7" rx="2" />
      <rect x="330" y="181" width="90" height="7" rx="2" />
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
      <path d="M 206 59 L 212 66" />
      <path d="M 212 59 L 206 66" />
      {/* Dropdown arrow (closed state) */}
      <path d="M 228 60 L 233 66 L 237 60" />
      {/* Clear button (open state) */}
      <path d="M 458 59 L 465 66" />
      <path d="M 465 59 L 458 66" />
      {/* Dropdown arrow (open state) */}
      <path d="M 479 60 L 484 66 L 488 60" />
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
      <path d="M 79 37 L 51 37" />
      {/* Input field -> up */}
      <path d="M 164 49 L 164 26" />
      {/* Help text -> left */}
      <path d="M 79 88 L 51 88" />
      {/* Label -> left (open state) */}
      <path d="M 316 37 L 283 37" />
      {/* Clear button -> up */}
      <path d="M 461 57 L 461 26" />
      {/* Dropdown arrow -> right */}
      <path d="M 493 66 L 522 66" />
      {/* Overlay -> right */}
      <path d="M 497 141 L 522 141" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="79" cy="37" r="4" />
      <circle cx="164" cy="49" r="4" />
      <circle cx="79" cy="88" r="4" />
      <circle cx="316" cy="37" r="4" />
      <circle cx="461" cy="57" r="4" />
      <circle cx="493" cy="66" r="4" />
      <circle cx="497" cy="141" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="45" y="40">
          Label
        </text>
        <text x="45" y="90">
          Help text
        </text>
        <text x="277" y="40">
          Label
        </text>
      </g>
      <g textAnchor="middle">
        <text x="164" y="21">
          Input field
        </text>
        <text x="461" y="21">
          Clear button
        </text>
      </g>
      <g textAnchor="start">
        <text x="527" y="68">
          Dropdown arrow
        </text>
        <text x="531" y="144">
          Overlay
        </text>
      </g>
    </g>
  </svg>
);
