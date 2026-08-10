import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';

/**
 * Reveals the states that only appear on interaction — menus, dialogs,
 * listboxes, disclosure and tab panels — so the dynamic checks see more than a
 * component's initial render.
 *
 * Triggers are found through the WAI-ARIA contract (aria-haspopup /
 * aria-expanded / aria-controls / popovertarget / <summary> / role=tab), never
 * through component names, so this works for any conforming design system.
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
  // `aria-describedby` is set AND its id resolves in the live DOM — the
  // WAI-ARIA tooltip pattern, pre-rendered hidden and shown on hover/focus.
  // A DOM fact, so hover-activation is only ever claimed with something real
  // to reveal.
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
  // A collapsed disclosure.
  if (s.ariaExpanded === 'false')
    return { kind: 'disclosure', activation: 'press' };
  // A hover-revealed tooltip: no press-style state, but `aria-describedby`
  // resolves. Checked last so any press-style signal above wins.
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

      // evaluate() cannot import classifyTrigger, so this only collects raw
      // signals; the Node side derives the kind.
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

const isDisclosureStillOpen = (
  page: Page,
  selector: string
): Promise<boolean> =>
  page
    .evaluate(sel => {
      const el = document.querySelector(sel);
      if (!el) return false;
      if (el.getAttribute('aria-expanded') === 'true') return true;
      const details = el.closest('details');
      return details ? details.open : false;
    }, selector)
    .catch(() => false);

// Its aria-controls target if declared, else the enclosing <details>. Safe to
// use directly, unlike a tab's aria-controls: a disclosure's target starts
// collapsed and is unambiguously its own panel. visibleOverlays() can't help
// here — it doesn't know the role="group" a disclosure panel commonly carries.
const disclosureRevealedRoot = (
  page: Page,
  trigger: Trigger
): Promise<string | null> =>
  page
    .evaluate(
      ({ selector, controls }) => {
        const mv = (
          window as unknown as {
            __mv: Record<string, (...args: unknown[]) => unknown>;
          }
        ).__mv;
        const cssPath = mv.cssPath as (el: Element) => string;
        if (controls) {
          const target = document.querySelector(controls);
          if (target) return cssPath(target);
        }
        const el = document.querySelector(selector);
        const details = el?.closest('details');
        return details ? cssPath(details) : null;
      },
      { selector: trigger.selector, controls: trigger.controls }
    )
    .catch(() => null);

const activate = async (page: Page, trigger: Trigger): Promise<void> => {
  const handle = await page.$(trigger.selector);
  if (!handle) return;
  try {
    await handle.scrollIntoViewIfNeeded({ timeout: 1000 }).catch(() => {});
    await handle.focus().catch(() => {});
    if (trigger.activation === 'hover') {
      await handle.hover({ timeout: 1000 }).catch(() => {});
    } else {
      // Enter first; fall back to a real click for a widget that only binds
      // onClick. Bounded: the route filter blocks every non-dev-server request,
      // and anchors with an href are skipped so a click can't navigate away.
      await page.keyboard.press('Enter').catch(() => {});
      await waitForLayout(page);
      // A disclosure panel commonly carries role="group", which isn't in
      // OVERLAY_ROLES, so visibleOverlays() would report "still closed" after a
      // successful Enter and the click-fallback would toggle it shut again.
      // Ask the disclosure's own expanded state instead.
      const stillClosed =
        trigger.kind === 'disclosure'
          ? !(await isDisclosureStillOpen(page, trigger.selector))
          : (await visibleOverlays(page)).length === 0;
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

const restore = async (page: Page, trigger: Trigger): Promise<void> => {
  await page.keyboard.press('Escape').catch(() => {});
  await waitForLayout(page);
  if (trigger.kind !== 'disclosure') return;
  // Escape doesn't close a disclosure — only a click/Enter on the trigger
  // does — so it would stay expanded for the rest of the sweep and skew every
  // downstream check with content outside the default collapsed state.
  if (!(await isDisclosureStillOpen(page, trigger.selector))) return;
  const handle = await page.$(trigger.selector);
  if (!handle) return;
  try {
    await handle.click({ timeout: 1000 }).catch(() => {});
  } finally {
    await handle.dispose();
  }
  await waitForLayout(page);
};

export type DriveOptions = {
  /** Hard cap on triggers exercised, to bound render time. */
  maxTriggers?: number;
  /**
   * Invoked while an overlay is open; returned issues are aggregated. This is
   * how contrast, axe and friends reach revealed content. Errors are swallowed
   * so one flaky overlay never aborts the sweep.
   */
  onOpen?: (
    revealedRootSelector: string,
    trigger: Trigger
  ) => Promise<ValidationIssue[]>;
};

/**
 * Opens each trigger in turn, runs onOpen against the revealed overlay, then
 * closes it again. A trigger that fails to open is skipped, never thrown on.
 */
export const driveInteractions = async (
  page: Page,
  options: DriveOptions = {}
): Promise<{ states: RevealedState[]; issues: ValidationIssue[] }> => {
  const { maxTriggers = 25, onOpen } = options;
  const triggers = (await discoverTriggers(page)).slice(0, maxTriggers);
  const states: RevealedState[] = [];
  const issues: ValidationIssue[] = [];

  let baseline = new Set(await visibleOverlays(page));

  for (const trigger of triggers) {
    try {
      await activate(page, trigger);
      // Disclosures take a separate path: OVERLAY_ROLES omits the
      // role="group" their panels carry, so visibleOverlays() can never see
      // one open. Same reasoning as in activate()/restore().
      let fresh: string | null;
      if (trigger.kind === 'disclosure') {
        fresh = (await isDisclosureStillOpen(page, trigger.selector))
          ? await disclosureRevealedRoot(page, trigger)
          : null;
      } else {
        const after = await visibleOverlays(page);
        // Only an overlay absent from the baseline counts as revealed.
        // aria-controls is deliberately not a fallback: for a tab it can name
        // an always-present element, misattributing its findings to
        // interaction.
        fresh = after.find(sel => !baseline.has(sel)) ?? null;
      }
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
      await restore(page, trigger);
      // Recompute: if restore() failed to close this overlay (realistic for a
      // popover that ignores Escape), the next iteration must see it as
      // already-present rather than as its own revealed root. Falls back to
      // the prior baseline so one flaky read can't abort the sweep.
      baseline = new Set(
        await visibleOverlays(page).catch(() => [...baseline])
      );
    }
  }

  return { states, issues };
};
