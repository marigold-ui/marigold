export const KeyboardAnatomy = () => (
  <svg
    viewBox="220 30 360 70"
    className="mx-auto h-auto w-full max-w-md"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of Keyboard: a single kbd element"
  >
    {/* kbd key-cap */}
    <rect
      x="300"
      y="42"
      width="90"
      height="34"
      rx="6"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="320"
      y="55"
      width="50"
      height="9"
      rx="3"
      className="fill-fd-muted-foreground/70 transition-colors duration-300"
    />

    {/* Connector */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M 390 59 L 450 59" />
    </g>
    <circle
      cx="390"
      cy="59"
      r="4"
      className="fill-fd-primary transition-colors duration-300"
    />

    {/* Label */}
    <text
      x="460"
      y="63"
      textAnchor="start"
      fontSize="14"
      fontWeight="600"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="fill-fd-primary transition-colors duration-300"
    >
      kbd
    </text>
  </svg>
);
