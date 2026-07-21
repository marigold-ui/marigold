export const ButtonAnatomy = () => (
  <svg
    viewBox="120 100 545 120"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Button with a label (the pressable area) */}
    <rect
      x="250"
      y="150"
      width="170"
      height="52"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Icon placeholder (optional leading icon) */}
    <rect
      x="272"
      y="168"
      width="16"
      height="16"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Label placeholder (the text) */}
    <rect
      x="300"
      y="171"
      width="96"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Icon-only button (square, no label) */}
    <rect
      x="460"
      y="150"
      width="52"
      height="52"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="478"
      y="168"
      width="16"
      height="16"
      rx="3"
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
      {/* Button -> left */}
      <path d="M 250 176 L 185 176" />
      {/* Icon -> up */}
      <path d="M 280 168 L 280 124" />
      {/* Label -> up */}
      <path d="M 348 171 L 348 124" />
      {/* Icon-only -> right */}
      <path d="M 512 176 L 580 176" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="250" cy="176" r="4" />
      <circle cx="280" cy="168" r="4" />
      <circle cx="348" cy="171" r="4" />
      <circle cx="512" cy="176" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="175"
        y="180"
        fontSize="14"
        fontWeight="600"
        textAnchor="end"
        className="fill-fd-primary"
      >
        Button
      </text>
      <text
        x="280"
        y="116"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
        className="fill-fd-primary"
      >
        Icon
      </text>
      <text
        x="348"
        y="116"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
        className="fill-fd-primary"
      >
        Label
      </text>
      <text
        x="590"
        y="180"
        fontSize="14"
        fontWeight="600"
        textAnchor="start"
        className="fill-fd-primary"
      >
        Icon-only
      </text>
    </g>
  </svg>
);
