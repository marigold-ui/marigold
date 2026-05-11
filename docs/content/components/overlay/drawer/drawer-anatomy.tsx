export const DrawerAnatomy = () => (
  <svg
    viewBox="0 0 820 440"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Page area (active page content) */}
    <rect
      x="180"
      y="30"
      width="500"
      height="380"
      rx="12"
      className="fill-fd-muted/40 stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Page content placeholders */}
    <rect
      x="200"
      y="60"
      width="180"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="200"
      y="86"
      width="140"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="200"
      y="110"
      width="160"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="200"
      y="134"
      width="120"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />

    {/* Drawer panel */}
    <rect
      x="440"
      y="30"
      width="240"
      height="380"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Title */}
    <rect
      x="460"
      y="62"
      width="120"
      height="14"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Close button */}
    <circle
      cx="652"
      cy="46"
      r="14"
      className="fill-fd-muted/60 stroke-fd-border transition-colors duration-300"
      strokeWidth="1.5"
    />
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="1.75"
      strokeLinecap="round"
    >
      <path d="M 646 40 L 658 52" />
      <path d="M 658 40 L 646 52" />
    </g>

    {/* Content placeholder lines */}
    <rect
      x="460"
      y="120"
      width="200"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="460"
      y="146"
      width="180"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="460"
      y="172"
      width="200"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="460"
      y="198"
      width="150"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Actions area separator (subtle) */}
    <rect
      x="460"
      y="340"
      width="200"
      height="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Cancel button */}
    <rect
      x="460"
      y="358"
      width="90"
      height="32"
      rx="6"
      className="stroke-fd-border fill-transparent transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="485"
      y="370"
      width="40"
      height="8"
      rx="3"
      className="fill-fd-muted-foreground/60 transition-colors duration-300"
    />

    {/* Primary button */}
    <rect
      x="570"
      y="358"
      width="90"
      height="32"
      rx="6"
      className="fill-fd-primary transition-colors duration-300"
    />
    <rect
      x="595"
      y="370"
      width="40"
      height="8"
      rx="3"
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
      <path d="M 290 96 L 170 96" />
      <path d="M 440 220 L 170 220" />
      <path d="M 580 70 L 690 70" />
      <path d="M 666 46 L 690 46" />
      <path d="M 660 150 L 690 150" />
      <path d="M 660 374 L 690 374" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="290" cy="96" r="4" />
      <circle cx="440" cy="220" r="4" />
      <circle cx="580" cy="70" r="4" />
      <circle cx="666" cy="46" r="4" />
      <circle cx="660" cy="150" r="4" />
      <circle cx="660" cy="374" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="160"
          y="100"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Page content
        </text>
        <text
          x="160"
          y="224"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Drawer
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="700"
          y="50"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Close button
        </text>
        <text
          x="700"
          y="74"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Title
        </text>
        <text
          x="700"
          y="154"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Content
        </text>
        <text
          x="700"
          y="378"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Actions
        </text>
      </g>
    </g>
  </svg>
);
