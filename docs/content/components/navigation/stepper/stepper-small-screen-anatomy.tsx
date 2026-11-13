export const StepperSmallScreenAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Stepper on small screens: a track with one Segment per step, and below it the Current label with a Counter on the same row"
    viewBox="0 45 660 125"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g className="fill-fd-primary transition-colors duration-300">
      <rect x="200" y="118" width="62" height="5" rx="2.5" />
      <rect x="266" y="118" width="62" height="5" rx="2.5" />
    </g>
    <g className="fill-fd-border transition-colors duration-300">
      <rect x="332" y="118" width="62" height="5" rx="2.5" />
      <rect x="398" y="118" width="62" height="5" rx="2.5" />
    </g>

    <rect
      x="200"
      y="135"
      width="120"
      height="16"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="402"
      y="137"
      width="58"
      height="12"
      rx="5"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 363 120 L 363 88" />
      <path d="M 200 143 L 150 143" />
      <path d="M 460 143 L 508 143" />
    </g>

    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="363" cy="120" r="4" />
      <circle cx="200" cy="143" r="4" />
      <circle cx="460" cy="143" r="4" />
    </g>

    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="363" y="78" textAnchor="middle">
        Segment
      </text>
      <text x="142" y="148" textAnchor="end">
        Current label
      </text>
      <text x="516" y="148" textAnchor="start">
        Counter
      </text>
    </g>
  </svg>
);
