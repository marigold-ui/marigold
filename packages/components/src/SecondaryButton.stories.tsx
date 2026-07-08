import type { CSSProperties, PropsWithChildren } from 'react';
import preview from '.storybook/preview';
import { cn } from '@marigold/system';
import { Button } from './Button/Button';
import { Description } from './Description/Description';
import { Inline } from './Inline/Inline';
import { Panel } from './Panel/Panel';
import { Select } from './Select/Select';
import { Stack } from './Stack/Stack';
import { TextField } from './TextField/TextField';
import { Title } from './Title/Title';

/**
 * Secondary button alignment — exploration moodboards (DST design spike).
 *
 * The problem: the secondary Button is styled with the literal input recipe
 * (`ui-surface-control shadow-elevation-border`) — the same classes as Input
 * and the Select trigger. So it is (a) pixel-identical to a Select trigger,
 * and (b) a sibling of the fields instead of the buttons: primary and
 * destructive are modeled `ui-surface-contrast` surfaces (gradient fill, top
 * glow, inset glint, edge derived from the fill) while secondary is flat
 * with an engraved bottom line and — as the only button — a drop shadow.
 *
 * Six directions, all charcoal-only, rendered as mocks that reuse the real
 * button anatomy classes (`ui-button-base`, `h-control`, `p-squish-relaxed`)
 * next to real primary/destructive Buttons and real TextField/Select.
 * Production styles are untouched — delete this file to remove the spike.
 *
 * Accessibility (light theme, ratios vs white = worst ground):
 * - text ≥ 4.5:1 everywhere (worst case in any direction: 11.3:1)
 * - the design's current stance: control edges sit below the 3:1 floor by
 *   deliberate choice (input edge = 1.83:1); directions state where they
 *   sit relative to that, and only Outline crosses 3:1
 * - button identity is carried by text + fill + placement; edges are
 *   supporting, matching the current design's position
 */
const meta = preview.meta({
  title: 'Styles/Secondary Button',
  parameters: { layout: 'fullscreen', surface: false },
});

/* -------------------------------------------------------------------------
 * Direction plumbing
 *
 * Each direction is a surface recipe on `--btn-fill`: the rest/hover values
 * live in a static className (so real :hover works), and every painted
 * layer derives from the var — the same one-var retint behavior as the
 * production `ui-surface-contrast`.
 * ---------------------------------------------------------------------- */

type Direction = {
  key: string;
  title: string;
  tagline: string;
  /** Static classes declaring --btn-fill/--btn-edge and their hover flips. */
  fillClass: string;
  /** Painted layers, all referencing var(--btn-fill)/var(--btn-edge). */
  surface: CSSProperties;
  /** Complete var set for the baked "hover (simulated)" swatch. */
  hoverVars: Record<string, string>;
  recipe: string[];
  a11y: string[];
};

const BTN_BASE =
  'ui-button-base gap-2 duration-150 active:scale-[0.97] text-foreground';
const SIZE_DEFAULT = 'h-control p-squish-relaxed text-sm [&_svg]:size-4';
const SIZE_SMALL = 'h-control-small px-3 text-xs [&_svg]:size-3.5';

/** Mirrors ui-state-disabled so every direction disables identically. */
const DISABLED_SURFACE: CSSProperties = {
  background: 'var(--color-disabled-surface)',
  boxShadow: '0 0 0 1px var(--color-disabled-border)',
  color: 'var(--color-disabled)',
  cursor: 'not-allowed',
};

/**
 * Replica of the shipping secondary recipe (input recipe): used for the
 * baseline's simulated-hover swatch and the Overview rows. The real
 * component is used everywhere else in the Baseline story.
 */
const BASELINE: Direction = {
  key: 'baseline',
  title: 'Baseline — current secondary (the input recipe)',
  tagline:
    'ui-surface-control + shadow-elevation-border: flat white, translucent charcoal-950/26% ring, engraved bottom line, drop shadow. Identical classes to Input and the Select trigger — and the only button that casts a shadow.',
  fillClass:
    '[--btn-fill:var(--color-surface)] [--btn-edge:var(--color-control-border)] hover:[--btn-fill:var(--color-hover)] hover:[--btn-edge:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha+0.12))]',
  surface: {
    background: 'var(--btn-fill)',
    boxShadow:
      '0 0 0 1px var(--btn-edge), inset 0 -1px 0 0 oklch(from var(--btn-edge) l c h / calc(alpha + 0.08)), var(--shadow-elevation-border)',
  },
  hoverVars: {
    '--btn-fill': 'var(--color-hover)',
    '--btn-edge':
      'oklch(from var(--color-control-border) l c h / calc(alpha + 0.12))',
  },
  recipe: [
    'No changes — exactly what ships on this branch (mock replica used only for the simulated-hover swatch).',
  ],
  a11y: ['Edge 1.83:1 (below the 3:1 floor, documented deliberate call).'],
};

