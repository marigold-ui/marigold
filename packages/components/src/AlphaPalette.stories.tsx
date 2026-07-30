import {
  type PropsWithChildren,
  type ReactNode,
  useLayoutEffect,
  useRef,
} from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import preview from '.storybook/preview';
import { cn } from '@marigold/system';
import { Button } from './Button/Button';
import { Headline } from './Headline/Headline';
import { Inline } from './Inline/Inline';
import { ListBox } from './ListBox/ListBox';
import { SegmentedControl } from './SegmentedControl/SegmentedControl';
import { Stack } from './Stack/Stack';
import {
  type Rgb,
  composite,
  contrast as contrastRatio,
  rgbString,
} from './contrast.utils';

const meta = preview.meta({
  title: 'Styles/Alpha',
  parameters: { surface: false },
});

/* ------------------------------------------------------------------ *
 * Grounds
 * ------------------------------------------------------------------ */

/**
 * The three grounds Marigold ships onto. Every specimen below renders on all
 * three, because a wash that is only ever reviewed on white is a wash whose
 * behaviour on the other two is a guess.
 *
 * `solid` is the flat colour a ground reduces to for measurement: `ui-contrast`
 * paints a gradient and a glow over `--color-primary`, so ratios quoted against
 * it are measured against that base rather than against the rendered gradient.
 * The gradient varies by a couple of hundredths across the surface, which is
 * well inside the tolerance we care about — but it is an approximation and the
 * numbers should be read as such.
 */
const GROUNDS = [
  {
    id: 'surface',
    label: 'surface',
    note: 'white',
    className: 'bg-surface text-foreground',
    solid: '--color-surface',
    polarity: 'A (dark base)',
  },
  {
    id: 'page',
    label: 'page',
    note: 'charcoal-100',
    className: 'bg-background text-foreground',
    solid: '--color-background',
    polarity: 'A (dark base)',
  },
  {
    id: 'contrast',
    label: 'contrast',
    note: 'charcoal-900',
    className: 'ui-contrast',
    solid: '--color-primary',
    polarity: 'B (light base)',
  },
] as const;

type Ground = (typeof GROUNDS)[number];

/**
 * Renders `children` once per ground.
 *
 * The panels use the real surface utilities rather than hand-rolled
 * backgrounds, and that matters more than it looks: `ui-contrast` also applies
 * `text-primary-foreground`. Polarity derivation keys off `currentColor`, so a
 * harness that set the background without the text colour would render the
 * adaptive specimens as if they worked while testing nothing at all.
 */
const Grounds = ({ children }: { children: (ground: Ground) => ReactNode }) => (
  <div className="grid gap-4 lg:grid-cols-3">
    {GROUNDS.map(ground => (
      <div
        key={ground.id}
        data-ground={ground.id}
        data-ground-solid={ground.solid}
        className={cn(
          'rounded-surface flex flex-col gap-3 p-4',
          ground.className
        )}
      >
        <span className="text-xs tracking-wide uppercase opacity-60">
          {ground.label} · {ground.note}
        </span>
        {children(ground)}
      </div>
    ))}
  </div>
);

const Note = ({ children }: PropsWithChildren) => (
  <p className="text-secondary max-w-prose text-sm">{children}</p>
);

/* ------------------------------------------------------------------ *
 * Measurement
 * ------------------------------------------------------------------ */

const readToken = (token: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(token).trim();

/**
 * WCAG thresholds this file asserts against.
 *
 * `TEXT` is 1.4.3 Contrast (Minimum) for normal-size text.
 *
 * `MARKER` is 1.4.11 Non-text Contrast — the bar for visual information
 * *required to identify* a component or state. Washes are asserted to stay
 * **below** it, which is not a typo: a wash is reinforcement, and anything that
 * clears 3:1 is strong enough to be mistaken for the marker itself. Crossing
 * the line means someone has repurposed a wash as a state indicator and should
 * be reaching for the opaque bold tier instead.
 *
 * Deliberately absent: a threshold for hover. 1.4.11 covers information
 * required to *identify* a component or state, and a control is identifiable
 * without its hover feedback — so hover has no ratio floor. Focus does: 3:1 via
 * 1.4.11, restated at AAA by WCAG 2.2 SC 2.4.13 Focus Appearance — *not* 2.4.11,
 * which is Focus Not Obscured. But no wash can serve as a focus indicator:
 * reaching 3:1 needs α ≈ 0.435 on white, over twice the R5 budget and darker
 * than `selected`. Focus indication belongs to `ui-state-focus`, not this ramp.
 */
const WCAG = { TEXT: 4.5, MARKER: 3 } as const;

/** Contrast of an element's own text against its own composited fill. */
const measureTextOnFill = (element: HTMLElement, groundToken: string) => {
  const ground = readToken(groundToken);
  const { backgroundColor, color } = getComputedStyle(element);
  const fill = composite(ground, backgroundColor);

  return contrastRatio(composite(rgbString(fill), color), fill);
};

/**
 * Whether an element paints a background of its own at all.
 *
 * Deliberately not a contrast measurement. `--color-disabled-surface` is
 * charcoal-100 and so is `--color-background`, so on the page ground the old
 * broken behaviour — painting an opaque fill onto a control that had none —
 * measured 1.000:1 against its ground, identical to painting nothing. A ratio
 * assertion cannot tell those apart and would pass on the bug.
 *
 * Tested against the serialized value rather than by compositing. Compositing
 * the fill over two different grounds and comparing looks more rigorous but is
 * browser-dependent: Firefox serializes `bg-current/10` in a form the canvas
 * cannot parse, so `fillStyle` silently keeps its previous value and a control
 * that *does* paint reads as if it paints nothing. A fully transparent
 * background always serializes one of these two ways.
 */
const paintsOwnFill = (element: HTMLElement) =>
  !/^(transparent|rgba\(0,\s*0,\s*0,\s*0\))$/.test(
    getComputedStyle(element).backgroundColor.trim()
  );

/** Contrast of an element's composited fill against the bare ground. */
const measureFillOnGround = (element: HTMLElement, groundToken: string) => {
  const ground = readToken(groundToken);

  return contrastRatio(
    composite(ground, getComputedStyle(element).backgroundColor),
    composite(ground, 'transparent')
  );
};

/**
 * Measures every `[data-swatch]` inside `children` against the ground it sits
 * on, once, after layout — writing the result to `data-ratio` and into the
 * swatch's readout node.
 *
 * One pass over the tree rather than a hook per swatch: the ratio is a property
 * of painted pixels, it is read exactly once, and it never changes afterwards,
 * so routing it through component state would buy a second render per swatch
 * and nothing else.
 *
 * The fill is read back off the element rather than resolved from its token, so
 * what gets measured is what the browser actually painted — relative colour
 * syntax already flattened, alpha included.
 */
const Measured = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    for (const swatch of root.querySelectorAll<HTMLElement>('[data-swatch]')) {
      const groundToken =
        swatch.closest<HTMLElement>('[data-ground]')?.dataset.groundSolid;
      if (!groundToken) continue;

      const ratio = measureFillOnGround(swatch, groundToken);

      swatch.dataset.ratio = ratio.toFixed(3);
      const readout = swatch.querySelector<HTMLElement>('[data-ratio-out]');
      if (readout) readout.textContent = `${ratio.toFixed(2)}:1`;
    }
  }, []);

  return <div ref={ref}>{children}</div>;
};

