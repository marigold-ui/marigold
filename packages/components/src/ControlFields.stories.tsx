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
 * Control/input field alignment — exploration moodboards (DST design spike).
 *
 * Companion to `SecondaryButton.stories.tsx`. With the secondary button
 * moving to G · Porcelain (bright convex cap, derived ring + glint, no drop
 * shadow, no engraved line), the fields still wear the full input recipe:
 * flat white, translucent charcoal-950/26% ring, engraved bottom line, and
 * a drop shadow — now the only in-flow controls that cast one.
 *
 * The question this file explores: should fields follow, and how — under
 * the same constraints as the button exploration, mirrored: fields must fit
 * the same material language as the (new) button family, stay clearly
 * distinct from the buttons, fit the current design, and use only charcoal
 * rungs (or relative-color derivations of them, matching how
 * --color-border/--color-control-border are already built).
 *
 * Every direction is rendered next to the picked Porcelain secondary and a
 * real primary Button. Production styles are untouched — delete this file
 * to remove the spike.
 *
 * Accessibility (light theme, ratios vs white = worst ground):
 * - text ≥ 4.5:1 everywhere (placeholder worst case: 4.99:1 on a tinted fill)
 * - input boundaries are meaningful (WCAG 1.4.11); the shipping design
 *   deliberately sits below the 3:1 floor (1.83:1). Directions state where
 *   they sit; only Firm Edge reaches the floor, Seamless drops below the
 *   current stance and is flagged.
 * - focus (3px ring), error, and disabled recolors are production behavior
 *   and unchanged in every direction.
 */
const meta = preview.meta({
  title: 'Styles/Control Fields',
  parameters: { layout: 'fullscreen', surface: false },
});

/* -------------------------------------------------------------------------
 * Direction plumbing — mirrors the button exploration: rest/focus values
 * live in static classes on `--fld-fill`/`--fld-edge` (so real focus works),
 * painted layers derive from the vars.
 * ---------------------------------------------------------------------- */

type FieldDirection = {
  key: string;
  title: string;
  tagline: string;
  /** Static classes declaring --fld-fill/--fld-edge and their focus flips. */
  fieldClass: string;
  /** Painted layers, all referencing var(--fld-fill)/var(--fld-edge). */
  surface: CSSProperties;
  /** Complete var sets for the baked state swatches. */
  focusVars: Record<string, string>;
  invalidVars: Record<string, string>;
  readonlyVars: Record<string, string>;
  recipe: string[];
  a11y: string[];
};

const FLD_BASE =
  'h-control w-full min-w-0 rounded-surface px-3 py-2 text-sm text-foreground placeholder:text-placeholder outline-none transition-[box-shadow]';
const FLD_FOCUS =
  'focus:outline-3 focus:outline-offset-0 focus:outline-solid focus:outline-ring/50';

/** Production focus halo, as an inline value for the baked focus swatch. */
const FOCUS_OUTLINE: CSSProperties = {
  outline: '3px solid color-mix(in oklab, var(--color-ring) 50%, transparent)',
  outlineOffset: 0,
};

/** Mirrors ui-state-disabled so every direction disables identically. */
const DISABLED_FIELD: CSSProperties = {
  background: 'var(--color-disabled-surface)',
  boxShadow: '0 0 0 1px var(--color-disabled-border)',
  color: 'var(--color-disabled)',
  cursor: 'not-allowed',
};

/**
 * Replica of the shipping field recipe: used for the baseline's baked state
 * swatches and the Overview rows. Real TextField/Select are used everywhere
 * else in the Baseline story.
 */
