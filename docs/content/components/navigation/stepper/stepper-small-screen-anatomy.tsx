export const StepperSmallScreenAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Stepper on small screens: a Counter, the Current label, and a track with one Segment per step"
    viewBox="0 50 660 180"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="200"
      y="100"
      width="78"
      height="12"
      rx="5"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    <rect
      x="200"
      y="122"
      width="120"
      height="16"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    <g className="fill-fd-primary transition-colors duration-300">
      <rect x="200" y="150" width="62" height="5" rx="2.5" />
      <rect x="266" y="150" width="62" height="5" rx="2.5" />
    </g>
    <g className="fill-fd-border transition-colors duration-300">
      <rect x="332" y="150" width="62" height="5" rx="2.5" />
      <rect x="398" y="150" width="62" height="5" rx="2.5" />
    </g>

    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 200 106 L 150 106" />
      <path d="M 320 130 L 500 130" />
      <path d="M 363 155 L 363 196" />
    </g>

    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="106" r="4" />
      <circle cx="320" cy="130" r="4" />
      <circle cx="363" cy="155" r="4" />
    </g>

    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="142" y="111" textAnchor="end">
        Counter
      </text>
      <text x="508" y="135" textAnchor="start">
        Current label
      </text>
      <text x="363" y="212" textAnchor="middle">
        Segment
      </text>
    </g>
  </svg>
);
