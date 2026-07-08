import type { CSSProperties, PropsWithChildren } from 'react';
import preview from '.storybook/preview';
import { cn } from '@marigold/system';
import { Badge } from './Badge/Badge';
import { Button } from './Button/Button';
import { Checkbox } from './Checkbox/Checkbox';
import { Description } from './Description/Description';
import { Inline } from './Inline/Inline';
import { Panel } from './Panel/Panel';
import { Select } from './Select/Select';
import { Stack } from './Stack/Stack';
import { Switch } from './Switch/Switch';
import { Table } from './Table/Table';
import { TextField } from './TextField/TextField';
import { Title } from './Title/Title';

/**
 * Subtle / soft refresh — exploration moodboards (DST design spike).
 *
 * Five directions that soften and flatten the current depth-oriented
 * language. Each direction is a pure token override on a wrapper element
 * (the charcoal rungs are retuned, the semantic mapping from tokens.css is
 * re-declared so it re-resolves against the local rungs) plus a scoped
 * class that retunes the compiled `shadow-elevation-*` utilities, which
 * inline their values at build time and can't be re-pointed via tokens.
 *
 * Production styles are untouched — delete this file to remove the spike.
 *
 * Accessibility contract used to calibrate every direction (light theme):
 * - text ≥ 4.5:1 (body) at all times
 * - meaningful non-text boundaries (input/control edges) ≈ 3:1, not more
 * - purely decorative rims may drop below the floor
 * All ratios were computed against white (the worst/typical ground for
 * controls) with WCAG relative luminance; numbers cited per direction.
 */
const meta = preview.meta({
  title: 'Styles/Subtle Refresh',
  parameters: { layout: 'fullscreen', surface: false },
});

/* -------------------------------------------------------------------------
 * Token plumbing
 * ---------------------------------------------------------------------- */

type Rungs = Record<
  | '50'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | '950',
  string
>;

/**
 * The semantic mapping from tokens.css, re-declared verbatim so it
 * re-resolves against the wrapper's local charcoal rungs. (Custom
 * properties resolve var() references where they are declared — on :root —
 * so overriding a rung alone would not retint the semantics.)
 * Status colors (red/green/…) are untouched on purpose.
 */
const SEMANTICS: Record<string, string> = {
  '--color-background': 'var(--color-charcoal-100)',
  '--color-foreground': 'var(--color-charcoal-900)',
  '--color-secondary': 'var(--color-charcoal-600)',
  '--color-placeholder': 'var(--color-charcoal-600)',
  '--color-primary': 'var(--color-charcoal-900)',
  '--color-primary-foreground': 'var(--color-charcoal-50)',
  '--color-muted': 'var(--color-charcoal-50)',
  '--color-control': 'var(--color-charcoal-300)',
  '--color-hover': 'var(--color-charcoal-200)',
  '--color-selected': 'var(--color-charcoal-300)',
  '--color-selected-bold': 'var(--color-charcoal-900)',
  '--color-selected-bold-foreground': 'var(--color-charcoal-50)',
  '--color-focus-highlight': 'var(--color-charcoal-100)',
  '--color-focus-highlight-bold': 'var(--color-charcoal-300)',
  '--color-disabled': 'var(--color-charcoal-400)',
  '--color-disabled-surface': 'var(--color-charcoal-100)',
  '--color-disabled-border': 'var(--color-charcoal-300)',
  '--color-border': 'oklch(from var(--color-charcoal-300) calc(l - 0.08) c h)',
  '--color-control-border':
    'oklch(from var(--color-charcoal-950) l c h / 0.26)',
  '--color-ring': 'var(--color-charcoal-600)',
  '--color-overlay-backdrop':
    'oklch(from var(--color-charcoal-950) l c h / 70%)',
  '--color-scrollbar': 'var(--color-charcoal-300)',
  '--color-scrollbar-hover': 'var(--color-charcoal-950)',
  '--color-surface-border': 'oklch(from var(--color-charcoal-950) l c h / 0.1)',
};

