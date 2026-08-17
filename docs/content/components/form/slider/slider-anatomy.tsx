export const SliderAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Slider: a Label and an Output above a Track with a draggable Thumb, and a Description below"
    viewBox="176 47 660 256"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the track */}
    <rect
      x="349"
      y="128"
      width="128"
      height="16"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Output showing the current value */}
    <rect
      x="768"
      y="128"
      width="47"
      height="16"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Track (full range of available values) */}
    <rect
      x="349"
      y="175"
      width="466"
      height="12"
      rx="6"
      className="fill-fd-primary/20 transition-colors duration-300"
    />
    {/* Filled part of the track (up to the current value) */}
    <rect
      x="349"
      y="175"
      width="175"
      height="12"
      rx="6"
      className="fill-fd-primary transition-colors duration-300"
    />
    {/* Thumb (draggable handle) */}
    <circle
      cx="524"
      cy="180"
      r="14"
      className="fill-fd-card stroke-fd-primary transition-colors duration-300"
      strokeWidth="3"
    />

    {/* Description below the track */}
    <rect
      x="349"
      y="217"
      width="163"
      height="12"
      rx="5"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label -> up */}
      <path d="M 384 128 L 384 88" />
      {/* Output -> up */}
      <path d="M 792 128 L 792 88" />
      {/* Thumb -> up */}
      <path d="M 524 166 L 524 116" />
      {/* Track -> down */}
      <path d="M 698 186 L 698 256" />
      {/* Description -> left */}
      <path d="M 349 222 L 279 222" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="384" cy="128" r="4" />
      <circle cx="792" cy="128" r="4" />
      <circle cx="524" cy="166" r="4" />
      <circle cx="698" cy="186" r="4" />
      <circle cx="349" cy="222" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="middle">
        <text x="384" y="79">
          Label
        </text>
        <text x="792" y="79">
          Output
        </text>
        <text x="524" y="107">
          Thumb
        </text>
        <text x="698" y="277">
          Track
        </text>
      </g>
      <text x="268" y="227" textAnchor="end">
        Description
      </text>
    </g>
  </svg>
);
