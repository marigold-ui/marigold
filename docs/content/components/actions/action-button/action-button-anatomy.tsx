export const ActionButtonAnatomy = () => (
  <svg
    viewBox="-10 30 660 80"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Button outline */}
    <rect
      x="260"
      y="44"
      width="120"
      height="36"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Label placeholder */}
    <rect
      x="282"
      y="56"
      width="76"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 260 62 L 110 62" />
      <path d="M 358 62 L 530 62" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="260" cy="62" r="4" />
      <circle cx="358" cy="62" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="100"
        y="66"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Button
      </text>
      <text
        x="540"
        y="66"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Label
      </text>
    </g>
  </svg>
);
