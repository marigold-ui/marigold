export const SliderAnatomy = () => (
  <svg
    viewBox="120 40 630 220"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the track */}
    <rect
      x="300"
      y="110"
      width="110"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Output showing the current value */}
    <rect
      x="660"
      y="110"
      width="40"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Track (full range of available values) */}
    <rect
      x="300"
      y="150"
      width="400"
      height="10"
      rx="5"
      className="fill-fd-primary/20 transition-colors duration-300"
    />
    {/* Filled part of the track (up to the current value) */}
    <rect
      x="300"
      y="150"
      width="150"
      height="10"
      rx="5"
      className="fill-fd-primary transition-colors duration-300"
    />
    {/* Thumb (draggable handle) */}
    <circle
      cx="450"
      cy="155"
      r="12"
      className="fill-fd-card stroke-fd-primary transition-colors duration-300"
      strokeWidth="3"
    />

    {/* Description below the track */}
    <rect
      x="300"
      y="186"
      width="140"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label -> up */}
      <path d="M 330 110 L 330 76" />
      {/* Output -> up */}
      <path d="M 680 110 L 680 76" />
      {/* Thumb -> up */}
      <path d="M 450 143 L 450 100" />
      {/* Track -> down */}
      <path d="M 600 160 L 600 220" />
      {/* Description -> left */}
      <path d="M 300 191 L 240 191" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="330" cy="110" r="4" />
      <circle cx="680" cy="110" r="4" />
      <circle cx="450" cy="143" r="4" />
      <circle cx="600" cy="160" r="4" />
      <circle cx="300" cy="191" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="330" y="68">
          Label
        </text>
        <text x="680" y="68">
          Output
        </text>
        <text x="450" y="92">
          Thumb
        </text>
        <text x="600" y="238">
          Track
        </text>
      </g>
      <text x="230" y="195" textAnchor="end">
        Description
      </text>
    </g>
  </svg>
);