/** Zero out the ui-surface-contrast recipe: a flat primary surface. */
const FLAT_CONTRAST: Record<string, string> = {
  '--contrast-edge-l': '0',
  '--contrast-fill-top-l': '0',
  '--contrast-fill-bottom-l': '0',
  '--contrast-glow-l': '0',
  '--contrast-glow-a': '0',
  '--contrast-highlight-l': '0',
  '--contrast-highlight-a': '0',
};

const direction = (
  rungs: Rungs,
  overrides: Record<string, string> = {}
): CSSProperties =>
  ({
    ...Object.fromEntries(
      Object.entries(rungs).map(([step, value]) => [
        `--color-charcoal-${step}`,
        value,
      ])
    ),
    ...SEMANTICS,
    ...overrides,
  }) as CSSProperties;

/**
 * Scoped shadow retunes. The shadow-elevation utilities inline their values
 * at build time, so flattening happens per-direction with descendant
 * overrides instead of token overrides.
 */
const FLAT_IN_FLOW = [
  '[&_.shadow-elevation-border]:shadow-none',
  '[&_.shadow-elevation-raised]:shadow-none',
].join(' ');

const NO_ENGRAVED_LINE = '[&_.ui-surface-control]:inset-shadow-none';

/* -------------------------------------------------------------------------
 * Shared dense specimen set — identical across all directions
 * ---------------------------------------------------------------------- */

const events = [
  {
    id: '1',
    name: 'Jazz am Schloss',
    status: 'On sale',
    badge: 'success',
    city: 'Freiburg',
    date: 'Jul 18, 2026',
    sold: '1.204 / 1.500',
  },
  {
    id: '2',
    name: 'Open-Air Kino: Nosferatu',
    status: 'Few left',
    badge: 'warning',
    city: 'Karlsruhe',
    date: 'Jul 21, 2026',
    sold: '2.874 / 2.900',
  },
  {
    id: '3',
    name: 'Stadtfest Bühne West',
    status: 'On sale',
    badge: 'success',
    city: 'Mannheim',
    date: 'Aug 02, 2026',
    sold: '640 / 3.000',
  },
  {
    id: '4',
    name: 'Kammerorchester: Brahms II',
    status: 'Announced',
    badge: 'info',
    city: 'Basel',
    date: 'Aug 09, 2026',
    sold: '— / 820',
  },
  {
    id: '5',
    name: 'Poetry Slam Finale',
    status: 'On sale',
    badge: 'success',
    city: 'Freiburg',
    date: 'Aug 15, 2026',
    sold: '312 / 400',
  },
  {
    id: '6',
    name: 'Herbstmarkt Eröffnung',
    status: 'Draft',
    badge: 'default',
    city: 'Offenburg',
    date: 'Sep 04, 2026',
    sold: '— / —',
  },
  {
    id: '7',
    name: 'Techno im Rheinhafen',
    status: 'Cancelled',
    badge: 'error',
    city: 'Basel',
    date: 'Sep 12, 2026',
    sold: '89 / 1.200',
  },
] as const;

const SectionLabel = ({ children }: PropsWithChildren) => (
  <span className="text-secondary text-xs font-medium tracking-wide uppercase">
    {children}
  </span>
);

const FilterBar = () => (
  <Inline space="related" alignY="bottom">
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
    <div className="w-40">
      <Select aria-label="City" defaultValue="all">
        <Select.Option id="all">All cities</Select.Option>
        <Select.Option id="freiburg">Freiburg</Select.Option>
        <Select.Option id="basel">Basel</Select.Option>
      </Select>
    </div>
    <Button variant="secondary">Export</Button>
    <Button variant="primary">New event</Button>
  </Inline>
);