/* ------------------------------------------------------------------ *
 * The ramp
 * ------------------------------------------------------------------ */

/**
 * Class names are spelled out rather than built from `step`, because Tailwind
 * finds utilities by scanning source text — a template literal would compile to
 * nothing and the swatches would render bare.
 */
const RAMP = [
  {
    step: '50',
    job: 'muted',
    a: { class: 'bg-charcoal-a-50', alpha: 0.02 },
    b: { class: 'bg-charcoal-b-50', alpha: 0.02 },
    target: 1.04,
  },
  {
    step: '100',
    job: 'focus-highlight',
    a: { class: 'bg-charcoal-a-100', alpha: 0.05 },
    b: { class: 'bg-charcoal-b-100', alpha: 0.045 },
    target: 1.11,
  },
  {
    step: '200',
    job: 'hover',
    a: { class: 'bg-charcoal-a-200', alpha: 0.11 },
    b: { class: 'bg-charcoal-b-200', alpha: 0.085 },
    target: 1.27,
  },
  {
    step: '300',
    job: 'selected',
    a: { class: 'bg-charcoal-a-300', alpha: 0.19 },
    b: { class: 'bg-charcoal-b-300', alpha: 0.14 },
    target: 1.52,
  },
] as const;

const Swatch = ({
  fillClass,
  alpha,
  label,
  target,
}: {
  fillClass: string;
  alpha: number;
  label: string;
  target: number;
}) => (
  <div
    data-swatch={label}
    className={cn(
      'flex items-baseline justify-between rounded px-3 py-2 text-xs',
      fillClass
    )}
  >
    <span>
      {label} <span className="opacity-60">/ {alpha}</span>
    </span>
    <span className="tabular-nums opacity-80">
      {/* Filled in by `Measured` after layout. */}
      <span data-ratio-out>—</span>
      <span className="opacity-60"> (t {target})</span>
    </span>
  </div>
);

/**
 * Both ramps on all three grounds, each swatch measured live against its
 * ground. Reading down a column shows the ramp separating into four legible
 * steps; reading across a row shows whether a step holds its weight when the
 * ground changes.
 *
 * The point of the story is the two rows that *fail*: ramp A on the contrast
 * ground and ramp B on the two light ones. That is the polarity rule made
 * visible — an alpha wash adapts within a polarity and simply disappears
 * across one.
 */
export const Ramp = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space="group">
      <Headline level="3">Alpha ramp</Headline>
      <Note>
        Four steps, two polarities. Ramp A is a dark base and darkens what it
        sits on, so it rides light grounds; ramp B is a light base and does the
        reverse. Neither crosses over — which is why there are two ramps and not
        one, and why alphas are solved per polarity to a shared contrast target
        rather than shared as numbers.
      </Note>
      <Measured>
        <Grounds>
          {ground => (
            <Stack space="related">
              <span className="text-xs opacity-60">
                native polarity: {ground.polarity}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium opacity-70">
                  ramp A · dark base
                </span>
                {RAMP.map(rung => (
                  <Swatch
                    key={rung.step}
                    fillClass={rung.a.class}
                    alpha={rung.a.alpha}
                    label={`a-${rung.step}`}
                    target={rung.target}
                  />
                ))}
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium opacity-70">
                  ramp B · light base
                </span>
                {RAMP.map(rung => (
                  <Swatch
                    key={rung.step}
                    fillClass={rung.b.class}
                    alpha={rung.b.alpha}
                    label={`b-${rung.step}`}
                    target={rung.target}
                  />
                ))}
              </div>
            </Stack>
          )}
        </Grounds>
      </Measured>
    </Stack>
  ),
});

const readRatio = (scope: HTMLElement, swatch: string) => {
  const value = scope
    .querySelector(`[data-swatch="${swatch}"]`)
    ?.getAttribute('data-ratio');

  return value ? Number(value) : null;
};

Ramp.test(
  'each ramp hits its contrast target on its own polarity',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    for (const ground of GROUNDS) {
      const panel = canvasElement.querySelector<HTMLElement>(
        `[data-ground="${ground.id}"]`
      )!;
      // The ramp native to this ground is the one under test; the other is the
      // counter-example the story exists to show, and is asserted below.
      const native = ground.id === 'contrast' ? 'b' : 'a';

      for (const rung of RAMP) {
        const measured = readRatio(panel, `${native}-${rung.step}`);

        // A null here means the canvas readback failed to parse a colour, not
        // that the ramp is fine — fail loudly rather than skipping.
        await expect(
          measured,
          `${native}-${rung.step} on ${ground.id} was not measured`
        ).not.toBeNull();
        await expect(
          Math.abs(measured! - rung.target),
          `${native}-${rung.step} on ${ground.id}: ${measured} vs target ${rung.target}`
        ).toBeLessThanOrEqual(0.02);
      }
    }
  }
);

Ramp.test(
  'the wrong polarity is invisible, which is why there are two ramps',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    const contrast = canvasElement.querySelector<HTMLElement>(
      '[data-ground="contrast"]'
    )!;

    // Ramp A is a dark wash on an already-dark ground: the whole ramp collapses
    // into the ground. If this ever starts passing as a *visible* ramp, the
    // polarity rule has been broken somewhere upstream.
    for (const rung of RAMP) {
      await expect(readRatio(contrast, `a-${rung.step}`)).toBeLessThan(1.06);
    }
  }
);

/* ------------------------------------------------------------------ *
 * Derived polarity
 * ------------------------------------------------------------------ */

/**
 * Why polarity is derived rather than chosen.
 *
 * The left specimen is `bg-current/10` — the shipped `ui-state-hover-ghost`.
 * It tints toward whatever `currentColor` already is, so it flips polarity by
 * itself and needs no per-ground branch. The right specimen pins ramp A
 * regardless of ground, which is what picking a polarity by hand looks like
 * when the component later turns up somewhere its author did not anticipate.
 */
export const Adaptive = meta.story({
  render: () => (
    <Stack space="group">
      <Headline level="3">Derived vs. chosen polarity</Headline>
      <Note>
        <code>bg-current/10</code> derives its polarity from the ink, so one
        declaration covers every ground. A pinned ramp cannot: it is correct on
        the grounds its author had in mind and invisible on the others.
      </Note>
      <Grounds>
        {() => (
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="rounded bg-current/10 px-3 py-4 text-center">
              derived
              <div className="opacity-60">bg-current/10</div>
            </div>
            <div className="bg-charcoal-a-200 rounded px-3 py-4 text-center">
              pinned
              <div className="opacity-60">a-200</div>
            </div>
          </div>
        )}
      </Grounds>
    </Stack>
  ),
});

/* ------------------------------------------------------------------ *
 * Component states
 * ------------------------------------------------------------------ */

const WASHES = [
  { label: 'muted', className: 'bg-muted' },
  { label: 'focus-highlight', className: 'bg-focus-highlight' },
  { label: 'hover', className: 'bg-hover' },
  { label: 'selected', className: 'bg-selected' },
] as const;

