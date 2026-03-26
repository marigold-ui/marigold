import type { PropsWithChildren, ReactNode } from 'react';
import preview from '.storybook/preview';
import { Headline } from './Headline/Headline';
import { Stack } from './Stack/Stack';

const meta = preview.meta({
  title: 'Styles/Token Audit (Phase 4)',
});

// ---------------------------------------------------------------------------
//  Palette values
// ---------------------------------------------------------------------------

const C = {
  50: 'oklch(0.985 0.002 54)',
  100: 'oklch(0.965 0.003 54)',
  200: 'oklch(0.92 0.004 54)',
  300: 'oklch(0.86 0.005 54)',
  400: 'oklch(0.74 0.006 54)',
  500: 'oklch(0.62 0.007 54)',
  600: 'oklch(0.52 0.008 54)',
  700: 'oklch(0.42 0.008 54)',
  800: 'oklch(0.32 0.008 54)',
  900: 'oklch(0.22 0.008 54)',
  950: 'oklch(0.15 0.008 54)',
} as const;

const O = {
  50: 'oklch(0.99 0.002 54)',
  100: 'oklch(0.97 0.003 54)',
  200: 'oklch(0.94 0.004 54)',
  300: 'oklch(0.88 0.005 54)',
  400: 'oklch(0.75 0.005 54)',
  500: 'oklch(0.6 0.006 54)',
  600: 'oklch(0.45 0.006 54)',
  700: 'oklch(0.32 0.006 54)',
  800: 'oklch(0.2 0.006 54)',
  900: 'oklch(0.12 0.006 54)',
  950: 'oklch(0.08 0.006 54)',
} as const;

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

const Section = ({ title, children }: PropsWithChildren<{ title: string }>) => (
  <div className="flex flex-col gap-2">
    <Headline level="3">{title}</Headline>
    {children}
  </div>
);

const Badge = ({
  variant,
}: {
  variant: 'ok' | 'change' | 'remove' | 'investigate' | 'new' | 'deprecated';
}) => {
  const s = {
    ok: 'bg-green-100 text-green-800',
    change: 'bg-yellow-100 text-yellow-800',
    remove: 'bg-red-100 text-red-800',
    investigate: 'bg-blue-100 text-blue-800',
    new: 'bg-purple-100 text-purple-800',
    deprecated: 'bg-stone-200 text-stone-600',
  };
  return (
    <span
      className={`rounded-full px-1.5 py-px text-[9px] leading-tight font-medium ${s[variant]}`}
    >
      {variant}
    </span>
  );
};

/** Single color swatch */
const Dot = ({
  bg,
  style,
  border,
  label,
}: {
  bg?: string;
  style?: string;
  border?: boolean;
  label?: string;
}) => (
  <div className="flex flex-col items-center gap-px">
    <div
      className={`h-7 w-7 rounded ${bg ?? ''} ${border ? 'border border-stone-200' : ''}`}
      style={style ? { backgroundColor: style } : undefined}
      title={label}
    />
    {label && (
      <span className="text-[8px] leading-tight text-stone-400">{label}</span>
    )}
  </div>
);

/**
 * Compact token row: current dot -> proposed dot (orange ring), name, badge, note
 */
const T = ({
  name,
  rename,
  badge,
  current,
  proposed,
  note,
}: {
  name: string;
  rename?: string;
  badge: 'ok' | 'change' | 'remove' | 'investigate' | 'new' | 'deprecated';
  current: { bg?: string; style?: string };
  proposed?: { bg?: string; style?: string };
  note?: ReactNode;
}) => (
  <div className="grid grid-cols-[56px_56px_1fr] items-center gap-x-3 border-b border-stone-50 py-1.5">
    {/* Current */}
    <Dot bg={current.bg} style={current.style} border />
    {/* Proposed */}
    {proposed ? (
      <div className="rounded-md ring-2 ring-orange-300 ring-offset-1">
        <Dot bg={proposed.bg} style={proposed.style} border />
      </div>
    ) : (
      <div />
    )}
    {/* Info */}
    <div className="flex flex-col gap-0.5">
      <div className="flex flex-wrap items-center gap-1.5">
        <code className="text-[11px] font-semibold">{name}</code>
        {rename && (
          <code className="text-[10px] text-orange-600">{rename}</code>
        )}
        <Badge variant={badge} />
      </div>
      {note && (
        <span className="text-[10px] leading-snug text-stone-400">{note}</span>
      )}
    </div>
  </div>
);

// ---------------------------------------------------------------------------
//  1. Semantic Colors
// ---------------------------------------------------------------------------

