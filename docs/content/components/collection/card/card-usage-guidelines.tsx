/**
 * "Don't nest cards inside cards" Do half: one card with stacked sections separated by dividers.
 */
export const DoNestedMockup = () => (
  <svg
    viewBox="0 30 360 240"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A single card with sections separated by dividers"
  >
    <rect
      x="20"
      y="40"
      width="320"
      height="220"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {[0, 1, 2].map(i => {
      const y = 60 + i * 60;
      return (
        <g key={`section-${i}`}>
          <rect
            x="40"
            y={y}
            width="120"
            height="10"
            rx="3"
            className="fill-fd-foreground transition-colors duration-300"
          />
          <rect
            x="40"
            y={y + 20}
            width="220"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/50 transition-colors duration-300"
          />
          {i < 2 && (
            <line
              x1="40"
              y1={y + 44}
              x2="320"
              y2={y + 44}
              strokeWidth="1"
              className="stroke-fd-border transition-colors duration-300"
            />
          )}
        </g>
      );
    })}
  </svg>
);

/**
 * "Don't nest cards inside cards" — Don't half: a card containing two smaller cards.
 */
export const DontNestedMockup = () => (
  <svg
    viewBox="0 30 340 240"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A card with two nested cards inside it"
  >
    <rect
      x="20"
      y="40"
      width="320"
      height="220"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {[0, 1].map(i => {
      const y = 60 + i * 90;
      return (
        <g key={`nested-${i}`}>
          <rect
            x="40"
            y={y}
            width="280"
            height="74"
            rx="8"
            className="fill-fd-card stroke-fd-border transition-colors duration-300"
            strokeWidth="2"
          />
          <rect
            x="56"
            y={y + 16}
            width="120"
            height="10"
            rx="3"
            className="fill-fd-foreground transition-colors duration-300"
          />
          <rect
            x="56"
            y={y + 36}
            width="220"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/50 transition-colors duration-300"
          />
          <rect
            x="56"
            y={y + 50}
            width="180"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/40 transition-colors duration-300"
          />
        </g>
      );
    })}
  </svg>
);
