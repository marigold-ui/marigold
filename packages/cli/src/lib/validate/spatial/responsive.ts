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
};

export type ResponsiveSnapshot = {
  breakpoint: ResponsiveBreakpoint;
  horizontalScrollWidth: number;
  viewportWidth: number;
  touchTargets: TouchTargetIssue[];
  disappearedComponents: DisappearedComponent[];
};

const BREAKPOINTS: ResponsiveBreakpoint[] = [
  { label: 'mobile', width: 375, height: 812 },
  { label: 'tablet', width: 768, height: 1024 },
  { label: 'desktop', width: 1280, height: 720 },
];

const MIN_TOUCH_TARGET_PX = 44;

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
        const w = window as Window & { __cssPath?: (el: Element) => string };
        const cssPath = w.__cssPath!;

        const scrollWidth = document.documentElement.scrollWidth;
        const viewportWidth = window.innerWidth;

        const touchTargets: TouchTargetIssue[] = [];
        for (const el of document.querySelectorAll(interactiveSelector)) {
          const style = window.getComputedStyle(el);
          if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            el.getAttribute('aria-hidden') === 'true' ||
            el.hasAttribute('disabled')
          )
            continue;

          const rect = el.getBoundingClientRect();
          if (
            rect.width > 0 &&
            rect.height > 0 &&
            (rect.width < minTouch || rect.height < minTouch)
          ) {
            touchTargets.push({
              selector: cssPath(el),
              component:
                el.getAttribute('data-component') ??
                el.getAttribute('data-slot') ??
                el.tagName.toLowerCase(),
              role: el.getAttribute('role') ?? el.tagName.toLowerCase(),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
            });
          }
        }

        const disappearedComponents: DisappearedComponent[] = [];
        for (const el of document.querySelectorAll(
          '[data-rac], [data-slot], [data-component]'
        )) {
          const style = window.getComputedStyle(el);
          if (style.position === 'fixed') continue;

          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) {
            disappearedComponents.push({
              selector: cssPath(el),
              component:
                el.getAttribute('data-component') ??
                el.getAttribute('data-slot') ??
                el.tagName.toLowerCase(),
            });
          }
        }

        return {
          horizontalScrollWidth: scrollWidth,
          viewportWidth,
          touchTargets,
          disappearedComponents,
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

    if (snap.horizontalScrollWidth > snap.viewportWidth + 1) {
      const delta = snap.horizontalScrollWidth - snap.viewportWidth;
      issues.push({
        type: 'spatial',
        severity: bp.width <= 375 ? 'error' : 'warning',
        source: 'responsive-checker',
        component: 'viewport',
        message: `Content overflows viewport at ${bp.label} (${bp.width}px): scroll width ${snap.horizontalScrollWidth}px exceeds viewport by ${delta}px.`,
        suggestion:
          'Avoid fixed-width elements wider than the viewport. Use relative units or Marigold responsive layout components like <Columns collapseAt="...">.',
        details: {
          breakpoint: bp.label,
          scrollWidth: snap.horizontalScrollWidth,
          viewportWidth: snap.viewportWidth,
        },
      });
    }

    if (bp.width <= 768) {
      for (const t of snap.touchTargets) {
        issues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'responsive-checker',
          component: t.component,
          message: `Touch target too small at ${bp.label} (${bp.width}px): ${t.component} is ${t.width}x${t.height}px (minimum ${MIN_TOUCH_TARGET_PX}x${MIN_TOUCH_TARGET_PX}px per WCAG 2.5.8).`,
          suggestion:
            'Increase the clickable area. Marigold interactive components have built-in minimum sizes — check if custom styling reduces the target.',
          details: { breakpoint: bp.label, ...t },
        });
      }
    }

    for (const d of snap.disappearedComponents) {
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