const BASELINE: FieldDirection = {
  key: 'baseline',
  title: 'Baseline — current fields (unchanged)',
  tagline:
    'ui-surface-control + shadow-elevation-border + ui-input: flat white, translucent charcoal-950/26% ring, engraved bottom line, drop shadow. With the button moving to Porcelain, fields are now the only in-flow controls that cast a shadow — distinction already improved by doing nothing.',
  fieldClass:
    '[--fld-fill:var(--color-surface)] [--fld-edge:var(--color-control-border)] focus:[--fld-edge:var(--color-ring)]',
  surface: {
    background: 'var(--fld-fill)',
    boxShadow:
      '0 0 0 1px var(--fld-edge), inset 0 -1px 0 0 oklch(from var(--fld-edge) l c h / calc(alpha + 0.08)), var(--shadow-elevation-border)',
  },
  focusVars: { '--fld-edge': 'var(--color-ring)' },
  invalidVars: { '--fld-edge': 'var(--color-destructive-accent)' },
  readonlyVars: { '--fld-fill': 'var(--color-muted)' },
  recipe: [
    'No changes — exactly what ships on this branch (mock replica used only for the baked state swatches).',
  ],
  a11y: [
    'Edge 1.83:1, engraved line 2.27:1 — below the 3:1 floor, documented deliberate call.',
  ],
};

