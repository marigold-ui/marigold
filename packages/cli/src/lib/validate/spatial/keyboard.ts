import type { Page } from 'playwright';
import type { ValidationIssue } from '../types.js';
import {
  type FocusStyleFingerprint,
  focusIndicatorChanged,
} from './focus-visible.js';

type FocusableElement = {
  selector: string;
  component: string;
  tagName: string;
  role: string;
  rect: { x: number; y: number; width: number; height: number };
  groupParent?: string;
  // Visual fingerprint while NOT focused. Compared against the focused
  // fingerprint during the Tab walk to decide whether a focus indicator is
  // perceivable (WCAG 2.4.7). Optional so hand-built test data need not set it.
  unfocusedStyle?: FocusStyleFingerprint;
};

type FocusStep = {
  index: number;
  selector: string;
  component: string;
  role: string;
  rect: { x: number; y: number; width: number; height: number };
  focusIndicatorVisible: boolean;
  // WCAG 2.4.11: focused element hidden behind sticky/fixed content. Optional so
  // hand-built test data need not set it.
  obscured?: boolean;
  obscuredBy?: string | null;
};

type ArrowNavResult = {
  groupSelector: string;
  role: string;
  memberCount: number;
  navigable: boolean;
};

type ArrowNavGroup = {
  groupSelector: string;
  role: string;
  memberCount: number;
  // The group's own `aria-orientation`, if set. Absent when the group relies
  // on its role's default orientation (radiogroup/menu/listbox: vertical;
  // tablist/menubar: horizontal).
  orientation: 'horizontal' | 'vertical' | undefined;
};

type KeyboardTrapResult = {
  isTrap: boolean;
  cycleLength: number;
  totalFocusable: number;
  escapable: boolean;
  trapSelector?: string;
};

export type KeyboardA11yData = {
  focusableElements: FocusableElement[];
  tabSequence: FocusStep[];
  unreachableElements: FocusableElement[];
  arrowNavResults: ArrowNavResult[];
  trapResults?: KeyboardTrapResult[];
};

const INTERACTIVE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([type="hidden"]):not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex="0"]',
  '[role="button"]:not([disabled])',
  '[role="link"]',
  '[role="checkbox"]:not([disabled])',
  '[role="radio"]:not([disabled])',
  '[role="tab"]',
  '[role="menuitem"]',
  '[role="switch"]:not([disabled])',
  '[role="slider"]',
].join(', ');

const MAX_FOCUS_ORDER_WARNINGS = 3;

// Roles that are not individual Tab targets: they are single tab stops with
// internal arrow-key navigation (grids, tables) or structural containers.
// Their absence from the Tab sequence is by design, not a keyboard defect.
const NON_TAB_STOP_ROLES = new Set([
  'grid',
  'table',
  'treegrid',
  'row',
  'rowgroup',
  'gridcell',
  'columnheader',
  'rowheader',
  'group',
  'region',
  'navigation',
  'presentation',
  'none',
]);

const ARROW_NAV_ROLES = ['radiogroup', 'tablist', 'menu', 'menubar', 'listbox'];

const focusFirstMember = (page: Page, groupSelector: string): Promise<void> =>
  page.evaluate((sel: string) => {
    const g = document.querySelector(sel);
    const member = g?.querySelector(
      '[role="radio"], [role="tab"], [role="menuitem"], [role="option"]'
    );
    if (member instanceof HTMLElement) member.focus();
  }, groupSelector);

const isMemberFocused = (page: Page, groupSelector: string): Promise<boolean> =>
  page.evaluate((sel: string) => {
    const g = document.querySelector(sel);
    if (!g || !document.activeElement) return false;
    return g.contains(document.activeElement);
  }, groupSelector);