const DIRECTIONS: Direction[] = [
  {
    key: 'promoted',
    title: 'A · Promoted Control',
    tagline:
      'The smallest diff: keep the white fill, subtract the input tells (engraved line, drop shadow), densify the edge one step past the fields. Distinct by subtraction; still quiet.',
    fillClass:
      '[--btn-fill:var(--color-surface)] [--btn-edge:oklch(from_var(--color-charcoal-950)_l_c_h_/_0.38)] hover:[--btn-fill:var(--color-hover)] hover:[--btn-edge:oklch(from_var(--color-charcoal-950)_l_c_h_/_0.5)]',
    surface: {
      background: 'var(--btn-fill)',
      boxShadow: '0 0 0 1px var(--btn-edge)',
    },
    hoverVars: {
      '--btn-fill': 'var(--color-hover)',
      '--btn-edge': 'oklch(from var(--color-charcoal-950) l c h / 0.5)',
    },
    recipe: [
      'Fill: white (unchanged). Engraved bottom line: removed (input-only tell).',
      'Drop shadow: removed — no in-flow button casts one anymore (primary never did).',
      'Edge: charcoal-950 @ 26% → 38% alpha — one visible step denser than the fields.',
      'Hover: fill → hover token (charcoal-200), edge → 50% alpha; same flip as today.',
    ],
    a11y: [
      'Edge 2.55:1 rest / 3.69:1 hover (fields stay at 1.83:1 — the button now outranks them).',
      'Text: foreground on white, 17.3:1.',
    ],
  },
  {
    key: 'tonal',
    title: 'B · Tonal',
    tagline:
      'The flat gray button (GitHub/Primer school): a charcoal-200 tint carries the identity, the rim is derived from the fill like the primary edge is. No modeling, no shadow.',
    fillClass:
      '[--btn-fill:var(--color-charcoal-200)] hover:[--btn-fill:var(--color-charcoal-300)]',
    surface: {
      background: 'var(--btn-fill)',
      boxShadow: '0 0 0 1px oklch(from var(--btn-fill) calc(l - 0.08) c h)',
    },
    hoverVars: { '--btn-fill': 'var(--color-charcoal-300)' },
    recipe: [
      'Fill: charcoal-200, flat — reads on both the page (charcoal-100) and white panels.',
      'Rim: derived fill − 0.08 L (the --color-border derivation, applied to a button).',
      'No glint, no engraving, no shadow. Hover: fill → charcoal-300, rim derives along.',
    ],
    a11y: [
      'Fill Δ vs white 1.27:1, rim 1.64:1 — identity from tint + text, edge decorative (current design stance).',
      'Text: foreground on 200, 13.7:1 (11.3:1 on hover ground).',
    ],
  },
  {
    key: 'tonal-modeled',
    title: 'C · Tonal Modeled',
    tagline:
      'The primary recipe, re-lit for a light fill: same gradient, same top glow, same inset glint, same derived edge — pointed at charcoal-200 with one knob retuned. Primary and secondary become the two ends of one material.',
    fillClass:
      '[--btn-fill:var(--color-charcoal-200)] hover:[--btn-fill:oklch(from_var(--color-charcoal-200)_calc(l-0.045)_c_h)]',
    surface: {
      background:
        'radial-gradient(ellipse 72% 70% at 50% -12%, oklch(from var(--btn-fill) calc(l + 0.15) c h / 0.8), transparent 72%), linear-gradient(to bottom, oklch(from var(--btn-fill) calc(l + 0.02) c h), oklch(from var(--btn-fill) calc(l - 0.015) c h))',
      boxShadow:
        '0 0 0 1px oklch(from var(--btn-fill) calc(l - 0.12) c h), inset 0 1px 1.5px -1px oklch(from var(--btn-fill) calc(l + 0.2) c h / 0.9)',
    },
    hoverVars: {
      '--btn-fill': 'oklch(from var(--color-charcoal-200) calc(l - 0.045) c h)',
    },
    recipe: [
      'ui-surface-contrast anatomy verbatim: glow +0.15/80%, glint +0.2, fill ±0.02/0.015 — production knob values.',
      'One knob retuned: edge −0.04 → −0.12 L (a 0.04 step is invisible in the light regime).',
      'Hover: one-var fill flip (−0.045 L), whole surface retints — exactly how primary hovers.',
    ],
    a11y: [
      'Rim 1.87:1 — decorative, same register as the current input edge (1.83:1).',
      'Text: foreground on the gradient, worst point 13.1:1.',
    ],
  },
  {
    key: 'keycap',
    title: 'D · Keycap',
    tagline:
      'Convex and physical: a near-white gradient cap sitting proud on a 2px charcoal platform with a white glint. Buttons look pressable, fields stay flat wells — maximum functional distinction.',
    fillClass:
      '[--btn-fill:var(--color-charcoal-50)] hover:[--btn-fill:var(--color-charcoal-100)]',
    surface: {
      background:
        'linear-gradient(to bottom, oklch(from var(--btn-fill) calc(l + 0.005) c h), oklch(from var(--btn-fill) calc(l - 0.02) c h))',
      boxShadow:
        '0 0 0 1px var(--color-charcoal-300), 0 2px 0 0 var(--color-charcoal-300), 0 3px 4px -2px oklch(0.15 0.02 54 / 0.1), inset 0 1px 0 0 oklch(1 0 0 / 0.9)',
    },
    hoverVars: { '--btn-fill': 'var(--color-charcoal-100)' },
    recipe: [
      'Fill: charcoal-50 → −0.02 L gradient (subtle convexity), white glint on the top edge.',
      'Ring: charcoal-300 opaque + a 2px bottom platform of the same stroke — the keycap.',
      'Keeps a tiny lift shadow (flagged: primary has none — here the platform is the identity).',
      'Hover: cap darkens one rung; press scale reads as the key going down.',
    ],
    a11y: [
      'Ring 1.53:1, platform same — decorative; identity from shape + platform + text.',
      'Text: foreground on the cap, worst point 15.7:1.',
    ],
  },
  {
    key: 'outline',
    title: 'E · Outline',
    tagline:
      'Border-defined: white fill, one firm charcoal-500 stroke, nothing else. The crispest sibling of the primary edge — and the only direction that puts the button at/above the 3:1 non-text floor.',
    fillClass:
      '[--btn-fill:var(--color-surface)] hover:[--btn-fill:var(--color-charcoal-100)]',
    surface: {
      background: 'var(--btn-fill)',
      boxShadow: '0 0 0 1px var(--color-charcoal-500)',
    },
    hoverVars: { '--btn-fill': 'var(--color-charcoal-100)' },
    recipe: [
      'Edge: charcoal-500 opaque — deliberate, firmer than any field.',
      'No shadow, no engraving, no gradient. Hover: fill → charcoal-100.',
      'Tuning knob: charcoal-400 (2.31:1) if 500 reads too loud against the soft register.',
    ],
    a11y: [
      'Edge 3.65:1 — exceeds the 3:1 floor; inverts today’s parity where button edge == field edge.',
      'Text: foreground on white, 17.3:1.',
    ],
  },
  {
    key: 'quiet-tint',
    title: 'F · Quiet Tint',
    tagline:
      'Borderless: a charcoal-200 tint pill, no ring at all. Fields have boundaries, buttons are fills — the same fill-defines-the-shape logic as primary, at the light end.',
    fillClass:
      '[--btn-fill:var(--color-charcoal-200)] hover:[--btn-fill:var(--color-charcoal-300)]',
    surface: { background: 'var(--btn-fill)' },
    hoverVars: { '--btn-fill': 'var(--color-charcoal-300)' },
    recipe: [
      'Fill: charcoal-200 flat, no ring, no shadow, no engraving.',
      'Hover: charcoal-300. Compare with B — the only variable between them is the rim.',
    ],
    a11y: [
      'Shape Δ 1.27:1 vs white — identity from text + placement, consistent with the design’s sub-floor stance on edges.',
      'Text: foreground on 200, 13.7:1.',
    ],
  },
];

