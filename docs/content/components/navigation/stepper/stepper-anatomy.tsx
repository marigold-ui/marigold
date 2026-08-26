export const StepperAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Stepper: Steps carrying a Marker and a Label, each joined to the next by a Connector"
    viewBox="0 50 660 180"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* One step: its marker and label belong together */}
    <rect
      x="32"
      y="118"
      width="108"
      height="44"
      rx="7"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />

    {/* Connectors: the first one is walked, the rest are still ahead */}
    <g strokeWidth="2" strokeLinecap="round" fill="none">
      <path
        d="M 144 140 L 190 140"
        className="stroke-fd-foreground transition-colors duration-300"
      />
      <g className="stroke-fd-border transition-colors duration-300">
        <path d="M 310 140 L 356 140" />
        <path d="M 472 140 L 518 140" />
      </g>
    </g>

    {/* Markers of the completed and the current step */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="55" cy="140" r="15" />
      <circle cx="213" cy="140" r="15" />
    </g>
    {/* The completed step carries a check instead of its number */}
    <path
      d="M 48 140 L 53 145.5 L 62 134.5"
      className="stroke-fd-primary-foreground transition-colors duration-300"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />

    {/* Markers of the steps still ahead */}
    <g
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    >
      <circle cx="379" cy="140" r="15" />
      <circle cx="541" cy="140" r="15" />
    </g>

    {/* Step numbers */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="13"
      fontWeight="600"
      textAnchor="middle"
    >
      <text
        x="213"
        y="145"
        className="fill-fd-primary-foreground transition-colors duration-300"
      >
        2
      </text>
      <g className="fill-fd-muted-foreground transition-colors duration-300">
        <text x="379" y="145">
          3
        </text>
        <text x="541" y="145">
          4
        </text>
      </g>
    </g>

    {/* Labels: walked and current steps read as foreground, the rest as muted */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="78" y="133" width="58" height="14" rx="5" />
      <rect x="236" y="132" width="66" height="16" rx="5" />
    </g>
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="402" y="134" width="62" height="12" rx="5" />
      <rect x="564" y="134" width="56" height="12" rx="5" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 86 118 L 86 86" />
      <path d="M 433 134 L 433 86" />
      <path d="M 213 155 L 213 196" />
      <path d="M 333 140 L 333 196" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="86" cy="118" r="4" />
      <circle cx="433" cy="134" r="4" />
      <circle cx="213" cy="155" r="4" />
      <circle cx="333" cy="140" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="12"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="86" y="76">
        Step
      </text>
      <text x="433" y="76">
        Label
      </text>
      <text x="213" y="210">
        Marker
      </text>
      <text x="333" y="210">
        Connector
      </text>
    </g>
  </svg>
);
