export const DoTableMockup = () => (
  <svg
    viewBox="0 30 360 220"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A compact table with rows of values"
  >
    <rect
      x="20"
      y="40"
      width="340"
      height="200"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
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
    <line
      x1="20"
      y1="76"
      x2="360"
      y2="76"
      strokeWidth="1"
      className="stroke-fd-border transition-colors duration-300"
    />
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
  </svg>
);

/**
 * "Don't wrap tabular data in cards" — Don't half: stacked cards holding key/value rows.
 */
export const DontTableMockup = () => (
  <svg
    viewBox="400 30 340 220"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A column of cards each holding key/value rows"
  >
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
          <rect
            x="416"
            y={y + 12}
            width="120"
            height="10"
            rx="2"
            className="fill-fd-foreground transition-colors duration-300"
          />
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
 * "Don't wrap simple content in cards" — Do half: a paragraph rendered as plain text.
 */
export const DoTextMockup = () => (
  <svg
    viewBox="0 40 360 140"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A short paragraph rendered as plain text"
  >
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
  </svg>
);

/**
 * "Don't wrap simple content in cards" — Don't half: the same paragraph trapped inside a card.
 */
export const DontTextMockup = () => (
  <svg
    viewBox="400 40 340 140"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A short paragraph wrapped in an unnecessary card"
  >
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
 * "Don't stack many cards on a page" — Do half: rows separated by dividers on a single surface.
 */
export const DoListMockup = () => (
  <svg
    viewBox="0 30 360 280"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A list of rows separated by dividers"
  >
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
  </svg>
);

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
    viewBox="400 30 340 240"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A card with two nested cards inside it"
  >
    <rect
      x="420"
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
            x="440"
            y={y}
            width="280"
            height="74"
            rx="8"
            className="fill-fd-card stroke-fd-border transition-colors duration-300"
            strokeWidth="2"
          />
          <rect
            x="456"
            y={y + 16}
            width="120"
            height="10"
            rx="3"
            className="fill-fd-foreground transition-colors duration-300"
          />
          <rect
            x="456"
            y={y + 36}
            width="220"
            height="6"
            rx="2"
            className="fill-fd-muted-foreground/50 transition-colors duration-300"
          />
          <rect
            x="456"
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
 * "Don't stack many cards on a page" — Don't half: a long column of full-width cards.
 */
export const DontListMockup = () => (
  <svg
    viewBox="400 30 340 280"
    className="mx-auto h-auto w-full"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="A long column of stacked full-width cards"
  >
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
