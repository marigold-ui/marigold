export const TopNavigationAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a TopNavigation: a Container holding the Start, Middle and End slots"
    viewBox="71 36 660 255"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Container (the header element holding the three-column grid) */}
    <rect
      x="73"
      y="121"
      width="655"
      height="73"
      rx="10"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Start slot (sidebar toggle, logo, breadcrumbs) */}
    <rect
      x="92"
      y="136"
      width="146"
      height="44"
      rx="7"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />
    <rect
      x="107"
      y="151"
      width="49"
      height="15"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />
    <rect
      x="168"
      y="153"
      width="56"
      height="10"
      rx="5"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Middle slot (breadcrumbs or a search field) */}
    <rect
      x="257"
      y="136"
      width="291"
      height="44"
      rx="7"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="306" y="153" width="49" height="10" rx="5" />
      <rect x="364" y="153" width="56" height="10" rx="5" />
    </g>
    <rect
      x="430"
      y="152"
      width="70"
      height="12"
      rx="5"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* End slot (user menu, notifications, settings) */}
    <rect
      x="568"
      y="136"
      width="141"
      height="44"
      rx="7"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
      strokeDasharray="6 4"
    />
    <g className="fill-fd-muted-foreground transition-colors duration-300">
      <rect x="587" y="153" width="49" height="10" rx="5" />
      <rect x="646" y="153" width="44" height="10" rx="5" />
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
      <path d="M 401 121 L 401 80" />
      {/* Start -> down */}
      <path d="M 165 180 L 165 238" />
      {/* Middle -> down */}
      <path d="M 403 180 L 403 238" />
      {/* End -> down */}
      <path d="M 638 180 L 638 238" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="401" cy="121" r="4" />
      <circle cx="165" cy="180" r="4" />
      <circle cx="403" cy="180" r="4" />
      <circle cx="638" cy="180" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      textAnchor="middle"
      className="fill-fd-primary transition-colors duration-300"
    >
      <text x="401" y="70">
        Container
      </text>
      <text x="165" y="260">
        Start
      </text>
      <text x="403" y="260">
        Middle
      </text>
      <text x="638" y="260">
        End
      </text>
    </g>
  </svg>
);
