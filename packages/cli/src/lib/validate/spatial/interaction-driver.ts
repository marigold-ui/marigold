import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

/**
 * Generic interaction driver.
 *
 * Most dynamic checks only ever saw a component's INITIAL render. This driver
 * reveals the states that appear on interaction — menus, dialogs, listboxes,
 * disclosure panels, tab panels — so the checks can run on that revealed
 * content too (and so the 1.4.13 hover/focus check has something to test).
 *
 * It is deliberately generic: triggers are found through the WAI-ARIA contract
 * (aria-haspopup / aria-expanded / aria-controls / popovertarget / <summary> /
 * role=tab), never through design-system component names. React Aria — which
 * Marigold builds on — stamps these attributes correctly, so the same driver
 * works for any conforming typed design system.
 */

export type TriggerKind =
  | 'menu'
  | 'dialog'
  | 'listbox'
  | 'tree'
  | 'grid'
  | 'disclosure'
  | 'tab'
  | 'popover'
  | 'generic';

export type Activation = 'press' | 'hover';

export type TriggerSignals = {
  role: string | null;
  ariaHasPopup: string | null;
  ariaExpanded: string | null;
  hasPopoverTarget: boolean;
  hasAriaControls: boolean;
  isSummary: boolean;
  // True only when `aria-describedby` is set AND the referenced id currently
  // resolves to an element in the live DOM (whether visible or not) — the
  // WAI-ARIA tooltip pattern where the tooltip is pre-rendered hidden and
  // toggled visible on hover/focus. Checked as a DOM fact (not inferred) so a
  // trigger is only ever classified as hover-activated when there is
  // something concrete to reveal.
  hasResolvableAriaDescribedBy: boolean;
};

/**
 * Decides what kind of overlay a candidate trigger opens and how to activate it.
 * Pure so it can be unit-tested; the browser side only gathers the signals.
 * Returns null when the element is not an actionable disclosure trigger.
 */
export const classifyTrigger = (
  s: TriggerSignals
): { kind: TriggerKind; activation: Activation } | null => {
  const popup = (s.ariaHasPopup ?? '').toLowerCase();
  if (popup && popup !== 'false') {
    const kind: TriggerKind =
      popup === 'menu' || popup === 'true'
        ? 'menu'
        : popup === 'listbox'
          ? 'listbox'
          : popup === 'dialog'
            ? 'dialog'
            : popup === 'tree'
              ? 'tree'
              : popup === 'grid'
                ? 'grid'
                : 'menu';
    return { kind, activation: 'press' };
  }
  if (s.role === 'tab') return { kind: 'tab', activation: 'press' };
  if (s.isSummary) return { kind: 'disclosure', activation: 'press' };
  if (s.hasPopoverTarget) return { kind: 'popover', activation: 'press' };
  // A collapsed disclosure (aria-expanded="false"), optionally with the content
  // wired via aria-controls.
  if (s.ariaExpanded === 'false')
    return { kind: 'disclosure', activation: 'press' };
  // A hover-revealed tooltip/popover: no press-style ARIA state, but
  // `aria-describedby` resolves to a real (pre-rendered, hidden-until-shown)
  // element. Checked last so a stronger press-style signal above always wins.
  if (s.hasResolvableAriaDescribedBy)
    return { kind: 'popover', activation: 'hover' };
  return null;
};

export type Trigger = {
  selector: string;
  kind: TriggerKind;
  activation: Activation;
  controls: string | null;
};

export type RevealedState = {
  trigger: Trigger;
  /** Selector of the element that appeared (overlay root), or null if nothing
   *  detectable became visible. */
  revealedRootSelector: string | null;
  revealedRole: string | null;
};

// Roles that a revealed overlay typically carries. Used to detect what newly
// appeared after activating a trigger.
const OVERLAY_ROLES = [
  'dialog',
  'alertdialog',
  'menu',
  'menubar',
  'listbox',
  'tree',
  'grid',
  'tooltip',
  'tabpanel',
];

const waitForLayout = (page: Page): Promise<void> =>
  page.evaluate(
    () =>
      new Promise<void>(r =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      )
  );

/** Snapshot of currently-visible overlay roots, keyed by cssPath. */
const visibleOverlays = (page: Page): Promise<string[]> =>
  page.evaluate((roles: string[]) => {
    const mv = (
      window as unknown as {
        __mv: Record<string, (...args: unknown[]) => unknown>;
      }
    ).__mv;
    const cssPath = mv.cssPath as (el: Element) => string;
    const isHidden = mv.isHidden as (el: Element) => boolean;
    const out: string[] = [];
    for (const el of document.querySelectorAll(
      roles.map(r => `[role="${r}"]`).join(',')
    )) {
      if (isHidden(el)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) continue;
      out.push(cssPath(el));
    }
    return out;
  }, OVERLAY_ROLES);

