export const PanelVsCard = () => (
  <svg
    viewBox="0 0 800 325"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Heading: Panel */}
    <text
      x="215"
      y="28"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      Panel
    </text>

    {/* Panel 1: form-style */}
    <rect
      x="55"
      y="50"
      width="320"
      height="120"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Title placeholder */}
    <rect
      x="75"
      y="68"
      width="140"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Form fields: label + input pairs */}
    <rect
      x="75"
      y="93"
      width="50"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="75"
      y="104"
      width="280"
      height="16"
      rx="4"
      fill="transparent"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <rect
      x="75"
      y="128"
      width="70"
      height="6"
      rx="2"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="75"
      y="139"
      width="280"
      height="16"
      rx="4"
      fill="transparent"
      className="stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />

    {/* Panel 2: list-style */}
    <rect
      x="55"
      y="185"
      width="320"
      height="120"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Title placeholder (shorter, signals different topic) */}
    <rect
      x="75"
      y="203"
      width="105"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* List rows: avatar + text (distinct from the form in Panel 1) */}
    <circle
      cx="87"
      cy="232"
      r="8"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="105"
      y="228"
      width="260"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <circle
      cx="87"
      cy="257"
      r="8"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="105"
      y="253"
      width="220"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <circle
      cx="87"
      cy="282"
      r="8"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="105"
      y="278"
      width="240"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Heading: Card */}
    <text
      x="585"
      y="28"
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      Card
    </text>

    {/* Cards row 1 */}
    {[0, 1, 2].map(i => {
      const x = 425 + i * 110;
      return (
        <g key={`r1-${i}`}>
          <rect
            x={x}
            y="50"
            width="100"
            height="120"
            rx="8"
            className="fill-fd-card stroke-fd-border transition-colors duration-300"
            strokeWidth="2"
          />
          <rect
            x={x + 10}
            y="60"
            width="80"
            height="50"
            rx="4"
            className="fill-fd-muted-foreground/20 transition-colors duration-300"
          />
          <rect
            x={x + 10}
            y="120"
            width="70"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/30 transition-colors duration-300"
          />
          <rect
            x={x + 10}
            y="134"
            width="55"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/30 transition-colors duration-300"
          />
          <rect
            x={x + 10}
            y="148"
            width="40"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/30 transition-colors duration-300"
          />
        </g>
      );
    })}

    {/* Cards row 2 */}
    {[0, 1, 2].map(i => {
      const x = 425 + i * 110;
      return (
        <g key={`r2-${i}`}>
          <rect
            x={x}
            y="185"
            width="100"
            height="120"
            rx="8"
            className="fill-fd-card stroke-fd-border transition-colors duration-300"
            strokeWidth="2"
          />
          <rect
            x={x + 10}
            y="195"
            width="80"
            height="50"
            rx="4"
            className="fill-fd-muted-foreground/20 transition-colors duration-300"
          />
          <rect
            x={x + 10}
            y="255"
            width="70"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/30 transition-colors duration-300"
          />
          <rect
            x={x + 10}
            y="269"
            width="55"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/30 transition-colors duration-300"
          />
          <rect
            x={x + 10}
            y="283"
            width="40"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/30 transition-colors duration-300"
          />
        </g>
      );
    })}
  </svg>
);