const testArrowNavigation = async (page: Page): Promise<ArrowNavResult[]> => {
  const groups = await page.evaluate((roles: string[]) => {
    const mv = (
      window as unknown as {
        __mv: Record<string, (...args: unknown[]) => unknown>;
      }
    ).__mv;
    const cssPath = mv.cssPath as (el: Element) => string;
    const results: ArrowNavGroup[] = [];
    for (const role of roles) {
      for (const group of document.querySelectorAll(`[role="${role}"]`)) {
        const members = group.querySelectorAll(
          '[role="radio"], [role="tab"], [role="menuitem"], [role="option"]'
        );
        if (members.length >= 2) {
          const orientationAttr = group.getAttribute('aria-orientation');
          const orientation =
            orientationAttr === 'horizontal' || orientationAttr === 'vertical'
              ? orientationAttr
              : undefined;
          results.push({
            groupSelector: cssPath(group),
            role,
            memberCount: members.length,
            orientation,
          });
        }
      }
    }
    return results;
  }, ARROW_NAV_ROLES);

  const results: ArrowNavResult[] = [];

  for (const group of groups) {
    const firstMember = await page.evaluate((sel: string) => {
      const g = document.querySelector(sel);
      if (!g) return null;
      const member = g.querySelector(
        '[role="radio"], [role="tab"], [role="menuitem"], [role="option"]'
      );
      return member ? (member as HTMLElement).outerHTML.slice(0, 50) : null;
    }, group.groupSelector);

    if (!firstMember) {
      results.push({
        groupSelector: group.groupSelector,
        role: group.role,
        memberCount: group.memberCount,
        navigable: false,
      });
      continue;
    }

    // `tablist`/`menubar` default to horizontal navigation, every other group
    // role defaults to vertical — but an explicit `aria-orientation` always
    // wins. If the orientation-correct key doesn't move focus, fall back to
    // the other axis before concluding the group isn't navigable: a missing/
    // misapplied `aria-orientation` must not produce a false positive on an
    // otherwise correctly implemented widget.
    const defaultHorizontal =
      group.role === 'tablist' || group.role === 'menubar';
    const isHorizontal =
      group.orientation === undefined
        ? defaultHorizontal
        : group.orientation === 'horizontal';
    const primaryKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const fallbackKey = isHorizontal ? 'ArrowDown' : 'ArrowRight';

    await focusFirstMember(page, group.groupSelector);
    await page.keyboard.press(primaryKey);
    let navigable = await isMemberFocused(page, group.groupSelector);

    if (!navigable) {
      await focusFirstMember(page, group.groupSelector);
      await page.keyboard.press(fallbackKey);
      navigable = await isMemberFocused(page, group.groupSelector);
    }

    results.push({
      groupSelector: group.groupSelector,
      role: group.role,
      memberCount: group.memberCount,
      navigable,
    });
  }

  return results;
};

export const extractFocusableElements = async (
  page: Page
): Promise<FocusableElement[]> =>
  page.evaluate((selector: string) => {
    const mv = (
      window as unknown as {
        __mv: {
          cssPath: (el: Element) => string;
          focusFingerprint: (el: Element) => FocusStyleFingerprint;
        };
      }
    ).__mv;
    const cssPath = mv.cssPath;

    const elements: FocusableElement[] = [];
    for (const el of document.querySelectorAll(selector)) {
      const style = window.getComputedStyle(el);
      if (
        style.display === 'none' ||
        style.visibility === 'hidden' ||
        el.getAttribute('aria-hidden') === 'true'
      )
        continue;
      const htmlEl = el as HTMLElement;
      if (!htmlEl.offsetParent && el.tagName !== 'BODY') {
        const pos = window.getComputedStyle(el).position;
        if (pos !== 'fixed' && pos !== 'sticky') continue;
      }

      // Only elements that are actually keyboard-focusable. A role-only match
      // without a usable tabindex (e.g. the current breadcrumb rendered as
      // <span role="link"> with no href, or a roving-tabindex item that is not
      // the active one) is not a Tab stop and must not count as "unreachable".
      if (htmlEl.tabIndex < 0) continue;

      const rect = el.getBoundingClientRect();
      const component =
        el.getAttribute('data-component') ??
        el.getAttribute('data-slot') ??
        el.tagName.toLowerCase();

      let groupParent: string | undefined;
      let parent = el.parentElement;
      while (parent) {
        const role = parent.getAttribute('role');
        if (
          role === 'radiogroup' ||
          role === 'tablist' ||
          role === 'menu' ||
          role === 'menubar' ||
          role === 'listbox' ||
          role === 'tree'
        ) {
          groupParent = cssPath(parent);
          break;
        }
        parent = parent.parentElement;
      }

      // Tag with a stable index so reachability can be matched by element
      // identity during tab traversal, not by re-deriving CSS paths (which can
      // diverge between passes and cause false "unreachable" reports).
      (el as HTMLElement).setAttribute(
        'data-mv-focusable',
        String(elements.length)
      );
      elements.push({
        selector: cssPath(el),
        component,
        tagName: el.tagName,
        role: el.getAttribute('role') ?? el.tagName.toLowerCase(),
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        groupParent,
        unfocusedStyle: mv.focusFingerprint(el),
      });
    }
    return elements;
  }, INTERACTIVE_SELECTOR);

