export const TagAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Tag group: a Group label above a Tag group of tags, each with a Tag label and a Remove button"
    viewBox="129 28 660 269"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Group label above the tags */}
    <rect
      x="167"
      y="93"
      width="102"
      height="13"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Tags */}
    <g
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <rect x="167" y="130" width="167" height="48" rx="7" />
      <rect x="353" y="130" width="167" height="48" rx="7" />
      <rect x="538" y="130" width="167" height="48" rx="7" />
    </g>
    {/* Tag labels */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="188" y="149" width="84" height="11" rx="4" />
      <rect x="373" y="149" width="84" height="11" rx="4" />
      <rect x="559" y="149" width="84" height="11" rx="4" />
    </g>
    {/* Remove buttons */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 297 149 L 308 160" />
      <path d="M 308 149 L 297 160" />
      <path d="M 483 149 L 494 160" />
      <path d="M 494 149 L 483 160" />
      <path d="M 668 149 L 679 160" />
      <path d="M 679 149 L 668 160" />
    </g>

    {/* Bracket spanning the whole tag group */}
    <path
      d="M 167 230 L 167 243 L 705 243 L 705 230"
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Group label -> up */}
      <path d="M 200 93 L 200 61" />
      {/* Tag label -> down */}
      <path d="M 206 178 L 206 202" />
      {/* Remove button -> up */}
      <path d="M 674 141 L 674 71" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="93" r="4" />
      <circle cx="206" cy="178" r="4" />
      <circle cx="674" cy="141" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="200" y="54">
        Group label
      </text>
      <text x="206" y="219">
        Tag label
      </text>
      <text x="674" y="63">
        Remove button
      </text>
      <text x="436" y="265">
        Tag group
      </text>
    </g>
  </svg>
);
