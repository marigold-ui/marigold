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
  // Captured at extraction time so the pure builder can tell a genuine collapse
  // from a legitimately not-rendered element (display:none, inactive Tab).
  hiddenByCss: boolean;
};

type OverflowCulprit = {
  component: string;
  selector: string;
  right: number;
  accessibleName: string;
  // WCAG 1.4.10 Reflow exempts content needing two-dimensional layout, so a
  // wide data table is a softer finding than a fixed-width block.
  tabular: boolean;
};

// A visible element's horizontal box at one breakpoint. Used only to measure
// reflow between breakpoints — never persisted in the report.
export type LayoutBox = { selector: string; x: number; width: number };

export type ResponsiveSnapshot = {
  breakpoint: ResponsiveBreakpoint;
  horizontalScrollWidth: number;
  viewportWidth: number;
  touchTargets: TouchTargetIssue[];
  disappearedComponents: DisappearedComponent[];
  overflowCulprit: OverflowCulprit | null;
  // Always set by the extractor; absent in hand-built test snapshots, where the
  // reflow metric then simply does not run.
  layout?: LayoutBox[];
};

const BREAKPOINTS: ResponsiveBreakpoint[] = [
  // The canonical WCAG 1.4.10 Reflow condition (1280px at 400% zoom): content
  // must not require horizontal scrolling here.
  { label: 'reflow (320px)', width: 320, height: 640 },
  { label: 'mobile', width: 375, height: 812 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1280, height: 720 },
];

// WCAG 2.5.8 Target Size (Minimum), Level AA: 24x24 CSS px. (The 44x44 value
// belongs to 2.5.5 Target Size (Enhanced), Level AAA — not what is cited here.)
const MIN_TOUCH_TARGET_PX = 24;

// A vertical scrollbar narrows the content area while window.innerWidth still
// counts the full width, so viewport-sized elements overflow by about the
// scrollbar width. Genuine overflow is materially larger than this.
const SCROLLBAR_TOLERANCE_PX = 17;

// WCAG 2.5.8's spacing exception is geometric: each target gets a 24px-diameter
// circle and the exception applies when they don't overlap. For axis-aligned
// rects that is the EDGE-to-edge gap — centre-to-centre would count each
// target's own radius and over-report crowding. 0 when the rects touch.
export const edgeGap = (
  a: { left: number; right: number; top: number; bottom: number },
  b: { left: number; right: number; top: number; bottom: number }
): number => {
  const gapX = Math.max(0, a.left - b.right, b.left - a.right);
  const gapY = Math.max(0, a.top - b.bottom, b.top - a.bottom);
  return Math.hypot(gapX, gapY);
};

// A 0x0 measurement is only a defect when the element is in the visible render
// path: display:none, aria-hidden, a collapsed Disclosure or an inactive Tab
// panel all legitimately measure 0x0 in Marigold.
export const isGenuineDisappearance = (d: DisappearedComponent): boolean =>
  !d.hiddenByCss;

const DESKTOP_WIDTH = 1280;

export type WidthUtilizationOptions = {
  /** Min. content elements for the metric to run (skips trivial layouts). */
  minElements?: number;
  /** Elements at/above this fraction of the viewport are full-bleed wrappers
   *  and are excluded — always ~100% wide, they'd mask a narrow content band. */
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

// How much of the desktop viewport width the content covers, from a single
// 1280px snapshot. Targets the "stuck in mobile shape on desktop" defect.
//
// Full-bleed wrappers are excluded (see fullBleedFraction). Over the remaining
// boxes this unions the horizontal [x, x+width] intervals rather than taking
// the min..max extent, so one right-aligned outlier cannot make a page with an
// empty middle look full-width. Empirically a "stuck" layout covers ~0.34, a
// healthy one ~1.00.
//
// The threshold is a judgement call and an intentionally centred narrow column
// legitimately scores low, so treat it as a relative signal and a soft warning.
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

          // WCAG 2.5.8 exempts inline targets sized by the surrounding text's
          // line-height. Standalone controls use inline-flex/-block and stay
          // checked.
          if (style.display === 'inline') continue;

          const rect = el.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0) continue;
          targets.push({ el, rect });
        }

        const touchTargets: TouchTargetIssue[] = [];
        for (const t of targets) {
          if (t.rect.width >= minTouch && t.rect.height >= minTouch) continue;

          // WCAG 2.5.8 spacing exception: an undersized target passes when its
          // 24px clearance circle doesn't reach the nearest other target.
          let nearestGap = Infinity;
          for (const o of targets) {
            if (o === t) continue;
            // Inlined from the exported `edgeGap` (the tested source of truth)
            // because evaluate() cannot import module scope. Keep in sync.
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
            // Only a genuine collapse when the element is in the visible render
            // path: self- or ancestor-hidden elements and closed Disclosures
            // legitimately measure 0x0. `display: contents` generates no box by
            // design (a slot wrapper) — not hidden, but not a collapse either.
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

        // Horizontal layout map for the width-utilisation metric. The DOM is
        // the same at every breakpoint, so cssPath keys match across snapshots.
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

      // Runtime measurement with a scrollbar tolerance; 1.4.10 is AA. Policy.
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

    // Target size is a CSS-px property, so the same control would be reported
    // once per breakpoint. Assess it only on the most touch-relevant viewport.
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
        // The visibility guard only mostly excludes legit 0x0. Policy.
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

  // Content in a narrow band of a wide viewport is "stuck in mobile shape".
  // See computeWidthUtilization for the measurement and its caveats.
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