const extractFocusStepData = async (
  page: Page
): Promise<{
  selector: string;
  component: string;
  role: string;
  rect: { x: number; y: number; width: number; height: number };
  focused: FocusStyleFingerprint | null;
  obscured: boolean;
  obscuredBy: string | null;
  isBody: boolean;
  focusableIndex: number;
}> =>
  page.evaluate(() => {
    const mv = (
      window as unknown as {
        __mv: {
          cssPath: (el: Element) => string;
          focusFingerprint: (el: Element) => FocusStyleFingerprint;
        };
      }
    ).__mv;
    const cssPath = mv.cssPath;
    const el = document.activeElement;

    if (!el || el === document.body) {
      return {
        selector: 'body',
        component: 'body',
        role: '',
        rect: { x: 0, y: 0, width: 0, height: 0 },
        focused: null,
        obscured: false,
        obscuredBy: null,
        isBody: true,
        focusableIndex: -1,
      };
    }

    const idxAttr = el.getAttribute('data-mv-focusable');
    const rect = el.getBoundingClientRect();

    // WCAG 2.4.11 Focus Not Obscured: is the focused element hidden behind
    // author content that sticks in the viewport (sticky header/footer, cookie
    // banner)? Hit-test the element's centre; if the top element there is a
    // different node sitting inside a position:fixed/sticky container, the focus
    // is obscured. Doing this on the real, scrolled tab path is the dynamic
    // complement to the only existing (static, "needs review") implementation in
    // IBM Equal Access.
    let obscured = false;
    let obscuredBy: string | null = null;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const topEl = document.elementFromPoint(cx, cy);
    if (topEl && topEl !== el && !el.contains(topEl) && !topEl.contains(el)) {
      let cur: Element | null = topEl;
      while (cur && cur !== document.body) {
        const pos = window.getComputedStyle(cur).position;
        if (pos === 'fixed' || pos === 'sticky') {
          obscured = true;
          obscuredBy = cssPath(cur);
          break;
        }
        cur = cur.parentElement;
      }
    }

    return {
      selector: cssPath(el),
      component:
        el.getAttribute('data-component') ??
        el.getAttribute('data-slot') ??
        el.tagName.toLowerCase(),
      role: el.getAttribute('role') ?? el.tagName.toLowerCase(),
      rect: {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      },
      focused: mv.focusFingerprint(el),
      obscured,
      obscuredBy,
      isBody: false,
      focusableIndex: idxAttr === null ? -1 : Number(idxAttr),
    };
  });