/* -------------------------------------------------------------------------
 * Mock button + specimen set (identical across all directions)
 * ---------------------------------------------------------------------- */

type SecondaryProps = PropsWithChildren<{
  d: Direction;
  /** Render the real <Button variant="secondary"> (Baseline story only). */
  real?: boolean;
  state?: 'rest' | 'hover' | 'disabled';
  small?: boolean;
}>;

const Secondary = ({
  d,
  real,
  state = 'rest',
  small,
  children,
}: SecondaryProps) => {
  if (real && state !== 'hover') {
    return (
      <Button
        variant="secondary"
        size={small ? 'small' : 'default'}
        disabled={state === 'disabled'}
      >
        {children}
      </Button>
    );
  }
  const size = small ? SIZE_SMALL : SIZE_DEFAULT;
  if (state === 'disabled') {
    return (
      <button disabled className={cn(BTN_BASE, size)} style={DISABLED_SURFACE}>
        {children}
      </button>
    );
  }
  return (
    <button
      className={cn(BTN_BASE, size, state === 'rest' && d.fillClass)}
      style={
        state === 'hover'
          ? ({ ...d.surface, ...d.hoverVars } as CSSProperties)
          : d.surface
      }
    >
      {children}
    </button>
  );
};

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="M7 10l5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

