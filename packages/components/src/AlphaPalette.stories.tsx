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
import { SegmentedControl } from './SegmentedControl/SegmentedControl';
import { Stack } from './Stack/Stack';

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

/**
 * Composite `fill` over `ground` the way the browser would, and return the
 * resulting 8-bit RGB.
 *
 * Painting both onto a 1x1 canvas hands the colour parsing, the colour-space
 * conversion and the source-over blend to the engine rather than
 * reimplementing any of the three here — which matters for `oklch()`, where a
 * hand-rolled conversion is exactly the kind of thing that looks right and is
 * quietly wrong.
 */
const composite = (ground: string, fill: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;

  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.fillStyle = ground;
  ctx.fillRect(0, 0, 1, 1);
  ctx.fillStyle = fill;
  ctx.fillRect(0, 0, 1, 1);

  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r!, g!, b!] as const;
};

type Rgb = readonly [number, number, number];

/** WCAG 2.1 relative luminance. */
const luminance = ([r, g, b]: Rgb) => {
  const [rl, gl, bl] = [r, g, b].map(channel => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rl! + 0.7152 * gl! + 0.0722 * bl!;
};

/** WCAG 2.1 contrast ratio between two composited colours. */
const contrastRatio = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
};

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
 * without its hover feedback — so hover has no ratio floor. Focus does (2.4.11,
 * 3:1), but no wash can serve as a focus indicator: reaching 3:1 needs
 * α ≈ 0.435 on white, over twice the R5 budget and darker than `selected`.
 * Focus indication belongs to `ui-state-focus`, not to this ramp.
 */
const WCAG = { TEXT: 4.5, MARKER: 3 } as const;

/** Contrast of an element's own text against its own composited fill. */
const measureTextOnFill = (element: HTMLElement, groundToken: string) => {
  const ground = readToken(groundToken);
  const { backgroundColor, color } = getComputedStyle(element);
  const fill = composite(ground, backgroundColor);

  return contrastRatio(composite(`rgb(${fill.join(',')})`, color), fill);
};

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
        Two washes on one element composite to a third value that belongs to no
        step of the ramp. <code>hover</code> twice measures 1.60:1 on the light
        grounds and 1.66:1 here, past <code>selected</code>&rsquo;s 1.52:1 top
        rung; <code>hover</code> over an actually-selected row reaches 1.91:1, a
        quarter beyond it. Co-occurring states need an explicit combined token,
        not two fills, and the trap is overlapping siblings as much as nesting.
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
      composite(
        typeof below === 'string' ? below : `rgb(${below.join(',')})`,
        layer
      ),
    ground
  );

  return contrastRatio(stacked as Rgb, composite(ground, 'transparent'));
};

Stacking.test(
  'a stacked wash overshoots the top rung, which is why R6 forbids it',
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