export const extractTabSequence = async (
  page: Page,
  maxSteps: number,
  unfocusedByIndex: Map<number, FocusStyleFingerprint>
): Promise<{
  tabSequence: FocusStep[];
  endedByBody: boolean;
  cycleSelector?: string;
  reachedIndices: Set<number>;
}> => {
  await page.evaluate(() => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) active.blur();
    document.body.focus();
  });

  const tabSequence: FocusStep[] = [];
  const visited = new Set<string>();
  const reachedIndices = new Set<number>();
  let endedByBody = false;
  let cycleSelector: string | undefined;

  for (let i = 0; i < maxSteps; i++) {
    await page.keyboard.press('Tab');
    const step = await extractFocusStepData(page);

    if (step.isBody) {
      endedByBody = true;
      break;
    }
    if (step.focusableIndex >= 0) reachedIndices.add(step.focusableIndex);
    if (visited.has(step.selector)) {
      cycleSelector = step.selector;
      break;
    }

    visited.add(step.selector);

    // WCAG 2.4.7: a focus indicator is perceivable when the element's
    // appearance changes between its unfocused baseline and its focused
    // fingerprint. Without a baseline to compare (no captured unfocused style),
    // default to "visible" so a missing measurement never yields a false fail.
    const unfocused = unfocusedByIndex.get(step.focusableIndex);
    const focusIndicatorVisible =
      unfocused && step.focused
        ? focusIndicatorChanged(unfocused, step.focused)
        : true;

    tabSequence.push({
      index: i,
      selector: step.selector,
      component: step.component,
      role: step.role,
      rect: step.rect,
      focusIndicatorVisible,
      obscured: step.obscured,
      obscuredBy: step.obscuredBy,
    });
  }

  return { tabSequence, endedByBody, cycleSelector, reachedIndices };
};

const waitForLayout = (page: Page): Promise<void> =>
  page.evaluate(
    () =>
      new Promise<void>(r =>
        requestAnimationFrame(() => requestAnimationFrame(() => r()))
      )
  );

const detectKeyboardTraps = async (
  page: Page,
  tabSequence: FocusStep[],
  focusableElements: FocusableElement[],
  cycleSelector: string
): Promise<KeyboardTrapResult[]> => {
  const cycleStartIdx = tabSequence.findIndex(
    s => s.selector === cycleSelector
  );
  const cycleSelectors = new Set(
    tabSequence.slice(cycleStartIdx).map(s => s.selector)
  );
  const cycleLength = cycleSelectors.size;

  await page.keyboard.press('Escape');
  await waitForLayout(page);

  const afterEscape = await page.evaluate(
    (cycleSels: string[]) => {
      const el = document.activeElement;
      const escaped = !el || el === document.body;
      const selector = escaped ? 'body' : '';
      const cycleElementsExist = cycleSels.some(s => document.querySelector(s));
      const focusInCycle =
        !escaped &&
        el instanceof Element &&
        cycleSels.some(s => {
          const target = document.querySelector(s);
          return target && (target === el || target.contains(el));
        });
      return { escaped, selector, cycleElementsExist, focusInCycle };
    },
    [...cycleSelectors]
  );

  let escapable = afterEscape.escaped || !afterEscape.cycleElementsExist;

  if (!escapable) {
    await page.keyboard.press('Tab');
    await waitForLayout(page);

    const afterTab = await page.evaluate(
      (cycleSels: string[]) => {
        const el = document.activeElement;
        if (!el || el === document.body) return { inCycle: false };
        return {
          inCycle: cycleSels.some(s => {
            const target = document.querySelector(s);
            return target && (target === el || target.contains(el));
          }),
        };
      },
      [...cycleSelectors]
    );

    escapable = !afterTab.inCycle;
  }

  // A real 2.1.2 trap keeps focus in a STRICT SUBSET of the page while the rest
  // stays unreachable. When the cycle spans every focusable element it is just
  // ordinary full-page Tab wrap-around (last -> first), not a trap — Escape
  // does nothing there either, so `escapable` alone would false-positive.
  const cycleIsStrictSubset = cycleLength < focusableElements.length;

  return [
    {
      isTrap: !escapable && cycleIsStrictSubset,
      cycleLength,
      totalFocusable: focusableElements.length,
      escapable,
      trapSelector: cycleSelector,
    },
  ];
};

