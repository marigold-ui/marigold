export const TitleAnatomy = () => (
  <svg
    viewBox="107 27 660 44"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Title block */}
    <rect
      x="262"
      y="41"
      width="240"
      height="15"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Connector */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M 502 49 L 557 49" />
    </g>
    <circle
      cx="502"
      cy="49"
      r="4"
      className="fill-fd-primary transition-colors duration-300"
    />

    {/* Label */}
    <text
      x="568"
      y="53"
      textAnchor="start"
      fontSize="14"
      fontWeight="600"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="fill-fd-primary transition-colors duration-300"
    >
      Text
    </text>
  </svg>
);
