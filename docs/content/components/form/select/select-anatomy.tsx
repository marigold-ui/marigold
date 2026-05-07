export const SelectAnatomy = () => (
  <svg
    viewBox="-20 50 740 470"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="select-anatomy-popover-clip">
        <rect x="200" y="220" width="320" height="280" rx="12" />
      </clipPath>
    </defs>

    {/* Field label */}
    <rect
      x="200"
      y="70"
      width="100"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Trigger (closed select field) */}
    <rect
      x="200"
      y="100"
      width="320"
      height="44"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Selected value */}
    <rect
      x="220"
      y="116"
      width="140"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />
    {/* Chevron (chevrons-up-down) */}
    <g
      className="stroke-fd-muted-foreground transition-colors duration-300"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M 488 120 L 496 113 L 504 120" />
      <path d="M 488 124 L 496 131 L 504 124" />
    </g>

    {/* Helper text (description below the field) */}
    <rect
      x="200"
      y="160"
      width="200"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Popover / listbox */}
    <rect
      x="200"
      y="220"
      width="320"
      height="280"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Section header */}
    <rect
      x="220"
      y="240"
      width="80"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Option 1 (selected) accent fill */}
    <g clipPath="url(#select-anatomy-popover-clip)">
      <rect
        x="208"
        y="266"
        width="304"
        height="60"
        rx="6"
        className="fill-fd-accent transition-colors duration-300"
      />
    </g>
    {/* Option 1 label */}
    <rect
      x="222"
      y="282"
      width="130"
      height="12"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />
    {/* Option 1 description */}
    <rect
      x="222"
      y="302"
      width="180"
      height="10"
      rx="4"
      className="fill-fd-accent-foreground/70 transition-colors duration-300"
    />

    {/* Divider between option 1 and 2 */}
    <rect
      x="220"
      y="342"
      width="280"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Option 2 */}
    <rect
      x="222"
      y="362"
      width="120"
      height="12"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="222"
      y="382"
      width="160"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Divider between option 2 and 3 */}
    <rect
      x="220"
      y="412"
      width="280"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Option 3 */}
    <rect
      x="222"
      y="432"
      width="100"
      height="12"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="222"
      y="452"
      width="150"
      height="10"
      rx="4"
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
      {/* Label (left) */}
      <path d="M 200 76 L 130 76" />
      {/* Field — trigger left edge */}
      <path d="M 200 122 L 130 122" />
      {/* Helper text */}
      <path d="M 200 165 L 130 165" />
      {/* Section header */}
      <path d="M 220 245 L 130 245" />

      {/* Selected value (right) */}
      <path d="M 360 122 L 590 122" />
      {/* Popover top-right */}
      <path d="M 520 222 L 590 222" />
      {/* Option (right edge of selected option) */}
      <path d="M 512 296 L 590 296" />
      {/* Item description */}
      <path d="M 402 387 L 590 387" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="200" cy="76" r="4" />
      <circle cx="200" cy="122" r="4" />
      <circle cx="200" cy="165" r="4" />
      <circle cx="220" cy="245" r="4" />
      <circle cx="360" cy="122" r="4" />
      <circle cx="520" cy="222" r="4" />
      <circle cx="512" cy="296" r="4" />
      <circle cx="402" cy="387" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="120"
          y="80"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Label
        </text>
        <text
          x="120"
          y="126"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Field
        </text>
        <text
          x="120"
          y="169"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
        <text
          x="120"
          y="249"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Section
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="600"
          y="126"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Selected value
        </text>
        <text
          x="600"
          y="226"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Popover
        </text>
        <text
          x="600"
          y="300"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Option
        </text>
        <text
          x="600"
          y="391"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Item description
        </text>
      </g>
    </g>
  </svg>
);
