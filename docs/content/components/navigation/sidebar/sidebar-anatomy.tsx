export const SidebarAnatomy = () => (
  <svg
    viewBox="40 58 640 385"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Sidebar Container */}
    <rect
      x="240"
      y="70"
      width="220"
      height="360"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Header Area */}
    <rect
      x="260"
      y="90"
      width="24"
      height="24"
      rx="6"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />
    <rect
      x="296"
      y="96"
      width="100"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Group 1 Label */}
    <rect
      x="260"
      y="140"
      width="80"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Item 1 (Active) */}
    <rect
      x="252"
      y="160"
      width="196"
      height="36"
      rx="6"
      className="fill-fd-accent transition-colors duration-300"
    />
    <rect
      x="264"
      y="170"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    <rect
      x="292"
      y="172"
      width="120"
      height="12"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />

    {/* Item 2 */}
    <rect
      x="264"
      y="214"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="292"
      y="216"
      width="90"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Separator */}
    <rect
      x="260"
      y="250"
      width="180"
      height="2"
      rx="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Group 2 Label */}
    <rect
      x="260"
      y="270"
      width="60"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Item 3 */}
    <rect
      x="264"
      y="294"
      width="16"
      height="16"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />
    <rect
      x="292"
      y="296"
      width="110"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground/50 transition-colors duration-300"
    />

    {/* Footer Area */}
    <rect
      x="240"
      y="360"
      width="220"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />
    <circle
      cx="272"
      cy="395"
      r="16"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    <rect
      x="300"
      y="385"
      width="90"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    <rect
      x="300"
      y="401"
      width="60"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground/40 transition-colors duration-300"
    />

    {/* Toggle Button */}
    <rect
      x="490"
      y="70"
      width="40"
      height="40"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M 502 84 L 518 84" />
      <path d="M 502 90 L 518 90" />
      <path d="M 502 96 L 518 96" />
    </g>

    {/* Connector Lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M 272 102 L 160 102" />
      <path d="M 300 145 L 160 145" />
      <path d="M 246 260 L 160 260" />
      <path d="M 240 330 L 160 330" />
      <path d="M 530 90 L 590 90" />
      <path d="M 382 222 L 590 222" />
      <path d="M 440 251 L 590 251" />
      <path d="M 460 395 L 590 395" />
    </g>

    {/* Connector Dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="272" cy="102" r="4" />
      <circle cx="300" cy="145" r="4" />
      <circle cx="246" cy="260" r="4" />
      <circle cx="240" cy="330" r="4" />
      <circle cx="530" cy="90" r="4" />
      <circle cx="382" cy="222" r="4" />
      <circle cx="440" cy="251" r="4" />
      <circle cx="460" cy="395" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="150"
          y="106"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Header
        </text>
        <text
          x="150"
          y="149"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Group label
        </text>
        <text
          x="150"
          y="264"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Navigation
        </text>
        <text
          x="150"
          y="334"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Sidebar
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="600"
          y="94"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Toggle
        </text>
        <text
          x="600"
          y="226"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Item
        </text>
        <text
          x="600"
          y="255"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Separator
        </text>
        <text
          x="600"
          y="399"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Footer
        </text>
      </g>
    </g>
  </svg>
);