const discoverTriggers = (page: Page): Promise<Trigger[]> =>
  page
    .evaluate(() => {
      const mv = (
        window as unknown as {
          __mv: Record<string, (...args: unknown[]) => unknown>;
        }
      ).__mv;
      const cssPath = mv.cssPath as (el: Element) => string;
      const isHidden = mv.isHidden as (el: Element) => boolean;

      // Inlined classifier mirror: evaluate() cannot import classifyTrigger, but
      // it only forwards the raw signals; the Node side re-derives kind. Here we
      // just collect candidates and their signals.
      const candidates = document.querySelectorAll(
        '[aria-haspopup], [aria-expanded], [popovertarget], summary, [role="tab"], [aria-describedby]'
      );
      const seen = new Set<string>();
      const out: Array<{
        selector: string;
        signals: {
          role: string | null;
          ariaHasPopup: string | null;
          ariaExpanded: string | null;
          hasPopoverTarget: boolean;
          hasAriaControls: boolean;
          isSummary: boolean;
          hasResolvableAriaDescribedBy: boolean;
        };
        controls: string | null;
      }> = [];

      for (const el of candidates) {
        if (isHidden(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;
        const selector = cssPath(el);
        if (seen.has(selector)) continue;
        seen.add(selector);

        const controlsId = el.getAttribute('aria-controls');
        const describedById = el.getAttribute('aria-describedby');
        out.push({
          selector,
          signals: {
            role: el.getAttribute('role'),
            ariaHasPopup: el.getAttribute('aria-haspopup'),
            ariaExpanded: el.getAttribute('aria-expanded'),
            hasPopoverTarget: el.hasAttribute('popovertarget'),
            hasAriaControls: Boolean(controlsId),
            isSummary: el.tagName === 'SUMMARY',
            hasResolvableAriaDescribedBy: Boolean(
              describedById && document.getElementById(describedById)
            ),
          },
          controls: controlsId
            ? `#${(window as Window & typeof globalThis).CSS.escape(controlsId)}`
            : null,
        });
      }
      return out;
    })
    .then(raw =>
      raw
        .map(r => {
          const classified = classifyTrigger(r.signals);
          if (!classified) return null;
          return {
            selector: r.selector,
            kind: classified.kind,
            activation: classified.activation,
            controls: r.controls,
          } satisfies Trigger;
        })
        .filter((t): t is Trigger => t !== null)
    );

const activate = async (page: Page, trigger: Trigger): Promise<void> => {
  const handle = await page.$(trigger.selector);
  if (!handle) return;
  try {
    await handle.scrollIntoViewIfNeeded({ timeout: 1000 }).catch(() => {});
    await handle.focus().catch(() => {});
    if (trigger.activation === 'hover') {
      await handle.hover({ timeout: 1000 }).catch(() => {});
    } else {
      // Enter is the standard keyboard activation. As a last resort — for a
      // disclosure widget that only binds onClick — fall back to a real click.
      // This is bounded: the render route filter blocks every non-dev-server
      // request, so a click on untrusted generated code cannot reach external
      // services; and we skip anchors with an href so a click cannot navigate
      // the harness away from the rendered component.
      await page.keyboard.press('Enter').catch(() => {});
      await waitForLayout(page);
      const stillClosed = (await visibleOverlays(page)).length === 0;
      if (stillClosed) {
        const isNavLink = await handle
          .evaluate(el => el.tagName === 'A' && el.hasAttribute('href'))
          .catch(() => false);
        if (!isNavLink) await handle.click({ timeout: 1000 }).catch(() => {});
      }
    }
  } finally {
    await handle.dispose();
  }
  await waitForLayout(page);
};

const restore = async (page: Page): Promise<void> => {
  await page.keyboard.press('Escape').catch(() => {});
  await waitForLayout(page);
};

export type DriveOptions = {
  /** Hard cap on triggers exercised, to bound render time. */
  maxTriggers?: number;
  /**
   * Invoked while an overlay is open, with the revealed root selector. Whatever
   * issues it returns are aggregated. This is how the existing checks (contrast,
   * axe, …) get to run against revealed content. Must not throw; errors are
   * swallowed so one flaky overlay never aborts the sweep.
   */
  onOpen?: (
    revealedRootSelector: string,
    trigger: Trigger
  ) => Promise<ValidationIssue[]>;
};

/**
 * Opens each discovered trigger one at a time, runs the onOpen callback against
 * the revealed overlay, then closes it before moving on. Returns the revealed
 * states plus the aggregated issues. Never throws on an individual trigger — a
 * flaky open is skipped.
 */
export const driveInteractions = async (
  page: Page,
  options: DriveOptions = {}
): Promise<{ states: RevealedState[]; issues: ValidationIssue[] }> => {
  const { maxTriggers = 25, onOpen } = options;
  const triggers = (await discoverTriggers(page)).slice(0, maxTriggers);
  const states: RevealedState[] = [];
  const issues: ValidationIssue[] = [];

  const baseline = new Set(await visibleOverlays(page));

  for (const trigger of triggers) {
    try {
      await activate(page, trigger);
      const after = await visibleOverlays(page);
      // Only a genuinely NEW overlay (an overlay-role element absent from the
      // baseline) counts as revealed. The aria-controls target is deliberately
      // NOT used as a fallback: it can point at an always-present element (e.g.
      // a tab panel already in the DOM), which would misattribute its findings
      // to interaction.
      const fresh = after.find(sel => !baseline.has(sel)) ?? null;
      let revealedRole: string | null = null;
      if (fresh) {
        revealedRole = await page
          .$eval(fresh, el => el.getAttribute('role'))
          .catch(() => null);
        if (onOpen) {
          const found = await onOpen(fresh, trigger).catch(() => []);
          issues.push(...found);
        }
      }
      states.push({
        trigger,
        revealedRootSelector: fresh ?? null,
        revealedRole,
      });
    } catch {
      states.push({ trigger, revealedRootSelector: null, revealedRole: null });
    } finally {
      await restore(page);
    }
  }

  return { states, issues };
};