const DIRECTIONS: FieldDirection[] = [
  {
    key: 'quiet-flat',
    title: '1 · Quiet Flat',
    tagline:
      'The field twin of the button’s subtraction move: remove the drop shadow (Porcelain has none) and the engraved bottom line, change nothing else. Fields become plain flat wells with the familiar hairline; the button’s convex cap and glint stay button-only tells.',
    fieldClass:
      '[--fld-fill:var(--color-surface)] [--fld-edge:var(--color-control-border)] focus:[--fld-edge:var(--color-ring)]',
    surface: {
      background: 'var(--fld-fill)',
      boxShadow: '0 0 0 1px var(--fld-edge)',
    },
    focusVars: { '--fld-edge': 'var(--color-ring)' },
    invalidVars: { '--fld-edge': 'var(--color-destructive-accent)' },
    readonlyVars: { '--fld-fill': 'var(--color-muted)' },
    recipe: [
      'Drop shadow: removed — nothing in-flow casts one anymore.',
      'Engraved bottom line: removed. Ring stays the translucent control-border (unchanged).',
      'Focus/error/disabled: production behavior, untouched.',
    ],
    a11y: [
      'Edge 1.83:1 — unchanged from the current stance.',
      'Text 17.3:1, placeholder 5.52:1 on white.',
    ],
  },
  {
    key: 'firm-edge',
    title: '2 · Firm Edge',
    tagline:
      'The a11y-floor pole: same subtraction as Quiet Flat, but the ring is raised to charcoal-950 @ 44% ≈ 3.05:1 — the WCAG 1.4.11 minimum, not more. Fields get the firmest edge in the flow while buttons stay soft: prominence inverted in favor of where users type.',
    fieldClass:
      '[--fld-fill:var(--color-surface)] [--fld-edge:oklch(from_var(--color-charcoal-950)_l_c_h_/_0.44)] focus:[--fld-edge:var(--color-ring)]',
    surface: {
      background: 'var(--fld-fill)',
      boxShadow: '0 0 0 1px var(--fld-edge)',
    },
    focusVars: { '--fld-edge': 'var(--color-ring)' },
    invalidVars: { '--fld-edge': 'var(--color-destructive-accent)' },
    readonlyVars: { '--fld-fill': 'var(--color-muted)' },
    recipe: [
      'Ring: charcoal-950 @ 26% → 44% alpha — hits the 3:1 non-text floor exactly.',
      'No shadow, no engraving. Fields are the crispest edge on the page; Porcelain buttons the softest.',
    ],
    a11y: [
      'Edge 3.05:1 — the only direction where the meaningful input boundary meets WCAG 1.4.11.',
      'Text 17.3:1, placeholder 5.52:1 on white.',
    ],
  },
  {
    key: 'well',
    title: '3 · Well',
    tagline:
      'The inverse of the Porcelain cap under the same light: where the button domes up (bright top, glint), the field dips in — a faint top-shaded gradient and a soft inner top shadow. One material, two directions: caps rise, wells sink.',
    fieldClass:
      '[--fld-fill:var(--color-surface)] [--fld-edge:var(--color-control-border)] focus:[--fld-edge:var(--color-ring)]',
    surface: {
      background:
        'linear-gradient(to bottom, oklch(from var(--fld-fill) calc(l - 0.02) c h), var(--fld-fill) 55%)',
      boxShadow:
        '0 0 0 1px var(--fld-edge), inset 0 1.5px 2px -1px oklch(0.15 0.008 54 / 0.12)',
    },
    focusVars: { '--fld-edge': 'var(--color-ring)' },
    invalidVars: { '--fld-edge': 'var(--color-destructive-accent)' },
    readonlyVars: { '--fld-fill': 'var(--color-muted)' },
    recipe: [
      'Fill: white with a −0.02 L shaded top fading out by 55% — concave, the cap’s mirror.',
      'Inner top shadow (950 @ 12%) replaces the engraved bottom line; no outer drop shadow.',
      'Ring unchanged (control-border). Focus/error/disabled: production behavior.',
    ],
    a11y: [
      'Edge 1.83:1 unchanged; shading is decorative (text on the shaded top: 16.4:1).',
      'Placeholder 5.52:1 on the white body.',
    ],
  },
  {
    key: 'muted-well',
    title: '4 · Muted Well',
    tagline:
      'Tint carries the field (Notion school): a flat charcoal-100 fill with a whisper ring, flipping to white on focus. Buttons are bright raised caps, fields are dim flat pools — maximum material separation, and the focus flip is a strong “now you’re typing” signal.',
    fieldClass:
      '[--fld-fill:var(--color-charcoal-100)] [--fld-edge:oklch(from_var(--color-charcoal-950)_l_c_h_/_0.16)] focus:[--fld-fill:var(--color-surface)] focus:[--fld-edge:var(--color-ring)]',
    surface: {
      background: 'var(--fld-fill)',
      boxShadow: '0 0 0 1px var(--fld-edge)',
    },
    focusVars: {
      '--fld-fill': 'var(--color-surface)',
      '--fld-edge': 'var(--color-ring)',
    },
    invalidVars: { '--fld-edge': 'var(--color-destructive-accent)' },
    readonlyVars: { '--fld-fill': 'var(--color-charcoal-100)' },
    recipe: [
      'Fill: charcoal-100 flat. Ring: 950 @ 16% — the tint carries the shape, the ring only cuts it from tinted grounds.',
      'Focus: fill flips to white + ring to focus color — the field visibly “opens”.',
      'No shadow, no engraving. Readonly keeps the tint (already muted by nature).',
      'Known limit (see toolbar row): on the charcoal-100 page the pool merges with the ground — this direction is white-panel-optimized. Deeper tint (200) would fix the page but drops placeholder text to ~4.3:1 unless it darkens a step too.',
    ],
    a11y: [
      'Fill Δ 1.11:1 vs white, ring 1.43:1 — resting boundary below the current 1.83:1 stance; flagged. Focus/error boundaries are full strength.',
      'Placeholder 4.99:1 on the tint (≥ 4.5), text 15.7:1.',
    ],
  },
  {
    key: 'engraved-slot',
    title: '5 · Engraved Slot',
    tagline:
      'Lean into the current DNA instead of removing it: keep the engraved bottom line, add a top inner hairline so the field reads as a slot cut into the surface — pure line-work, no shading. Drop only the shadow. The most conservative visible change after Quiet Flat.',
    fieldClass:
      '[--fld-fill:var(--color-surface)] [--fld-edge:var(--color-control-border)] focus:[--fld-edge:var(--color-ring)]',
    surface: {
      background: 'var(--fld-fill)',
      boxShadow:
        '0 0 0 1px var(--fld-edge), inset 0 1px 0 0 oklch(0.15 0.008 54 / 0.14), inset 0 -1px 0 0 oklch(0.15 0.008 54 / 0.34)',
    },
    focusVars: { '--fld-edge': 'var(--color-ring)' },
    invalidVars: { '--fld-edge': 'var(--color-destructive-accent)' },
    readonlyVars: { '--fld-fill': 'var(--color-muted)' },
    recipe: [
      'Keeps the engraved bottom line (950 @ 34%) and adds a top inner hairline (950 @ 14%) — engraving all the way around.',
      'Drop shadow removed. Compare with Well (3): slot is lines, well is shading — same statement, different technique.',
    ],
    a11y: [
      'Edge 1.83:1, lines 2.27:1 / ~1.4:1 — all within the current decorative register.',
      'Text 17.3:1, placeholder 5.52:1.',
    ],
  },
  {
    key: 'seamless-tint',
    title: '6 · Seamless Tint',
    tagline:
      'The borderless pole: charcoal-100 pools with no ring at all — fields are dips in the page, boundaries only appear when they mean something (focus, error). The field twin of Quiet Tint (F); shown for spread, flagged for a11y.',
    fieldClass:
      '[--fld-fill:var(--color-charcoal-100)] [--fld-edge:transparent] focus:[--fld-fill:var(--color-surface)] focus:[--fld-edge:var(--color-ring)]',
    surface: {
      background: 'var(--fld-fill)',
      boxShadow: '0 0 0 1px var(--fld-edge)',
    },
    focusVars: {
      '--fld-fill': 'var(--color-surface)',
      '--fld-edge': 'var(--color-ring)',
    },
    invalidVars: { '--fld-edge': 'var(--color-destructive-accent)' },
    readonlyVars: { '--fld-fill': 'var(--color-charcoal-100)' },
    recipe: [
      'Fill: charcoal-100, no ring, no shadow, no engraving. Focus: white fill + focus ring appear.',
      'Compare with Muted Well (4) — the only variable between them is the resting whisper ring.',
    ],
    a11y: [
      'Resting boundary is the 1.11:1 fill alone — below the design’s current stance; on the charcoal-100 page it vanishes entirely without a panel behind it. Flagged as the risky pole.',
      'Placeholder 4.99:1 on the tint, text 15.7:1.',
    ],
  },
];