export const SemanticColors = meta.story({
  render: () => (
    <Stack space="group">
      <Headline level="2">Semantic Color Tokens</Headline>
      <p className="text-xs text-stone-500">
        Left = current &middot; Orange ring = proposed &middot; No ring = keep
        as-is
      </p>

      {/* Column headers */}
      <div className="grid grid-cols-[56px_56px_1fr] gap-x-3 border-b border-stone-200 pb-1 text-[9px] font-semibold text-stone-400">
        <span>now</span>
        <span>proposed</span>
        <span>token</span>
      </div>

      <Section title="Page & Text">
        <T
          name="--color-background"
          rename="--color-page"
          badge="change"
          current={{ bg: 'bg-white' }}
          proposed={{ style: C[50] }}
          note="White -> gray page"
        />
        <T
          name="--color-foreground"
          badge="ok"
          current={{ bg: 'bg-stone-950' }}
          note="Same step (950), palette switch only."
        />
      </Section>

      <Section title="Primary (brand)">
        <T
          name="--color-brand"
          rename="--color-primary"
          badge="change"
          current={{ bg: 'bg-stone-950' }}
          note="Rename only. Same step (950)."
        />
        <T
          name="--color-brand-foreground"
          rename="--color-primary-foreground"
          badge="change"
          current={{ bg: 'bg-stone-50' }}
          note="Rename only. Same step (50)."
        />
      </Section>

      <Section title="Interactive States">
        <T
          name="--color-hover"
          badge="change"
          current={{ bg: 'bg-stone-100' }}
          proposed={{ style: C[200] }}
          note="Step 200. Was same as muted/selected/focus."
        />
        <T
          name="--color-hover-foreground"
          badge="remove"
          current={{ bg: 'bg-stone-900' }}
          note="2 usages. Nearly identical to foreground."
        />
        <T
          name="--color-selected"
          badge="change"
          current={{ bg: 'bg-stone-100' }}
          proposed={{ style: C[300] }}
          note="Step 300. Stronger than hover."
        />
        <T
          name="--color-focus"
          rename="--color-focus-highlight"
          badge="change"
          current={{ bg: 'bg-stone-100' }}
          proposed={{ style: C[100] }}
          note="Step 100. Rename to distinguish from ring."
        />
        <T
          name="--color-ring"
          badge="ok"
          current={{ bg: 'bg-stone-400' }}
          note="Focus ring outline. Same step (400)."
        />
      </Section>

      <Section title="Secondary & Muted">
        <T
          name="--color-secondary"
          badge="remove"
          current={{ bg: 'bg-stone-50' }}
          note="0 bg usages. Redundant with muted."
        />
        <T
          name="--color-secondary-foreground"
          badge="remove"
          current={{ bg: 'bg-stone-950' }}
          note="1 usage."
        />
        <T
          name="--color-muted"
          badge="change"
          current={{ bg: 'bg-stone-100' }}
          proposed={{ style: C[50] }}
          note="Step 50. Subtle bg on white surfaces."
        />
        <T
          name="--color-muted-foreground"
          badge="ok"
          current={{ bg: 'bg-stone-600' }}
          note="32+ usages. Same step (600)."
        />
      </Section>

      <Section title="Disabled">
        <T
          name="--color-disabled"
          badge="ok"
          current={{ bg: 'bg-stone-200' }}
          note="Same step (200)."
        />
        <T
          name="--color-disabled-foreground"
          badge="change"
          current={{ bg: 'bg-stone-500' }}
          proposed={{ style: C[400] }}
          note="Lighter: step 400 (was 500)."
        />
      </Section>

      <Section title="Destructive">
        <T
          name="--color-destructive"
          badge="ok"
          current={{ bg: 'bg-red-600' }}
        />
        <T
          name="--color-destructive-foreground"
          badge="ok"
          current={{ bg: 'bg-white' }}
        />
        <T
          name="--color-destructive-muted"
          badge="ok"
          current={{ bg: 'bg-red-100' }}
        />
        <T
          name="--color-destructive-muted-foreground"
          badge="ok"
          current={{ bg: 'bg-red-950' }}
        />
        <T
          name="--color-destructive-muted-accent"
          badge="ok"
          current={{ bg: 'bg-red-600' }}
        />
      </Section>

      <Section title="Success">
        <T
          name="--color-success"
          badge="investigate"
          current={{ bg: 'bg-green-500' }}
          note="0 style-file usages."
        />
        <T
          name="--color-success-foreground"
          badge="investigate"
          current={{ bg: 'bg-white' }}
        />
        <T
          name="--color-success-muted"
          badge="ok"
          current={{ bg: 'bg-green-100' }}
        />
        <T
          name="--color-success-muted-foreground"
          badge="ok"
          current={{ bg: 'bg-green-950' }}
        />
        <T
          name="--color-success-muted-accent"
          badge="ok"
          current={{ bg: 'bg-green-600' }}
        />
      </Section>

      <Section title="Warning">
        <T
          name="--color-warning"
          badge="investigate"
          current={{ bg: 'bg-yellow-400' }}
          note="0 style-file usages."
        />
        <T
          name="--color-warning-foreground"
          badge="investigate"
          current={{ bg: 'bg-white' }}
        />
        <T
          name="--color-warning-muted"
          badge="ok"
          current={{ bg: 'bg-yellow-100' }}
        />
        <T
          name="--color-warning-muted-foreground"
          badge="ok"
          current={{ bg: 'bg-yellow-950' }}
        />
        <T
          name="--color-warning-muted-accent"
          badge="ok"
          current={{ bg: 'bg-yellow-600' }}
        />
      </Section>

      <Section title="Info">
        <T
          name="--color-info"
          badge="investigate"
          current={{ bg: 'bg-blue-500' }}
          note="0 style-file usages."
        />
        <T
          name="--color-info-foreground"
          badge="investigate"
          current={{ bg: 'bg-white' }}
        />
        <T
          name="--color-info-muted"
          badge="ok"
          current={{ bg: 'bg-blue-100' }}
        />
        <T
          name="--color-info-muted-foreground"
          badge="ok"
          current={{ bg: 'bg-blue-950' }}
        />
        <T
          name="--color-info-muted-accent"
          badge="ok"
          current={{ bg: 'bg-blue-600' }}
        />
      </Section>

      <Section title="Access Control">
        <T
          name="--color-access-master"
          badge="ok"
          current={{ bg: 'bg-orange-100' }}
        />
        <T
          name="--color-access-master-foreground"
          badge="ok"
          current={{ bg: 'bg-orange-500' }}
        />
        <T
          name="--color-access-admin"
          badge="ok"
          current={{ bg: 'bg-purple-100' }}
        />
        <T
          name="--color-access-admin-foreground"
          badge="ok"
          current={{ bg: 'bg-purple-800' }}
        />
      </Section>

      <Section title="Utility (no value changes, palette switch only)">
        <T
          name="--color-placeholder"
          badge="ok"
          current={{ bg: 'bg-stone-600' }}
          note="Same step (600)."
        />
        <T
          name="--color-link"
          badge="ok"
          current={{ bg: 'bg-blue-600' }}
          note="No change."
        />
        <T
          name="--color-input"
          badge="ok"
          current={{ bg: 'bg-stone-300' }}
          note="Form control borders. Same step (300)."
        />
        <T
          name="--color-border"
          badge="ok"
          current={{ bg: 'bg-stone-200' }}
          note="Structural borders. Same step (200)."
        />
        <T
          name="--color-scrollbar"
          badge="ok"
          current={{ bg: 'bg-stone-300' }}
          note="Same step (300)."
        />
        <T
          name="--color-scrollbar-hover"
          badge="ok"
          current={{ bg: 'bg-stone-950' }}
          note="Same step (950)."
        />
        <T
          name="--color-scrollbar-track"
          badge="ok"
          current={{ bg: 'bg-transparent' }}
          note="No change."
        />
      </Section>
    </Stack>
  ),
});

// ---------------------------------------------------------------------------
//  2. Surface & Elevation
// ---------------------------------------------------------------------------

