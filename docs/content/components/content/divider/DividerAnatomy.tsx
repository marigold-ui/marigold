export const DividerAnatomy = () => (
  <svg
    viewBox="0 0 600 260"
    role="img"
    aria-label="Anatomy of the Divider component: a separator line between two content areas, shown in both horizontal and vertical orientation."
    className="mx-auto block w-full max-w-[600px]"
  >
    {/* Horizontal panel */}
    <g transform="translate(20 20)">
      <text className="fill-fd-muted-foreground font-sans text-[11px] font-medium tracking-wide uppercase">
        <tspan x="0" y="10">
          Horizontal
        </tspan>
      </text>

      {/* Content A */}
      <rect
        x="0"
        y="24"
        width="240"
        height="60"
        rx="4"
        className="fill-fd-muted stroke-fd-border"
      />
      <text className="fill-fd-muted-foreground font-sans text-[12px]">
        <tspan x="120" y="58" textAnchor="middle">
          Content A
        </tspan>
      </text>

      {/* Divider line */}
      <line
        x1="0"
        y1="98"
        x2="240"
        y2="98"
        className="stroke-fd-border"
        strokeWidth="2"
      />

      {/* Content B */}
      <rect
        x="0"
        y="112"
        width="240"
        height="60"
        rx="4"
        className="fill-fd-muted stroke-fd-border"
      />
      <text className="fill-fd-muted-foreground font-sans text-[12px]">
        <tspan x="120" y="146" textAnchor="middle">
          Content B
        </tspan>
      </text>

      {/* Leader line + label pointing to the divider */}
      <line
        x1="240"
        y1="98"
        x2="280"
        y2="98"
        className="stroke-fd-muted-foreground"
        strokeWidth="1"
      />
      <circle cx="240" cy="98" r="3" className="fill-fd-muted-foreground" />
      <text className="fill-fd-foreground font-sans text-[12px] font-medium">
        <tspan x="286" y="102">
          Separator line
        </tspan>
      </text>
    </g>

    {/* Vertical panel */}
    <g transform="translate(400 20)">
      <text className="fill-fd-muted-foreground font-sans text-[11px] font-medium tracking-wide uppercase">
        <tspan x="0" y="10">
          Vertical
        </tspan>
      </text>

      {/* Content A */}
      <rect
        x="0"
        y="24"
        width="75"
        height="148"
        rx="4"
        className="fill-fd-muted stroke-fd-border"
      />
      <text className="fill-fd-muted-foreground font-sans text-[12px]">
        <tspan x="37" y="102" textAnchor="middle">
          A
        </tspan>
      </text>

      {/* Vertical divider */}
      <line
        x1="90"
        y1="36"
        x2="90"
        y2="160"
        className="stroke-fd-border"
        strokeWidth="2"
      />

      {/* Content B */}
      <rect
        x="105"
        y="24"
        width="75"
        height="148"
        rx="4"
        className="fill-fd-muted stroke-fd-border"
      />
      <text className="fill-fd-muted-foreground font-sans text-[12px]">
        <tspan x="142" y="102" textAnchor="middle">
          B
        </tspan>
      </text>

      {/* Leader line + label */}
      <line
        x1="90"
        y1="190"
        x2="90"
        y2="210"
        className="stroke-fd-muted-foreground"
        strokeWidth="1"
      />
      <circle cx="90" cy="190" r="3" className="fill-fd-muted-foreground" />
      <text className="fill-fd-foreground font-sans text-[12px] font-medium">
        <tspan x="90" y="224" textAnchor="middle">
          Separator line
        </tspan>
      </text>
    </g>
  </svg>
);