/* -------------------------------------------------------------------------
 * The picked secondary button (G · Porcelain), copied verbatim from
 * SecondaryButton.stories.tsx so field directions render against it.
 * ---------------------------------------------------------------------- */

const BTN_BASE =
  'ui-button-base gap-2 duration-150 active:scale-[0.97] text-foreground h-control p-squish-relaxed text-sm [&_svg]:size-4';

const PORCELAIN_CLASS =
  '[--btn-fill:var(--color-charcoal-50)] [--btn-edge-base:var(--color-charcoal-200)] hover:[--btn-fill:var(--color-charcoal-100)] hover:[--btn-edge-base:var(--color-charcoal-300)]';

const PORCELAIN_SURFACE: CSSProperties = {
  background:
    'linear-gradient(to bottom, oklch(from var(--btn-fill) calc(l + 0.005) c h), oklch(from var(--btn-fill) calc(l - 0.02) c h))',
  boxShadow:
    '0 0 0 1px oklch(from var(--btn-edge-base) calc(l - 0.12) c h), inset 0 1px 1.5px -1px oklch(from var(--btn-edge-base) calc(l + 0.2) c h / 0.9)',
};

const PorcelainButton = ({ children }: PropsWithChildren) => (
  <button className={cn(BTN_BASE, PORCELAIN_CLASS)} style={PORCELAIN_SURFACE}>
    {children}
  </button>
);

/* -------------------------------------------------------------------------
 * Mock field components + specimen set (identical across all directions)
 * ---------------------------------------------------------------------- */

type FieldState = 'rest' | 'focus' | 'invalid' | 'disabled' | 'readonly';

const stateStyle = (d: FieldDirection, state: FieldState): CSSProperties => {
  switch (state) {
    case 'focus':
      return { ...d.surface, ...d.focusVars, ...FOCUS_OUTLINE };
    case 'invalid':
      return { ...d.surface, ...d.invalidVars };
    case 'disabled':
      return DISABLED_FIELD;
    case 'readonly':
      return { ...d.surface, ...d.readonlyVars };
    default:
      return d.surface;
  }
};

type MockInputProps = {
  d: FieldDirection;
  state?: FieldState;
  placeholder?: string;
  defaultValue?: string;
  label: string;
};