export const extractKeyboardA11yData = async (
  page: Page
): Promise<KeyboardA11yData> => {
  const focusableElements = await extractFocusableElements(page);
  const maxSteps = focusableElements.length * 2 + 5;

  // Index -> unfocused visual fingerprint, for the 2.4.7 focused/unfocused diff.
  // Indices match the data-mv-focusable attribute stamped during extraction.
  const unfocusedByIndex = new Map<number, FocusStyleFingerprint>();
  focusableElements.forEach((el, i) => {
    if (el.unfocusedStyle) unfocusedByIndex.set(i, el.unfocusedStyle);
  });

  const tabResult = await extractTabSequence(page, maxSteps, unfocusedByIndex);

  const reachedGroups = new Set<string>();
  focusableElements.forEach((el, i) => {
    if (el.groupParent && tabResult.reachedIndices.has(i)) {
      reachedGroups.add(el.groupParent);
    }
  });

  const unreachableElements = focusableElements.filter((el, i) => {
    if (tabResult.reachedIndices.has(i)) return false;
    if (el.groupParent && reachedGroups.has(el.groupParent)) return false;
    // Container/composite roles are reached via arrow keys, not Tab — they are
    // a single tab stop or roving-tabindex managed, so absence from the Tab
    // sequence is not a defect.
    if (NON_TAB_STOP_ROLES.has(el.role)) return false;
    return true;
  });

  const arrowNavResults = await testArrowNavigation(page);

  const trapResults = tabResult.cycleSelector
    ? await detectKeyboardTraps(
        page,
        tabResult.tabSequence,
        focusableElements,
        tabResult.cycleSelector
      )
    : [];

  return {
    focusableElements,
    tabSequence: tabResult.tabSequence,
    unreachableElements,
    arrowNavResults,
    trapResults,
  };
};

const VERTICAL_THRESHOLD = 20;
// A backward jump must be meaningfully leftward, not just a few pixels of
// border/padding offset between two elements stacked in the same column. Without
// this, any upward Tab move in a single-column layout reads as "out of order".
const HORIZONTAL_THRESHOLD = 20;

const OVERLAY_ROLES = new Set([
  'dialog',
  'alertdialog',
  'menu',
  'tooltip',
  'listbox',
]);

