export const SelectAnatomy = () => (
  <svg
    viewBox="-28 33 660 217"
    className="mx-auto h-auto w-full max-w-[90%]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <clipPath id="select-anatomy-popover-clip">
        <rect x="342" y="46" width="158" height="184" rx="8" />
      </clipPath>
    </defs>

    {/* Field label */}
    <rect
      x="105"
      y="46"
      width="53"
      height="8"
      rx="3"
      className="fill-fd-foreground transition-colors duration-300"
    />

    {/* Trigger (closed select field) */}
    <rect
      x="105"
      y="66"
      width="131"
      height="29"
      rx="5"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />
    {/* Selected value */}
    <rect
      x="118"
      y="76"
      width="79"
      height="8"
      rx="3"
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
      <path d="M 215 79 L 221 74 L 226 79" />
      <path d="M 215 81 L 221 86 L 226 81" />
    </g>

    {/* Helper text (description below the field) */}
    <rect
      x="105"
      y="105"
      width="105"
      height="7"
      rx="3"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Popover / listbox */}
    <rect
      x="342"
      y="46"
      width="158"
      height="184"
      rx="8"
      className="fill-fd-card stroke-fd-border transition-colors duration-300"
      strokeWidth="2"
    />

    {/* Section header */}
    <rect
      x="355"
      y="59"
      width="53"
      height="7"
      rx="3"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Option 1 (selected) accent fill */}
    <g clipPath="url(#select-anatomy-popover-clip)">
      <rect
        x="347"
        y="76"
        width="147"
        height="39"
        rx="4"
        className="fill-fd-accent transition-colors duration-300"
      />
    </g>
    {/* Option 1 label */}
    <rect
      x="355"
      y="87"
      width="85"
      height="8"
      rx="3"
      className="fill-fd-accent-foreground transition-colors duration-300"
    />
    {/* Option 1 description */}
    <rect
      x="355"
      y="100"
      width="105"
      height="7"
      rx="3"
      className="fill-fd-accent-foreground/70 transition-colors duration-300"
    />

    {/* Divider between option 1 and 2 */}
    <rect
      x="355"
      y="126"
      width="131"
      height="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Option 2 */}
    <rect
      x="355"
      y="139"
      width="79"
      height="8"
      rx="3"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="355"
      y="152"
      width="105"
      height="7"
      rx="3"
      className="fill-fd-muted-foreground transition-colors duration-300"
    />

    {/* Divider between option 2 and 3 */}
    <rect
      x="355"
      y="179"
      width="131"
      height="1"
      className="fill-fd-border transition-colors duration-300"
    />

    {/* Option 3 */}
    <rect
      x="355"
      y="192"
      width="66"
      height="8"
      rx="3"
      className="fill-fd-foreground/70 transition-colors duration-300"
    />
    <rect
      x="355"
      y="205"
      width="85"
      height="7"
      rx="3"
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
      <path d="M 105 50 L 85 50" />
      {/* Field — trigger left edge */}
      <path d="M 105 80 L 85 80" />
      {/* Helper text */}
      <path d="M 105 108 L 85 108" />

      {/* Selected value — into the gap between trigger and popover */}
      <path d="M 197 80 L 233 80" />

      {/* Popover top-right */}
      <path d="M 499 47 L 519 47" />
      {/* Section header, routed down so the label clears "Popover" */}
      <path d="M 407 62 L 495 62 L 495 69 L 519 69" />
      {/* Option (right edge of selected option) */}
      <path d="M 494 96 L 519 96" />
      {/* Item label */}
      <path d="M 434 143 L 519 143" />
      {/* Item description, routed down so the label clears "Item label" */}
      <path d="M 460 156 L 490 156 L 490 163 L 519 163" />
    </g>

    {/* Connector dots */}
    <g className="fill-fd-primary transition-colors duration-300">
      <circle cx="105" cy="50" r="4" />
      <circle cx="105" cy="80" r="4" />
      <circle cx="105" cy="108" r="4" />
      <circle cx="197" cy="80" r="4" />
      <circle cx="499" cy="47" r="4" />
      <circle cx="407" cy="62" r="4" />
      <circle cx="494" cy="96" r="4" />
      <circle cx="434" cy="143" r="4" />
      <circle cx="460" cy="156" r="4" />
    </g>

    {/* Labels */}
    <g
      fontFamily="ui-sans-serif, system-ui, sans-serif"
      className="transition-colors duration-300"
    >
      <g textAnchor="end">
        <text
          x="79"
          y="53"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Label
        </text>
        <text
          x="79"
          y="83"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Field
        </text>
        <text
          x="79"
          y="111"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Description
        </text>
      </g>
      <g textAnchor="start">
        <text
          x="240"
          y="83"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Selected value
        </text>
        <text
          x="526"
          y="50"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Popover
        </text>
        <text
          x="526"
          y="72"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Section header
        </text>
        <text
          x="526"
          y="99"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Option
        </text>
        <text
          x="526"
          y="146"
          fontSize="14"
          fontWeight="600"
          className="fill-fd-primary"
        >
          Item label
        </text>
        <text
          x="526"
          y="166"
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
