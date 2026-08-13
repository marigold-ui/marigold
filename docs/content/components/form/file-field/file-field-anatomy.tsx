export const FileFieldAnatomy = () => (
  <svg
    viewBox="40 90 710 265"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the drop zone */}
    <rect
      x="200"
      y="110"
      width="90"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Drop zone (dashed area files can be dragged onto) */}
    <rect
      x="200"
      y="134"
      width="380"
      height="120"
      rx="8"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
      strokeDasharray="8 6"
    />
    {/* Zone label (instructional text inside the drop zone) */}
    <rect
      x="330"
      y="176"
      width="120"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    {/* Upload button opening the native file browser */}
    <rect
      x="340"
      y="204"
      width="100"
      height="32"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="362"
      y="215"
      width="56"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* File item listing an uploaded file */}
    <rect
      x="200"
      y="272"
      width="380"
      height="56"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* File type icon */}
    <rect
      x="216"
      y="286"
      width="22"
      height="28"
      rx="3"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    {/* File name */}
    <rect
      x="250"
      y="288"
      width="110"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* File size */}
    <rect
      x="250"
      y="306"
      width="60"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    {/* Remove button */}
    <circle
      cx="552"
      cy="300"
      r="12"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 547 295 L 557 305" />
      <path d="M 557 295 L 547 305" />
    </g>

    {/* Connector lines */}
    <g
      className="stroke-fd-primary transition-colors duration-300"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Label -> left */}
      <path d="M 200 116 L 140 116" />
      {/* Drop zone -> left */}
      <path d="M 200 160 L 140 160" />
      {/* File item -> left */}
      <path d="M 200 300 L 140 300" />
      {/* Zone label -> right */}
      <path d="M 450 182 L 620 182" />
      {/* Upload button -> right */}
      <path d="M 440 220 L 620 220" />
      {/* Remove button -> right */}
      <path d="M 566 300 L 620 300" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="116" r="4" />
      <circle cx="200" cy="160" r="4" />
      <circle cx="200" cy="300" r="4" />
      <circle cx="450" cy="182" r="4" />
      <circle cx="440" cy="220" r="4" />
      <circle cx="566" cy="300" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="130" y="120">
          Label
        </text>
        <text x="130" y="164">
          Drop zone
        </text>
        <text x="130" y="304">
          File item
        </text>
      </g>
      <g textAnchor="start">
        <text x="630" y="186">
          Zone label
        </text>
        <text x="630" y="224">
          Upload button
        </text>
        <text x="630" y="304">
          Remove button
        </text>
      </g>
    </g>
  </svg>
);
