export const SwitchAnatomy = () => (
  <svg
    viewBox="-10 20 660 100"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Track (pill) */}
    <rect
      x="260"
      y="36"
      width="52"
      height="28"
      rx="14"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    {/* Thumb (circle) */}
    <circle
      cx="291"
      cy="50"
      r="10"
      className="fill-fd-card transition-colors duration-300"
    />

    {/* Label placeholder */}
    <rect
      x="326"
      y="38"
      width="80"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Description placeholder */}
    <rect
      x="326"
      y="58"
      width="120"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Track -> left */}
      <path d="M 260 50 L 130 50" />
      {/* Thumb -> below then left */}
      <path d="M 291 60 L 291 96 L 130 96" />
      {/* Label -> right */}
      <path d="M 406 44 L 530 44" />
      {/* Description -> right */}
      <path d="M 446 63 L 530 63" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="260" cy="50" r="4" />
      <circle cx="291" cy="60" r="4" />
      <circle cx="406" cy="44" r="4" />
      <circle cx="446" cy="63" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="120"
          y="54"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Track
        </text>
        <text
          x="120"
          y="100"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Thumb
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="540"
          y="48"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Label
        </text>
        <text
          x="540"
          y="67"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
      </g>
    </g>
  </svg>
);