const SectionLabel = ({ children }: PropsWithChildren) => (
  <span className="text-secondary text-xs font-medium tracking-wide uppercase">
    {children}
  </span>
);

const Labeled = ({ label, children }: PropsWithChildren<{ label: string }>) => (
  <div className="flex flex-col items-center gap-1.5">
    {children}
    <span className="text-secondary text-[10px]">{label}</span>
  </div>
);

type SpecimenProps = { d: Direction; real?: boolean };

/** Alignment check: does secondary read as a sibling of the other buttons? */
const FamilyRow = ({ d, real }: SpecimenProps) => (
  <Stack space="tight">
    <SectionLabel>Button family — alignment check</SectionLabel>
    <Inline space="related" alignY="center">
      <Button variant="primary">Save event</Button>
      <Secondary d={d} real={real}>
        Duplicate
      </Secondary>
      <Button variant="destructive">Delete event</Button>
      <Button variant="ghost">Cancel</Button>
    </Inline>
  </Stack>
);

/** Distinctness check: the Select trigger is today's pixel-identical twin. */
const ToolbarRow = ({ d, real }: SpecimenProps) => (
  <Stack space="tight">
    <SectionLabel>
      Toolbar — distinct from fields? (the Select trigger is today’s identical
      twin)
    </SectionLabel>
    <Inline space="related" alignY="center">
      <div className="w-64">
        <TextField
          aria-label="Search events"
          placeholder="Search events…"
          type="search"
        />
      </div>
      <div className="w-40">
        <Select aria-label="Status" defaultValue="all">
          <Select.Option id="all">All statuses</Select.Option>
          <Select.Option id="on-sale">On sale</Select.Option>
          <Select.Option id="draft">Draft</Select.Option>
        </Select>
      </div>
      <Secondary d={d} real={real}>
        <DownloadIcon />
        Export
      </Secondary>
      <Button variant="primary">New event</Button>
    </Inline>
  </Stack>
);

/** Density check: how loud is the treatment when it repeats? */
const BulkActionsRow = ({ d, real }: SpecimenProps) => (
  <Stack space="tight">
    <SectionLabel>Bulk actions — how loud is it repeated?</SectionLabel>
    <Inline space="related" alignY="center">
      <span className="text-secondary text-sm">3 selected</span>
      <Secondary d={d} real={real}>
        Assign venue
      </Secondary>
      <Secondary d={d} real={real}>
        Duplicate
      </Secondary>
      <Secondary d={d} real={real}>
        Move to draft
      </Secondary>
      <Secondary d={d} real={real}>
        Export
      </Secondary>
      <Button variant="destructive-ghost">Cancel events</Button>
    </Inline>
  </Stack>
);

const StatesRow = ({ d, real }: SpecimenProps) => (
  <Stack space="tight">
    <SectionLabel>States &amp; sizes</SectionLabel>
    <Inline space="related" alignY="center">
      <Labeled label="rest">
        <Secondary d={d} real={real}>
          Export
        </Secondary>
      </Labeled>
      <Labeled label="hover (simulated)">
        <Secondary d={d} state="hover">
          Export
        </Secondary>
      </Labeled>
      <Labeled label="disabled">
        <Secondary d={d} real={real} state="disabled">
          Export
        </Secondary>
      </Labeled>
      <Labeled label="small">
        <Secondary d={d} real={real} small>
          Export
        </Secondary>
      </Labeled>
    </Inline>
  </Stack>
);

