export const ToggleButtonAnatomy = () => (
  <svg
    viewBox="-10 30 660 80"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Button outline */}
    <rect
      x="240"
      y="40"
      width="160"
      height="48"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Icon placeholder */}
    <rect
      x="258"
      y="52"
      width="24"
      height="24"
      rx="6"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    {/* Text label placeholder */}
    <rect
      x="294"
      y="58"
      width="88"
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
      <path d="M 382 64 L 530 64" />
      <path d="M 240 64 L 110 64" />
      {/* Icon -> icon placeholder, routed below */}
      <path d="M 270 76 L 270 96 L 110 96" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="382" cy="64" r="4" />
      <circle cx="240" cy="64" r="4" />
      <circle cx="270" cy="76" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="100"
        y="68"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        ToggleButton
      </text>
      <text
        x="540"
        y="68"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Label
      </text>
      <text
        x="100"
        y="100"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Icon
      </text>
    </g>
  </svg>
);

export const ToggleButtonGroupAnatomy = () => (
  <svg
    viewBox="-10 10 660 110"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Group container */}
    <rect
      x="140"
      y="20"
      width="360"
      height="48"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Button 1 - selected state */}
    <rect
      x="142"
      y="22"
      width="116"
      height="44"
      rx="8"
      className="fill-fd-accent transition-colors duration-300"
    />

    {/* Separator 1 */}
    <rect
      x="260"
      y="28"
      width="1"
      height="32"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Separator 2 */}
    <rect
      x="380"
      y="28"
      width="1"
      height="32"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Selected state -> first button */}
      <path d="M 142 44 L 110 44" />
      {/* Container -> right edge */}
      <path d="M 500 44 L 530 44" />
      {/* Button -> middle button, routed below */}
      <path d="M 320 68 L 320 96 L 530 96" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="142" cy="44" r="4" />
      <circle cx="500" cy="44" r="4" />
      <circle cx="320" cy="68" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="100"
        y="48"
        textAnchor="end"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Selected state
      </text>
      <text
        x="540"
        y="48"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Container
      </text>
      <text
        x="540"
        y="100"
        textAnchor="start"
        fontSize="14"
        fontWeight="600"
        className="fill-fd-primary"
      >
        Button
      </text>
    </g>
  </svg>
);
