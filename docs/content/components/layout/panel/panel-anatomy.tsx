export const PanelAnatomy = () => (
  <svg
    viewBox="-10 10 820 340"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Panel container */}
    <rect
      x="280"
      y="30"
      width="280"
      height="290"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Title placeholder */}
    <rect
      x="300"
      y="50"
      width="120"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Description placeholder */}
    <rect
      x="300"
      y="70"
      width="180"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    {/* HeaderActions placeholder (pill button) */}
    <rect
      x="500"
      y="48"
      width="40"
      height="22"
      rx="6"
      className="fill-fd-muted/50 stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />

    {/* Header/Content divider */}
    <line
      x1="280"
      y1="98"
      x2="560"
      y2="98"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />

    {/* Content placeholder lines */}
    <rect
      x="300"
      y="118"
      width="240"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="300"
      y="136"
      width="220"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="300"
      y="154"
      width="260"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="300"
      y="172"
      width="200"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Content/Footer divider */}
    <line
      x1="280"
      y1="252"
      x2="560"
      y2="252"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1"
    />

    {/* Footer button placeholder */}
    <rect
      x="470"
      y="272"
      width="70"
      height="22"
      rx="6"
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
      {/* Title -> left */}
      <path d="M 300 57 L 250 57" />
      {/* Description -> left */}
      <path d="M 300 75 L 250 75" />
      {/* Content -> left (in gap between placeholder lines) */}
      <path d="M 300 131 L 250 131" />
      {/* Footer -> left (from footer button left edge) */}
      <path d="M 470 283 L 250 283" />
      {/* HeaderActions -> right */}
      <path d="M 540 59 L 600 59" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="300" cy="57" r="4" />
      <circle cx="300" cy="75" r="4" />
      <circle cx="300" cy="131" r="4" />
      <circle cx="470" cy="283" r="4" />
      <circle cx="540" cy="59" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="240"
          y="61"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="240"
          y="79"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
        <text
          x="240"
          y="135"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Content
        </text>
        <text
          x="240"
          y="287"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Footer
        </text>
      </g>
      <text
        x="610"
        y="63"
        fontSize="14"
        fontWeight="600"
        textAnchor="start"
        className="fill-fd-primary"
      >
        Header actions
      </text>
    </g>
  </svg>
);
