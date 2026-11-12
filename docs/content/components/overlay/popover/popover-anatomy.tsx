export const PopoverAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Popover: a Trigger button opening a panel below it with a Title, a Description, a Search row and the Content"
    viewBox="0 6 660 326"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Trigger button that opens the popover */}
    <rect
      x="309"
      y="18"
      width="112"
      height="34"
      rx="7"
      className="fill-fd-card stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="327"
      y="31"
      width="76"
      height="9"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Popover panel, centered below its trigger (`placement="bottom"`) */}
    <rect
      x="250"
      y="68"
      width="230"
      height="250"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Header: title and description */}
    <rect
      x="270"
      y="88"
      width="100"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="270"
      y="110"
      width="150"
      height="9"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Search row between two dividers that span the panel */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="277" cy="148" r="5" />
      <path d="M 281 152 L 285 156" />
    </g>
    <rect
      x="294"
      y="144"
      width="96"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Content: list rows with their own controls, dividers edge to edge */}
    <g className="transition-colors duration-300">
      <rect
        x="270"
        y="182"
        width="92"
        height="9"
        rx="4"
        className="fill-fd-foreground/80"
      />
      <rect
        x="270"
        y="197"
        width="124"
        height="7"
        rx="3.5"
        className="fill-fd-muted-foreground"
      />
      <rect
        x="270"
        y="232"
        width="78"
        height="9"
        rx="4"
        className="fill-fd-foreground/80"
      />
      <rect
        x="270"
        y="247"
        width="132"
        height="7"
        rx="3.5"
        className="fill-fd-muted-foreground"
      />
      <rect
        x="270"
        y="282"
        width="100"
        height="9"
        rx="4"
        className="fill-fd-foreground/80"
      />
      <rect
        x="270"
        y="297"
        width="110"
        height="7"
        rx="3.5"
        className="fill-fd-muted-foreground"
      />
    </g>
    <g
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <circle cx="455" cy="193" r="9" />
      <circle cx="455" cy="243" r="9" />
      <circle cx="455" cy="293" r="9" />
    </g>

    {/* Dividers */}
    <g
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <path d="M 250 132 L 480 132" />
      <path d="M 250 166 L 480 166" />
      <path d="M 250 218 L 480 218" />
      <path d="M 250 268 L 480 268" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Trigger -> left */}
      <path d="M 309 35 L 200 35" />
      {/* Title -> left */}
      <path d="M 270 94 L 200 94" />
      {/* Search -> left */}
      <path d="M 270 148 L 200 148" />
      {/* Content -> left */}
      <path d="M 270 236 L 200 236" />
      {/* Popover -> right */}
      <path d="M 480 84 L 520 84" />
      {/* Description -> right */}
      <path d="M 420 114 L 520 114" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="309" cy="35" r="4" />
      <circle cx="270" cy="94" r="4" />
      <circle cx="270" cy="148" r="4" />
      <circle cx="270" cy="236" r="4" />
      <circle cx="480" cy="84" r="4" />
      <circle cx="420" cy="114" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="192" y="39" textAnchor="end">
        Trigger
      </text>
      <text x="192" y="98" textAnchor="end">
        Title
      </text>
      <text x="192" y="152" textAnchor="end">
        Search
      </text>
      <text x="192" y="240" textAnchor="end">
        Content
      </text>
      <text x="529" y="88" textAnchor="start">
        Popover
      </text>
      <text x="529" y="118" textAnchor="start">
        Description
      </text>
    </g>
  </svg>
);
