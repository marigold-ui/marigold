export const ButtonAnatomy = () => (
  <svg
    viewBox="145 121 660 145"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Button with a label (the pressable area) */}
    <rect
      x="303"
      y="182"
      width="206"
      height="63"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Icon placeholder (optional leading icon) */}
    <rect
      x="329"
      y="203"
      width="19"
      height="19"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Label placeholder (the text) */}
    <rect
      x="363"
      y="207"
      width="116"
      height="15"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Icon-only button (square, no label) */}
    <rect
      x="557"
      y="182"
      width="63"
      height="63"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="579"
      y="203"
      width="19"
      height="19"
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
      {/* Button -> left */}
      <path d="M 303 213 L 224 213" />
      {/* Icon -> up */}
      <path d="M 339 203 L 339 150" />
      {/* Label -> up */}
      <path d="M 421 207 L 421 150" />
      {/* Icon-only -> right */}
      <path d="M 620 213 L 702 213" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="303" cy="213" r="4" />
      <circle cx="339" cy="203" r="4" />
      <circle cx="421" cy="207" r="4" />
      <circle cx="620" cy="213" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <text
        x="212"
        y="218"
        fontSize="14"
        fontWeight="600"
        textAnchor="end"
        className="fill-fd-primary"
      >
        Button
      </text>
      <text
        x="339"
        y="140"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
        className="fill-fd-primary"
      >
        Icon
      </text>
      <text
        x="421"
        y="140"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
        className="fill-fd-primary"
      >
        Label
      </text>
      <text
        x="714"
        y="218"
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