/**
 * The regression grid: the real components that consume a wash, in the states
 * that consume it, on all three grounds.
 *
 * Two layers of evidence here, and they are not equally strong.
 *
 * The *visual* layer is what Chromatic snapshots. `disabled` and `loading` are
 * real props, but hover cannot be forced from a class on a real component and
 * there is no pseudo-states addon installed — so the hover specimens apply the
 * state utility to a wrapper. That is the same shortcut `Styles/RUI` takes with
 * `ListSurface`, and it carries the same caveat: a forced specimen shows what
 * the utility paints, not that the component actually reaches for it.
 *
 * The *behavioural* layer closes that gap. The play function below hovers the
 * real button and asserts the computed fill matches the forced specimen beside
 * it, so the shortcut cannot quietly drift away from the truth.
 */
export const ComponentStates = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space="group">
      <Headline level="3">Component states per ground</Headline>
      <Note>
        Every component that reaches for a wash, in every state that reaches for
        one. The ghost Button is the case DST-1590 was filed for: its disabled
        and loading states hard-set an opaque, white-calibrated fill, which is
        why they read as near-white pills on the contrast ground.
      </Note>

      <Headline level="4">Ghost Button</Headline>
      <Grounds>
        {() => (
          <Inline space="related" alignY="center">
            <Button variant="ghost">Rest</Button>
            {/* Forced: `hover:` cannot be triggered from a class, so the wash
                is applied directly. The play function proves it matches. */}
            <div className="[&>button]:ui-state-hover-ghost">
              <Button variant="ghost">Forced hover</Button>
            </div>
            <Button variant="ghost" disabled>
              Disabled
            </Button>
            <Button variant="ghost" loading>
              Loading
            </Button>
          </Inline>
        )}
      </Grounds>

      <Headline level="4">Wash fills</Headline>
      <Note>
        The four semantic washes painted <em>directly on the ground</em> rather
        than inside a nested <code>ui-surface</code>. That is deliberate: a
        nested surface would impose its own white fill and answer a different
        question (&ldquo;what does a white card look like here?&rdquo;) while
        looking like it answered this one.
      </Note>
      <Grounds>
        {() => (
          <div className="border-border flex flex-col overflow-hidden rounded border text-sm">
            <div className="border-border border-b px-3 py-2">resting</div>
            {WASHES.map(wash => (
              <div
                key={wash.label}
                data-wash={wash.label}
                className={cn(
                  'border-border px-3 py-2 not-last:border-b',
                  wash.className
                )}
              >
                {wash.label}
              </div>
            ))}
          </div>
        )}
      </Grounds>

      <Headline level="4">SegmentedControl</Headline>
      <Grounds>
        {() => (
          <Stack space="related">
            <SegmentedControl
              aria-label="Default"
              variant="default"
              defaultValue="upcoming"
            >
              <SegmentedControl.Option value="upcoming">
                Upcoming
              </SegmentedControl.Option>
              <SegmentedControl.Option value="past">
                Past
              </SegmentedControl.Option>
            </SegmentedControl>
            <SegmentedControl
              aria-label="Ghost"
              variant="ghost"
              defaultValue="upcoming"
            >
              <SegmentedControl.Option value="upcoming">
                Upcoming
              </SegmentedControl.Option>
              <SegmentedControl.Option value="past">
                Past
              </SegmentedControl.Option>
            </SegmentedControl>
          </Stack>
        )}
      </Grounds>

      <Note>
        The ActionBar is the production case for the contrast column above: it
        is a contrast surface wherever it appears, and{' '}
        <code>ActionBar.tsx</code> cascades{' '}
        <code>variant=&quot;ghost&quot;</code> onto its children — which is how
        the ghost Button&apos;s disabled and loading fills end up on a dark bar.
        It is not rendered here on purpose: the bar is{' '}
        <code>position: fixed</code>, so it would float over this story rather
        than sit in it. See{' '}
        <code>Components/ActionBar → DisabledAndLoading</code>.
      </Note>
    </Stack>
  ),
});

ComponentStates.test(
  'a real hover resolves to the wash the forced specimen paints',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    for (const ground of GROUNDS) {
      const panel = within(
        canvasElement.querySelector<HTMLElement>(
          `[data-ground="${ground.id}"]`
        )!
      );

      const rest = panel.getByRole('button', { name: 'Rest' });
      const forced = panel.getByRole('button', { name: 'Forced hover' });

      await userEvent.hover(rest);

      // The assertion that keeps the forced specimens honest: if the ghost
      // hover ever stops resolving to `bg-current/10`, the visual grid above
      // would still look plausible while showing something the component no
      // longer does.
      await waitFor(async () => {
        await expect(
          getComputedStyle(rest).backgroundColor,
          `real vs forced hover diverged on ${ground.id}`
        ).toBe(getComputedStyle(forced).backgroundColor);
      });

      await userEvent.unhover(rest);
    }
  }
);

/**
 * Every wash row on a given ground, across *all* of the story's ground blocks.
 *
 * A descendant selector rather than `querySelector` on the panel: the story
 * renders several `<Grounds>` blocks, so there are multiple elements carrying
 * `data-ground="surface"` and only one of them holds the wash rows. Resolving
 * just the first found the Ghost Button block, matched nothing, and every loop
 * below ran zero times and passed.
 */
const washesOn = (root: HTMLElement, groundId: string) => [
  ...root.querySelectorAll<HTMLElement>(
    `[data-ground="${groundId}"] [data-wash]`
  ),
];

ComponentStates.test(
  'text on every wash clears WCAG 1.4.3 on every ground',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    // Every ground, contrast included. Before the polarity flip this loop ran
    // over the two light grounds only, because the opaque white-calibrated
    // rungs painted near-white blocks on charcoal-900 and the inherited light
    // text on them measured 1.00 / 1.06 / 1.21 / 1.47:1. The characterisation
    // test that pinned that failure has been deleted; this is what replaces it.
    for (const ground of GROUNDS) {
      const washes = washesOn(canvasElement, ground.id);

      // Non-vacuity guard. An empty NodeList makes every assertion below
      // unreachable and the test green — which is exactly how the first
      // version of this shipped.
      await expect(washes.length, `found no wash rows on ${ground.id}`).toBe(
        WASHES.length
      );

      for (const wash of washes) {
        const ratio = measureTextOnFill(wash, ground.solid);

        await expect(
          ratio,
          `${wash.dataset.wash} on ${ground.id}: text measures ${ratio.toFixed(2)}:1`
        ).toBeGreaterThanOrEqual(WCAG.TEXT);
      }
    }
  }
);

ComponentStates.test(
  'each ground gets the wash polarity it can actually show',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    // The flip is a cascade trick — `ui-contrast` restates the wash tokens
    // against ramp B and descendants inherit them — so it is worth asserting it
    // actually reaches the washes rather than trusting the cascade. A dark-base
    // wash on a dark ground lands at ~1.01:1; a light-base one on a light
    // ground the same. Both directions have to clear that floor to prove the
    // right ramp is in play.
    //
    // This assertion is why the flip is written the way it is: the first draft
    // put a shared `--color-fill-*` seam in :root and repointed only that, and
    // this test caught it at 1.01:1 on contrast. A `var()` in a custom-property
    // declaration resolves where the declaration lives, not where it is read.
    const INVISIBLE = 1.02;

    for (const ground of GROUNDS) {
      const washes = washesOn(canvasElement, ground.id);

      await expect(washes.length, `found no wash rows on ${ground.id}`).toBe(
        WASHES.length
      );

      for (const wash of washes) {
        const ratio = measureFillOnGround(wash, ground.solid);

        await expect(
          ratio,
          `${wash.dataset.wash} on ${ground.id} is ${ratio.toFixed(2)}:1 — the wrong polarity reached it`
        ).toBeGreaterThan(INVISIBLE);
      }
    }
  }
);

