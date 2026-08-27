export const FileFieldAnatomy = () => (
  <svg
    role="img"
    aria-label="Anatomy of a FileField: a Label above a Drop zone holding a Zone label and an Upload button, with a File item and its Remove button below"
    viewBox="58 88 660 260"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Field label above the drop zone */}
    <rect
      x="196"
      y="108"
      width="88"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Drop zone (dashed area files can be dragged onto) */}
    <rect
      x="196"
      y="131"
      width="373"
      height="118"
      rx="8"
      className="fill-fd-muted stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
      strokeDasharray="8 6"
    />
    {/* Zone label (instructional text inside the drop zone) */}
    <rect
      x="324"
      y="173"
      width="118"
      height="12"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    {/* Upload button opening the native file browser */}
    <rect
      x="334"
      y="200"
      width="98"
      height="31"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    <rect
      x="355"
      y="211"
      width="55"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* File item listing an uploaded file */}
    <rect
      x="196"
      y="267"
      width="373"
      height="55"
      rx="6"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* File type icon */}
    <rect
      x="212"
      y="281"
      width="22"
      height="27"
      rx="3"
      className="fill-fd-muted-foreground/30 transition-colors duration-300"
    />
    {/* File name */}
    <rect
      x="245"
      y="283"
      width="108"
      height="10"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* File size */}
    <rect
      x="245"
      y="300"
      width="59"
      height="8"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />
    {/* Remove button */}
    <circle
      cx="542"
      cy="294"
      r="12"
      className="fill-fd-muted-foreground/20 transition-colors duration-300"
    />
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M 537 289 L 547 299" />
      <path d="M 547 289 L 537 299" />
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
      <path d="M 196 114 L 137 114" />
      {/* Drop zone -> left */}
      <path d="M 196 157 L 137 157" />
      {/* File item -> left */}
      <path d="M 196 294 L 137 294" />
      {/* Zone label -> right */}
      <path d="M 442 179 L 608 179" />
      {/* Upload button -> right */}
      <path d="M 432 216 L 608 216" />
      {/* Remove button -> right */}
      <path d="M 555 294 L 608 294" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="196" cy="114" r="4" />
      <circle cx="196" cy="157" r="4" />
      <circle cx="196" cy="294" r="4" />
      <circle cx="442" cy="179" r="4" />
      <circle cx="432" cy="216" r="4" />
      <circle cx="555" cy="294" r="4" />
    </g>

    {/* Annotation labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      fontSize="14"
      fontWeight="600"
      className="fill-fd-primary transition-colors duration-300"
    >
      <g textAnchor="end">
        <text x="128" y="118">
          Label
        </text>
        <text x="128" y="161">
          Drop zone
        </text>
        <text x="128" y="298">
          File item
        </text>
      </g>
      <g textAnchor="start">
        <text x="618" y="183">
          Zone label
        </text>
        <text x="618" y="220">
          Upload button
        </text>
        <text x="618" y="298">
          Remove button
        </text>
      </g>
    </g>
  </svg>
);
