/**
 * "Don't wrap tabular data in cards"
 * Left: the same data laid out as a Table.
 * Right: a cluttered column of cards holding key/value rows.
 */
export const CardVsTableMockup = () => (
  <svg
    viewBox="0 30 760 220"
    className="mx-auto -mb-2 h-auto w-full max-w-[95%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Comparison: a table versus stacked cards for tabular data"
  >
    {/* DO: a compact Table */}
    <rect
      x="20"
      y="40"
      width="340"
      height="200"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Header row */}
    <rect
      x="20"
      y="40"
      width="340"
      height="36"
      className="fill-fd-muted/40 transition-colors duration-300"
    />
    <rect
      x="36"
      y="55"
      width="60"
      height="8"
      rx="2"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="130"
      y="55"
      width="60"
      height="8"
      rx="2"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="230"
      y="55"
      width="60"
      height="8"
      rx="2"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Header divider */}
    <line
      x1="20"
      y1="76"
      x2="360"
      y2="76"
      strokeWidth="1"
      className="stroke-fd-border transition-colors duration-300"
    />
    {/* Body rows */}
    {[0, 1, 2, 3].map(i => {
      const y = 96 + i * 36;
      return (
        <g key={`row-${i}`}>
          <rect
            x="36"
            y={y - 4}
            width="80"
            height="8"
            rx="2"
            className="fill-fd-muted-foreground/70 transition-colors duration-300"
          />
          <rect
            x="130"
            y={y - 4}
            width="70"
            height="8"
            rx="2"
            className="fill-fd-muted-foreground/50 transition-colors duration-300"
          />
          <rect
            x="230"
            y={y - 4}
            width="50"
            height="8"
            rx="2"
            className="fill-fd-muted-foreground/50 transition-colors duration-300"
          />
          {i < 3 && (
            <line
              x1="20"
              y1={y + 14}
              x2="360"
              y2={y + 14}
              strokeWidth="1"
              className="stroke-fd-border transition-colors duration-300"
            />
          )}
        </g>
      );
    })}

    {/* DON'T: 3 stacked cards with label/value rows */}
    {[0, 1, 2].map(i => {
      const y = 40 + i * 70;
      return (
        <g key={`bad-${i}`}>
          <rect
            x="400"
            y={y}
            width="320"
            height="58"
            rx="8"
            className="fill-fd-card stroke-fd-border transition-colors duration-300"
            strokeWidth="2"
          />
          {/* Title */}
          <rect
            x="416"
            y={y + 12}
            width="120"
            height="10"
            rx="2"
            className="fill-fd-foreground transition-colors duration-300"
          />
          {/* Label/value pair */}
          <rect
            x="416"
            y={y + 32}
            width="60"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/40 transition-colors duration-300"
          />
          <rect
            x="486"
            y={y + 32}
            width="80"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/70 transition-colors duration-300"
          />
          <rect
            x="580"
            y={y + 32}
            width="60"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/40 transition-colors duration-300"
          />
          <rect
            x="650"
            y={y + 32}
            width="50"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/70 transition-colors duration-300"
          />
        </g>
      );
    })}
  </svg>
);

/**
 * "Don't wrap simple content in cards"
 * Left: the paragraph rendered as plain text.
 * Right: the same paragraph trapped inside an unnecessary card.
 */
export const CardVsTextMockup = () => (
  <svg
    viewBox="0 40 760 140"
    className="mx-auto -mb-2 h-auto w-full max-w-[95%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Comparison: plain text versus a card around a single paragraph"
  >
    {/* DO: content without a surrounding card */}
    <rect
      x="40"
      y="78"
      width="180"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="40"
      y="106"
      width="290"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="40"
      y="124"
      width="240"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* DON'T: empty wrapper card around one short paragraph */}
    <rect
      x="400"
      y="50"
      width="340"
      height="120"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="420"
      y="78"
      width="180"
      height="12"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="420"
      y="106"
      width="290"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
    <rect
      x="420"
      y="124"
      width="240"
      height="8"
      rx="2"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />
  </svg>
);

/**
 * "Don't stack many cards on a page"
 * Left: the items as a list, separated by dividers.
 * Right: a long column of full-width cards, each with their own border and shadow.
 */
export const CardVsListMockup = () => (
  <svg
    viewBox="0 30 760 280"
    className="mx-auto -mb-2 h-auto w-full max-w-[95%]"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Comparison: a list with dividers versus many stacked cards"
  >
    {/* DO: rows separated by dividers (single surface) */}
    {[0, 1, 2, 3, 4].map(i => {
      const y = 40 + i * 50;
      return (
        <g key={`list-${i}`}>
          <circle
            cx="42"
            cy={y + 20}
            r="8"
            className="fill-fd-muted-foreground/40 transition-colors duration-300"
          />
          <rect
            x="60"
            y={y + 12}
            width="170"
            height="8"
            rx="2"
            className="fill-fd-foreground transition-colors duration-300"
          />
          <rect
            x="60"
            y={y + 24}
            width="120"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/40 transition-colors duration-300"
          />
          {i < 4 && (
            <line
              x1="20"
              y1={y + 48}
              x2="360"
              y2={y + 48}
              strokeWidth="1"
              className="stroke-fd-border transition-colors duration-300"
            />
          )}
        </g>
      );
    })}

    {/* DON'T: stacked full-width cards */}
    {[0, 1, 2, 3, 4].map(i => {
      const y = 40 + i * 50;
      return (
        <g key={`stacked-${i}`}>
          <rect
            x="400"
            y={y}
            width="340"
            height="40"
            rx="8"
            className="fill-fd-card stroke-fd-border transition-colors duration-300"
            strokeWidth="2"
          />
          <circle
            cx="422"
            cy={y + 20}
            r="8"
            className="fill-fd-muted-foreground/40 transition-colors duration-300"
          />
          <rect
            x="440"
            y={y + 12}
            width="170"
            height="8"
            rx="2"
            className="fill-fd-foreground transition-colors duration-300"
          />
          <rect
            x="440"
            y={y + 24}
            width="120"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/40 transition-colors duration-300"
          />
        </g>
      );
    })}
  </svg>
);
