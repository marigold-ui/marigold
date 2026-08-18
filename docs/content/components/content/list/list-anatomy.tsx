export const ListAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a List: a List container holding several List items"
    viewBox="75 41 660 324"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* List (the container holding all items) */}
    <rect
      x="203"
      y="61"
      width="405"
      height="284"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* List item markers */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <circle cx="233" cy="101" r="6" />
      <circle cx="233" cy="162" r="6" />
      <circle cx="233" cy="223" r="6" />
      <circle cx="233" cy="284" r="6" />
    </g>
    {/* List item content */}
    <g className="fill-fd-foreground transition-colors duration-300">
      <rect x="255" y="95" width="122" height="12" rx="4" />
      <rect x="255" y="156" width="122" height="12" rx="4" />
      <rect x="255" y="217" width="122" height="12" rx="4" />
      <rect x="255" y="278" width="122" height="12" rx="4" />
    </g>
    {/* Dividers between the items */}
    <g className="fill-fd-border transition-colors duration-300">
      <rect x="227" y="132" width="357" height="2" />
      <rect x="227" y="193" width="357" height="2" />
      <rect x="227" y="253" width="357" height="2" />
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
      <path d="M 203 203 L 142 203" />
      {/* List item -> right */}
      <path d="M 608 101 L 669 101" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="203" cy="203" r="4" />
      <circle cx="608" cy="101" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="132" y="207" textAnchor="end">
        List
      </text>
      <text x="679" y="105" textAnchor="start">
        List item
      </text>
    </g>
  </svg>
);
