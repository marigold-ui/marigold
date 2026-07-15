import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

type ResponsiveBreakpoint = {
  label: string;
  width: number;
  height: number;
};

type TouchTargetIssue = {
  selector: string;
  component: string;
  role: string;
  width: number;
  height: number;
};

type DisappearedComponent = {
  selector: string;
  component: string;
  // Visibility state captured at extraction time so the pure builder can decide
  // whether a 0x0 measurement is a genuine collapse or a legitimately
  // not-rendered element (display:none, hidden Disclosure, inactive Tab panel).
  hiddenByCss: boolean;
};

type OverflowCulprit = {
  component: string;
  selector: string;
  right: number;
  accessibleName: string;
  // True when the widest element is tabular content (a table/grid). WCAG 1.4.10
  // Reflow explicitly exempts content that needs two-dimensional layout, so a
  // wide data table is a softer finding than a fixed-width block.
  tabular: boolean;
};

// A visible element's horizontal box at one breakpoint, keyed by a stable
// cssPath. Used only to measure reflow between breakpoints — transient, never
// persisted in the report.
export type LayoutBox = { selector: string; x: number; width: number };

export type ResponsiveSnapshot = {
  breakpoint: ResponsiveBreakpoint;
  horizontalScrollWidth: number;
  viewportWidth: number;
  touchTargets: TouchTargetIssue[];
  disappearedComponents: DisappearedComponent[];
  overflowCulprit: OverflowCulprit | null;
  // Optional: always set by the extractor; absent in hand-built test snapshots,
  // in which case the reflow metric simply does not run.
  layout?: LayoutBox[];
};

const BREAKPOINTS: ResponsiveBreakpoint[] = [
  // 320 CSS px is the canonical WCAG 1.4.10 Reflow condition (equivalent to a
  // 1280px viewport at 400% zoom). Content must not require horizontal
  // scrolling here; checking it catches reflow failures the wider breakpoints
  // miss.
  { label: 'reflow (320px)', width: 320, height: 640 },
  { label: 'mobile', width: 375, height: 812 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1280, height: 720 },
];

// WCAG 2.5.8 Target Size (Minimum), Level AA: 24x24 CSS px. (The 44x44 value
// belongs to 2.5.5 Target Size (Enhanced), Level AAA — not what is cited here.)
const MIN_TOUCH_TARGET_PX = 24;

// A vertical scrollbar narrows the content area while window.innerWidth still
// counts the full width, so elements sized to the viewport overflow by roughly
// the scrollbar width. Tolerate that to avoid flagging this rendering artifact;
// genuine overflow is materially larger.
const SCROLLBAR_TOLERANCE_PX = 17;

// WCAG 2.5.8 spacing exception is geometric: each target gets a 24px-diameter
// circle and the exception applies when those circles do not overlap. For
// axis-aligned rects that means the EDGE-to-edge gap (not the centre-to-centre
// distance, which counts each target's own radius and so over-reports
// crowding) must be at least the required clearance. Gap is 0 when the rects
// touch or overlap.
export const edgeGap = (
  a: { left: number; right: number; top: number; bottom: number },
  b: { left: number; right: number; top: number; bottom: number }
): number => {
  const gapX = Math.max(0, a.left - b.right, b.left - a.right);
  const gapY = Math.max(0, a.top - b.bottom, b.top - a.bottom);
  return Math.hypot(gapX, gapY);
};

// A 0x0 measurement is only a genuine "disappeared" defect when the element is
// in the visible render path. display:none / visibility:hidden / aria-hidden /
// the hidden attribute / a collapsed Disclosure or inactive Tab panel all
// legitimately measure 0x0 in Marigold and must not be flagged.
export const isGenuineDisappearance = (d: DisappearedComponent): boolean =>
  !d.hiddenByCss;

const DESKTOP_WIDTH = 1280;

export type WidthUtilizationOptions = {
  /** Min. content elements for the metric to run (skips trivial layouts). */
  minElements?: number;
  /** Elements at/above this fraction of the viewport are full-bleed wrappers
   *  (body / shell / full-width sections) and are excluded — they are always
   *  ~100% wide and would mask a narrow content band. */
  fullBleedFraction?: number;
  /** utilization at/below which the content is flagged as not using the width. */
  lowThreshold?: number;
};