ComponentStates.test(
  'disabling a control with no resting fill does not give it one',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    // The originating DST-1590 defect. `ui-state-disabled` treats its fill as a
    // *reset* — replace the control's surface with a flat neutral so a tinted
    // control desaturates. On a ghost control there is no surface to replace, so
    // it added one, and an opaque light neutral cannot sit on an arbitrary
    // ground: on contrast it painted 15.62:1 with 2.08:1 text.
    //
    // Asserted as "paints no fill" rather than as a ratio on purpose — see
    // `paintsOwnFill`. On the page ground the bug measured 1.000:1, so a ratio
    // assertion would have passed on it.
    for (const ground of GROUNDS) {
      // First `[data-ground]` per id is the ghost Button row.
      const row = canvasElement.querySelector<HTMLElement>(
        `[data-ground="${ground.id}"]`
      );
      await expect(row, `no ghost Button row on ${ground.id}`).not.toBeNull();

      const panel = within(row!);
      const rest = panel.getByRole('button', { name: 'Rest' });
      const disabled = panel.getByRole('button', { name: 'Disabled' });
      // Queried by attribute, not by name: a pending Button currently has no
      // accessible name at all (DST-1660). Swap this for a name lookup once
      // that lands.
      const loading = row!.querySelector<HTMLElement>('button[data-pending]');
      await expect(loading, `no loading Button on ${ground.id}`).not.toBeNull();

      // Non-vacuity: the helper has to be able to *see* a fill, or the two
      // assertions below hold for a broken helper as readily as a fixed control.
      const forced = row!.querySelector<HTMLElement>(
        '[class*="ui-state-hover-ghost"] > button'
      );
      await expect(
        forced,
        `no forced-hover specimen on ${ground.id}`
      ).not.toBeNull();
      await expect(
        paintsOwnFill(forced!),
        `the forced-hover specimen on ${ground.id} paints nothing, so this test proves nothing`
      ).toBe(true);

      for (const [label, control] of [
        ['disabled', disabled],
        ['loading', loading!],
      ] as const) {
        await expect(
          paintsOwnFill(control),
          `${label} ghost Button on ${ground.id} paints a fill it has no resting equivalent for`
        ).toBe(false);
      }

      // The state still has to be perceivable, and with no fill it rides
      // entirely on the text. Measured: 17.28 -> 2.31 on white, 15.62 -> 2.08 on
      // page, 16.57 -> 7.49 on contrast.
      const restText = measureTextOnFill(rest, ground.solid);
      const disabledText = measureTextOnFill(disabled, ground.solid);

      await expect(
        disabledText,
        `disabled text on ${ground.id} is ${disabledText.toFixed(2)}:1 against a resting ${restText.toFixed(2)}:1 — not a visible step down`
      ).toBeLessThan(restText / 1.5);
    }
  }
);

ComponentStates.test(
  'no SegmentedControl segment ever wears two washes at once',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    // R4 against the real component rather than a specimen. `Stacking` proves the
    // hazard exists in the abstract; this proves the one place in the system that
    // actually had it does not any more.
    //
    // The ghost SelectionIndicator (z-0) and the RadioButton (z-10) are
    // overlapping siblings inside one segment, so a `hover:` on the option used to
    // land on top of the indicator's wash: two `bg-current/10` layers composing to
    // an effective 0.19, measured 1.23 -> 1.50:1 on white. The option is now
    // gated on `not-selected:` and the indicator owns the combined value.
    for (const ground of GROUNDS) {
      const group = canvasElement.querySelector<HTMLElement>(
        `[data-ground="${ground.id}"] [aria-label="Ghost"]`
      );
      await expect(
        group,
        `no ghost SegmentedControl on ${ground.id}`
      ).not.toBeNull();

      const segments = [
        ...group!.querySelectorAll<HTMLElement>('[data-rac]'),
      ].filter(el => el.className.includes('inline-flex shrink-0'));
      await expect(segments.length, `expected 2 segments on ${ground.id}`).toBe(
        2
      );

      const washesIn = (segment: HTMLElement) =>
        [...segment.querySelectorAll<HTMLElement>('*')].filter(paintsOwnFill);
      const selected = segments.find(s => s.dataset.selected === 'true')!;
      const restRatio = measureFillOnGround(
        washesIn(selected)[0]!,
        ground.solid
      );

      for (const segment of segments) {
        const option = segment.querySelector<HTMLElement>('label')!;
        await userEvent.hover(option);

        // The invariant. Two layers is the bug, whatever they measure.
        await expect(
          washesIn(segment).length,
          `${segment.dataset.selected === 'true' ? 'selected' : 'unselected'} segment on ${ground.id} paints ${washesIn(segment).length} washes at once`
        ).toBeLessThanOrEqual(1);
      }

      // Non-vacuity: hovering the selected segment has to actually *do* something,
      // or "at most one wash" would hold just as well for a component whose hover
      // silently stopped working — which is exactly what happened when this was
      // first written with `group-hover`, a variant the RAC plugin rewrites to
      // require `[data-hovered]` on the group, which the field never receives.
      await userEvent.hover(selected.querySelector<HTMLElement>('label')!);
      const hoverRatio = measureFillOnGround(
        washesIn(selected)[0]!,
        ground.solid
      );

      await expect(
        hoverRatio,
        `hovering the selected segment on ${ground.id} left its wash at ${hoverRatio.toFixed(3)}:1 — the combined value never fired`
      ).toBeGreaterThan(restRatio);
    }
  }
);

Ramp.test(
  'no ramp step is strong enough to pass as a state marker',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    // R7 as an executable invariant. A wash reinforces a state; the thing that
    // *identifies* it — a checkmark, a weight change, an opaque bold fill — has
    // to carry 3:1 on its own. Every consumer checked pairs `selected` with one
    // (ListBox and Menu reveal a checkmark, Sidebar adds font-medium, Table
    // rows delegate to the checkbox), and this guards the other half of that
    // bargain: if a step ever climbs past 3:1 it has stopped being a wash, and
    // whoever needs that weight wants the bold tier instead.
    for (const ground of GROUNDS) {
      const panel = canvasElement.querySelector<HTMLElement>(
        `[data-ground="${ground.id}"]`
      )!;
      const native = ground.id === 'contrast' ? 'b' : 'a';

      for (const rung of RAMP) {
        const swatch = panel.querySelector<HTMLElement>(
          `[data-swatch="${native}-${rung.step}"]`
        )!;
        const ratio = measureFillOnGround(swatch, ground.solid);

        await expect(
          ratio,
          `${native}-${rung.step} on ${ground.id} reaches ${ratio.toFixed(2)}:1 — too strong for a wash`
        ).toBeLessThan(WCAG.MARKER);
      }
    }
  }
);