const MockInput = ({
  d,
  state = 'rest',
  placeholder,
  defaultValue,
  label,
}: MockInputProps) => (
  <input
    aria-label={label}
    placeholder={placeholder}
    defaultValue={defaultValue}
    disabled={state === 'disabled'}
    readOnly={state === 'readonly'}
    className={cn(FLD_BASE, state === 'rest' && cn(FLD_FOCUS, d.fieldClass))}
    style={stateStyle(d, state)}
  />
);

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-secondary size-4 shrink-0"
    aria-hidden
  >
    <path d="M7 9l5-5 5 5" />
    <path d="M7 15l5 5 5-5" />
  </svg>
);

const MockSelect = ({
  d,
  state = 'rest',
  value,
  label,
}: {
  d: FieldDirection;
  state?: FieldState;
  value: string;
  label: string;
}) => (
  <button
    aria-label={label}
    disabled={state === 'disabled'}
    className={cn(
      FLD_BASE,
      'inline-flex cursor-pointer items-center justify-between gap-2 text-left',
      state === 'rest' && cn(FLD_FOCUS, d.fieldClass)
    )}
    style={stateStyle(d, state)}
  >
    <span className="truncate">{value}</span>
    <ChevronIcon />
  </button>
);

const SectionLabel = ({ children }: PropsWithChildren) => (
  <span className="text-secondary text-xs font-medium tracking-wide uppercase">
    {children}
  </span>
);

const Labeled = ({ label, children }: PropsWithChildren<{ label: string }>) => (
  <div className="flex w-44 flex-col gap-1.5">
    {children}
    <span className="text-secondary text-center text-[10px]">{label}</span>
  </div>
);

const FieldShell = ({
  label,
  help,
  error,
  children,
}: PropsWithChildren<{ label: string; help?: string; error?: string }>) => (
  <div className="flex flex-col gap-1">
    <span className="text-sm font-medium">{label}</span>
    {children}
    {help ? <span className="text-secondary text-xs">{help}</span> : null}
    {error ? (
      <span className="text-destructive-accent text-xs">{error}</span>
    ) : null}
  </div>
);

type SpecimenProps = { d: FieldDirection; real?: boolean };

/** All interactive states side by side (rest is live — click/focus it). */
const StatesRow = ({ d }: SpecimenProps) => (
  <Stack space="tight">
    <SectionLabel>States — rest is live, the rest are simulated</SectionLabel>
    <Inline space="related" alignY="center">
      <Labeled label="rest (focusable)">
        <MockInput d={d} label="rest" placeholder="Search events…" />
      </Labeled>
      <Labeled label="focus (simulated)">
        <MockInput d={d} state="focus" label="focus" defaultValue="Jazz am" />
      </Labeled>
      <Labeled label="invalid (simulated)">
        <MockInput d={d} state="invalid" label="invalid" defaultValue="—" />
      </Labeled>
      <Labeled label="disabled">
        <MockInput d={d} state="disabled" label="disabled" defaultValue="—" />
      </Labeled>
      <Labeled label="readonly (simulated)">
        <MockInput
          d={d}
          state="readonly"
          label="readonly"
          defaultValue="DE 812 345 678"
        />
      </Labeled>
    </Inline>
  </Stack>
);

/** Mutual distinctness: fields next to the picked Porcelain secondary. */
const ToolbarRow = ({ d, real }: SpecimenProps) => (
  <Stack space="tight">
    <SectionLabel>
      Toolbar on the page — fields vs the Porcelain secondary
    </SectionLabel>
    <Inline space="related" alignY="center">
      <div className="w-64">
        {real ? (
          <TextField
            aria-label="Search events"
            placeholder="Search events…"
            type="search"
          />
        ) : (
          <MockInput d={d} label="Search events" placeholder="Search events…" />
        )}
      </div>
      <div className="w-40">
        {real ? (
          <Select aria-label="Status" defaultValue="all">
            <Select.Option id="all">All statuses</Select.Option>
            <Select.Option id="on-sale">On sale</Select.Option>
          </Select>
        ) : (
          <MockSelect d={d} label="Status" value="All statuses" />
        )}
      </div>
      <PorcelainButton>Export</PorcelainButton>
      <Button variant="primary">New event</Button>
    </Inline>
  </Stack>
);

