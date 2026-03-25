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
          proposed={{ style: C[950] }}
          note="stone -> charcoal palette"
        />
      </Section>

      <Section title="Primary (brand)">
        <T
          name="--color-brand"
          rename="--color-primary"
          badge="change"
          current={{ bg: 'bg-stone-950' }}
          proposed={{ style: C[950] }}
          note="Rename only. 'brand' -> 'primary'"
        />
        <T
          name="--color-brand-foreground"
          rename="--color-primary-foreground"
          badge="change"
          current={{ bg: 'bg-stone-50' }}
          proposed={{ style: C[50] }}
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
          proposed={{ style: C[400] }}
          note="Focus ring outline. Step 400."
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
          proposed={{ style: C[600] }}
          note="32+ usages. Step 600."
        />
      </Section>

      <Section title="Disabled">
        <T
          name="--color-disabled"
          badge="ok"
          current={{ bg: 'bg-stone-200' }}
          proposed={{ style: C[200] }}
          note="Step 200."
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

      <Section title="Utility">
        <T
          name="--color-placeholder"
          badge="ok"
          current={{ bg: 'bg-stone-600' }}
          proposed={{ style: C[600] }}
        />
        <T name="--color-link" badge="ok" current={{ bg: 'bg-blue-600' }} />
        <T
          name="--color-input"
          badge="ok"
          current={{ bg: 'bg-stone-300' }}
          proposed={{ style: C[300] }}
          note="Form control borders."
        />
        <T
          name="--color-border"
          badge="ok"
          current={{ bg: 'bg-stone-200' }}
          proposed={{ style: C[200] }}
          note="Structural borders."
        />
        <T
          name="--color-scrollbar"
          badge="ok"
          current={{ bg: 'bg-stone-300' }}
          proposed={{ style: C[300] }}
        />
        <T
          name="--color-scrollbar-hover"
          badge="ok"
          current={{ bg: 'bg-stone-950' }}
          proposed={{ style: C[950] }}
        />
        <T
          name="--color-scrollbar-track"
          badge="ok"
          current={{ bg: 'bg-transparent' }}
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
      <Headline level="2">Surface & Elevation</Headline>

      {/* Side-by-side page 50 vs 100 */}
      <Section title="Page background: step 50 vs step 100">
        <div className="flex gap-6">
          {/* Option A */}
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-[10px] font-semibold">
              A: page = 50 (subtle)
            </span>
            <div
              className="flex flex-col gap-2 rounded-xl p-4"
              style={{ backgroundColor: C[50] }}
            >
              <div className="text-[9px]">page (50)</div>
              <div
                className="rounded-lg p-2 text-[9px]"
                style={{ backgroundColor: C[100] }}
              >
                sunken (100)
              </div>
              <div className="shadow-elevation-raised rounded-lg bg-white p-2">
                <div className="text-[9px] font-medium">surface (white)</div>
                <div className="mt-1.5 flex gap-1">
                  {([50, 200, 300] as const).map(s => (
                    <div
                      key={s}
                      className="flex-1 rounded p-1 text-center text-[8px]"
                      style={{ backgroundColor: C[s] }}
                    >
                      {s === 50 ? 'muted' : s === 200 ? 'hover' : 'selected'} (
                      {s})
                    </div>
                  ))}
                </div>
              </div>
              <div className="shadow-elevation-overlay rounded-lg bg-white p-2 text-[9px]">
                overlay (white)
              </div>
            </div>
            <span className="text-[9px] text-green-600">No conflicts</span>
          </div>

          {/* Option B */}
          <div className="flex flex-1 flex-col gap-1">
            <span className="text-[10px] font-semibold">
              B: page = 100 (stronger)
            </span>
            <div
              className="flex flex-col gap-2 rounded-xl p-4"
              style={{ backgroundColor: C[100] }}
            >
              <div className="text-[9px]">page (100)</div>
              <div
                className="rounded-lg border-2 border-dashed border-red-300 p-2 text-[9px]"
                style={{ backgroundColor: C[200] }}
              >
                sunken (200)
                <span className="ml-1 text-[8px] text-red-500">
                  = hover = disabled
                </span>
              </div>
              <div className="shadow-elevation-raised rounded-lg bg-white p-2">
                <div className="text-[9px] font-medium">surface (white)</div>
                <div className="mt-1.5 flex gap-1">
                  {([50, 200, 300] as const).map(s => (
                    <div
                      key={s}
                      className="flex-1 rounded p-1 text-center text-[8px]"
                      style={{ backgroundColor: C[s] }}
                    >
                      {s === 50 ? 'muted' : s === 200 ? 'hover' : 'selected'} (
                      {s})
                    </div>
                  ))}
                </div>
              </div>
              <div className="shadow-elevation-overlay rounded-lg bg-white p-2 text-[9px]">
                overlay (white)
              </div>
            </div>
            <span className="text-[9px] text-red-500">
              Sunken/hover/disabled/border collide at 200
            </span>
          </div>
        </div>
      </Section>

      {/* Surface tokens */}
      <Section title="Surface Tokens">
        <div className="grid grid-cols-[56px_56px_1fr] gap-x-3 border-b border-stone-200 pb-1 text-[9px] font-semibold text-stone-400">
          <span>now</span>
          <span>proposed</span>
          <span>token</span>
        </div>
        <T
          name="--color-surface"
          badge="ok"
          current={{ bg: 'bg-white' }}
          note="Stays white."
        />
        <T
          name="--color-surface-border"
          badge="ok"
          current={{ bg: 'bg-stone-300' }}
        />
        <T
          name="--color-bg-page"
          badge="new"
          current={{ bg: 'bg-transparent' }}
          proposed={{ style: C[50] }}
          note="New. Replaces --color-background."
        />
        <T
          name="--color-bg-sunken"
          badge="new"
          current={{ bg: 'bg-transparent' }}
          proposed={{ style: C[100] }}
          note="New. Recessed areas."
        />
        <T
          name="--color-bg-overlay"
          badge="new"
          current={{ bg: 'bg-transparent' }}
          proposed={{ bg: 'bg-white' }}
          note="New. Floating elements."
        />
        <T
          name="--color-overlay-backdrop"
          badge="investigate"
          current={{ bg: 'bg-black/80' }}
          note="Hardcoded bg-black/80 and bg-black/50. Needs decision."
        />
      </Section>

      {/* Elevation */}
      <Section title="Elevation (no change)">
        <div
          className="flex gap-4 rounded-xl p-5"
          style={{ backgroundColor: C[50] }}
        >
          {[
            {
              label: 'border',
              shadow: 'shadow-elevation-border',
              use: 'Inputs, buttons',
            },
            {
              label: 'raised',
              shadow: 'shadow-elevation-raised',
              use: 'Cards, panels',
            },
            {
              label: 'overlay',
              shadow: 'shadow-elevation-overlay',
              use: 'Dialogs, menus',
            },
          ].map(({ label, shadow, use }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div
                className={`grid h-16 w-24 place-items-center rounded-lg bg-white text-[10px] font-medium ${shadow}`}
              >
                {label}
              </div>
              <span className="text-[9px] text-stone-400">{use}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Deprecated */}
      <Section title="Deprecated">
        <T
          name="--surface-sunken"
          badge="deprecated"
          current={{ bg: 'bg-stone-100' }}
          note="-> bg-muted + elevation"
        />
        <T
          name="--surface-body"
          badge="deprecated"
          current={{ bg: 'bg-white' }}
          note="-> --color-page"
        />
        <T
          name="--surface-raised"
          badge="deprecated"
          current={{ bg: 'bg-white' }}
          note="-> bg-surface + raised shadow"
        />
        <T
          name="--surface-overlay"
          badge="deprecated"
          current={{ bg: 'bg-white' }}
          note="-> bg-surface + overlay shadow"
        />
      </Section>
    </Stack>
  ),
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
