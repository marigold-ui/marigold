export const BadgeAnatomy = () => (
  <svg
    viewBox="120 40 500 240"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Badge container holding a text */}
    <rect
      x="180"
      y="120"
      width="140"
      height="52"
      rx="26"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />
    {/* Text inside the badge */}
    <rect
      x="210"
      y="140"
      width="60"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Badge container holding an icon */}
    <rect
      x="400"
      y="120"
      width="140"
      height="52"
      rx="26"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />
    {/* Icon inside the badge */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="456" y="142" width="8" height="16" rx="2" />
      <rect x="466" y="136" width="8" height="22" rx="2" />
      <rect x="476" y="144" width="8" height="14" rx="2" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Container -> up */}
      <path d="M 290 120 L 290 76" />
      {/* Text -> down */}
      <path d="M 240 152 L 240 222" />
      {/* Icon -> down */}
      <path d="M 470 158 L 470 222" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="290" cy="120" r="4" />
      <circle cx="240" cy="152" r="4" />
      <circle cx="470" cy="158" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="290" y="68">
        Container
      </text>
      <text x="240" y="240">
        Text
      </text>
      <text x="470" y="240">
        Icon
      </text>
    </g>
  </svg>
);