export type WidthUtilizationResult = {
  ran: boolean; // false = gated out (no/too-few content elements)
  contentElements: number;
  utilization: number; // 0..1 — fraction of viewport width COVERED by content
  warning: boolean; // utilization <= lowThreshold on a non-trivial layout
};

// Measures how much of the DESKTOP viewport width the page's content actually
// covers, from a single 1280px snapshot. This directly targets the "stuck in
// mobile shape on desktop" defect: content crammed into a narrow band with
// large empty horizontal space.
//
// Full-bleed wrappers (>= fullBleedFraction of the viewport — body, the shell,
// full-width sections) are excluded; they are always ~100% wide and would mask
// a narrow content band. Over the remaining content boxes we compute the UNION
// of their horizontal [x, x+width] intervals (not the min..max extent), so a
// single outlier near the right edge — e.g. a right-aligned header button —
// cannot make a page with an empty middle look full-width. utilization = total
// covered width / viewport width.
//
// Empirically this separates cleanly: a "stuck" layout covers ~0.34, a layout
// that uses the width covers ~1.00.
//
// CAVEAT (thesis): the threshold is a judgement call and an intentionally
// centred narrow max-width column (a login form, a reading column) legitimately
// scores low — so treat this as a RELATIVE signal between configs and a soft
// warning, not an absolute defect. Single-snapshot, so unaffected by responsive
// DOM changes between breakpoints.
export const computeWidthUtilization = (
  desktop: LayoutBox[],
  desktopViewportWidth: number,
  options: WidthUtilizationOptions = {}
): WidthUtilizationResult => {
  const {
    minElements = 8,
    fullBleedFraction = 0.95,
    lowThreshold = 0.6,
  } = options;

  const vw = desktopViewportWidth > 0 ? desktopViewportWidth : DESKTOP_WIDTH;
  const content = desktop.filter(
    b => b.width > 0 && b.width < vw * fullBleedFraction
  );

  if (content.length < minElements) {
    return {
      ran: false,
      contentElements: content.length,
      utilization: 0,
      warning: false,
    };
  }

  // Union the horizontal intervals so overlapping/empty regions are counted
  // once and gaps are not counted at all.
  const intervals = content
    .map(b => [Math.max(0, b.x), Math.min(vw, b.x + b.width)] as const)
    .filter(([l, r]) => r > l)
    .sort((a, b) => a[0] - b[0]);

  let covered = 0;
  let curL = -1;
  let curR = -1;
  for (const [l, r] of intervals) {
    if (l > curR) {
      if (curR > curL) covered += curR - curL;
      curL = l;
      curR = r;
    } else if (r > curR) {
      curR = r;
    }
  }
  if (curR > curL) covered += curR - curL;

  const utilization = covered / vw;
  return {
    ran: true,
    contentElements: content.length,
    utilization,
    warning: utilization <= lowThreshold,
  };
};

// Picks the desktop (1280px) snapshot and runs computeWidthUtilization.
// Returns null when the desktop breakpoint is missing.
export const widthUtilizationFromSnapshots = (
  snapshots: ResponsiveSnapshot[],
  options: WidthUtilizationOptions = {}
): WidthUtilizationResult | null => {
  const desktop = snapshots.find(s => s.breakpoint.width === DESKTOP_WIDTH);
  if (!desktop) return null;
  return computeWidthUtilization(
    desktop.layout ?? [],
    desktop.viewportWidth,
    options
  );
};

const INTERACTIVE_SELECTOR = [
  'button',
  'a[href]',
  'input:not([type="hidden"])',
  'select',
  'textarea',
  '[role="button"]',
  '[role="link"]',
  '[role="checkbox"]',
  '[role="radio"]',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="switch"]',
].join(', ');

