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

/**
 * "Card vs Table" comparison: a grid of identity-per-item cards on the left,
 * a row-shaped data table on the right. Mirrors the PanelVsCard comparison mockup.
 */
export const CardVsTableMockup = () => {
  const columns = [
    [446, 70],
    [536, 60],
    [616, 60],
    [696, 48],
  ];

  return (
    <svg
      viewBox="0 0 800 330"
      className="mx-auto h-auto w-full max-w-[90%]"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="A grid of cards on the left compared with a data table on the right"
    >
      {/* Heading: Card */}
      <text
        x="205"
        y="28"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
        className="fill-fd-primary transition-colors duration-300"
      >
        Card
      </text>

      {/* Card grid: 2x2 items, each with media + title + body */}
      {[
        [50, 50],
        [210, 50],
        [50, 180],
        [210, 180],
      ].map(([ox, oy]) => (
        <g key={`card-${ox}-${oy}`}>
          <rect
            x={ox}
            y={oy}
            width="150"
            height="120"
            rx="8"
            className="fill-fd-card stroke-fd-border transition-colors duration-300"
            strokeWidth="2"
          />
          <rect
            x={ox + 12}
            y={oy + 12}
            width="126"
            height="44"
            rx="4"
            className="fill-fd-muted-foreground/30 transition-colors duration-300"
          />
          <rect
            x={ox + 12}
            y={oy + 68}
            width="90"
            height="8"
            rx="2"
            className="fill-fd-foreground transition-colors duration-300"
          />
          <rect
            x={ox + 12}
            y={oy + 84}
            width="110"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/50 transition-colors duration-300"
          />
          <rect
            x={ox + 12}
            y={oy + 96}
            width="70"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/40 transition-colors duration-300"
          />
        </g>
      ))}

      {/* Heading: Table */}
      <text
        x="595"
        y="28"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="14"
        fontWeight="600"
        textAnchor="middle"
        className="fill-fd-primary transition-colors duration-300"
      >
        Table
      </text>

      {/* Table container */}
      <rect
        x="430"
        y="50"
        width="330"
        height="250"
        rx="8"
        className="fill-fd-card stroke-fd-border transition-colors duration-300"
        strokeWidth="2"
      />

      {/* Header cells */}
      {columns.map(([cx, cw]) => (
        <rect
          key={`head-${cx}`}
          x={cx}
          y="70"
          width={cw}
          height="8"
          rx="2"
          className="fill-fd-foreground transition-colors duration-300"
        />
      ))}

      {/* Header divider */}
      <line
        x1="446"
        y1="92"
        x2="744"
        y2="92"
        strokeWidth="1"
        className="stroke-fd-border transition-colors duration-300"
      />

      {/* Data rows */}
      {[0, 1, 2, 3, 4].map(row => {
        const y = 108 + row * 36;
        return (
          <g key={`row-${row}`}>
            {columns.map(([cx, cw]) => (
              <rect
                key={`cell-${row}-${cx}`}
                x={cx}
                y={y}
                width={cw}
                height="7"
                rx="2"
                className="fill-fd-muted-foreground/50 transition-colors duration-300"
              />
            ))}
            {row < 4 && (
              <line
                x1="446"
                y1={y + 20}
                x2="744"
                y2={y + 20}
                strokeWidth="1"
                className="stroke-fd-border transition-colors duration-300"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