ComponentStates.test(
  'a loading ghost Button reaches the pending state on every ground',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    for (const ground of GROUNDS) {
      const panel = canvasElement.querySelector<HTMLElement>(
        `[data-ground="${ground.id}"]`
      )!;

      // Queried by state rather than by name: on `beta-release` a pending
      // Button still hides its label with `visibility: hidden`, which drops it
      // from the accessibility tree, so `{ name: 'Loading' }` finds nothing.
      // That is DST-1660, fixed in its own PR — asserting the name here would
      // couple this branch to that one. Swap this for a name lookup once the
      // fix lands.
      const pending = panel.querySelector('[data-pending="true"]');

      await expect(
        pending,
        `no pending Button rendered on ${ground.id}`
      ).not.toBeNull();
    }
  }
);

/* ------------------------------------------------------------------ *
 * Stacking
 * ------------------------------------------------------------------ */

/**
 * R4, made visible: one alpha per element, never two.
 *
 * Stacking is easy to do by accident because it does not require nesting —
 * two overlapping siblings are enough. `SegmentedControl.styles.ts` has exactly
 * that today: the selection indicator (`z-0`) and the option (`z-10`) are
 * siblings that both carry `ui-state-hover-ghost` in the ghost variant, so a
 * hovered selected option pays the wash twice.
 */
export const Stacking = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space="group">
      <Headline level="3">Stacking</Headline>
      <Note>
        Two washes on <em>separate elements</em> composite to a third value that
        belongs to no step of the ramp. <code>hover</code> twice measures 1.60:1
        on the light grounds and 1.66:1 here, past <code>selected</code>&rsquo;s
        1.52:1 top rung. The trap is overlapping siblings as much as nesting —
        neither needs a parent/child relationship to bite.
      </Note>
      <Note>
        Two washes on <em>one</em> element cannot stack: both set{' '}
        <code>background-color</code>, so the cascade picks a winner instead of
        compositing. Measured on the real components, <code>selected</code> wins
        — <code>selected:bg-selected hover:ui-state-hover</code> on a hovered
        selected row stays at 0.19, and a checked, keyboard-focused Menu item
        keeps 0.19 rather than dropping to <code>focus-highlight</code>&rsquo;s
        0.05. That is the right winner — were it the other way round, a hovered
        selection would read at <code>hover</code>&rsquo;s 1.27:1 and so look{' '}
        <em>less</em> selected while the pointer sat on it.{' '}
        <code>CoOccurringStates</code> locks it in.
      </Note>
      <Note>
        No combined token can fix the loser going invisible, which is why none
        is proposed: <code>selected</code> is already the top rung at 0.19
        against an R5 light budget of 0.20 (0.14 against 0.15 on dark). The
        entire headroom buys 0.038 of contrast. The ghost case had room — 0.10
        to 0.15 — which is why <code>ui-state-selected-hover-ghost</code> exists
        and its ramp equivalent cannot.
      </Note>
      <Note>
        For hover that is cosmetic. For <code>Menu</code> it is not: it draws no
        focus ring, so on a checked item keyboard focus becomes{' '}
        <em>entirely</em> invisible — measured <code>outline: none</code>,{' '}
        <code>box-shadow: none</code>, and a background identical to the
        unfocused row. That is a WCAG 2.4.7 failure, and the fix is a ring
        rather than a wash, which is DST-1661&rsquo;s scope (Menu leaning on the
        tint instead of an indicator) and not something a token can resolve.
      </Note>
      <Grounds>
        {() => (
          <div className="grid grid-cols-2 gap-2 text-xs">
            {/* `bg-hover`, not a raw ramp class: the real trap is a semantic
                wash nested in the same semantic wash, and using the token means
                these specimens flip polarity with the ground like everything
                else. Hardcoding `bg-charcoal-a-200` here made the contrast
                column demonstrate the wrong polarity instead of stacking. */}
            <div
              data-stack="single"
              className="bg-hover rounded px-3 py-4 text-center"
            >
              single
              <div className="opacity-60">hover</div>
            </div>
            <div className="bg-hover rounded text-center">
              <div data-stack="double" className="bg-hover rounded px-3 py-4">
                stacked
                <div className="opacity-60">hover × 2</div>
              </div>
            </div>
          </div>
        )}
      </Grounds>
    </Stack>
  ),
});

/**
 * Contrast of a specimen against its ground, counting *every* wash between the
 * two rather than only the specimen's own.
 *
 * `measureFillOnGround` deliberately reads one layer, which is what the ramp
 * tests want. Stacking is the case where that is the wrong answer: the whole
 * point is the layer the parent contributes.
 */
const measureStackOnGround = (element: HTMLElement, groundToken: string) => {
  const ground = readToken(groundToken);
  const layers: string[] = [];

  for (
    let node: HTMLElement | null = element;
    node && !node.dataset.ground;
    node = node.parentElement
  ) {
    const background = getComputedStyle(node).backgroundColor;
    if (background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') {
      layers.unshift(background);
    }
  }

  const stacked = layers.reduce<string | Rgb>(
    (below, layer) =>
      composite(typeof below === 'string' ? below : rgbString(below), layer),
    ground
  );

  return contrastRatio(stacked as Rgb, composite(ground, 'transparent'));
};

/**
 * Contrast of a SegmentedControl label against everything painted beneath it.
 *
 * Needs its own helper because the layer that matters most is not an ancestor:
 * the selected segment's wash comes from `SelectionIndicator`, a *sibling* of the
 * label, so an ancestor walk alone reports the label as sitting on the bare
 * ground. The default variant also stacks two opaque layers a walk does find —
 * the `bg-control` track and the `ui-control` thumb.
 *
 * The ground is read from its token rather than off the element, because
 * `ui-contrast` paints a radial glow whose first colour stop is a highlight, not
 * the base — sampling that reported a light ground and turned real passes into
 * apparent failures.
 */
const measureSegmentLabel = (label: HTMLElement, groundToken: string) => {
  const ground = readToken(groundToken);
  const layers: string[] = [];

  for (
    let node: HTMLElement | null = label.parentElement;
    node && !node.dataset.ground;
    node = node.parentElement
  ) {
    const background = getComputedStyle(node).backgroundColor;
    if (background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') {
      layers.unshift(background);
    }
  }

  const indicator = [...(label.parentElement?.children ?? [])].find(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child !== label
  );
  if (indicator) {
    const background = getComputedStyle(indicator).backgroundColor;
    if (background !== 'rgba(0, 0, 0, 0)' && background !== 'transparent') {
      layers.push(background);
    }
  }

  const fill = layers.reduce<Rgb>(
    (below, layer) => composite(rgbString(below), layer),
    composite(ground, 'transparent')
  );

  return contrastRatio(
    composite(rgbString(fill), getComputedStyle(label).color),
    fill
  );
};

