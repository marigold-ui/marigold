export const TitleAnatomy = () => (
  <svg
    viewBox="-10 10 660 130"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Heading text bar */}
    <rect
      x="240"
      y="50"
      width="200"
      height="18"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Semantic level annotation - small bracket */}
    <g
      className="stroke-fd-muted-foreground/50 transition-colors duration-300"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M 240 78 L 240 84 L 440 84 L 440 78" />
    </g>
    <text
      x="340"
      y="100"
      textAnchor="middle"
      fontSize="11"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="fill-fd-muted-foreground transition-colors duration-300"
    >
      <tspan fontStyle="italic">level</tspan> &lt;h1&gt;…&lt;h6&gt;
    </text>

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Heading text -> left */}
      <path d="M 240 59 L 100 59" />
      {/* size -> right */}
      <path d="M 440 59 L 540 59" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="240" cy="59" r="4" />
      <circle cx="440" cy="59" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="90"
        y="63"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Heading text
      </text>
      <text
        x="550"
        y="63"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Visual size
      </text>
    </g>
  </svg>
);
