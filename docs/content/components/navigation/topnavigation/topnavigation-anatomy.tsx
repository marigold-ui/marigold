export const TopNavigationAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a TopNavigation: a Container holding the Start, Middle and End slots"
    viewBox="40 30 580 210"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Container (the header element holding the three-column grid) */}
    <rect
      x="60"
      y="100"
      width="540"
      height="60"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Start slot (sidebar toggle, logo, breadcrumbs) */}
    <rect
      x="76"
      y="112"
      width="120"
      height="36"
      rx="6"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />
    <rect
      x="88"
      y="124"
      width="40"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="138"
      y="126"
      width="46"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Middle slot (breadcrumbs or a search field) */}
    <rect
      x="212"
      y="112"
      width="240"
      height="36"
      rx="6"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="252" y="126" width="40" height="8" rx="4" />
      <rect x="300" y="126" width="46" height="8" rx="4" />
    </g>
    <rect
      x="354"
      y="125"
      width="58"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* End slot (user menu, notifications, settings) */}
    <rect
      x="468"
      y="112"
      width="116"
      height="36"
      rx="6"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="484" y="126" width="40" height="8" rx="4" />
      <rect x="532" y="126" width="36" height="8" rx="4" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Container -> up */}
      <path d="M 330 100 L 330 66" />
      {/* Start -> down */}
      <path d="M 136 148 L 136 196" />
      {/* Middle -> down */}
      <path d="M 332 148 L 332 196" />
      {/* End -> down */}
      <path d="M 526 148 L 526 196" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="330" cy="100" r="4" />
      <circle cx="136" cy="148" r="4" />
      <circle cx="332" cy="148" r="4" />
      <circle cx="526" cy="148" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="330" y="58">
        Container
      </text>
      <text x="136" y="214">
        Start
      </text>
      <text x="332" y="214">
        Middle
      </text>
      <text x="526" y="214">
        End
      </text>
    </g>
  </svg>
);