const extractSnapshot = async (
  page: Page,
  bp: ResponsiveBreakpoint
): Promise<ResponsiveSnapshot> =>
  page
    .evaluate(
      ({ interactiveSelector, minTouch }) => {
        const mv = (
          window as unknown as {
            __mv: Record<string, (...args: unknown[]) => unknown>;
          }
        ).__mv;
        const cssPath = mv.cssPath as (el: Element) => string;
        const describeEl = mv.describeEl as (el: Element) => {
          component: string;
          fingerprint: string;
        };

        const scrollWidth = document.documentElement.scrollWidth;
        const viewportWidth = window.innerWidth;

        // Name the element that extends furthest past the right edge so the
        // overflow finding points at a concrete culprit, not just a delta.
        let overflowCulprit: {
          component: string;
          selector: string;
          right: number;
          accessibleName: string;
          tabular: boolean;
        } | null = null;
        if (scrollWidth > viewportWidth + 1) {
          let maxRight = viewportWidth;
          for (const el of document.querySelectorAll('body *')) {
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;
            if (Math.round(rect.right) > Math.round(maxRight)) {
              maxRight = rect.right;
              const d = describeEl(el);
              overflowCulprit = {
                component: d.component,
                selector: cssPath(el),
                right: Math.round(rect.right),
                accessibleName: d.fingerprint,
                tabular:
                  el.closest('table, [role="grid"], [role="table"]') !== null,
              };
            }
          }
        }

        // Collect interactive targets first so the WCAG 2.5.8 spacing exception
        // can be evaluated against neighbouring targets.
        const targets: Array<{
          el: Element;
          rect: DOMRect;
        }> = [];
        for (const el of document.querySelectorAll(interactiveSelector)) {
          const style = window.getComputedStyle(el);
          if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            el.getAttribute('aria-hidden') === 'true' ||
            el.hasAttribute('disabled')
          )
            continue;

          // WCAG 2.5.8 exempts inline targets whose size is constrained by the
          // line-height of surrounding text — links within a sentence,
          // breadcrumb and navigation text links. These render as display:inline;
          // standalone controls (buttons) use inline-flex/-block and stay checked.
          if (style.display === 'inline') continue;

          const rect = el.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) continue;
          targets.push({ el, rect });
        }

        const touchTargets: TouchTargetIssue[] = [];
        for (const t of targets) {
          if (t.rect.width >= minTouch && t.rect.height >= minTouch) continue;

          // WCAG 2.5.8 spacing exception: an undersized target passes when its
          // 24px clearance circle does not reach the nearest other target,
          // measured as the EDGE-to-edge gap between the two rects (0 when they
          // touch/overlap). Edge gap is the correct geometry — centre distance
          // would count each target's own radius and over-report crowding.
          let nearestGap = Infinity;
          for (const o of targets) {
            if (o === t) continue;
            // Edge-to-edge gap, inlined from the exported `edgeGap` helper
            // (the tested source of truth — evaluate() cannot import module
            // scope). Keep this block in sync with edgeGap above.
            const gapX = Math.max(
              0,
              t.rect.left - o.rect.right,
              o.rect.left - t.rect.right
            );
            const gapY = Math.max(
              0,
              t.rect.top - o.rect.bottom,
              o.rect.top - t.rect.bottom
            );
            const gap = Math.hypot(gapX, gapY);
            if (gap < nearestGap) nearestGap = gap;
          }
          if (nearestGap >= minTouch) continue;

          touchTargets.push({
            selector: cssPath(t.el),
            component:
              t.el.getAttribute('data-component') ??
              t.el.getAttribute('data-slot') ??
              t.el.tagName.toLowerCase(),
            role: t.el.getAttribute('role') ?? t.el.tagName.toLowerCase(),
            width: Math.round(t.rect.width),
            height: Math.round(t.rect.height),
          });
        }

        const disappearedComponents: DisappearedComponent[] = [];
        for (const el of document.querySelectorAll(
          '[data-rac], [data-slot], [data-component]'
        )) {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed') continue;

          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) {
            // A 0x0 element is only a genuine collapse when it is in the visible
            // render path. display:none/contents/visibility:hidden/aria-hidden/
            // [hidden], an ancestor hidden the same way, or a closed Disclosure
            // (aria-expanded="false") / inactive Tab panel (<details> not open)
            // all legitimately measure 0x0 and are NOT defects. `display:
            // contents` generates no box by design (a pass-through/slot
            // wrapper) — it isn't "hidden" but is equally not a collapse.
            const selfHidden =
              style.display === 'none' ||
              style.display === 'contents' ||
              style.visibility === 'hidden' ||
              el.getAttribute('aria-hidden') === 'true' ||
              el.hasAttribute('hidden');
            const ancestorHidden =
              el.closest('[hidden]') !== null ||
              el.closest('[aria-hidden="true"]') !== null;
            const collapsedDisclosure =
              el.closest('[aria-expanded="false"]') !== null ||
              el.closest('details:not([open])') !== null;
            const hiddenByCss =
              selfHidden || ancestorHidden || collapsedDisclosure;

            disappearedComponents.push({
              selector: cssPath(el),
              component:
                el.getAttribute('data-component') ??
                el.getAttribute('data-slot') ??
                el.tagName.toLowerCase(),
              hiddenByCss,
            });
          }
        }

        // Per-element horizontal layout map for the width-utilisation metric.
        // Same DOM at
        // every breakpoint, so cssPath keys match across snapshots. Only visible
        // boxes; x + width are enough to detect whether the layout adapts.
        const layout: Array<{ selector: string; x: number; width: number }> =
          [];
        for (const el of document.querySelectorAll('body *')) {
          const s = window.getComputedStyle(el);
          if (s.display === 'none' || s.visibility === 'hidden') continue;
          const r = el.getBoundingClientRect();
          if (r.width <= 0 || r.height <= 0) continue;
          layout.push({
            selector: cssPath(el),
            x: Math.round(r.left),
            width: Math.round(r.width),
          });
        }

        return {
          horizontalScrollWidth: scrollWidth,
          viewportWidth,
          touchTargets,
          disappearedComponents,
          overflowCulprit,
          layout,
        };
      },
      {
        interactiveSelector: INTERACTIVE_SELECTOR,
        minTouch: MIN_TOUCH_TARGET_PX,
      }
    )
    .then(data => ({ ...data, breakpoint: bp }));