const EventsTable = () => (
  <Panel aria-label="Events">
    <Panel.Header>
      <Title>Events</Title>
      <Description>
        Upcoming events across all venues — selection, states, and grid density.
      </Description>
    </Panel.Header>
    <Panel.Content bleed>
      <Table
        aria-label="Events"
        selectionMode="multiple"
        defaultSelectedKeys={['2']}
      >
        <Table.Header>
          <Table.Column rowHeader>Event</Table.Column>
          <Table.Column>Status</Table.Column>
          <Table.Column>City</Table.Column>
          <Table.Column>Date</Table.Column>
          <Table.Column alignX="right">Tickets</Table.Column>
        </Table.Header>
        <Table.Body items={[...events]}>
          {item => (
            <Table.Row>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>
                <Badge variant={item.badge}>{item.status}</Badge>
              </Table.Cell>
              <Table.Cell>{item.city}</Table.Cell>
              <Table.Cell>{item.date}</Table.Cell>
              <Table.Cell alignX="right">{item.sold}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Panel.Content>
  </Panel>
);

const FormPanel = () => (
  <Panel aria-label="Organizer profile">
    <Panel.Header>
      <Title>Organizer profile</Title>
      <Description>
        Field boundaries, states, and control affordances.
      </Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <TextField label="Organizer name" defaultValue="Marigold Events GmbH" />
        <TextField
          label="Support email"
          description="Shown on ticket confirmations."
          defaultValue="support@marigold.events"
        />
        <Select label="Default locale" defaultValue="de">
          <Select.Option id="de">Deutsch (DE)</Select.Option>
          <Select.Option id="fr">Français (FR)</Select.Option>
          <Select.Option id="en">English (EN)</Select.Option>
        </Select>
        <TextField label="VAT ID" defaultValue="DE 812 345 678" disabled />
        <Checkbox label="Show organizer on event pages" defaultChecked />
        <Switch label="Enable pre-sale notifications" defaultSelected />
      </Stack>
    </Panel.Content>
    <Panel.Footer>
      <Inline space="related">
        <Button variant="ghost">Cancel</Button>
        <Button variant="primary">Save changes</Button>
      </Inline>
    </Panel.Footer>
  </Panel>
);

/**
 * Nesting, both ways: a real nested surface (ring + elevation per
 * direction) and a muted tint block (structure from fill alone). Each
 * direction leans on one of the two — showing both keeps the comparison
 * honest.
 */
const NestedPanels = () => (
  <Panel aria-label="Ticket categories">
    <Panel.Header>
      <Title>Ticket categories</Title>
      <Description>Panel-in-panel: does grouping survive nesting?</Description>
    </Panel.Header>
    <Panel.Content>
      <Stack space="regular">
        <Stack space="tight">
          <SectionLabel>Nested surface</SectionLabel>
          <Panel aria-label="Standard admission">
            <Panel.Header>
              <Title>Standard admission</Title>
            </Panel.Header>
            <Panel.Content>
              <Inline space="regular" alignY="center">
                <span className="text-sm">€ 24,00 · 1.800 available</span>
                <Badge variant="success">On sale</Badge>
              </Inline>
            </Panel.Content>
          </Panel>
        </Stack>
        <Stack space="tight">
          <SectionLabel>Muted tint</SectionLabel>
          <div className="rounded-surface bg-muted p-4">
            <Inline space="regular" alignY="center">
              <span className="text-sm">€ 49,00 · VIP · 120 available</span>
              <Badge variant="warning">Few left</Badge>
            </Inline>
          </div>
        </Stack>
      </Stack>
    </Panel.Content>
  </Panel>
);

/**
 * True overlays keep elevation in every direction. Static mocks (composed
 * from the same ui-* utilities the real Menu/Dialog use) so the specimen
 * stays inside the direction's token scope — a portal would escape it.
 */
const OverlaySpecimens = () => (
  <Inline space="regular" alignY="top">
    <Stack space="tight">
      <SectionLabel>Menu (static mock)</SectionLabel>
      <div className="ui-surface shadow-elevation-overlay w-56 p-1 text-sm">
        <div className="rounded-[calc(var(--radius-surface)-3px)] p-2">
          Duplicate event
        </div>
        <div className="bg-focus-highlight rounded-[calc(var(--radius-surface)-3px)] p-2">
          Edit details
        </div>
        <div className="rounded-[calc(var(--radius-surface)-3px)] p-2">
          Move to draft
        </div>
        <div className="text-secondary border-t-surface-border border-t p-2 text-xs font-medium">
          Danger zone
        </div>
        <div className="text-destructive-accent rounded-[calc(var(--radius-surface)-3px)] p-2">
          Cancel event
        </div>
      </div>
    </Stack>
    <Stack space="tight">
      <SectionLabel>Dialog on backdrop (static mock)</SectionLabel>
      <div className="bg-overlay-backdrop rounded-xl p-10">
        <div className="ui-surface shadow-elevation-overlay w-96">
          <div className="ui-panel-header">
            <span className="text-lg font-semibold">Cancel event?</span>
          </div>
          <div className="ui-panel-content text-sm">
            All 89 sold tickets will be refunded automatically. This cannot be
            undone.
          </div>
          <div className="ui-panel-actions">
            <Button variant="ghost">Keep event</Button>
            <Button variant="destructive">Cancel event</Button>
          </div>
        </div>
      </div>
    </Stack>
  </Inline>
);

const Specimens = () => (
  <Stack space="group">
    <Stack space="tight">
      <SectionLabel>Filter bar (on page)</SectionLabel>
      <FilterBar />
    </Stack>
    <EventsTable />
    <div className="grid items-start gap-6 lg:grid-cols-2">
      <FormPanel />
      <NestedPanels />
    </div>
    <Stack space="tight">
      <SectionLabel>Retained elevation — true overlays only</SectionLabel>
      <OverlaySpecimens />
    </Stack>
  </Stack>
);

/* -------------------------------------------------------------------------
 * Direction frame
 * ---------------------------------------------------------------------- */

const DirectionFrame = ({
  title,
  tagline,
  recipe,
  tokens,
  flow,
  children,
}: PropsWithChildren<{
  title: string;
  tagline: string;
  recipe: string[];
  tokens?: CSSProperties;
  flow?: string;
}>) => (
  <div
    style={tokens}
    className={cn(
      'bg-background text-foreground min-h-screen p-8 font-sans',
      flow
    )}
  >
    <div className="mx-auto max-w-6xl">
      <Stack space="group">
        <header className="max-w-prose">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-secondary mt-1 text-sm">{tagline}</p>
          <ul className="text-secondary mt-3 list-disc space-y-0.5 pl-4 text-xs">
            {recipe.map(line => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </header>
        {children}
      </Stack>
    </div>
  </div>
);

/* -------------------------------------------------------------------------
 * Stories
 * ---------------------------------------------------------------------- */

/** The current design, unchanged — the like-for-like comparison anchor. */
export const Baseline = meta.story({
  render: () => (
    <DirectionFrame
      title="Baseline — current design"
      tagline="The depth-oriented direction as it ships today: elevation on every control and container, modeled primary surface, ~2:1 control edges."
      recipe={['No overrides — exactly the tokens and shadows on this branch.']}
    >
      <Specimens />
    </DirectionFrame>
  ),
});

/**
 * A — Still Ink. The maturation pass: same warm charcoal, same structure,
 * but nothing in the document flow casts a shadow and the primary surface
 * is a flat fill. Meaningful control edges are raised to the 3:1 floor.
 */
export const StillInk = meta.story({
  render: () => (
    <DirectionFrame
      title="A · Still Ink"
      tagline="The current language, de-lifted: identical hue and structure, zero in-flow shadows, flat primary, control edges raised to the 3:1 floor. The smallest change that reads calm."
      recipe={[
        'Charcoal scale unchanged except foreground: 900 lifts 0.22 → 0.27 L (15.1:1 on white, down from 17.3:1).',
        'shadow-elevation-border/raised → none in flow; overlay tier untouched.',
        'Primary/contrast surface flattened (recipe knobs to 0).',
        'Control edge: charcoal-950 @ 26% → 44% alpha ≈ 3.05:1 (was 1.83:1). Engraved bottom line kept.',
        'Decorative surface hairline unchanged (≈1.3:1, below floor by design).',
      ]}
      tokens={direction(
        {
          '50': 'oklch(0.985 0.002 54)',
          '100': 'oklch(0.965 0.003 54)',
          '200': 'oklch(0.92 0.004 54)',
          '300': 'oklch(0.86 0.005 54)',
          '400': 'oklch(0.74 0.006 54)',
          '500': 'oklch(0.62 0.007 54)',
          '600': 'oklch(0.52 0.008 54)',
          '700': 'oklch(0.42 0.008 54)',
          '800': 'oklch(0.32 0.008 54)',
          '900': 'oklch(0.27 0.008 54)',
          '950': 'oklch(0.15 0.008 54)',
        },
        {
          '--color-control-border':
            'oklch(from var(--color-charcoal-950) l c h / 0.44)',
          '--color-overlay-backdrop':
            'oklch(from var(--color-charcoal-950) l c h / 60%)',
          ...FLAT_CONTRAST,
        }
      )}
      flow={FLAT_IN_FLOW}
    >
      <Specimens />
    </DirectionFrame>
  ),
});

/**
 * B — Warm Linen. Warmth as softness: cream page, warm ink, rounder
 * geometry, flat in flow. Structure carried by soft warm hairlines plus
 * the cream-vs-white layering.
 */
export const WarmLinen = meta.story({
  render: () => (
    <DirectionFrame
      title="B · Warm Linen"
      tagline="Warmth as softness: a cream page, warm brown-gray ink, rounder corners, everything in flow flat. Structure comes from warm hairlines over cream-vs-white layering."
      recipe={[
        'Scale rebuilt warm: hue 58–80, chroma up to 0.02 (page oklch(0.96 0.01 80), ink oklch(0.3 0.015 60) = 13.7:1).',
        'Flat in flow; overlay shadow retuned warm and softer; backdrop 70% → 40%.',
        'Structural lines: opaque warm oklch(0.885 0.012 76) ≈ 1.4:1 — dividers recede, alignment carries the grid.',
        'Control edge: warm 950 @ 46% ≈ 3.05:1. Engraved line dropped.',
        'Radius: surface 8px → 12px.',
      ]}
      tokens={direction(
        {
          '50': 'oklch(0.982 0.006 80)',
          '100': 'oklch(0.96 0.01 80)',
          '200': 'oklch(0.925 0.012 78)',
          '300': 'oklch(0.875 0.014 76)',
          '400': 'oklch(0.72 0.012 68)',
          '500': 'oklch(0.6 0.014 64)',
          '600': 'oklch(0.5 0.015 62)',
          '700': 'oklch(0.42 0.015 60)',
          '800': 'oklch(0.36 0.015 60)',
          '900': 'oklch(0.3 0.015 60)',
          '950': 'oklch(0.2 0.02 58)',
        },
        {
          '--color-border': 'oklch(0.885 0.012 76)',
          '--color-control-border':
            'oklch(from var(--color-charcoal-950) l c h / 0.46)',
          '--color-overlay-backdrop':
            'oklch(from var(--color-charcoal-950) l c h / 40%)',
          '--radius-surface': '0.75rem',
          ...FLAT_CONTRAST,
        }
      )}
      flow={cn(
        FLAT_IN_FLOW,
        NO_ENGRAVED_LINE,
        '[&_.shadow-elevation-overlay]:shadow-[0_1px_2px_-1px_oklch(0.25_0.03_60/0.08),0_8px_24px_-6px_oklch(0.25_0.03_60/0.12)]'
      )}
    >
      <Specimens />
    </DirectionFrame>
  ),
});

/**
 * C — Tonal Quiet. The flattest pole: structure almost entirely from
 * background layering (deeper page, white panels, muted nesting), lines
 * reduced to whispers, zero shadow in flow, reduced shadow on overlays.
 */
export const TonalQuiet = meta.story({
  render: () => (
    <DirectionFrame
      title="C · Tonal Quiet"
      tagline="The flattest pole: a deeper page makes white panels read as layers on their own, nesting is a muted tint, and nearly every line is gone. Only control edges keep a perceivable stroke."
      recipe={[
        'Page deepens to oklch(0.945 0.004 54) so panel boundaries are pure fill deltas; nested grouping = muted tint.',
        'Decorative rim → 950 @ 5% (whisper); structural lines → opaque oklch(0.925 0.004 54) ≈ 1.25:1.',
        'Zero shadows in flow; overlay shadow reduced (the ring + reduced lift still separate it).',
        'Control edge: 950 @ 47% ≈ 3.0:1 on white — the one stroke that stays. Engraved line dropped.',
        'Ink oklch(0.28 0.008 54) = 14.6:1; radius 8px → 10px.',
      ]}
      tokens={direction(
        {
          '50': 'oklch(0.975 0.003 54)',
          '100': 'oklch(0.945 0.004 54)',
          '200': 'oklch(0.915 0.004 54)',
          '300': 'oklch(0.87 0.005 54)',
          '400': 'oklch(0.74 0.006 54)',
          '500': 'oklch(0.62 0.007 54)',
          '600': 'oklch(0.51 0.008 54)',
          '700': 'oklch(0.42 0.008 54)',
          '800': 'oklch(0.32 0.008 54)',
          '900': 'oklch(0.28 0.008 54)',
          '950': 'oklch(0.15 0.008 54)',
        },
        {
          '--color-border': 'oklch(0.925 0.004 54)',
          '--color-surface-border':
            'oklch(from var(--color-charcoal-950) l c h / 0.05)',
          '--color-control-border':
            'oklch(from var(--color-charcoal-950) l c h / 0.47)',
          '--color-overlay-backdrop':
            'oklch(from var(--color-charcoal-950) l c h / 45%)',
          '--radius-surface': '0.625rem',
          ...FLAT_CONTRAST,
        }
      )}
      flow={cn(
        FLAT_IN_FLOW,
        NO_ENGRAVED_LINE,
        '[&_.shadow-elevation-overlay]:shadow-[0_2px_6px_-2px_oklch(0.15_0.02_54/0.08),0_8px_16px_-6px_oklch(0.15_0.02_54/0.08)]'
      )}
    >
      <Specimens />
    </DirectionFrame>
  ),
});

/**
 * D — Morning Fog. The cool pole: low-chroma blue-gray neutrals, crisp
 * 8px geometry kept, flat in flow, structure carried by cool hairlines.
 * Closest to the Linear/Perplexity register of calm.
 */
export const MorningFog = meta.story({
  render: () => (
    <DirectionFrame
      title="D · Morning Fog"
      tagline="The cool pole: low-chroma blue-gray neutrals and slate ink, crisp geometry kept, flat in flow. Calm through temperature rather than warmth — hairline-driven structure."
      recipe={[
        'Scale rebuilt cool: hue 250–262 (page oklch(0.965 0.006 250), ink oklch(0.31 0.015 260) = 13.2:1).',
        'Flat in flow; overlay shadow retuned cool; backdrop 70% → 40%.',
        'Structural lines: opaque cool oklch(0.9 0.008 250) ≈ 1.35:1.',
        'Control edge: cool 950 @ 45% ≈ 3.0:1. Engraved line dropped.',
        'NEW TOKEN VALUE (flagged): --color-ring → oklch(0.55 0.08 260) ≈ 4.9:1 — the focus ring picks up a hint of blue instead of pure gray.',
        'Radius unchanged (8px) — softness from color, not geometry.',
      ]}
      tokens={direction(
        {
          '50': 'oklch(0.982 0.004 250)',
          '100': 'oklch(0.965 0.006 250)',
          '200': 'oklch(0.935 0.008 250)',
          '300': 'oklch(0.89 0.01 252)',
          '400': 'oklch(0.72 0.012 255)',
          '500': 'oklch(0.6 0.014 258)',
          '600': 'oklch(0.51 0.015 260)',
          '700': 'oklch(0.42 0.016 260)',
          '800': 'oklch(0.36 0.016 260)',
          '900': 'oklch(0.31 0.015 260)',
          '950': 'oklch(0.18 0.02 262)',
        },
        {
          '--color-border': 'oklch(0.9 0.008 250)',
          '--color-control-border':
            'oklch(from var(--color-charcoal-950) l c h / 0.45)',
          '--color-ring': 'oklch(0.55 0.08 260)',
          '--color-overlay-backdrop':
            'oklch(from var(--color-charcoal-950) l c h / 40%)',
          ...FLAT_CONTRAST,
        }
      )}
      flow={cn(
        FLAT_IN_FLOW,
        NO_ENGRAVED_LINE,
        '[&_.shadow-elevation-overlay]:shadow-[0_1px_2px_-1px_oklch(0.2_0.03_262/0.09),0_8px_20px_-6px_oklch(0.2_0.03_262/0.11)]'
      )}
    >
      <Specimens />
    </DirectionFrame>
  ),
});

/**
 * E — Cloud Cover. Softness as gentle depth instead of flatness: the
 * decorative rim disappears entirely, containers float on one whisper-
 * diffuse ambient shadow, geometry is at its roundest. Controls stay flat.
 */
export const CloudCover = meta.story({
  render: () => (
    <DirectionFrame
      title="E · Cloud Cover"
      tagline="Softness as gentle depth: no rims at all — containers float on one whisper-diffuse ambient shadow over a slightly deeper page. Controls stay flat; geometry at its roundest."
      recipe={[
        'Decorative surface rim → fully transparent; containers = fill delta + one diffuse ambient shadow (blur 12–32px, alpha ≤ 0.07).',
        'Control shadows removed; control edge 950 @ 45% ≈ 3.0:1 stays the affordance stroke.',
        'Structural lines: opaque oklch(0.94 0.003 54) ≈ 1.2:1 — near-invisible; fills and spacing carry the table.',
        'Ink oklch(0.3 0.008 54) = 13.7:1; page deepens slightly to 0.955 L.',
        'Radius: surface 8px → 16px (the boldest geometry move of the set); backdrop 70% → 30%.',
      ]}
      tokens={direction(
        {
          '50': 'oklch(0.98 0.003 54)',
          '100': 'oklch(0.955 0.004 54)',
          '200': 'oklch(0.925 0.004 54)',
          '300': 'oklch(0.88 0.005 54)',
          '400': 'oklch(0.74 0.006 54)',
          '500': 'oklch(0.62 0.007 54)',
          '600': 'oklch(0.52 0.008 54)',
          '700': 'oklch(0.42 0.008 54)',
          '800': 'oklch(0.34 0.008 54)',
          '900': 'oklch(0.3 0.008 54)',
          '950': 'oklch(0.17 0.008 54)',
        },
        {
          '--color-border': 'oklch(0.94 0.003 54)',
          '--color-surface-border': 'transparent',
          '--color-control-border':
            'oklch(from var(--color-charcoal-950) l c h / 0.45)',
          '--color-overlay-backdrop':
            'oklch(from var(--color-charcoal-950) l c h / 30%)',
          '--radius-surface': '1rem',
          ...FLAT_CONTRAST,
        }
      )}
      flow={cn(
        '[&_.shadow-elevation-border]:shadow-none',
        NO_ENGRAVED_LINE,
        '[&_.shadow-elevation-raised]:shadow-[0_2px_12px_-2px_oklch(0.2_0.02_54/0.05),0_12px_32px_-12px_oklch(0.2_0.02_54/0.07)]',
        '[&_.shadow-elevation-overlay]:shadow-[0_4px_12px_-2px_oklch(0.2_0.02_54/0.07),0_24px_48px_-12px_oklch(0.2_0.02_54/0.13)]'
      )}
    >
      <Specimens />
    </DirectionFrame>
  ),
});
