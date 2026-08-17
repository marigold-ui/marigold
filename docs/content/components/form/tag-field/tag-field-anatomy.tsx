export const TagFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a TagField: a Label above a Container of Tags and a Button, with a Popover holding a Search input and Options grouped into Sections"
    viewBox="20 40 600 345"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the container */}
    <rect
      x="140"
      y="60"
      width="70"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Container holding the selected tags and the button */}
    <rect
      x="140"
      y="84"
      width="320"
      height="52"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Tags (one per selected option) */}
    <g
      className="fill-fd-muted-foreground/20 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    >
      <rect x="154" y="96" width="76" height="28" rx="6" />
      <rect x="238" y="96" width="70" height="28" rx="6" />
    </g>
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="164" y="106" width="36" height="8" rx="4" />
      <rect x="248" y="106" width="32" height="8" rx="4" />
    </g>
    {/* Remove icons of the tags */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 210 106 L 218 114" />
      <path d="M 218 106 L 210 114" />
      <path d="M 292 106 L 300 114" />
      <path d="M 300 106 L 292 114" />
    </g>
    {/* Button opening the popover */}
    <rect
      x="422"
      y="98"
      width="26"
      height="26"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 429 109 L 435 104 L 441 109" />
      <path d="M 429 114 L 435 119 L 441 114" />
    </g>

    {/* Help text below the container */}
    <rect
      x="140"
      y="150"
      width="180"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Popover holding the search input and the options list */}
    <rect
      x="140"
      y="176"
      width="320"
      height="190"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Search input filtering the options */}
    <rect
      x="154"
      y="190"
      width="292"
      height="32"
      rx="6"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <rect
      x="166"
      y="201"
      width="70"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Section headers grouping the options */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="160" y="238" width="60" height="9" rx="3" />
      <rect x="160" y="322" width="46" height="9" rx="3" />
    </g>
    {/* Options */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="170" y="262" width="50" height="10" rx="4" />
      <rect x="170" y="286" width="76" height="10" rx="4" />
      <rect x="170" y="344" width="80" height="10" rx="4" />
    </g>
    {/* Separator between the sections */}
    <rect
      x="154"
      y="308"
      width="292"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

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
      {/* Tag -> left */}
      <path d="M 154 110 L 90 110" />
      {/* Section -> left */}
      <path d="M 160 242 L 90 242" />
      {/* Option -> left */}
      <path d="M 170 267 L 90 267" />
      {/* Container -> right */}
      <path d="M 460 90 L 500 90" />
      {/* Button -> right */}
      <path d="M 448 111 L 500 111" />
      {/* Search input -> right */}
      <path d="M 446 206 L 500 206" />
      {/* Popover -> right */}
      <path d="M 460 300 L 500 300" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="140" cy="66" r="4" />
      <circle cx="154" cy="110" r="4" />
      <circle cx="160" cy="242" r="4" />
      <circle cx="170" cy="267" r="4" />
      <circle cx="460" cy="90" r="4" />
      <circle cx="448" cy="111" r="4" />
      <circle cx="446" cy="206" r="4" />
      <circle cx="460" cy="300" r="4" />
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
        <text x="80" y="114">
          Tag
        </text>
        <text x="80" y="246">
          Section
        </text>
        <text x="80" y="271">
          Option
        </text>
      </g>
      <g textAnchor="start">
        <text x="510" y="94">
          Container
        </text>
        <text x="510" y="115">
          Button
        </text>
        <text x="510" y="210">
          Search input
        </text>
        <text x="510" y="304">
          Popover
        </text>
      </g>
    </g>
  </svg>
);
