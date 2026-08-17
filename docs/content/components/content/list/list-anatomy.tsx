export const ListAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a List: a List container holding several List items"
    viewBox="60 40 680 320"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* List (the container holding all items) */}
    <rect
      x="200"
      y="60"
      width="400"
      height="280"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* List item markers */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <circle cx="230" cy="100" r="6" />
      <circle cx="230" cy="160" r="6" />
      <circle cx="230" cy="220" r="6" />
      <circle cx="230" cy="280" r="6" />
    </g>
    {/* List item content */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="252" y="94" width="120" height="12" rx="4" />
      <rect x="252" y="154" width="120" height="12" rx="4" />
      <rect x="252" y="214" width="120" height="12" rx="4" />
      <rect x="252" y="274" width="120" height="12" rx="4" />
    </g>
    {/* Dividers between the items */}
    <g className="fill-fd-border transition-colors duration-300">
      <rect x="224" y="130" width="352" height="2" />
      <rect x="224" y="190" width="352" height="2" />
      <rect x="224" y="250" width="352" height="2" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* List -> left */}
      <path d="M 200 200 L 140 200" />
      {/* List item -> right */}
      <path d="M 600 100 L 660 100" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="200" r="4" />
      <circle cx="600" cy="100" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="130" y="204" textAnchor="end">
        List
      </text>
      <text x="670" y="104" textAnchor="start">
        List item
      </text>
    </g>
  </svg>
);