/** The classic pairing on a white panel ground. */
const FooterPanel = ({ d, real }: SpecimenProps) => (
  <Panel aria-label="Publish event">
    <Panel.Header>
      <Title>Publish event</Title>
      <Description>
        The classic footer pairing — secondary between ghost and primary, on a
        white panel.
      </Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Event name" defaultValue="Jazz am Schloss" />
        <Select label="Venue" defaultValue="schloss">
          <Select.Option id="schloss">Schlosspark Bühne</Select.Option>
          <Select.Option id="rheinhafen">Rheinhafen Halle 2</Select.Option>
        </Select>
      </Stack>
    </Panel.Content>
    <Panel.Footer>
      <Inline space="related">
        <Button variant="ghost">Cancel</Button>
        <Secondary d={d} real={real}>
          Save draft
        </Secondary>
        <Button variant="primary">Publish</Button>
      </Inline>
    </Panel.Footer>
  </Panel>
);

const Specimens = ({ d, real }: SpecimenProps) => (
  <Stack space="group">
    <FamilyRow d={d} real={real} />
    <ToolbarRow d={d} real={real} />
    <BulkActionsRow d={d} real={real} />
    <StatesRow d={d} real={real} />
    <div className="max-w-xl">
      <FooterPanel d={d} real={real} />
    </div>
  </Stack>
);

/* -------------------------------------------------------------------------
 * Direction frame + stories
 * ---------------------------------------------------------------------- */

const DirectionFrame = ({
  d,
  children,
}: PropsWithChildren<{ d: Direction }>) => (
  <div className="bg-background text-foreground min-h-screen p-8 font-sans">
    <div className="mx-auto max-w-5xl">
      <Stack space="group">
        <header className="max-w-prose">
          <h2 className="text-xl font-semibold">{d.title}</h2>
          <p className="text-secondary mt-1 text-sm">{d.tagline}</p>
          <ul className="text-secondary mt-3 list-disc space-y-0.5 pl-4 text-xs">
            {d.recipe.map(line => (
              <li key={line}>{line}</li>
            ))}
            {d.a11y.map(line => (
              <li key={line} className="italic">
                {line}
              </li>
            ))}
          </ul>
        </header>
        {children}
      </Stack>
    </div>
  </div>
);

/** All directions in one column for a fast side-by-side pick. */
export const Overview = meta.story({
  render: () => (
    <div className="bg-background text-foreground min-h-screen p-8 font-sans">
      <div className="mx-auto max-w-5xl">
        <Stack space="group">
          <header className="max-w-prose">
            <h2 className="text-xl font-semibold">
              Secondary button — six directions
            </h2>
            <p className="text-secondary mt-1 text-sm">
              Each row: candidate at rest and hover, beside the primary and the
              fields it must not be confused with. Open the individual stories
              for the full specimen set and the recipe write-up.
            </p>
          </header>
          {[BASELINE, ...DIRECTIONS].map(d => (
            <Stack space="tight" key={d.key}>
              <SectionLabel>{d.title}</SectionLabel>
              <Inline space="related" alignY="center">
                <Secondary d={d} real={d.key === 'baseline'}>
                  Export
                </Secondary>
                <Secondary d={d} state="hover">
                  Hover
                </Secondary>
                <Button variant="primary">New event</Button>
                <div className="w-56">
                  <TextField
                    aria-label={`Search (${d.key})`}
                    placeholder="Search events…"
                  />
                </div>
                <div className="w-40">
                  <Select aria-label={`Status (${d.key})`} defaultValue="all">
                    <Select.Option id="all">All statuses</Select.Option>
                  </Select>
                </div>
              </Inline>
            </Stack>
          ))}
        </Stack>
      </div>
    </div>
  ),
});

/** The current design, unchanged — the like-for-like comparison anchor. */
export const Baseline = meta.story({
  render: () => (
    <DirectionFrame d={BASELINE}>
      <Specimens d={BASELINE} real />
    </DirectionFrame>
  ),
});

export const PromotedControl = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[0]}>
      <Specimens d={DIRECTIONS[0]} />
    </DirectionFrame>
  ),
});

export const Tonal = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[1]}>
      <Specimens d={DIRECTIONS[1]} />
    </DirectionFrame>
  ),
});

export const TonalModeled = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[2]}>
      <Specimens d={DIRECTIONS[2]} />
    </DirectionFrame>
  ),
});

export const Keycap = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[3]}>
      <Specimens d={DIRECTIONS[3]} />
    </DirectionFrame>
  ),
});

export const Outline = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[4]}>
      <Specimens d={DIRECTIONS[4]} />
    </DirectionFrame>
  ),
});

export const QuietTint = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[5]}>
      <Specimens d={DIRECTIONS[5]} />
    </DirectionFrame>
  ),
});