ComponentStates.test(
  'every SegmentedControl label clears WCAG 1.4.3 on every ground',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    // Three failures used to live here, and they had three different causes.
    //
    // `selected:text-foreground` named the light-ground ink, so on a contrast
    // surface the selected ghost label was dark-on-dark at 1.32:1. The ghost
    // variant now inherits the ground's own ink instead of naming one.
    //
    // `text-secondary` is charcoal-600 everywhere, measuring 3.14:1 on a contrast
    // ground. `ui-contrast` now restates it, the same mechanism the washes use.
    //
    // And on the default variant both labels sit on the opaque charcoal-300
    // track, where plain secondary is 3.59:1 — failing on *every* ground, the
    // "never `--color-secondary` on a fill" case in DST-1590's criteria. That
    // variant takes `text-secondary-bold` (5.53:1), and keeps naming dark ink
    // outright, because an opaque light track is what is beneath it on any ground.
    for (const ground of GROUNDS) {
      // Not the first panel for this ground — that one is the ghost Button row.
      const panel = [
        ...canvasElement.querySelectorAll<HTMLElement>(
          `[data-ground="${ground.id}"]`
        ),
      ].find(element => element.querySelector('[role="radiogroup"]'));
      await expect(
        panel,
        `no SegmentedControl panel on ${ground.id}`
      ).toBeTruthy();

      const labels = panel!.querySelectorAll<HTMLElement>('label');

      // Non-vacuity. Two variants, two segments each; a selector that matched
      // nothing would otherwise make every assertion below unreachable, and an
      // earlier draft of this measurement reported a clean pass over zero rows.
      await expect(
        labels.length,
        `expected 4 segment labels on ${ground.id}, found ${labels.length}`
      ).toBe(4);

      for (const label of labels) {
        const ratio = measureSegmentLabel(label, ground.solid);

        await expect(
          ratio,
          `"${label.textContent?.trim()}" on ${ground.id} measures ${ratio.toFixed(2)}:1`
        ).toBeGreaterThanOrEqual(WCAG.TEXT);
      }
    }
  }
);

Stacking.test(
  'a stacked wash overshoots the top rung, which is why R4 forbids it',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    // This guards the reason for the rule, not the rule itself. Repointing the
    // semantics onto the ramp is what made stacking possible at all — while the
    // washes were opaque, a nested one simply covered its parent. Now alphas
    // multiply: 1 - (1 - 0.11)² = 0.208, past a-300's 0.19.
    //
    // If someone ever "fixes" the overshoot by lowering the alphas, the ramp's
    // contrast targets break and the Ramp tests catch that. This test catches
    // the opposite mistake: quietly assuming two washes are safe to nest.
    for (const ground of GROUNDS) {
      const single = canvasElement.querySelector<HTMLElement>(
        `[data-ground="${ground.id}"] [data-stack="single"]`
      );
      const double = canvasElement.querySelector<HTMLElement>(
        `[data-ground="${ground.id}"] [data-stack="double"]`
      );

      await expect(single, `no single specimen on ${ground.id}`).not.toBeNull();
      await expect(
        double,
        `no stacked specimen on ${ground.id}`
      ).not.toBeNull();

      const topRung = RAMP.at(-1)!.target;
      const alone = measureStackOnGround(single!, ground.solid);
      const stacked = measureStackOnGround(double!, ground.solid);

      // Non-vacuity: if the helper failed to see the parent's layer both
      // specimens would measure the same and the assertion below would be
      // asserting nothing.
      await expect(
        stacked,
        `stacked and single both measure ${alone.toFixed(2)}:1 on ${ground.id} — the parent wash was not counted`
      ).toBeGreaterThan(alone);

      // The stacked pair reads as a rung the ramp does not have.
      await expect(
        stacked,
        `stacked a-200 measures ${stacked.toFixed(2)}:1 on ${ground.id} — expected it to overshoot the ${topRung}:1 top rung`
      ).toBeGreaterThan(topRung);
    }
  }
);

/* ------------------------------------------------------------------ *
 * Co-occurring states
 * ------------------------------------------------------------------ */

/**
 * The other half of R4, and the half that is easy to get backwards.
 *
 * `Stacking` covers two washes on two elements, where the alphas multiply. This
 * covers two washes on *one* element, where they cannot: `bg-selected` and
 * `bg-hover` both set `background-color`, so the cascade picks one and the other
 * is discarded. Nothing composites, and no combined token is needed.
 *
 * What matters is *which* one wins, and that is decided by Tailwind's variant
 * emission order rather than by anything this theme states. Today `selected`
 * wins, which is correct: a momentary hover must not weaken a persistent
 * selection. Reordering variants upstream could silently flip it, turning
 * a hovered selected row from 0.19 down to `hover`'s 0.11 — a selection that
 * looks *less* selected while the pointer is over it. That is what this asserts.
 *
 * The reason the fix is not "add a combined selected+hover token": `selected`
 * is already the top rung at 0.19, and R5's light-ground budget is 0.20. The
 * whole available headroom buys 0.038 of contrast. So the weaker state going
 * invisible here is forced by the budget, not an oversight — the opposite
 * conclusion from the ghost case, where 0.10 -> 0.15 had room to spare and
 * `ui-state-selected-hover-ghost` exists because of it.
 */
export const CoOccurringStates = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space="group">
      <Headline level="3">Co-occurring states</Headline>
      <Note>
        A selected row, hovered. Both <code>selected:bg-selected</code> and{' '}
        <code>hover:ui-state-hover</code> match the same element, so one wins
        outright. <code>selected</code> has to be the winner: hover is
        momentary, selection is not.
      </Note>
      <Grounds>
        {() => (
          <ListBox
            aria-label="Co-occurring states"
            selectionMode="single"
            defaultSelectedKeys={['selected']}
          >
            <ListBox.Item id="selected">Selected</ListBox.Item>
            <ListBox.Item id="plain">Not selected</ListBox.Item>
          </ListBox>
        )}
      </Grounds>
    </Stack>
  ),
});

CoOccurringStates.test(
  'hovering a selected row never weakens the selection',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    for (const ground of GROUNDS) {
      const panel = canvasElement.querySelector<HTMLElement>(
        `[data-ground="${ground.id}"]`
      );
      await expect(panel, `no ${ground.id} panel`).not.toBeNull();

      const selected = panel!.querySelector<HTMLElement>(
        '[role="option"][aria-selected="true"]'
      );
      const plain = panel!.querySelector<HTMLElement>(
        '[role="option"][aria-selected="false"]'
      );

      // Non-vacuity: querying the wrong panel, or a ListBox that rendered
      // without a selection, would otherwise make every assertion below pass by
      // finding nothing to check.
      await expect(
        selected,
        `no selected option on ${ground.id}`
      ).not.toBeNull();
      await expect(
        plain,
        `no unselected option on ${ground.id}`
      ).not.toBeNull();

      const restingSelected = measureFillOnGround(selected!, ground.solid);

      // The hover utility has to be live, or "selected wins" proves nothing.
      // It fires off RAC's `[data-hovered]`, not CSS `:hover` — `userEvent.hover`
      // dispatches pointer events, which set the attribute but never put the
      // element into the real `:hover` state. A perturbation written against
      // `:hover` is unreachable here and passes while proving nothing.
      await userEvent.hover(plain!);
      const hoveredPlain = measureFillOnGround(plain!, ground.solid);
      await expect(
        hoveredPlain,
        `hover paints nothing on an unselected row on ${ground.id} — the utility is not live, so this test cannot see a cascade winner`
      ).toBeGreaterThan(1.01);

      await userEvent.hover(selected!);
      const hoveredSelected = measureFillOnGround(selected!, ground.solid);

      // The invariant: the persistent state keeps the ground, whatever the
      // momentary one would have painted.
      await expect(
        hoveredSelected,
        `hovering the selected row on ${ground.id} moved it from ${restingSelected.toFixed(2)}:1 to ${hoveredSelected.toFixed(2)}:1 — a co-occurring hover must not repaint a selection`
      ).toBeCloseTo(restingSelected, 2);

      await expect(
        hoveredSelected,
        `hovered selected row on ${ground.id} measures ${hoveredSelected.toFixed(2)}:1, at or below the ${hoveredPlain.toFixed(2)}:1 of a merely-hovered row`
      ).toBeGreaterThan(hoveredPlain);
    }
  }
);