export const extractResponsiveSnapshots = async (
  page: Page,
  breakpoints: ResponsiveBreakpoint[] = BREAKPOINTS
): Promise<ResponsiveSnapshot[]> => {
  const original = page.viewportSize();
  const snapshots: ResponsiveSnapshot[] = [];

  try {
    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.evaluate(
        () =>
          new Promise<void>(r =>
            requestAnimationFrame(() => requestAnimationFrame(() => r()))
          )
      );
      snapshots.push(await extractSnapshot(page, bp));
    }
  } finally {
    if (original) {
      await page.setViewportSize(original);
    }
  }

  return snapshots;
};

export const responsiveToValidationIssues = (
  snapshots: ResponsiveSnapshot[]
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  for (const snap of snapshots) {
    const { breakpoint: bp } = snap;

    if (
      snap.horizontalScrollWidth >
      snap.viewportWidth + SCROLLBAR_TOLERANCE_PX
    ) {
      const delta = snap.horizontalScrollWidth - snap.viewportWidth;
      const culprit = snap.overflowCulprit
        ? ` Widest element: <${snap.overflowCulprit.component}>${
            snap.overflowCulprit.accessibleName
              ? ` (“${snap.overflowCulprit.accessibleName}”)`
              : ''
          } extends to ${snap.overflowCulprit.right}px.`
        : '';

      // Warning at every breakpoint: overflow is a runtime measurement gated by
      // a scrollbar tolerance, and WCAG 1.4.10 Reflow is Level AA — not a
      // deterministic, false-positive-free Level-A violation. (A wide data table
      // is additionally 1.4.10-exempt 2D content; the fix there is a
      // <Scrollable>.) See severity policy.
      const tabular = snap.overflowCulprit?.tabular ?? false;
      issues.push({
        type: 'spatial',
        severity: 'warning',
        source: 'responsive-checker',
        component: snap.overflowCulprit?.component ?? 'viewport',
        message: `Content overflows viewport at ${bp.label} (${bp.width}px): scroll width ${snap.horizontalScrollWidth}px exceeds viewport by ${delta}px.${culprit}`,
        suggestion: tabular
          ? 'Tabular content needs a 2D layout and is exempt from reflow, but it should not widen the whole page. Wrap the table in <Scrollable> so it scrolls horizontally on its own.'
          : 'Avoid fixed-width elements wider than the viewport. Use relative units or Marigold responsive layout components like <Columns collapseAt="...">.',
        details: {
          breakpoint: bp.label,
          scrollWidth: snap.horizontalScrollWidth,
          viewportWidth: snap.viewportWidth,
          ...(snap.overflowCulprit
            ? {
                culprit: snap.overflowCulprit.component,
                culpritSelector: snap.overflowCulprit.selector,
                tabular,
              }
            : {}),
        },
      });
    }

    // Target size is a CSS-px property, so the same undersized control would be
    // reported once per breakpoint. Assess it only on the mobile pass (the most
    // touch-relevant viewport) so the 320 reflow pass and the 768 tablet pass do
    // not duplicate the finding.
    if (bp.label === 'mobile' && snap.touchTargets.length > 0) {
      const byTag = new Map<
        string,
        { count: number; minW: number; minH: number }
      >();
      for (const t of snap.touchTargets) {
        const tag = t.role || t.component;
        const existing = byTag.get(tag);
        if (existing) {
          existing.count++;
          existing.minW = Math.min(existing.minW, t.width);
          existing.minH = Math.min(existing.minH, t.height);
        } else {
          byTag.set(tag, { count: 1, minW: t.width, minH: t.height });
        }
      }

      for (const [tag, info] of byTag) {
        const countText = info.count > 1 ? ` (${info.count} instances)` : '';
        issues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'responsive-checker',
          component: tag,
          message: `Touch target too small at ${bp.label} (${bp.width}px): ${tag} elements are ${info.minW}x${info.minH}px${countText} (minimum ${MIN_TOUCH_TARGET_PX}x${MIN_TOUCH_TARGET_PX}px per WCAG 2.5.8).`,
          suggestion:
            'Increase the clickable area. Marigold interactive components have built-in minimum sizes — check if custom styling reduces the target.',
          details: {
            breakpoint: bp.label,
            tag,
            count: info.count,
            minWidth: info.minW,
            minHeight: info.minH,
          },
        });
      }
    }

    for (const d of snap.disappearedComponents) {
      if (!isGenuineDisappearance(d)) continue;
      issues.push({
        type: 'spatial',
        // Warning, not error: a 0x0 measurement is a runtime heuristic with
        // legitimate causes (CSS/display states) that the visibility guard only
        // mostly excludes — not a false-positive-free violation. Severity policy.
        severity: 'warning',
        source: 'responsive-checker',
        component: d.component,
        message: `Component <${d.component}> has zero dimensions at ${bp.label} (${bp.width}px viewport).`,
        suggestion:
          'If intentionally hidden at smaller viewports, use conditional rendering. If unintentional, check that the component has responsive sizing.',
        details: { breakpoint: bp.label, selector: d.selector },
      });
    }
  }

  // Desktop width utilisation: if the page's content occupies only a narrow
  // band of a wide viewport, it is "stuck in mobile shape" and does not use the
  // available width. Warning only — see computeWidthUtilization for the
  // measurement and its FP caveats.
  const util = widthUtilizationFromSnapshots(snapshots);
  if (util?.ran && util.warning) {
    const pct = Math.round(util.utilization * 100);
    issues.push({
      type: 'spatial',
      severity: 'warning',
      source: 'responsive-checker',
      component: 'page',
      message: `Content uses only ${pct}% of the desktop width (${DESKTOP_WIDTH}px): it stays in a narrow, mobile-shaped band instead of adapting to the available space.`,
      suggestion:
        'Let the layout grow with the viewport using Marigold responsive primitives — <Columns collapseAt="..."> for multi-column areas, AppShell for the shell, Stack/Inline for flow — instead of a fixed-width container. (Intentionally centred max-width reading columns are fine and may trip this; treat it as a relative signal.)',
      details: {
        widthUtilization: util.utilization,
        contentElements: util.contentElements,
      },
    });
  }

  return issues;
};