export const SurfaceAndElevation = meta.story({
  render: () => (
    <Stack space="group">
      <Headline level="2">Surface & Elevation (4d)</Headline>
      <p className="text-xs text-stone-500">
        Gray page, white component surfaces. 4 structural layers + state colors
        on white surfaces.
      </p>

      {/* ---- Layer hierarchy: page 50 vs 100 ---- */}
      <Section title="Layer Hierarchy: page 50 vs page 100">
        <div className="flex gap-6">
          {/* Option A */}
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-[10px] font-semibold">
              A: bg-page = step 50 (subtle)
            </span>
            <div
              className="flex flex-col gap-3 rounded-xl p-5"
              style={{ backgroundColor: C[50] }}
            >
              <div
                className="text-[10px] font-semibold"
                style={{ color: C[600] }}
              >
                bg-page (50)
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-[10px]" style={{ color: C[400] }}>
                  |-
                </span>
                <div
                  className="flex-1 rounded-lg p-3"
                  style={{ backgroundColor: C[100] }}
                >
                  <div className="text-[10px] font-semibold">
                    bg-sunken (100)
                  </div>
                  <div className="text-[9px]" style={{ color: C[500] }}>
                    Sidebar wells, kanban columns, code blocks
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-[10px]" style={{ color: C[400] }}>
                  |-
                </span>
                <div className="shadow-elevation-raised flex-1 rounded-lg bg-white p-3">
                  <div className="text-[10px] font-semibold">
                    bg-surface (white)
                  </div>
                  <div className="text-[9px] text-stone-400">
                    Cards, panels, accordions
                  </div>
                  <div className="mt-2 flex gap-1">
                    {[
                      { l: 'muted', s: 50 as const },
                      { l: 'hover', s: 200 as const },
                      { l: 'selected', s: 300 as const },
                    ].map(({ l, s }) => (
                      <div
                        key={l}
                        className="flex-1 rounded px-2 py-1.5 text-center text-[9px] font-medium"
                        style={{ backgroundColor: C[s] }}
                      >
                        {l} ({s})
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-[10px]" style={{ color: C[400] }}>
                  |-
                </span>
                <div className="shadow-elevation-overlay flex-1 rounded-lg bg-white p-3">
                  <div className="text-[10px] font-semibold">
                    bg-overlay (white)
                  </div>
                  <div className="text-[9px] text-stone-400">
                    Modals, drawers, popovers, menus
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[9px] text-green-600">
              No step conflicts. Clean cascade.
            </span>
          </div>

          {/* Option B */}
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-[10px] font-semibold">
              B: bg-page = step 100 (stronger)
            </span>
            <div
              className="flex flex-col gap-3 rounded-xl p-5"
              style={{ backgroundColor: C[100] }}
            >
              <div
                className="text-[10px] font-semibold"
                style={{ color: C[600] }}
              >
                bg-page (100)
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-[10px]" style={{ color: C[400] }}>
                  |-
                </span>
                <div
                  className="flex-1 rounded-lg border-2 border-dashed border-red-300 p-3"
                  style={{ backgroundColor: C[200] }}
                >
                  <div className="text-[10px] font-semibold">
                    bg-sunken (200)
                  </div>
                  <div className="text-[9px] text-red-500">
                    Collides with hover (200), disabled (200), border (200)
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-[10px]" style={{ color: C[400] }}>
                  |-
                </span>
                <div className="shadow-elevation-raised flex-1 rounded-lg bg-white p-3">
                  <div className="text-[10px] font-semibold">
                    bg-surface (white)
                  </div>
                  <div className="mt-2 flex gap-1">
                    {[
                      { l: 'muted', s: 50 as const },
                      { l: 'hover', s: 200 as const },
                      { l: 'selected', s: 300 as const },
                    ].map(({ l, s }) => (
                      <div
                        key={l}
                        className="flex-1 rounded px-2 py-1.5 text-center text-[9px] font-medium"
                        style={{ backgroundColor: C[s] }}
                      >
                        {l} ({s})
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-1 text-[10px]" style={{ color: C[400] }}>
                  |-
                </span>
                <div className="shadow-elevation-overlay flex-1 rounded-lg bg-white p-3">
                  <div className="text-[10px] font-semibold">
                    bg-overlay (white)
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[9px] text-red-500">
              Sunken/hover/disabled/border all at step 200.
            </span>
          </div>
        </div>
      </Section>

      {/* ---- Surface tokens table ---- */}
      <Section title="Surface Tokens (structural layers)">
        <div className="grid grid-cols-[32px_minmax(160px,1fr)_100px_1fr_1fr] items-center gap-x-3 gap-y-1.5 text-[10px]">
          <div className="font-semibold text-stone-400" />
          <div className="font-semibold text-stone-400">Token</div>
          <div className="font-semibold text-stone-400">Value</div>
          <div className="font-semibold text-stone-400">Use case</div>
          <div className="font-semibold text-stone-400">Paired shadow</div>
          {[
            {
              color: C[50],
              token: '--color-bg-page',
              value: 'charcoal-50',
              use: '<body>, page canvas',
              shadow: 'none',
            },
            {
              color: C[100],
              token: '--color-bg-sunken',
              value: 'charcoal-100',
              use: 'Sidebar wells, kanban columns',
              shadow: 'none',
            },
            {
              color: 'white',
              token: '--color-bg-surface',
              value: 'white',
              use: 'Cards, panels, accordions',
              shadow: 'elevation-raised',
            },
            {
              color: 'white',
              token: '--color-bg-overlay',
              value: 'white',
              use: 'Modals, drawers, popovers',
              shadow: 'elevation-overlay',
            },
          ].map(({ color, token, value, use, shadow }) => (
            <div
              key={token}
              className="col-span-5 grid grid-cols-subgrid items-center"
            >
              <div
                className="h-5 w-5 rounded border border-stone-200"
                style={{ backgroundColor: color }}
              />
              <code className="font-semibold">{token}</code>
              <span>{value}</span>
              <span className="text-stone-500">{use}</span>
              <span className="text-stone-500">{shadow}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- State colors on surfaces ---- */}
      <Section title="State Colors on White Surfaces">
        <p className="text-[10px] text-stone-400">
          Progression: muted (50) &lt; hover (200) &lt; selected (300) -- each
          visually distinct.
        </p>
        <div className="grid grid-cols-[32px_minmax(120px,1fr)_100px_1fr] items-center gap-x-3 gap-y-1.5 text-[10px]">
          <div className="font-semibold text-stone-400" />
          <div className="font-semibold text-stone-400">Token</div>
          <div className="font-semibold text-stone-400">Value</div>
          <div className="font-semibold text-stone-400">Use case</div>
          {[
            {
              color: C[50],
              token: '--color-muted',
              value: 'charcoal-50',
              use: 'Readonly inputs, badge bg, subtle highlights',
            },
            {
              color: C[200],
              token: '--color-hover',
              value: 'charcoal-200',
              use: 'Menu items, list options, sidebar links',
            },
            {
              color: C[300],
              token: '--color-selected',
              value: 'charcoal-300',
              use: 'Selected list items, active nav links',
            },
          ].map(({ color, token, value, use }) => (
            <div
              key={token}
              className="col-span-4 grid grid-cols-subgrid items-center"
            >
              <div
                className="h-5 w-5 rounded border border-stone-200"
                style={{ backgroundColor: color }}
              />
              <code className="font-semibold">{token}</code>
              <span>{value}</span>
              <span className="text-stone-500">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Overlay backdrop ---- */}
      <Section title="Overlay Backdrop (currently hardcoded)">
        <div className="flex items-start gap-4">
          <div className="flex gap-2">
            <div className="flex flex-col items-center gap-0.5">
              <div className="grid h-12 w-16 place-items-center rounded bg-black/80 text-[9px] text-white">
                80%
              </div>
              <span className="text-[9px] text-stone-400">Underlay</span>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="grid h-12 w-16 place-items-center rounded bg-black/50 text-[9px] text-white">
                50%
              </div>
              <span className="text-[9px] text-stone-400">Tray</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-[10px]">
            <code className="font-semibold">--color-overlay-backdrop</code>
            <span className="text-stone-400">
              Both bypass tokens. Decisions: base color? Baked-in vs separate
              opacity? One token or contextual variants?
            </span>
            <Badge variant="investigate" />
          </div>
        </div>
      </Section>

      {/* ---- Elevation ---- */}
      <Section title="Elevation Shadows (no change)">
        <div
          className="flex gap-4 rounded-xl p-5"
          style={{ backgroundColor: C[50] }}
        >
          {[
            {
              label: 'border',
              shadow: 'shadow-elevation-border',
              use: 'Inputs, checkboxes, radios, switches, tags, buttons',
            },
            {
              label: 'raised',
              shadow: 'shadow-elevation-raised',
              use: 'Cards, accordions',
            },
            {
              label: 'overlay',
              shadow: 'shadow-elevation-overlay',
              use: 'Dialogs, drawers, menus, toasts, popovers',
            },
          ].map(({ label, shadow, use }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className={`grid h-16 w-24 place-items-center rounded-lg bg-white text-[10px] font-medium ${shadow}`}
              >
                {label}
              </div>
              <span className="max-w-28 text-center text-[9px] text-stone-400">
                {use}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Component migration ---- */}
      <Section title="Component Migration: bg-background -> bg-surface">
        <p className="text-[10px] text-stone-400">
          13 components use bg-background for white backgrounds. When page goes
          gray, they need bg-surface to stay white.
        </p>
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-4 gap-y-1 text-[10px]">
          <div className="font-semibold text-stone-400">Component</div>
          <div className="font-semibold text-stone-400">Current</div>
          <div className="font-semibold text-stone-400">Migrate to</div>
          {[
            { comp: 'Switch', cur: 'bg-background', to: 'bg-surface' },
            {
              comp: 'Table',
              cur: 'bg-background, bg-background/90',
              to: 'bg-surface, bg-surface/90',
            },
            { comp: 'Tray', cur: 'bg-background', to: 'bg-surface' },
            { comp: 'Badge', cur: 'bg-background', to: 'bg-surface' },
            { comp: 'Slider', cur: 'bg-background', to: 'bg-surface' },
            { comp: 'Accordion', cur: 'bg-background', to: 'bg-surface' },
            { comp: 'TopNavigation', cur: 'bg-background', to: 'bg-surface' },
            { comp: 'Multiselect', cur: 'bg-background', to: 'bg-surface' },
            { comp: 'Calendar', cur: 'bg-background', to: 'bg-surface' },
            { comp: 'Input', cur: 'bg-background', to: 'bg-surface' },
            {
              comp: 'LegacyTable',
              cur: 'bg-background, bg-background/90',
              to: 'bg-surface, bg-surface/90',
            },
            { comp: 'SectionMessage', cur: 'bg-background', to: 'bg-surface' },
            { comp: 'Pagination', cur: 'bg-background', to: 'bg-surface' },
          ].map(({ comp, cur, to }) => (
            <div
              key={comp}
              className="col-span-3 grid grid-cols-subgrid items-center"
            >
              <span className="font-medium">{comp}</span>
              <code className="text-stone-500">{cur}</code>
              <code className="text-orange-600">{to}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Utility updates ---- */}
      <Section title="Utility Updates (utils.css)">
        <p className="text-[10px] text-stone-400">
          Existing util-surface-* utilities stay as the public API. Internals
          update to new tokens.
        </p>
        <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-4 gap-y-1 text-[10px]">
          <div className="font-semibold text-stone-400">Utility</div>
          <div className="font-semibold text-stone-400">Current</div>
          <div className="font-semibold text-stone-400">Update to</div>
          {[
            {
              util: 'util-surface-body',
              cur: '--surface-body',
              to: '--color-bg-page, no shadow',
            },
            {
              util: 'util-surface-sunken',
              cur: '--surface-sunken',
              to: '--color-bg-sunken, no shadow',
            },
            {
              util: 'util-surface-raised',
              cur: '--surface-raised + shadow + border',
              to: '--color-bg-surface + elevation-raised',
            },
            {
              util: 'util-surface-overlay',
              cur: '--surface-overlay + shadow + border',
              to: '--color-bg-overlay + elevation-overlay',
            },
          ].map(({ util, cur, to }) => (
            <div
              key={util}
              className="col-span-3 grid grid-cols-subgrid items-center"
            >
              <code className="font-medium">{util}</code>
              <code className="text-stone-500">{cur}</code>
              <code className="text-orange-600">{to}</code>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Deprecated ---- */}
      <Section title="Deprecated Tokens">
        <div className="grid grid-cols-[56px_56px_1fr] gap-x-3 border-b border-stone-200 pb-1 text-[9px] font-semibold text-stone-400">
          <span>now</span>
          <span />
          <span>token</span>
        </div>
        <T
          name="--surface-sunken"
          badge="deprecated"
          current={{ bg: 'bg-stone-100' }}
          note="Replaced by --color-bg-sunken"
        />
        <T
          name="--surface-body"
          badge="deprecated"
          current={{ bg: 'bg-white' }}
          note="Replaced by --color-bg-page"
        />
        <T
          name="--surface-raised"
          badge="deprecated"
          current={{ bg: 'bg-white' }}
          note="Replaced by bg-surface + shadow-elevation-raised"
        />
        <T
          name="--surface-overlay"
          badge="deprecated"
          current={{ bg: 'bg-white' }}
          note="Replaced by bg-surface + shadow-elevation-overlay"
        />
      </Section>
    </Stack>
  ),
});

// ---------------------------------------------------------------------------
//  2b. Background 50 vs 100: Full Token Cascade
// ---------------------------------------------------------------------------

/**
 * Extra palette steps for Proposal B1 (expanded palette).
 * Interpolated between existing steps to create room.
 */
const CX = {
  ...C,
  75: 'oklch(0.975 0.0025 54)' as const,
  150: 'oklch(0.94 0.0035 54)' as const,
};

export const Background50vs100 = meta.story({
  render: () => {
    type Step = keyof typeof C;
    const tokensFor50: {
      token: string;
      step: Step;
      role: string;
      conflict?: string;
    }[] = [
      { token: '--color-bg-page', step: 50, role: 'Page canvas' },
      {
        token: '--color-bg-sunken',
        step: 100,
        role: 'Sidebar wells, code blocks',
      },
      { token: '--color-muted', step: 50, role: 'Readonly inputs, badge bg' },
      {
        token: '--color-focus-highlight',
        step: 100,
        role: 'Keyboard focus bg',
      },
      { token: '--color-hover', step: 200, role: 'Menu items, list options' },
      { token: '--color-disabled', step: 200, role: 'Disabled element bg' },
      { token: '--color-border', step: 200, role: 'Structural borders' },
      { token: '--color-selected', step: 300, role: 'Selected list items' },
      { token: '--color-input', step: 300, role: 'Form control borders' },
      { token: '--color-ring', step: 400, role: 'Focus ring outline' },
      { token: '--color-disabled-fg', step: 400, role: 'Disabled text' },
      { token: '--color-muted-fg', step: 600, role: 'Secondary text' },
      { token: '--color-foreground', step: 950, role: 'Primary text' },
    ];

    const tokensFor100naive: {
      token: string;
      step: Step;
      role: string;
      conflict?: string;
    }[] = [
      { token: '--color-bg-page', step: 100, role: 'Page canvas' },
      {
        token: '--color-bg-sunken',
        step: 200,
        role: 'Sidebar wells, code blocks',
        conflict: 'Same as hover, disabled, border',
      },
      {
        token: '--color-muted',
        step: 100,
        role: 'Readonly inputs, badge bg',
        conflict: 'Same as page -- invisible on page',
      },
      {
        token: '--color-focus-highlight',
        step: 200,
        role: 'Keyboard focus bg',
        conflict: 'Same as sunken, hover, disabled',
      },
      {
        token: '--color-hover',
        step: 200,
        role: 'Menu items, list options',
        conflict: 'Same as sunken, disabled, border',
      },
      {
        token: '--color-disabled',
        step: 200,
        role: 'Disabled element bg',
        conflict: 'Same as sunken, hover, border',
      },
      {
        token: '--color-border',
        step: 200,
        role: 'Structural borders',
        conflict: 'Same as sunken, hover, disabled',
      },
      { token: '--color-selected', step: 300, role: 'Selected list items' },
      { token: '--color-input', step: 300, role: 'Form control borders' },
      { token: '--color-ring', step: 400, role: 'Focus ring outline' },
      { token: '--color-disabled-fg', step: 400, role: 'Disabled text' },
      { token: '--color-muted-fg', step: 600, role: 'Secondary text' },
      { token: '--color-foreground', step: 950, role: 'Primary text' },
    ];

    const TokenTable = ({
      title,
      tokens,
      accent,
      palette = C,
    }: {
      title: string;
      tokens: {
        token: string;
        step: number;
        role: string;
        conflict?: string;
        newStep?: boolean;
      }[];
      accent: string;
      palette?: Record<number, string>;
    }) => (
      <div className="flex flex-1 flex-col gap-2">
        <span className={`text-[11px] font-semibold ${accent}`}>{title}</span>
        <div className="flex flex-col gap-0.5">
          {tokens.map(({ token, step, role, conflict, newStep }) => (
            <div
              key={token}
              className={`grid grid-cols-[28px_1fr_40px_1fr] items-center gap-x-2 rounded px-1 py-1 text-[10px] ${
                conflict ? 'bg-red-50' : ''
              }`}
            >
              <div
                className="h-5 w-5 rounded border border-stone-200"
                style={{ backgroundColor: palette[step] }}
              />
              <code className="font-semibold">{token}</code>
              <span
                className={
                  newStep ? 'font-semibold text-purple-600' : 'text-stone-400'
                }
              >
                {step}
                {newStep ? '*' : ''}
              </span>
              <span className={conflict ? 'text-red-500' : 'text-stone-400'}>
                {conflict ?? role}
              </span>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <Stack space="group">
        <Headline level="2">Background 50 vs 100: Full Token Cascade</Headline>
        <p className="text-xs text-stone-500">
          What happens to every neutral token when the page background moves
          from step 50 to step 100. Red rows = conflicts where tokens share the
          same step and become visually indistinguishable.
        </p>

        {/* ---- Original comparison ---- */}
        <Section title="Baseline comparison (naive mapping)">
          <div className="flex gap-8">
            <TokenTable
              title="A: bg-page = step 50 (no conflicts)"
              tokens={tokensFor50}
              accent="text-green-700"
            />
            <TokenTable
              title="B: bg-page = step 100 (5 conflicts)"
              tokens={tokensFor100naive}
              accent="text-red-700"
            />
          </div>
        </Section>

        {/* ---- Visual side-by-side ---- */}
        <Section title="Visual: state colors on surface">
          <div className="flex gap-6">
            <div className="flex flex-1 flex-col gap-1">
              <span className="text-[10px] font-semibold text-green-700">
                page = 50
              </span>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C[50] }}
              >
                <div className="shadow-elevation-raised rounded-lg bg-white p-3">
                  <div className="mb-1 text-[9px] font-semibold">
                    Surface (white)
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      { l: 'muted', s: 50 as const },
                      { l: 'focus', s: 100 as const },
                      { l: 'hover', s: 200 as const },
                      { l: 'selected', s: 300 as const },
                    ].map(({ l, s }) => (
                      <div
                        key={l}
                        className="rounded px-2 py-1.5 text-[9px] font-medium"
                        style={{ backgroundColor: C[s] }}
                      >
                        {l} ({s})
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-[9px] text-green-600">
                4 distinct steps. Clean cascade.
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-1">
              <span className="text-[10px] font-semibold text-red-700">
                page = 100 (naive)
              </span>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C[100] }}
              >
                <div className="shadow-elevation-raised rounded-lg bg-white p-3">
                  <div className="mb-1 text-[9px] font-semibold">
                    Surface (white)
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      { l: 'muted', s: 100 as const, conflict: true },
                      { l: 'focus', s: 200 as const, conflict: true },
                      { l: 'hover', s: 200 as const, conflict: true },
                      { l: 'selected', s: 300 as const, conflict: false },
                    ].map(({ l, s, conflict }) => (
                      <div
                        key={l}
                        className={`rounded px-2 py-1.5 text-[9px] font-medium ${
                          conflict ? 'border border-dashed border-red-400' : ''
                        }`}
                        style={{ backgroundColor: C[s] }}
                      >
                        {l} ({s})
                        {conflict && (
                          <span className="ml-1 text-[8px] text-red-500">
                            collision
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <span className="text-[9px] text-red-500">
                focus = hover (both 200). Muted same as page bg.
              </span>
            </div>
          </div>
        </Section>

        {/* ================================================================= */}
        {/*  PROPOSALS                                                        */}
        {/* ================================================================= */}

        <Headline level="2">Proposals: Making page=100 work</Headline>

        {/* ---- Proposal B1: Bump cascade ---- */}
        <Section title="Proposal B1: Bump cascade (shift states up)">
          <p className="text-[10px] text-stone-400">
            Accept that page=100 pushes everything one step up. Sunken=200
            sharing with border/disabled is OK (borders are strokes, disabled in
            sunken areas is rare). Hover bumps to 300, selected to 400.
          </p>
          <div className="flex gap-8">
            <TokenTable
              title="B1: Bumped cascade"
              accent="text-blue-700"
              tokens={[
                { token: '--color-bg-page', step: 100, role: 'Page canvas' },
                {
                  token: '--color-bg-sunken',
                  step: 200,
                  role: 'Wells, code blocks',
                },
                {
                  token: '--color-muted',
                  step: 50,
                  role: 'Lighter than page (inset feel on page, subtle on surface)',
                },
                {
                  token: '--color-focus-highlight',
                  step: 200,
                  role: 'Only used on white surfaces',
                  conflict: 'Same as sunken (OK: focus is surface-only)',
                },
                {
                  token: '--color-hover',
                  step: 300,
                  role: 'Bumped from 200 to 300',
                },
                {
                  token: '--color-disabled',
                  step: 200,
                  role: 'Shares with sunken/border',
                },
                {
                  token: '--color-border',
                  step: 200,
                  role: 'Stroke, not fill (no visual conflict)',
                },
                {
                  token: '--color-selected',
                  step: 400,
                  role: 'Bumped from 300 to 400',
                },
                { token: '--color-input', step: 300, role: 'Form borders' },
                {
                  token: '--color-ring',
                  step: 400,
                  role: 'Focus ring outline',
                },
                {
                  token: '--color-disabled-fg',
                  step: 400,
                  role: 'Disabled text',
                },
                {
                  token: '--color-muted-fg',
                  step: 600,
                  role: 'Secondary text',
                },
                {
                  token: '--color-foreground',
                  step: 950,
                  role: 'Primary text',
                },
              ]}
            />
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[10px] font-semibold text-blue-700">
                B1 visual
              </span>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C[100] }}
              >
                <div className="shadow-elevation-raised rounded-lg bg-white p-3">
                  <div className="mb-1 text-[9px] font-semibold">
                    Surface (white)
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      { l: 'muted', s: 50 as const },
                      { l: 'focus', s: 200 as const },
                      { l: 'hover', s: 300 as const },
                      { l: 'selected', s: 400 as const },
                    ].map(({ l, s }) => (
                      <div
                        key={l}
                        className="rounded px-2 py-1.5 text-[9px] font-medium"
                        style={{ backgroundColor: C[s] }}
                      >
                        {l} ({s})
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <div
                    className="flex-1 rounded-lg p-2 text-[9px]"
                    style={{ backgroundColor: C[200] }}
                  >
                    sunken (200)
                  </div>
                  <div
                    className="flex-1 rounded-lg p-2 text-[9px]"
                    style={{ backgroundColor: C[50] }}
                  >
                    muted on page (50)
                  </div>
                </div>
              </div>
              <div className="rounded border border-blue-200 bg-blue-50 p-2 text-[9px]">
                <p className="font-semibold text-blue-800">Trade-offs:</p>
                <ul className="mt-0.5 list-inside list-disc text-blue-700">
                  <li>
                    Hover (300) and selected (400) are darker than page=50
                    version
                  </li>
                  <li>
                    Selected (400) = ring (400) -- different role (fill vs
                    outline), but same lightness
                  </li>
                  <li>
                    Muted (50) is lighter than page (100) -- reads as subtle
                    inset, not highlight
                  </li>
                  <li>No new palette steps needed</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* ---- Proposal B2: Expand palette ---- */}
        <Section title="Proposal B2: Expand palette (add steps 75, 150)">
          <p className="text-[10px] text-stone-400">
            Add intermediate palette steps so every token gets a unique value
            without bumping states into the mid-range. Purple* = new step.
          </p>
          <div className="flex gap-8">
            <TokenTable
              title="B2: Expanded palette"
              accent="text-purple-700"
              palette={CX}
              tokens={[
                { token: '--color-bg-page', step: 100, role: 'Page canvas' },
                {
                  token: '--color-bg-sunken',
                  step: 150,
                  role: 'Wells, code blocks',
                  newStep: true,
                },
                {
                  token: '--color-muted',
                  step: 75,
                  role: 'Between page and sunken',
                  newStep: true,
                },
                {
                  token: '--color-focus-highlight',
                  step: 150,
                  role: 'Keyboard focus bg',
                  newStep: true,
                  conflict: 'Same as sunken (OK: focus is surface-only)',
                },
                {
                  token: '--color-hover',
                  step: 200,
                  role: 'No shift needed',
                },
                {
                  token: '--color-disabled',
                  step: 200,
                  role: 'Disabled element bg',
                },
                {
                  token: '--color-border',
                  step: 200,
                  role: 'Structural borders',
                },
                {
                  token: '--color-selected',
                  step: 300,
                  role: 'No shift needed',
                },
                { token: '--color-input', step: 300, role: 'Form borders' },
                {
                  token: '--color-ring',
                  step: 400,
                  role: 'Focus ring outline',
                },
                {
                  token: '--color-disabled-fg',
                  step: 400,
                  role: 'Disabled text',
                },
                {
                  token: '--color-muted-fg',
                  step: 600,
                  role: 'Secondary text',
                },
                {
                  token: '--color-foreground',
                  step: 950,
                  role: 'Primary text',
                },
              ]}
            />
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[10px] font-semibold text-purple-700">
                B2 visual
              </span>
              <div
                className="rounded-xl p-4"
                style={{ backgroundColor: C[100] }}
              >
                <div className="shadow-elevation-raised rounded-lg bg-white p-3">
                  <div className="mb-1 text-[9px] font-semibold">
                    Surface (white)
                  </div>
                  <div className="flex flex-col gap-1">
                    {[
                      { l: 'muted', c: CX[75], s: '75*' },
                      { l: 'focus', c: CX[150], s: '150*' },
                      { l: 'hover', c: C[200], s: '200' },
                      { l: 'selected', c: C[300], s: '300' },
                    ].map(({ l, c, s }) => (
                      <div
                        key={l}
                        className="rounded px-2 py-1.5 text-[9px] font-medium"
                        style={{ backgroundColor: c }}
                      >
                        {l} ({s})
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <div
                    className="flex-1 rounded-lg p-2 text-[9px]"
                    style={{ backgroundColor: CX[150] }}
                  >
                    sunken (150*)
                  </div>
                  <div
                    className="flex-1 rounded-lg p-2 text-[9px]"
                    style={{ backgroundColor: CX[75] }}
                  >
                    muted on page (75*)
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="text-[9px] text-purple-600">
                  New palette steps:
                </span>
                {[
                  { s: '75', c: CX[75] },
                  { s: '150', c: CX[150] },
                ].map(({ s, c }) => (
                  <div key={s} className="flex items-center gap-1">
                    <div
                      className="h-4 w-4 rounded border border-purple-200"
                      style={{ backgroundColor: c }}
                    />
                    <span className="text-[9px] font-semibold text-purple-700">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
              <div className="rounded border border-purple-200 bg-purple-50 p-2 text-[9px]">
                <p className="font-semibold text-purple-800">Trade-offs:</p>
                <ul className="mt-0.5 list-inside list-disc text-purple-700">
                  <li>
                    Hover/selected stay at same steps as page=50 version (200,
                    300)
                  </li>
                  <li>
                    Steps 75 and 150 are very close to neighbors -- may feel
                    redundant
                  </li>
                  <li>Palette grows from 11 to 13 steps (more to maintain)</li>
                  <li>Non-standard step numbers (75, 150) break convention</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* ---- Proposal B3: Opacity-based states ---- */}
        <Section title="Proposal B3: Opacity-based states (decouple from palette)">
          <p className="text-[10px] text-stone-400">
            Instead of fixed palette steps for interactive states, derive them
            from foreground at low opacity. States automatically adapt to any
            surface they sit on. Page step becomes irrelevant for state colors.
          </p>
          <div className="flex gap-8">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[11px] font-semibold text-teal-700">
                B3: Opacity-based states
              </span>
              <div className="flex flex-col gap-0.5">
                {[
                  {
                    token: '--color-bg-page',
                    value: 'charcoal-100',
                    note: 'Fixed palette step',
                  },
                  {
                    token: '--color-bg-sunken',
                    value: 'charcoal-200',
                    note: 'Fixed palette step',
                  },
                  {
                    token: '--color-muted',
                    value: 'foreground / 4%',
                    note: 'Adapts to surface',
                    opacity: true,
                  },
                  {
                    token: '--color-focus-highlight',
                    value: 'foreground / 5%',
                    note: 'Adapts to surface',
                    opacity: true,
                  },
                  {
                    token: '--color-hover',
                    value: 'foreground / 8%',
                    note: 'Adapts to surface',
                    opacity: true,
                  },
                  {
                    token: '--color-selected',
                    value: 'foreground / 12%',
                    note: 'Adapts to surface',
                    opacity: true,
                  },
                  {
                    token: '--color-disabled',
                    value: 'charcoal-200',
                    note: 'Fixed (same as sunken)',
                  },
                  {
                    token: '--color-border',
                    value: 'charcoal-200',
                    note: 'Fixed (stroke)',
                  },
                ].map(({ token, value, note, opacity }) => (
                  <div
                    key={token}
                    className={`grid grid-cols-[1fr_120px_1fr] items-center gap-x-2 rounded px-1 py-1 text-[10px] ${
                      opacity ? 'bg-teal-50' : ''
                    }`}
                  >
                    <code className="font-semibold">{token}</code>
                    <span
                      className={
                        opacity
                          ? 'font-semibold text-teal-600'
                          : 'text-stone-400'
                      }
                    >
                      {value}
                    </span>
                    <span className="text-stone-400">{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <span className="text-[10px] font-semibold text-teal-700">
                B3 visual: adapts to any surface
              </span>
              <div className="flex gap-3">
                {/* On white surface */}
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[9px] text-stone-400">On white</span>
                  <div className="shadow-elevation-raised rounded-lg bg-white p-2">
                    {[
                      { l: 'muted', o: '0.04' },
                      { l: 'focus', o: '0.05' },
                      { l: 'hover', o: '0.08' },
                      { l: 'selected', o: '0.12' },
                    ].map(({ l, o }) => (
                      <div
                        key={l}
                        className="rounded px-2 py-1.5 text-[9px] font-medium"
                        style={{
                          backgroundColor: `oklch(0.15 0.008 54 / ${o})`,
                        }}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
                {/* On page bg */}
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[9px] text-stone-400">On page</span>
                  <div
                    className="rounded-lg p-2"
                    style={{ backgroundColor: C[100] }}
                  >
                    {[
                      { l: 'muted', o: '0.04' },
                      { l: 'focus', o: '0.05' },
                      { l: 'hover', o: '0.08' },
                      { l: 'selected', o: '0.12' },
                    ].map(({ l, o }) => (
                      <div
                        key={l}
                        className="rounded px-2 py-1.5 text-[9px] font-medium"
                        style={{
                          backgroundColor: `oklch(0.15 0.008 54 / ${o})`,
                        }}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
                {/* On sunken */}
                <div className="flex flex-1 flex-col gap-1">
                  <span className="text-[9px] text-stone-400">On sunken</span>
                  <div
                    className="rounded-lg p-2"
                    style={{ backgroundColor: C[200] }}
                  >
                    {[
                      { l: 'muted', o: '0.04' },
                      { l: 'focus', o: '0.05' },
                      { l: 'hover', o: '0.08' },
                      { l: 'selected', o: '0.12' },
                    ].map(({ l, o }) => (
                      <div
                        key={l}
                        className="rounded px-2 py-1.5 text-[9px] font-medium"
                        style={{
                          backgroundColor: `oklch(0.15 0.008 54 / ${o})`,
                        }}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded border border-teal-200 bg-teal-50 p-2 text-[9px]">
                <p className="font-semibold text-teal-800">Trade-offs:</p>
                <ul className="mt-0.5 list-inside list-disc text-teal-700">
                  <li>
                    States work on any surface (white, page, sunken) without
                    collisions
                  </li>
                  <li>Page step is completely decoupled from state colors</li>
                  <li>
                    Semi-transparent colors blend with parent bg -- looks
                    slightly different per context (feature, not bug)
                  </li>
                  <li>
                    Cannot use Tailwind fixed classes like{' '}
                    <code>bg-charcoal-200</code> -- needs CSS variables with
                    alpha
                  </li>
                  <li>
                    Opacity stacking in nested elements (e.g. hover inside
                    selected) produces additive darkening
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* ---- Comparison summary ---- */}
        <Section title="Proposal comparison">
          <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr] gap-x-3 gap-y-1 text-[10px]">
            <div className="font-semibold text-stone-400" />
            <div className="font-semibold text-stone-400">
              page=50 (baseline)
            </div>
            <div className="font-semibold text-blue-700">B1: Bump</div>
            <div className="font-semibold text-purple-700">B2: Expand</div>
            <div className="font-semibold text-teal-700">B3: Opacity</div>

            {[
              {
                label: 'Conflicts',
                a: 'None',
                b1: 'selected=ring (fill vs outline)',
                b2: 'None',
                b3: 'None',
              },
              {
                label: 'Palette size',
                a: '11 steps',
                b1: '11 steps',
                b2: '13 steps (+75, +150)',
                b3: '11 steps',
              },
              {
                label: 'Hover weight',
                a: 'Light (200)',
                b1: 'Medium (300)',
                b2: 'Light (200)',
                b3: 'Light (8% opacity)',
              },
              {
                label: 'Selected weight',
                a: 'Medium (300)',
                b1: 'Heavy (400)',
                b2: 'Medium (300)',
                b3: 'Medium (12% opacity)',
              },
              {
                label: 'Muted on page',
                a: 'Same as page (50)',
                b1: 'Lighter than page (50)',
                b2: 'Lighter than page (75)',
                b3: 'Subtle overlay (4%)',
              },
              {
                label: 'Complexity',
                a: 'Simple',
                b1: 'Simple',
                b2: 'More steps to maintain',
                b3: 'CSS alpha channels',
              },
              {
                label: 'Tailwind compat',
                a: 'Full',
                b1: 'Full',
                b2: 'Custom step names',
                b3: 'Needs CSS vars',
              },
              {
                label: 'Works on all bgs',
                a: 'Surface only',
                b1: 'Surface only',
                b2: 'Surface only',
                b3: 'Yes (adaptive)',
              },
            ].map(({ label, a, b1, b2, b3 }) => (
              <div
                key={label}
                className="col-span-5 grid grid-cols-subgrid items-center border-b border-stone-50 py-0.5"
              >
                <span className="font-medium">{label}</span>
                <span className="text-stone-500">{a}</span>
                <span className="text-blue-600">{b1}</span>
                <span className="text-purple-600">{b2}</span>
                <span className="text-teal-600">{b3}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ---- Recommendation ---- */}
        <Section title="Recommendation">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-[10px] leading-relaxed">
            <p className="font-semibold">
              If page=100 is desired for stronger contrast:
            </p>
            <ul className="mt-1 list-inside list-disc text-stone-600">
              <li>
                <strong>B1 (Bump)</strong> is the simplest path -- no new
                infrastructure. The heavier hover/selected may actually be a
                feature for page=100 (stronger page needs stronger states).
                Trade-off: selected=ring sharing at 400.
              </li>
              <li>
                <strong>B3 (Opacity)</strong> is the most future-proof -- states
                work everywhere regardless of page step. But requires CSS alpha
                support and changes how Tailwind classes are authored.
              </li>
              <li>
                <strong>B2 (Expand)</strong> preserves exact same visual weight
                as page=50 but at the cost of non-standard palette steps and
                maintenance overhead. Least recommended.
              </li>
            </ul>
            <p className="mt-2 text-stone-400">
              Compare all three visually in Storybook before deciding. page=50
              remains the path of least resistance.
            </p>
          </div>
        </Section>
      </Stack>
    );
  },
});

// ---------------------------------------------------------------------------
//  3. Palette Comparison
// ---------------------------------------------------------------------------

export const PaletteComparison = meta.story({
  render: () => {
    const steps = [
      50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
    ] as const;
    const tokens: Record<number, string> = {
      50: 'page, muted',
      100: 'sunken, focus',
      200: 'hover, disabled, border',
      300: 'selected, input',
      400: 'ring, disabled-fg',
      500: '--',
      600: 'muted-fg, placeholder',
      700: '--',
      800: '--',
      900: 'hover-fg',
      950: 'foreground, primary',
    };

    const Strip = ({
      label,
      values,
    }: {
      label: string;
      values: Record<number, string>;
    }) => (
      <div className="flex flex-col gap-1">
        <span className="text-[10px] font-semibold">{label}</span>
        <div className="flex">
          {steps.map(s => (
            <div key={s} className="flex flex-col items-center">
              <div
                className="h-12 w-[72px] first:rounded-l-lg last:rounded-r-lg"
                style={{ backgroundColor: values[s] }}
              />
              <span className="mt-0.5 text-[9px] font-semibold">{s}</span>
              <span className="max-w-[72px] text-center text-[8px] leading-tight text-stone-400">
                {tokens[s]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <Stack space="group">
        <Headline level="2">Palette Comparison</Headline>
        <p className="text-xs text-stone-500">
          Both use warm hue 54. Charcoal = softer, more chroma. Obsidian = wider
          contrast, near-black dark end.
        </p>

        <Strip label="Subtle Warm Charcoal" values={C} />
        <Strip label="High-contrast Obsidian" values={O} />
      </Stack>
    );
  },
});

// ---------------------------------------------------------------------------
//  4. State Progression
// ---------------------------------------------------------------------------

export const StateProgression = meta.story({
  render: () => (
    <Stack space="group">
      <Headline level="2">State Progression</Headline>
      <p className="text-xs text-stone-500">
        Currently muted/hover/focus/selected are all stone-100. After palette
        adoption each gets a distinct step.
      </p>

      {/* Current vs proposed */}
      <div className="flex gap-6">
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-[10px] font-semibold text-stone-400">
            Current (all stone-100)
          </span>
          <div className="flex overflow-hidden rounded-lg border border-stone-200">
            {['muted', 'focus', 'hover', 'selected'].map(l => (
              <div
                key={l}
                className="flex-1 bg-stone-100 p-3 text-center text-[10px] font-medium"
              >
                {l}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <span className="text-[10px] font-semibold text-orange-600">
            Proposed (distinct steps)
          </span>
          <div className="flex overflow-hidden rounded-lg ring-2 ring-orange-300">
            {[
              { l: 'muted', s: 50 as const },
              { l: 'focus', s: 100 as const },
              { l: 'hover', s: 200 as const },
              { l: 'selected', s: 300 as const },
            ].map(({ l, s }) => (
              <div
                key={l}
                className="flex-1 p-3 text-center text-[10px] font-medium"
                style={{ backgroundColor: C[s] }}
              >
                {l}
                <div className="text-[8px] text-stone-400">{s}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 50 vs 100 state cascade */}
      <Section title="Page 50 vs 100: state cascade on surface">
        <div className="flex gap-6">
          {[
            {
              label: 'A: page = 50',
              page: C[50],
              sunken: C[100],
              conflict: false,
            },
            {
              label: 'B: page = 100',
              page: C[100],
              sunken: C[200],
              conflict: true,
            },
          ].map(({ label, page, sunken, conflict }) => (
            <div key={label} className="flex flex-1 flex-col gap-1">
              <span className="text-[10px] font-semibold">{label}</span>
              <div
                className="flex flex-col gap-2 rounded-xl p-3"
                style={{ backgroundColor: page }}
              >
                <div
                  className={`rounded-lg p-2 text-[9px] ${conflict ? 'border-2 border-dashed border-red-300' : ''}`}
                  style={{ backgroundColor: sunken }}
                >
                  sunken
                  {conflict && (
                    <span className="ml-1 text-[8px] text-red-500">
                      = hover = disabled
                    </span>
                  )}
                </div>
                <div className="shadow-elevation-raised rounded-lg bg-white p-2">
                  <div className="flex gap-1">
                    {([50, 100, 200, 300] as const).map(s => (
                      <div
                        key={s}
                        className="flex-1 rounded p-1 text-center text-[8px]"
                        style={{ backgroundColor: C[s] }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Selection paradigms */}
      <Section title="Selection patterns (4e)">
        <div className="flex gap-4">
          {[
            {
              label: 'Strong (brand)',
              bg: 'bg-stone-950',
              fg: 'text-stone-50',
              use: 'Checkbox, Radio',
            },
            {
              label: 'Subtle (selected)',
              bg: 'bg-stone-100',
              fg: '',
              use: 'ListBox, Sidebar',
            },
            {
              label: 'Grey (input)',
              bg: 'bg-stone-300',
              fg: '',
              use: 'ToggleButton',
            },
            {
              label: 'None',
              bg: 'border border-dashed border-stone-300',
              fg: 'text-stone-400',
              use: 'Table',
            },
          ].map(({ label, bg, fg, use }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <div
                className={`grid h-10 w-16 place-items-center rounded text-[10px] font-medium ${bg} ${fg}`}
              >
                Aa
              </div>
              <span className="text-[9px] font-medium">{label}</span>
              <span className="text-[8px] text-stone-400">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Hover patterns */}
      <Section title="Hover patterns (4f)">
        <div className="flex gap-4">
          {[
            {
              label: 'Fixed (bg-hover)',
              bg: 'bg-stone-100',
              use: 'Menu, ListBox',
            },
            {
              label: 'Adaptive (current/10)',
              bg: 'bg-current/10',
              use: 'Ghost btn, Tabs',
            },
            {
              label: 'Misuse (bg-muted)',
              bg: 'bg-stone-100 ring-2 ring-red-300',
              use: 'Table',
            },
          ].map(({ label, bg, use }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <div
                className={`grid h-10 w-16 place-items-center rounded text-[10px] font-medium ${bg}`}
              >
                Aa
              </div>
              <span className="text-[9px] font-medium">{label}</span>
              <span className="text-[8px] text-stone-400">{use}</span>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-stone-400">
          Decision: replace all with opaque tokens once palette is chosen.
        </p>
      </Section>

      {/* Disabled approaches */}
      <Section title="Disabled approaches (4h)">
        <div className="flex gap-4">
          {[
            {
              label: 'Full',
              cls: 'bg-stone-200 text-stone-500',
              use: 'Input, Button',
            },
            { label: 'Partial', cls: 'text-stone-500', use: 'Accordion, Tabs' },
            { label: 'Opacity', cls: 'opacity-30', use: 'Calendar, Slider' },
            {
              label: 'None',
              cls: 'border border-dashed border-stone-300',
              use: 'IconButton',
            },
          ].map(({ label, cls, use }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <div
                className={`grid h-10 w-16 place-items-center rounded text-[10px] font-medium ${cls}`}
              >
                Aa
              </div>
              <span className="text-[9px] font-medium">{label}</span>
              <span className="text-[8px] text-stone-400">{use}</span>
            </div>
          ))}
        </div>
      </Section>
    </Stack>
  ),
});

// ---------------------------------------------------------------------------
//  5. Spacing
// ---------------------------------------------------------------------------

export const SpacingTokens = meta.story({
  render: () => (
    <Stack space="group">
      <Headline level="2">Spacing Tokens</Headline>

      <Section title="Component Heights">
        {[
          {
            token: '--spacing-input',
            value: '2.25rem',
            alias: '--spacing-control',
          },
          {
            token: '--spacing-button',
            value: '2.25rem',
            alias: '--spacing-control',
          },
          {
            token: '--spacing-button-small',
            value: '2rem',
            alias: '--spacing-control-small',
          },
          {
            token: '--spacing-button-large',
            value: '2.5rem',
            alias: '--spacing-control-large',
          },
        ].map(({ token, value, alias }) => (
          <div key={token} className="flex items-center gap-3">
            <div
              className="shrink-0 rounded bg-stone-200"
              style={{ width: value, height: '1rem' }}
            />
            <code className="text-[10px] font-semibold">{token}</code>
            <span className="text-[9px] text-stone-400">{value}</span>
            <span className="text-[9px] text-orange-600">alias of {alias}</span>
          </div>
        ))}
      </Section>

      <Section title="Relational Spacing">
        {[
          { token: 'tight', value: '6px' },
          { token: 'related', value: '8px' },
          { token: 'regular', value: '24px' },
          { token: 'group', value: '48px' },
          { token: 'section', value: '96px' },
        ].map(({ token, value }) => (
          <div key={token} className="flex items-center gap-3">
            <div
              className="shrink-0 rounded bg-blue-200"
              style={{ width: value, height: '10px' }}
            />
            <code className="text-[10px] font-semibold">--spacing-{token}</code>
            <span className="text-[9px] text-stone-400">{value}</span>
          </div>
        ))}
      </Section>

      <Section title="Inset Spacing">
        <div className="flex gap-8">
          {[
            { label: 'Square', prefix: 'square', color: 'blue' },
            { label: 'Squish', prefix: 'squish', color: 'green' },
            { label: 'Stretch', prefix: 'stretch', color: 'purple' },
          ].map(({ label, prefix, color }) => (
            <div key={prefix} className="flex flex-col gap-1.5">
              <span className="text-[10px] font-semibold">{label}</span>
              {['tight', 'snug', 'regular', 'relaxed', 'loose'].map(size => (
                <div key={size} className="flex items-center gap-1.5">
                  <div
                    className={`border border-dashed border-${color}-300 bg-${color}-50 p-${prefix}-${size}`}
                  >
                    <div className={`h-2 w-6 rounded bg-${color}-200`} />
                  </div>
                  <code className="text-[9px]">{size}</code>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Section>
    </Stack>
  ),
});

// ---------------------------------------------------------------------------
//  6. Animation & Easing
// ---------------------------------------------------------------------------

export const AnimationTokens = meta.story({
  render: () => (
    <Stack space="group">
      <Headline level="2">Animation & Easing</Headline>

      <Section title="Easing (ease-out-*)">
        {[
          { name: 'quad', used: 'Scrollbar', ok: true },
          { name: 'cubic', used: 'fade-in-up', ok: false },
          { name: 'quart', used: 'ActionBar', ok: true },
          { name: 'quint', used: 'Switch', ok: true },
          { name: 'expo', used: 'Drawer, Sidebar', ok: true },
          { name: 'circ', used: '0 usages', ok: false },
        ].map(({ name, used, ok }) => (
          <div key={name} className="flex items-center gap-2 text-[10px]">
            <code className="w-28 font-semibold">--ease-out-{name}</code>
            <span className="text-stone-400">{used}</span>
            <Badge variant={ok ? 'ok' : 'investigate'} />
          </div>
        ))}
        <p className="text-[9px] text-stone-400">
          + 6 ease-in-out-* and 6 ease-in-* (user-facing, 0 internal usages)
        </p>
      </Section>

      <Section title="Animations">
        {[
          { name: 'fade-in / fade-out', used: 'Underlay', ok: true },
          { name: 'fade-in-up', used: '0 usages', ok: false },
          { name: 'slide-in / slide-out', used: 'ActionBar', ok: true },
          { name: 'slide-in-right / out-right', used: 'Drawer', ok: true },
          { name: 'slide-in-left / out-left', used: 'Sidebar', ok: true },
          { name: 'slide-in-top / out-top', used: '0 usages', ok: false },
          { name: 'slide-in-bottom / out-bottom', used: '0 usages', ok: false },
          { name: 'rotate-spinner', used: 'ProgressCircle', ok: true },
          { name: 'progress-cycle', used: 'ProgressCircle', ok: true },
        ].map(({ name, used, ok }) => (
          <div key={name} className="flex items-center gap-2 text-[10px]">
            <code className="w-52 font-semibold">--animate-{name}</code>
            <span className="text-stone-400">{used}</span>
            <Badge variant={ok ? 'ok' : 'investigate'} />
          </div>
        ))}
      </Section>
    </Stack>
  ),
});
