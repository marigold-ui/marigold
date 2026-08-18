export const DescriptionAnatomy = () => (
  <svg
    viewBox="107 33 660 65"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Lines */}
    <rect
      x="262"
      y="41"
      width="240"
      height="10"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="262"
      y="60"
      width="218"
      height="10"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="262"
      y="79"
      width="175"
      height="10"
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
      <path d="M 502 64 L 557 64" />
    </g>
    <circle
      cx="502"
      cy="64"
      r="4"
      className="fill-fd-primary transition-colors duration-300"
    />

    {/* Label */}
    <text
      x="568"
      y="69"
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
