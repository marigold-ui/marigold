import type { ElementHandle, Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

/**
 * WCAG 1.4.13 Content on Hover or Focus (AA).
 *
 * When hovering or focusing an element reveals additional content (a tooltip /
 * popover), that content must be: dismissable (Escape hides it without moving
 * pointer/focus), hoverable (the pointer can move onto it without it
 * vanishing), and persistent (it does not disappear on its own while the
 * trigger is still hovered/focused).
 *
 * No public tool tests these three behaviours by simulation — axe and the ACT
 * registry have no rule, and IBM Equal Access's `style_hover_persistent` is
 * static CSS parsing that never opens anything. The nearest neighbour to cite,
 * not claim. This drives the interaction for real.
 *
 * FP-safe by construction: a behaviour is only reported as failing when it was
 * actually observed to fail; anything indeterminate defaults to "passes" so a
 * timing race never invents a violation.
 */

export type HoverFocusObservation = {
  triggerSelector: string;
  triggerComponent: string;
  /** Did focus/hover actually reveal the described content? Only then is 1.4.13
   *  applicable and the three behaviours assessed. */
  revealed: boolean;
  dismissable: boolean;
  hoverable: boolean;
  persistent: boolean;
};

export const contentOnHoverFocusIssues = (
  observations: HoverFocusObservation[]
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  for (const o of observations) {
    if (!o.revealed) continue;
    const fails: string[] = [];
    if (!o.dismissable) {
      fails.push('cannot be dismissed with the Escape key');
    }
    if (!o.hoverable) {
      fails.push('disappears when the pointer is moved onto it');
    }
    if (!o.persistent) {
      fails.push('disappears on its own while the trigger is still active');
    }
    if (fails.length === 0) continue;

    issues.push({
      type: 'a11y',
      severity: 'warning',
      source: 'content-on-hover-focus',
      component: o.triggerComponent,
      message: `Content revealed on hover/focus of <${o.triggerComponent}> ${fails.join(
        ' and '
      )} (WCAG 1.4.13).`,
      suggestion:
        'Use a Marigold Tooltip/Popover, which is dismissable, hoverable and persistent by default. For custom overlays, handle the Escape key, keep the content reachable by the pointer, and do not auto-hide it while the trigger is hovered or focused.',
      details: {
        selector: o.triggerSelector,
        dismissable: o.dismissable,
        hoverable: o.hoverable,
        persistent: o.persistent,
      },
    });
  }
  return issues;
};

const waitFrames = (page: Page): Promise<void> =>
  page.evaluate(
    () =>
      new Promise<void>(r =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      )
  );

const isVisible = (page: Page, selector: string): Promise<boolean> =>
  page
    .evaluate(sel => {
      const mv = (
        window as unknown as {
          __mv: Record<string, (...args: unknown[]) => unknown>;
        }
      ).__mv;
      const isHidden = mv.isHidden as (el: Element) => boolean;
      const el = document.querySelector(sel);
      if (!el) return false;
      if (isHidden(el)) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    }, selector)
    .catch(() => false);

type Candidate = { trigger: string; component: string; tooltip: string };

const discoverHoverFocusCandidates = (page: Page): Promise<Candidate[]> =>
  page.evaluate(() => {
    const mv = (
      window as unknown as {
        __mv: Record<string, (...args: unknown[]) => unknown>;
      }
    ).__mv;
    const cssPath = mv.cssPath as (el: Element) => string;
    const isHidden = mv.isHidden as (el: Element) => boolean;

    const out: Candidate[] = [];
    for (const el of document.querySelectorAll('[aria-describedby]')) {
      const ids = (el.getAttribute('aria-describedby') ?? '').split(/\s+/);
      let tooltip: Element | null = null;
      for (const id of ids) {
        if (!id) continue;
        const t = document.getElementById(id);
        if (!t) continue;
        // 1.4.13 only applies to content that APPEARS on hover/focus: a target
        // that is a tooltip, or one that is currently hidden (so it must be
        // revealed). An always-visible description (help text) is out of scope.
        if (t.getAttribute('role') === 'tooltip' || isHidden(t)) {
          tooltip = t;
          break;
        }
      }
      if (!tooltip) continue;
      out.push({
        trigger: cssPath(el),
        component:
          el.getAttribute('data-component') ??
          el.getAttribute('data-slot') ??
          el.tagName.toLowerCase(),
        tooltip: cssPath(tooltip),
      });
    }
    return out;
  });

export type HoverFocusOptions = {
  maxTargets?: number;
  /** How long to wait for an auto-hide while the trigger stays active (ms). */
  persistenceWaitMs?: number;
};

export const extractContentOnHoverFocus = async (
  page: Page,
  options: HoverFocusOptions = {}
): Promise<HoverFocusObservation[]> => {
  const { maxTargets = 10, persistenceWaitMs = 600 } = options;
  const candidates = (await discoverHoverFocusCandidates(page)).slice(
    0,
    maxTargets
  );
  const observations: HoverFocusObservation[] = [];

  for (const c of candidates) {
    // FP-safe defaults: everything passes unless a failure is actually seen.
    const o: HoverFocusObservation = {
      triggerSelector: c.trigger,
      triggerComponent: c.component,
      revealed: false,
      dismissable: true,
      hoverable: true,
      persistent: true,
    };

    let trigger: ElementHandle<SVGElement | HTMLElement> | null = null;
    try {
      trigger = await page.$(c.trigger);
      if (!trigger) continue;

      // Reveal via focus first (keyboard path), fall back to hover.
      await trigger.focus().catch(() => {});
      await waitFrames(page);
      if (!(await isVisible(page, c.tooltip))) {
        await trigger.hover({ timeout: 1000 }).catch(() => {});
        await waitFrames(page);
      }
      o.revealed = await isVisible(page, c.tooltip);
      if (!o.revealed) {
        observations.push(o);
        continue;
      }

      // persistent: wait without further input; still visible?
      await page.waitForTimeout(persistenceWaitMs);
      o.persistent = await isVisible(page, c.tooltip);

      // dismissable: Escape should hide it. (Only flag a clear failure: it was
      // visible and Escape did not hide it.)
      if (o.persistent) {
        await page.keyboard.press('Escape').catch(() => {});
        await waitFrames(page);
        o.dismissable = !(await isVisible(page, c.tooltip));
      }

      // hoverable: re-reveal, move the pointer onto the content; still visible?
      await trigger.hover({ timeout: 1000 }).catch(() => {});
      await waitFrames(page);
      if (await isVisible(page, c.tooltip)) {
        const center = await page
          .$eval(c.tooltip, el => {
            const r = el.getBoundingClientRect();
            return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
          })
          .catch(() => null);
        if (center) {
          await page.mouse.move(center.x, center.y).catch(() => {});
          await waitFrames(page);
          o.hoverable = await isVisible(page, c.tooltip);
        }
      }

      // Reset state for the next candidate.
      await page.keyboard.press('Escape').catch(() => {});
      await page.mouse.move(0, 0).catch(() => {});
      await page.evaluate(() => {
        const a = document.activeElement;
        if (a instanceof HTMLElement) a.blur();
      });
      await waitFrames(page);
    } catch {
      // Keep FP-safe defaults on any interaction error.
    } finally {
      // Dispose on every path — success, the early !revealed continue, and a
      // thrown error alike — so a failure between acquiring the handle and
      // the (now-removed) inline disposes can no longer leak it.
      await trigger?.dispose().catch(() => {});
    }

    observations.push(o);
  }

  return observations;
};