/* ------------------------------------------------------------------ *
 * Polarity inventory
 * ------------------------------------------------------------------ */

/**
 * Every neutral token, classified by what it is supposed to do when the ground
 * flips — and asserted against what it actually does.
 *
 * This exists because the restatement mechanism is opt-in per token with nothing
 * enforcing completeness. `ui-contrast` flips the five washes and `secondary`
 * because those were in DST-1590's scope; the tokens nobody thought about stayed
 * on their light-ground values and went quietly wrong on a dark one. `ring` is
 * the clearest case: charcoal-600 over `selected` measures 2.05:1 against the
 * 3:1 that WCAG 1.4.11 asks of a focus indicator.
 *
 * Only the *neutral* layer is listed. Status and access colors carry meaning
 * rather than hierarchy, so they are ground-independent by construction (R1).
 *
 * Adding a neutral token without classifying it here fails this test. That is
 * the point: the failure mode being closed is "add a token, forget a line".
 */
const POLARITY_INVENTORY = [
  /* --- Restated under ui-contrast. These must flip. --- */
  { token: '--color-muted', polarity: 'flips' },
  { token: '--color-hover', polarity: 'flips' },
  { token: '--color-selected', polarity: 'flips' },
  { token: '--color-focus-highlight', polarity: 'flips' },
  { token: '--color-focus-highlight-bold', polarity: 'flips' },
  { token: '--color-secondary', polarity: 'flips' },

  /* --- Ground-independent by design. --- */
  // Ground tokens: a contrast region *is* the ground, so nothing beneath it
  // reaches for these to describe where it sits.
  { token: '--color-background', polarity: 'stable' },
  { token: '--color-surface', polarity: 'stable' },
  { token: '--color-primary', polarity: 'stable' },
  { token: '--color-primary-foreground', polarity: 'stable' },
  // Deliberately not restated: `ui-soft` applies `text-foreground`, so flipping
  // it would put light text on a near-white cap. Components pinning it for
  // emphasis use `text-inherit`. Documented in ui.css.
  { token: '--color-foreground', polarity: 'stable' },
  // Opaque markers — the meaning layer, which R1 keeps opaque. Each is
  // deliberately light on any ground, so a dark ground needs no flip.
  { token: '--color-control', polarity: 'stable' },
  { token: '--color-soft', polarity: 'stable' },
  { token: '--color-soft-hover', polarity: 'stable' },
  { token: '--color-soft-edge', polarity: 'stable' },
  { token: '--color-soft-edge-hover', polarity: 'stable' },
  { token: '--color-border', polarity: 'stable' },
  { token: '--color-disabled', polarity: 'stable' },
  { token: '--color-disabled-border', polarity: 'stable' },
  { token: '--color-scrollbar', polarity: 'stable' },
  { token: '--color-destructive-bold-foreground', polarity: 'stable' },
  // Always painted over the page, never nested inside a contrast region.
  { token: '--color-overlay-backdrop', polarity: 'stable' },
  // Opaque near-white fill. Wrong on a dark ground, but `ui-state-disabled`
  // already exposes `--ui-disabled-fill` for exactly that, and ActionBar's
  // clearButton sets it to `transparent`. The escape hatch is the contract.
  { token: '--color-disabled-surface', polarity: 'stable' },

  /* --- Known gaps: ground-dependent, not restated. ---
   *
   * Each is measured against the contrast ground. They are listed rather than
   * fixed because flipping any of them changes rendered appearance on every
   * contrast surface, which is a design call with VRT consequences — not
   * something to slip into a token refactor. Moving one to `flips` is the fix.
   */
  // 2.05:1 over `selected`, 2.79:1 over `focus-highlight`, against the 3:1 of
  // WCAG 1.4.11.
  //
  // DST-1661 has landed `ui-state-focus-item`, so a full-opacity consumer now
  // exists — but neither of its two callers can reach this ground yet: a Menu
  // item renders inside a portalled Popover, and no theme component puts a
  // FileField in a contrast region. What *is* live is `ActionBar.container`,
  // whose bordered `ui-state-focus` flips this token at full opacity: 3.14:1
  // against its own ground. That passes 1.4.11 by 5%, and the lightest wash
  // (`b-50`) would already drop it to 2.99:1.
  //
  // Restating fixes it comfortably — charcoal-300 is 7.38:1 at its worst,
  // charcoal-500 still 3.10:1. DST-1662 migrating Sidebar/ListBox/Table onto
  // `ui-state-focus-item` is what makes it urgent rather than latent.
  { token: '--color-ring', polarity: 'gap' },
  // 2.04:1 on the bare ground, 1.33:1 on `selected`. No consumer nests under a
  // contrast surface today.
  { token: '--color-secondary-bold', polarity: 'gap' },
  // 3.14:1, and this one is text, so the floor is 4.5:1. No fields sit inside a
  // contrast region today.
  { token: '--color-placeholder', polarity: 'gap' },
  // Dark-base alphas: on a dark ground they darken what is already dark and
  // vanish. Cosmetic — a rim that recedes rather than an affordance that fails.
  { token: '--color-surface-border', polarity: 'gap' },
  { token: '--color-control-border', polarity: 'gap' },
  { token: '--color-control-border-on-control', polarity: 'gap' },
  // 1.00:1 — charcoal-900 on a charcoal-900 ground. A checked Checkbox or an ON
  // Switch inside a contrast region would be invisible.
  { token: '--color-selected-bold', polarity: 'gap' },
  { token: '--color-selected-bold-foreground', polarity: 'stable' },
  // 1.14:1. Live: ActionBar's toolbar is `overflow-x-auto`, so hovering its
  // scrollbar makes the thumb disappear into the bar.
  { token: '--color-scrollbar-hover', polarity: 'gap' },
] as const;

/**
 * Reads what a token actually paints, rather than comparing the declaration
 * text. Assigning `var(--token)` to a probe and reading back
 * `backgroundColor` hands resolution to the engine and returns a normalised
 * `rgb()/rgba()` string, so `oklch(from …)` chains and multi-hop `var()`
 * indirection both collapse to the colour that reaches the screen.
 */
const paintedValue = (probe: HTMLElement, token: string) => {
  probe.style.backgroundColor = '';
  probe.style.backgroundColor = `var(${token})`;
  return getComputedStyle(probe).backgroundColor;
};

/**
 * The polarity audit for the whole neutral layer.
 *
 * Rendered as swatches per ground so the flip is reviewable by eye, and asserted
 * below so it cannot regress silently.
 */
