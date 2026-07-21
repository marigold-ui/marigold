export const SelectAnatomy = () => (
  <svg
    viewBox="-20 50 960 330"
    className="mx-auto h-auto w-full max-w-[100%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="select-anatomy-popover-clip">
        <rect x="520" y="70" width="240" height="280" rx="12" />
      </clipPath>
    </defs>

    {/* Field label */}
    <rect
      x="160"
      y="70"
      width="80"
      height="12"
      rx="4"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Trigger (closed select field) */}
    <rect
      x="160"
      y="100"
      width="200"
      height="44"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Selected value */}
    <rect
      x="180"
      y="116"
      width="120"
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
      <path d="M 328 120 L 336 113 L 344 120" />
      <path d="M 328 124 L 336 131 L 344 124" />
    </g>

    {/* Helper text (description below the field) */}
    <rect
      x="160"
      y="160"
      width="160"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Popover / listbox */}
    <rect
      x="520"
      y="70"
      width="240"
      height="280"
      rx="12"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Section header */}
    <rect
      x="540"
      y="90"
      width="80"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Option 1 (selected) accent fill */}
    <g clipPath="url(#select-anatomy-popover-clip)">
      <rect
        x="528"
        y="116"
        width="224"
        height="60"
        rx="6"
        className="fill-fd-accent transition-colors duration-300"
      />
    </g>
    {/* Option 1 label */}
    <rect
      x="540"
      y="132"
      width="130"
      height="12"
      rx="4"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />
    {/* Option 1 description */}
    <rect
      x="540"
      y="152"
      width="160"
      height="10"
      rx="4"
      className="fill-fd-accent-foreground/70 transition-colors duration-300"
    />

    {/* Divider between option 1 and 2 */}
    <rect
      x="540"
      y="192"
      width="200"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Option 2 */}
    <rect
      x="540"
      y="212"
      width="120"
      height="12"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="540"
      y="232"
      width="160"
      height="10"
      rx="4"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Divider between option 2 and 3 */}
    <rect
      x="540"
      y="272"
      width="200"
      height="2"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Option 3 */}
    <rect
      x="540"
      y="292"
      width="100"
      height="12"
      rx="4"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="540"
      y="312"
      width="130"
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
      <path d="M 160 76 L 130 76" />
      {/* Field — trigger left edge */}
      <path d="M 160 122 L 130 122" />
      {/* Helper text */}
      <path d="M 160 165 L 130 165" />

      {/* Selected value — into the gap between trigger and popover */}
      <path d="M 300 122 L 390 122" />

      {/* Popover top-right */}
      <path d="M 760 72 L 790 72" />
      {/* Section header */}
      <path d="M 620 95 L 790 95" />
      {/* Option (right edge of selected option) */}
      <path d="M 752 146 L 790 146" />
      {/* Item label */}
      <path d="M 660 218 L 790 218" />
      {/* Item description */}
      <path d="M 700 237 L 790 237" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="160" cy="76" r="4" />
      <circle cx="160" cy="122" r="4" />
      <circle cx="160" cy="165" r="4" />
      <circle cx="300" cy="122" r="4" />
      <circle cx="760" cy="72" r="4" />
      <circle cx="620" cy="95" r="4" />
      <circle cx="752" cy="146" r="4" />
      <circle cx="660" cy="218" r="4" />
      <circle cx="700" cy="237" r="4" />
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
      </g>
      <g textAnchor="start">
        <text
          x="395"
          y="126"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Selected value
        </text>
        <text
          x="800"
          y="76"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Popover
        </text>
        <text
          x="800"
          y="99"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Section header
        </text>
        <text
          x="800"
          y="150"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Option
        </text>
        <text
          x="800"
          y="222"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Item label
        </text>
        <text
          x="800"
          y="241"
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
