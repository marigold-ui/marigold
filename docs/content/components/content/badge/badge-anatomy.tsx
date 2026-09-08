export const BadgeAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Badge: a pill-shaped Container holding either a Text or an Icon"
    viewBox="158 53 660 317"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Badge container holding a text */}
    <rect
      x="238"
      y="158"
      width="185"
      height="69"
      rx="34"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />
    {/* Text inside the badge */}
    <rect
      x="277"
      y="185"
      width="79"
      height="16"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Badge container holding an icon */}
    <rect
      x="528"
      y="158"
      width="185"
      height="69"
      rx="34"
      className="fill-fd-muted-foreground/25 transition-colors duration-300"
    />
    {/* Icon inside the badge */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="602" y="187" width="11" height="21" rx="3" />
      <rect x="615" y="180" width="11" height="29" rx="3" />
      <rect x="628" y="190" width="11" height="18" rx="3" />
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
      <path d="M 383 158 L 383 100" />
      {/* Text -> down */}
      <path d="M 317 201 L 317 293" />
      {/* Icon -> down */}
      <path d="M 620 209 L 620 293" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="383" cy="158" r="4" />
      <circle cx="317" cy="201" r="4" />
      <circle cx="620" cy="209" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="383" y="90">
        Container
      </text>
      <text x="317" y="317">
        Text
      </text>
      <text x="620" y="317">
        Icon
      </text>
    </g>
  </svg>
);
