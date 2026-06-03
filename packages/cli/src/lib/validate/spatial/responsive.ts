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
  // True when the widest element is tabular content (a table/grid). WCAG 2.1.10
  // Reflow explicitly exempts content that needs two-dimensional layout, so a
  // wide data table is a softer finding than a fixed-width block.
  tabular: boolean;
};

export type ResponsiveSnapshot = {
  breakpoint: ResponsiveBreakpoint;
  horizontalScrollWidth: number;
  viewportWidth: number;
  touchTargets: TouchTargetIssue[];
  disappearedComponents: DisappearedComponent[];
  overflowCulprit: OverflowCulprit | null;
};

const BREAKPOINTS: ResponsiveBreakpoint[] = [
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
        const w = window as Window & {
          __cssPath?: (el: Element) => string;
          __describeEl?: (el: Element) => {
            component: string;
            fingerprint: string;
          };
        };
        const cssPath = w.__cssPath!;
        const describeEl = w.__describeEl!;

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
            // render path. display:none/visibility:hidden/aria-hidden/[hidden],
            // an ancestor hidden the same way, or a closed Disclosure
            // (aria-expanded="false") / inactive Tab panel (<details> not open)
            // all legitimately measure 0x0 and are NOT defects.
            const selfHidden =
              style.display === 'none' ||
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

        return {
          horizontalScrollWidth: scrollWidth,
          viewportWidth,
          touchTargets,
          disappearedComponents,
          overflowCulprit,
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

      // A wide data table is WCAG 2.1.10-exempt two-dimensional content, so it
      // is a warning (not a mobile error) and the fix is to let it scroll
      // inside a <Scrollable> rather than reflow it like a layout block.
      const tabular = snap.overflowCulprit?.tabular ?? false;
      issues.push({
        type: 'spatial',
        severity: tabular ? 'warning' : bp.width <= 375 ? 'error' : 'warning',
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

    if (bp.width <= 768 && snap.touchTargets.length > 0) {
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
        severity: 'error',
        source: 'responsive-checker',
        component: d.component,
        message: `Component <${d.component}> has zero dimensions at ${bp.label} (${bp.width}px viewport).`,
        suggestion:
          'If intentionally hidden at smaller viewports, use conditional rendering. If unintentional, check that the component has responsive sizing.',
        details: { breakpoint: bp.label, selector: d.selector },
      });
    }
  }

  return issues;
};
