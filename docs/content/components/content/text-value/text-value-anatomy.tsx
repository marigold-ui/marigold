export const TextValueAnatomy = () => (
  <svg
    viewBox="-10 10 660 110"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Item container outline */}
    <rect
      x="200"
      y="30"
      width="280"
      height="60"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Label bar */}
    <rect
      x="218"
      y="54"
      width="160"
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
      {/* Item container -> right */}
      <path d="M 480 60 L 540 60" />
      {/* TextValue -> left */}
      <path d="M 218 60 L 100 60" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="480" cy="60" r="4" />
      <circle cx="218" cy="60" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="90"
        y="64"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        TextValue
      </text>
      <text
        x="550"
        y="64"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Selection item
      </text>
    </g>
  </svg>
);
