export const KeyboardAnatomy = () => (
  <svg
    viewBox="107 33 660 76"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anatomy of Keyboard: a single kbd element"
  >
    {/* kbd key-cap */}
    <rect
      x="327"
      y="46"
      width="98"
      height="37"
      rx="7"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="349"
      y="60"
      width="55"
      height="10"
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
      <path d="M 426 64 L 491 64" />
    </g>
    <circle
      cx="426"
      cy="64"
      r="4"
      className="fill-fd-primary transition-colors duration-300"
    />

    {/* Label */}
    <text
      x="502"
      y="69"
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
