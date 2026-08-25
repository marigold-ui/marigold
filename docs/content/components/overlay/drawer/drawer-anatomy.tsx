export const DrawerAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a Drawer: a Title, Content, a Close button and Actions, in a panel beside the Page content"
    viewBox="0 -30 660 384"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Page area (active page content) */}
    <rect
      x="144.88"
      y="24.15"
      width="402.44"
      height="305.85"
      rx="9.66"
      className="fill-fd-muted/40 stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Page content placeholders */}
    <rect
      x="160.98"
      y="48.29"
      width="144.88"
      height="9.66"
      rx="3.22"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="160.98"
      y="69.22"
      width="112.68"
      height="8.05"
      rx="3.22"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="160.98"
      y="88.54"
      width="128.78"
      height="8.05"
      rx="3.22"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="160.98"
      y="107.85"
      width="96.59"
      height="8.05"
      rx="3.22"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Drawer panel */}
    <rect
      x="354.15"
      y="24.15"
      width="193.17"
      height="305.85"
      rx="9.66"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Title */}
    <rect
      x="370.24"
      y="49.9"
      width="96.59"
      height="11.27"
      rx="3.22"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Close button */}
    <circle
      cx="524.78"
      cy="37.02"
      r="11.27"
      className="fill-fd-muted/60 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M 519.95 32.2 L 529.61 41.85" />
      <path d="M 529.61 32.2 L 519.95 41.85" />
    </g>

    {/* Content placeholder lines */}
    <rect
      x="370.24"
      y="96.59"
      width="160.98"
      height="8.05"
      rx="3.22"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="370.24"
      y="117.51"
      width="144.88"
      height="8.05"
      rx="3.22"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="370.24"
      y="138.44"
      width="160.98"
      height="8.05"
      rx="3.22"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="370.24"
      y="159.37"
      width="120.73"
      height="8.05"
      rx="3.22"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Actions area separator (subtle) */}
    <rect
      x="370.24"
      y="273.66"
      width="160.98"
      height="0.8"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Cancel button */}
    <rect
      x="370.24"
      y="288.15"
      width="72.44"
      height="25.76"
      rx="4.83"
      className="stroke-fd-border fill-transparent transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="390.37"
      y="297.8"
      width="32.2"
      height="6.44"
      rx="2.41"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Primary button */}
    <rect
      x="458.78"
      y="288.15"
      width="72.44"
      height="25.76"
      rx="4.83"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="478.9"
      y="297.8"
      width="32.2"
      height="6.44"
      rx="2.41"
      className="fill-fd-primary-foreground/80 transition-colors duration-300"
    />

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 233.41 77.27 L 136.83 77.27" />
      <path d="M 354.15 177.07 L 136.83 177.07" />
      <path d="M 466.83 56.34 L 555.37 56.34" />
      {/* Close button -> up, so its label clears the Title's */}
      <path d="M 524.88 25.75 L 524.88 -2" />
      <path d="M 531.22 120.73 L 555.37 120.73" />
      <path d="M 531.22 301.02 L 555.37 301.02" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="233.41" cy="77.27" r="4" />
      <circle cx="354.15" cy="177.07" r="4" />
      <circle cx="466.83" cy="56.34" r="4" />
      <circle cx="524.88" cy="25.75" r="4" />
      <circle cx="531.22" cy="120.73" r="4" />
      <circle cx="531.22" cy="301.02" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="128.78" y="80.49">
          Page content
        </text>
        <text x="128.78" y="180.29">
          Drawer
        </text>
      </g>
      <text x="524.88" y="-10" textAnchor="middle">
        Close button
      </text>
      <g textAnchor="start">
        <text x="563.41" y="59.56">
          Title
        </text>
        <text x="563.41" y="123.95">
          Content
        </text>
        <text x="563.41" y="304.24">
          Actions
        </text>
      </g>
    </g>
  </svg>
);
