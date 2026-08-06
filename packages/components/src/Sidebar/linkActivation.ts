import type { KeyboardEvent, MouseEvent } from 'react';

/**
 * True for clicks the browser owns: ⌘/Ctrl (new tab), Shift (new window),
 * Alt (download), or a non-primary button. Nav rows must not run their app
 * side effects (panel swap, drill-in, drawer close) for these — the current
 * view stays put while the destination opens elsewhere. Mirrors the modifier
 * set react-aria's `shouldClientNavigate` uses to skip client routing.
 */
export const isModifiedClick = (e: MouseEvent<HTMLElement>): boolean =>
  e.metaKey || e.ctrlKey || e.altKey || e.shiftKey || e.button !== 0;

/**
 * Keyboard activation for nav rows without an `href`, rendered as
 * `<a role="button">`: an anchor only synthesizes clicks from Enter when it
 * has an href, and `role="button"` additionally promises Space — so funnel
 * both keys through `click()` into the row's single activation path.
 */
export const activateOnEnterOrSpace = (e: KeyboardEvent<HTMLElement>): void => {
  if ((e.key !== 'Enter' && e.key !== ' ') || e.repeat) return;
  // Also keeps Space from scrolling the panel.
  e.preventDefault();
  e.currentTarget.click();
};