export const PolarityInventory = meta.story({
  tags: ['component-test'],
  render: () => (
    <Stack space="group">
      <Headline level="3">Polarity inventory</Headline>
      <Note>
        Every neutral token on all three grounds. A token that <em>flips</em> is
        restated by <code>ui-contrast</code>; one that is <em>stable</em> is
        ground-independent on purpose; a <em>gap</em> is ground-dependent and
        not restated yet. The accompanying test asserts each token behaves as
        classified, so a new token cannot join the theme unclassified.
      </Note>
      <Grounds>
        {() => (
          <div className="grid grid-cols-2 gap-1">
            <span data-token-probe className="hidden" />
            {POLARITY_INVENTORY.map(({ token, polarity: kind }) => (
              <span
                key={token}
                className="flex items-center gap-1.5 text-[10px]"
                title={`${token} — ${kind}`}
              >
                <span
                  data-swatch={token}
                  className="ring-border/40 size-4 shrink-0 rounded-sm ring-1"
                  style={{ backgroundColor: `var(${token})` }}
                />
                <span className="truncate opacity-70">
                  {token.replace('--color-', '')}
                </span>
              </span>
            ))}
          </div>
        )}
      </Grounds>
    </Stack>
  ),
});

PolarityInventory.test(
  'every neutral token behaves as its polarity classification says',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvasElement }) => {
    const probeIn = canvasElement.querySelector<HTMLElement>(
      '[data-ground="contrast"] [data-token-probe]'
    );
    const probeOut = canvasElement.querySelector<HTMLElement>(
      '[data-ground="surface"] [data-token-probe]'
    );

    await expect(probeIn, 'no probe inside the contrast ground').not.toBeNull();
    await expect(probeOut, 'no probe on the surface ground').not.toBeNull();

    for (const { token, polarity: kind } of POLARITY_INVENTORY) {
      const inside = paintedValue(probeIn!, token);
      const outside = paintedValue(probeOut!, token);

      // Non-vacuity: an unknown token resolves to the empty string and every
      // comparison below would compare '' with '' and pass. Matched loosely on
      // purpose — per CSS Color 4 a computed color keeps its authored color
      // space, so these come back as `oklch(...)` in Firefox rather than `rgb()`.
      await expect(
        outside,
        `${token} resolved to nothing on the surface ground — is it still a token?`
      ).toMatch(/^(rgb|rgba|oklch|oklab|hsl|color|#)/);

      if (kind === 'flips') {
        await expect(
          inside,
          `${token} is classified 'flips' but resolves to ${inside} on both grounds — ui-contrast is not restating it`
        ).not.toBe(outside);
      } else {
        await expect(
          inside,
          `${token} is classified '${kind}' but ui-contrast changed it from ${outside} to ${inside}. If that flip is intended, reclassify it as 'flips'`
        ).toBe(outside);
      }
    }
  }
);

PolarityInventory.test(
  'the inventory covers every neutral token the theme declares',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async () => {
    // The guard that makes the classification above complete rather than a
    // snapshot of what someone happened to think of. Walks the theme's own
    // custom properties and requires each neutral one to be classified.
    //
    // Neutral means "derives from the charcoal scale or from white" — the
    // hierarchy layer, which is the layer whose meaning inverts with the ground
    // (R1). Status and access colors are excluded because they carry meaning.
    const classified = new Set<string>(
      POLARITY_INVENTORY.map(entry => entry.token)
    );

    // Palette rungs, not semantic tokens. Tested by shape rather than by family
    // name because Tailwind v4 ships its own full default palette in `@theme`
    // (gray-*, zinc-*, stone-* …) alongside this theme's charcoal. Every
    // semantic token here is named by role and none ends in a digit.
    const PALETTE_RUNG = /-\d+$/;

    const declared = new Set<string>();

    // Recursive, because Tailwind v4 emits the theme inside `@layer theme`. A
    // flat walk over `sheet.cssRules` sees only the CSSLayerBlockRule and finds
    // nothing — which is what the non-vacuity assertion below exists to catch.
    const collect = (rules: CSSRuleList) => {
      for (const rule of Array.from(rules)) {
        if (rule instanceof CSSStyleRule) {
          // `:root` blocks only — a token restated inside a utility is a flip,
          // not a declaration.
          if (!rule.selectorText.includes(':root')) continue;
          for (const prop of Array.from(rule.style)) {
            if (!prop.startsWith('--color-')) continue;
            if (PALETTE_RUNG.test(prop)) continue;
            // Neutral-derived only: charcoal, white, or a bare oklch literal in
            // the neutral hue. Status and access tokens resolve to the chromatic
            // families and drop out here — they carry meaning, not hierarchy,
            // so they are ground-independent by construction (R1).
            const value = rule.style.getPropertyValue(prop);
            if (!/charcoal|--color-white|oklch\(/.test(value)) continue;
            declared.add(prop);
          }
          continue;
        }
        // @layer / @media / @supports and friends.
        const nested = (rule as CSSGroupingRule).cssRules as
          | CSSRuleList
          | undefined;
        if (nested) collect(nested);
      }
    };

    for (const sheet of Array.from(document.styleSheets)) {
      try {
        collect(sheet.cssRules);
      } catch {
        continue; // cross-origin sheet, nothing to read
      }
    }

    // Non-vacuity: if the sheet walk finds nothing, everything below passes.
    await expect(
      declared.size,
      'found no neutral token declarations to check — the stylesheet walk is broken, not the theme'
    ).toBeGreaterThan(20);

    const unclassified = Array.from(declared)
      .filter(token => !classified.has(token))
      .sort();

    await expect(
      unclassified,
      `these neutral tokens are not in POLARITY_INVENTORY: ${unclassified.join(', ')}. Decide whether each should flip under ui-contrast, then classify it.`
    ).toEqual([]);
  }
);

/* ------------------------------------------------------------------ *
 * The open decision
 * ------------------------------------------------------------------ */

/**
 * The one question in DST-1590 that measurement cannot settle, rendered both
 * ways so it can be decided by looking.
 *
 * `ui-state-disabled` currently *resets* the background to a flat neutral —
 * "this control is out of play". An alpha veil instead *preserves* whatever is
 * underneath at reduced strength. The veil is plainly right for a ghost button
 * on the ActionBar. It is much less obviously right for a disabled destructive
 * control, where a 5% veil leaves the alarm red at nearly full strength.
 *
 * The likely resolution is that these are two different tokens rather than one
 * contested one, but that is a design call.
 */
export const DisabledVeilVsReset = meta.story({
  render: () => (
    <Stack space="group">
      <Headline level="3">Disabled: veil or reset?</Headline>
      <Note>
        Reset flattens the control to a neutral fill; veil keeps its identity
        and drops its strength. Neither is universally right, which is the
        argument for splitting the token rather than picking a winner.
      </Note>
      <Grounds>
        {() => (
          <Stack space="related">
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="ui-surface ui-state-disabled px-3 py-4">
                reset
                <div className="opacity-60">today</div>
              </div>
              <div className="ui-surface text-disabled cursor-not-allowed px-3 py-4">
                <div className="bg-charcoal-a-100 rounded">
                  veil
                  <div className="opacity-60">a-100</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="ui-contrast-destructive ui-state-disabled px-3 py-4">
                reset
                <div className="opacity-60">destructive</div>
              </div>
              <div className="ui-contrast-destructive cursor-not-allowed px-3 py-4">
                <div className="bg-charcoal-a-100 rounded">
                  veil
                  <div className="opacity-60">destructive</div>
                </div>
              </div>
            </div>
          </Stack>
        )}
      </Grounds>
    </Stack>
  ),
});
