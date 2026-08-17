export const LinkAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Link: an underlined Label naming the destination"
    viewBox="220 30 260 150"
    className="mx-auto h-auto w-full max-w-[50%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Link label (the text naming the destination) */}
    <rect
      x="300"
      y="118"
      width="100"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Underline that distinguishes the link from regular text */}
    <rect
      x="303"
      y="138"
      width="94"
      height="2"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Connector line */}
    <path
      d="M 350 118 L 350 76"
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    />

    {/* Connector dot */}
    <circle
      cx="350"
      cy="118"
      r="4"
      className="fill-fd-primary transition-colors duration-300"
    />

    {/* Annotation label */}
    <text
      x="350"
      y="68"
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