export const keyboardA11yToValidationIssues = (
  data: KeyboardA11yData
): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  for (const el of data.unreachableElements) {
    issues.push({
      type: 'a11y',
      // Warning, not error: reachability is measured at runtime via a simulated
      // Tab walk (dynamic, with a history of false "unreachable" results), so it
      // is not a deterministic, false-positive-free violation. See severity policy.
      severity: 'warning',
      source: 'keyboard-a11y',
      component: el.component,
      message: `Interactive element <${el.component}> (${el.role}) is not reachable via Tab key.`,
      suggestion:
        'Ensure the element is focusable. Marigold interactive components are focusable by default — check if a parent has tabindex="-1" or focus is trapped.',
      details: { selector: el.selector, role: el.role },
    });
  }

  let focusOrderWarnings = 0;
  for (
    let i = 1;
    i < data.tabSequence.length &&
    focusOrderWarnings < MAX_FOCUS_ORDER_WARNINGS;
    i++
  ) {
    const prev = data.tabSequence[i - 1];
    const curr = data.tabSequence[i];

    if (OVERLAY_ROLES.has(prev.role) || OVERLAY_ROLES.has(curr.role)) continue;

    // Grids and tables (role=row, gridcell, …) navigate in 2D via arrow keys,
    // not in a linear top-to-bottom reading order, so the visual-order heuristic
    // below does not apply. These roles are already excluded from reachability
    // checks for the same reason; skipping them here stops normal table tabbing
    // (e.g. Tab from a toolbar button into a data row) from being flagged.
    if (NON_TAB_STOP_ROLES.has(prev.role) || NON_TAB_STOP_ROLES.has(curr.role))
      continue;

    if (
      curr.rect.y < prev.rect.y - VERTICAL_THRESHOLD &&
      curr.rect.x < prev.rect.x - HORIZONTAL_THRESHOLD
    ) {
      focusOrderWarnings++;
      issues.push({
        type: 'a11y',
        severity: 'warning',
        source: 'keyboard-a11y',
        component: curr.component,
        message: `Component order inconsistency: Tab moved from <${prev.component}> at (${prev.rect.x}, ${prev.rect.y}) to <${curr.component}> at (${curr.rect.x}, ${curr.rect.y}).`,
        suggestion:
          'Reorder components in JSX to match the visual layout, or use Marigold layout components (Stack, Columns) to control both visual and DOM order.',
        details: {
          from: { component: prev.component, x: prev.rect.x, y: prev.rect.y },
          to: { component: curr.component, x: curr.rect.x, y: curr.rect.y },
        },
      });
    }
  }

  for (const step of data.tabSequence) {
    if (!step.focusIndicatorVisible) {
      // Downgraded to 'warning': focus-ring detection is heuristic and still
      // incomplete (rings can be on ::before/::after, a wrapper, or use
      // non-outline/box-shadow techniques), so a missed indicator may be a
      // detection gap rather than a true WCAG 2.4.7 failure. A genuinely
      // indicator-less element still surfaces — just without an error penalty.
      issues.push({
        type: 'a11y',
        severity: 'warning',
        source: 'keyboard-a11y',
        component: step.component,
        message: `Element <${step.component}> has no visible focus indicator when focused (WCAG 2.4.7).`,
        suggestion:
          'Marigold components provide built-in focus rings via the theme. For custom elements, add an outline or box-shadow on :focus-visible.',
        details: { selector: step.selector, role: step.role },
      });
    }
  }

  for (const step of data.tabSequence) {
    if (step.obscured) {
      issues.push({
        type: 'a11y',
        // Warning, not error: runtime hit-test heuristic, WCAG 2.4.11 is Level
        // AA. See severity policy.
        severity: 'warning',
        source: 'keyboard-a11y',
        component: step.component,
        message: `Element <${step.component}> is hidden behind sticky or fixed content when it receives focus (WCAG 2.4.11).`,
        suggestion:
          'Keep focused elements clear of sticky headers/footers and overlays. Add scroll-margin (or scroll-padding on the scroll container) so the element scrolls into an unobscured position when focused.',
        details: {
          selector: step.selector,
          obscuredBy: step.obscuredBy ?? undefined,
        },
      });
    }
  }

  for (const nav of data.arrowNavResults) {
    if (!nav.navigable) {
      issues.push({
        type: 'a11y',
        severity: 'warning',
        source: 'keyboard-a11y',
        component: nav.role,
        message: `Arrow key navigation does not work within [role="${nav.role}"] (${nav.memberCount} members).`,
        suggestion:
          'Composite widgets (tabs, radio groups, menus, listboxes) should support Arrow key navigation between members per WAI-ARIA Authoring Practices.',
        details: {
          selector: nav.groupSelector,
          role: nav.role,
          memberCount: nav.memberCount,
        },
      });
    }
  }

  if (data.trapResults) {
    for (const trap of data.trapResults) {
      if (trap.isTrap) {
        issues.push({
          type: 'a11y',
          // Warning, not error: trap detection is a runtime heuristic (cycle
          // detection + an Escape-escape probe), not a deterministic violation.
          // See severity policy.
          severity: 'warning',
          source: 'keyboard-a11y',
          component: trap.trapSelector ?? 'unknown',
          message: `Keyboard trap detected — focus cycles through ${trap.cycleLength} elements without reaching the rest of the page (WCAG 2.1.2).`,
          suggestion:
            'Ensure focus can leave this container via Tab, or provide an Escape key handler to close it.',
          details: {
            cycleLength: trap.cycleLength,
            totalFocusable: trap.totalFocusable,
            escapable: trap.escapable,
          },
        });
      } else if (trap.escapable && trap.cycleLength < trap.totalFocusable) {
        issues.push({
          type: 'a11y',
          severity: 'warning',
          source: 'keyboard-a11y',
          component: trap.trapSelector ?? 'unknown',
          message: `Focus is trapped in a cycle of ${trap.cycleLength} elements but can be escaped via Escape key (WCAG 2.1.2).`,
          suggestion:
            'The Escape key handler works, but consider also allowing Tab to leave the container for better keyboard UX.',
          details: {
            cycleLength: trap.cycleLength,
            totalFocusable: trap.totalFocusable,
          },
        });
      }
    }
  }

  return issues;
};
