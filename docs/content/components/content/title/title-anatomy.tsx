export const TitleAnatomy = () => (
  <svg
    viewBox="220 25 360 40"
    className="mx-auto h-auto w-full max-w-md"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Title block */}
    <rect
      x="240"
      y="38"
      width="220"
      height="14"
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
      <path d="M 460 45 L 510 45" />
    </g>
    <circle
      cx="460"
      cy="45"
      r="4"
      className="fill-fd-primary transition-colors duration-300"
    />

    {/* Label */}
    <text
      x="520"
      y="49"
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
