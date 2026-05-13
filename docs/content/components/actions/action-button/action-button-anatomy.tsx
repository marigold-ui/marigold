export const ActionButtonAnatomy = () => (
  <svg
    viewBox="-10 0 660 170"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Variant 1 — label + optional icon */}

    {/* Button outline */}
    <rect
      x="240"
      y="40"
      width="160"
      height="36"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Icon placeholder */}
    <rect
      x="256"
      y="52"
      width="12"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Label placeholder */}
    <rect
      x="276"
      y="52"
      width="108"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Variant 2 — icon-only */}

    {/* Icon-only button outline (square) */}
    <rect
      x="302"
      y="116"
      width="36"
      height="36"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Icon placeholder */}
    <rect
      x="314"
      y="128"
      width="12"
      height="12"
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
      {/* Variant 1: Button -> left */}
      <path d="M 240 58 L 110 58" />
      {/* Variant 1: Icon -> top */}
      <path d="M 262 40 L 262 18" />
      {/* Variant 1: Label -> right */}
      <path d="M 400 58 L 530 58" />
      {/* Variant 2: Icon-only -> right */}
      <path d="M 338 134 L 530 134" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="240" cy="58" r="4" />
      <circle cx="262" cy="40" r="4" />
      <circle cx="400" cy="58" r="4" />
      <circle cx="338" cy="134" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="100"
        y="62"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Button
      </text>
      <text
        x="262"
        y="12"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Icon (optional)
      </text>
      <text
        x="540"
        y="62"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Label
      </text>
      <text
        x="540"
        y="138"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Icon-only
      </text>
    </g>
  </svg>
);