/** Dense form on a white panel — the fields' home ground. */
const FormPanel = ({ d, real }: SpecimenProps) => (
  <Panel aria-label="Organizer profile">
    <Panel.Header>
      <Title>Organizer profile</Title>
      <Description>
        Field boundaries and states at form density, on a white panel.
      </Description>
    </Panel.Header>
    <Panel.Content>
      <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
        {real ? (
          <>
            <TextField
              label="Organizer name"
              defaultValue="Marigold Events GmbH"
            />
            <Select label="Default locale" defaultValue="de">
              <Select.Option id="de">Deutsch (DE)</Select.Option>
              <Select.Option id="en">English (EN)</Select.Option>
            </Select>
          </>
        ) : (
          <>
            <FieldShell label="Organizer name">
              <MockInput
                d={d}
                label="Organizer name"
                defaultValue="Marigold Events GmbH"
              />
            </FieldShell>
            <FieldShell label="Default locale">
              <MockSelect d={d} label="Default locale" value="Deutsch (DE)" />
            </FieldShell>
          </>
        )}
        <FieldShell label="Support email" error="Enter a valid email address.">
          <MockInput
            d={d}
            state="invalid"
            label="Support email"
            defaultValue="support@marigold"
          />
        </FieldShell>
        <FieldShell label="VAT ID" help="Managed by your tax advisor.">
          <MockInput
            d={d}
            state="disabled"
            label="VAT ID"
            defaultValue="DE 812 345 678"
          />
        </FieldShell>
      </div>
    </Panel.Content>
    <Panel.Footer>
      <Inline space="related">
        <Button variant="ghost">Cancel</Button>
        <PorcelainButton>Save draft</PorcelainButton>
        <Button variant="primary">Publish</Button>
      </Inline>
    </Panel.Footer>
  </Panel>
);

const Specimens = ({ d, real }: SpecimenProps) => (
  <Stack space="group">
    <StatesRow d={d} />
    <ToolbarRow d={d} real={real} />
    <FormPanel d={d} real={real} />
  </Stack>
);

/* -------------------------------------------------------------------------
 * Direction frame + stories
 * ---------------------------------------------------------------------- */

const DirectionFrame = ({
  d,
  children,
}: PropsWithChildren<{ d: FieldDirection }>) => (
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
              Control fields — six directions
            </h2>
            <p className="text-secondary mt-1 text-sm">
              Each row: field at rest and focus, a select, beside the picked
              Porcelain secondary and the primary. Open the individual stories
              for states, form density, and the recipe write-up.
            </p>
          </header>
          {[BASELINE, ...DIRECTIONS].map(d => (
            <Stack space="tight" key={d.key}>
              <SectionLabel>{d.title}</SectionLabel>
              <Inline space="related" alignY="center">
                <div className="w-56">
                  <MockInput
                    d={d}
                    label={`Search (${d.key})`}
                    placeholder="Search events…"
                  />
                </div>
                <div className="w-44">
                  <MockInput
                    d={d}
                    state="focus"
                    label={`Focus (${d.key})`}
                    defaultValue="Jazz am"
                  />
                </div>
                <div className="w-40">
                  <MockSelect
                    d={d}
                    label={`Status (${d.key})`}
                    value="All statuses"
                  />
                </div>
                <PorcelainButton>Export</PorcelainButton>
                <Button variant="primary">New event</Button>
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

export const QuietFlat = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[0]}>
      <Specimens d={DIRECTIONS[0]} />
    </DirectionFrame>
  ),
});

export const FirmEdge = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[1]}>
      <Specimens d={DIRECTIONS[1]} />
    </DirectionFrame>
  ),
});

export const Well = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[2]}>
      <Specimens d={DIRECTIONS[2]} />
    </DirectionFrame>
  ),
});

export const MutedWell = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[3]}>
      <Specimens d={DIRECTIONS[3]} />
    </DirectionFrame>
  ),
});

export const EngravedSlot = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[4]}>
      <Specimens d={DIRECTIONS[4]} />
    </DirectionFrame>
  ),
});

export const SeamlessTint = meta.story({
  render: () => (
    <DirectionFrame d={DIRECTIONS[5]}>
      <Specimens d={DIRECTIONS[5]} />
    </DirectionFrame>
  ),
});
