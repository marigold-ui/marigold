export const LinkAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Link: an underlined Label naming the destination"
    viewBox="164 42 660 212"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Link label (the text naming the destination) */}
    <rect
      x="423"
      y="166"
      width="141"
      height="20"
      rx="6"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Underline that distinguishes the link from regular text */}
    <rect
      x="427"
      y="195"
      width="133"
      height="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Connector line */}
    <path
      d="M 494 166 L 494 107"
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Connector dot */}
    <circle
      cx="494"
      cy="166"
      r="4"
      className="fill-fd-primary transition-colors duration-300"
    />

    {/* Annotation label */}
    <text
      x="494"
      y="96"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      Label
    </text>
  </svg>
);
