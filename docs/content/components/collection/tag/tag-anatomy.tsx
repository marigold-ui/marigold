export const TagAnatomy = () => (
  <svg
    viewBox="100 30 790 290"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Group label above the tags */}
    <rect
      x="180"
      y="100"
      width="110"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Tags */}
    <g
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <rect x="180" y="140" width="180" height="52" rx="8" />
      <rect x="380" y="140" width="180" height="52" rx="8" />
      <rect x="580" y="140" width="180" height="52" rx="8" />
    </g>
    {/* Tag labels */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="202" y="160" width="90" height="12" rx="4" />
      <rect x="402" y="160" width="90" height="12" rx="4" />
      <rect x="602" y="160" width="90" height="12" rx="4" />
    </g>
    {/* Remove buttons */}
    <g
      className="stroke-fd-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 320 160 L 332 172" />
      <path d="M 332 160 L 320 172" />
      <path d="M 520 160 L 532 172" />
      <path d="M 532 160 L 520 172" />
      <path d="M 720 160 L 732 172" />
      <path d="M 732 160 L 720 172" />
    </g>

    {/* Bracket spanning the whole tag group */}
    <path
      d="M 180 248 L 180 262 L 760 262 L 760 248"
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
      <path d="M 215 100 L 215 66" />
      {/* Tag label -> down */}
      <path d="M 222 192 L 222 218" />
      {/* Remove button -> up */}
      <path d="M 726 152 L 726 76" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="215" cy="100" r="4" />
      <circle cx="222" cy="192" r="4" />
      <circle cx="726" cy="152" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="215" y="58">
        Group label
      </text>
      <text x="222" y="236">
        Tag label
      </text>
      <text x="726" y="68">
        Remove button
      </text>
      <text x="470" y="286">
        Tag group
      </text>
    </g>
  </svg>
);
