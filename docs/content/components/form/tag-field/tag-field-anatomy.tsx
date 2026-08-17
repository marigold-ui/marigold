export const TagFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a TagField: a Label above a Container of Tags and a Button, with a Popover holding a Search input and Options grouped into Sections"
    viewBox="45 47 660 405"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the container */}
    <rect
      x="164"
      y="70"
      width="82"
      height="14"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Container holding the selected tags and the button */}
    <rect
      x="164"
      y="99"
      width="375"
      height="61"
      rx="9"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Tags (one per selected option) */}
    <g
      className="fill-fd-muted-foreground/20 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    >
      <rect x="181" y="113" width="89" height="33" rx="7" />
      <rect x="279" y="113" width="82" height="33" rx="7" />
    </g>
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="192" y="124" width="42" height="9" rx="5" />
      <rect x="291" y="124" width="38" height="9" rx="5" />
    </g>
    {/* Remove icons of the tags */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 246 124 L 256 134" />
      <path d="M 256 124 L 246 134" />
      <path d="M 343 124 L 352 134" />
      <path d="M 352 124 L 343 134" />
    </g>
    {/* Button opening the popover */}
    <rect
      x="495"
      y="115"
      width="31"
      height="31"
      rx="7"
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
      <path d="M 503 128 L 510 122 L 517 128" />
      <path d="M 503 134 L 510 140 L 517 134" />
    </g>

    {/* Help text below the container */}
    <rect
      x="164"
      y="176"
      width="211"
      height="12"
      rx="5"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Popover holding the search input and the options list */}
    <rect
      x="164"
      y="207"
      width="375"
      height="223"
      rx="9"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Search input filtering the options */}
    <rect
      x="181"
      y="223"
      width="343"
      height="38"
      rx="7"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <rect
      x="195"
      y="236"
      width="82"
      height="12"
      rx="5"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Section headers grouping the options */}
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="188" y="279" width="70" height="11" rx="4" />
      <rect x="188" y="378" width="54" height="11" rx="4" />
    </g>
    {/* Options */}
    <g className="fill-fd-foreground/70 transition-colors duration-300">
      <rect x="199" y="307" width="59" height="12" rx="5" />
      <rect x="199" y="336" width="89" height="12" rx="5" />
      <rect x="199" y="404" width="94" height="12" rx="5" />
    </g>
    {/* Separator between the sections */}
    <rect
      x="181"
      y="361"
      width="343"
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
      <path d="M 164 77 L 106 77" />
      {/* Tag -> left */}
      <path d="M 181 129 L 106 129" />
      {/* Section -> left */}
      <path d="M 188 284 L 106 284" />
      {/* Option -> left */}
      <path d="M 199 313 L 106 313" />
      {/* Container -> right */}
      <path d="M 540 106 L 587 106" />
      {/* Button -> right */}
      <path d="M 526 130 L 587 130" />
      {/* Search input -> right */}
      <path d="M 523 242 L 587 242" />
      {/* Popover -> right */}
      <path d="M 540 352 L 587 352" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="164" cy="77" r="4" />
      <circle cx="181" cy="129" r="4" />
      <circle cx="188" cy="284" r="4" />
      <circle cx="199" cy="313" r="4" />
      <circle cx="540" cy="106" r="4" />
      <circle cx="526" cy="130" r="4" />
      <circle cx="523" cy="242" r="4" />
      <circle cx="540" cy="352" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="94" y="82">
          Label
        </text>
        <text x="94" y="134">
          Tag
        </text>
        <text x="94" y="289">
          Section
        </text>
        <text x="94" y="318">
          Option
        </text>
      </g>
      <g textAnchor="start">
        <text x="598" y="110">
          Container
        </text>
        <text x="598" y="135">
          Button
        </text>
        <text x="598" y="246">
          Search input
        </text>
        <text x="598" y="357">
          Popover
        </text>
      </g>
    </g>
  </svg>
);
