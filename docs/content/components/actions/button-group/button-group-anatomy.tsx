export const ButtonGroupAnatomy = () => (
  <svg
    viewBox="-10 25 660 80"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Group container outline (toolbar) */}
    <rect
      x="200"
      y="38"
      width="280"
      height="52"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
      strokeDasharray="4 4"
    />

    {/* Button 1 */}
    <rect
      x="216"
      y="50"
      width="74"
      height="28"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />
    {/* Button 2 */}
    <rect
      x="298"
      y="50"
      width="74"
      height="28"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />
    {/* Button 3 */}
    <rect
      x="380"
      y="50"
      width="84"
      height="28"
      rx="6"
      className="fill-fd-foreground/10 transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Toolbar -> left */}
      <path d="M 200 60 L 100 60" />
      {/* Button -> right */}
      <path d="M 464 60 L 540 60" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="60" r="4" />
      <circle cx="464" cy="60" r="4" />
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
        Group
      </text>
      <text
        x="550"
        y="64"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Action
      </text>
    </g>
  </svg>
);
