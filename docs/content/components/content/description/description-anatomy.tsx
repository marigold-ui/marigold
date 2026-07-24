export const DescriptionAnatomy = () => (
  <svg
    viewBox="220 30 360 60"
    className="mx-auto h-auto w-full max-w-md"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Lines */}
    <rect
      x="240"
      y="38"
      width="220"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="240"
      y="55"
      width="200"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="240"
      y="72"
      width="160"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Connector */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M 460 59 L 510 59" />
    </g>
    <circle
      cx="460"
      cy="59"
      r="4"
      className="fill-fd-primary transition-colors duration-300"
    />

    {/* Label */}
    <text
      x="520"
      y="63"
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
