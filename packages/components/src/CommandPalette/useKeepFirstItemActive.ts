import { useCallback, useEffect, useRef } from 'react';

// Keep the first row active
// ---------------
// The palette keeps one row active at all times, as Spotlight, Raycast and
// cmdk do, so Enter always runs something. RAC activates the first row on
// open (`autoFocus`) and when the user types forward. It clears the row after
// a delete, paste or undo, and keeps the old row when async results replace
// the list. This hook covers those two cases. Once people move to another
// row, rows added later (the next page) keep their place.
//
// Known gap: when typing swaps in a different static list that starts with
// the same row, RAC activates nothing. Pressing `Home` there too races RAC's
// own handling.
//
// `Home` in the search input is RAC's own way to activate the first row, and
// DOM focus stays in the input. Returns refs for the input and the menu.
// Keys that move the active row away from the first one. `Home` is missing on
// purpose: the hook presses it itself.
const NAVIGATION_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  'End',
]);

const FORWARD_TYPING = new Set([
  'insertText',
  'insertCompositionText',
  'insertFromComposition',
]);

export const useKeepFirstItemActive = (inputValue: string, items: unknown) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef(inputValue);
  const itemsRef = useRef(items);
  const awaitingResultsRef = useRef(false);
  const typedForwardRef = useRef(false);

  // A callback ref, so the listener follows the input whenever it mounts.
  // React's `onBeforeInput` is a polyfill without `inputType`.
  const inputCallbackRef = useCallback((input: HTMLInputElement | null) => {
    inputRef.current = input;
    if (!input) return;
    const track = (e: InputEvent) => {
      typedForwardRef.current = FORWARD_TYPING.has(e.inputType);
    };
    input.addEventListener('beforeinput', track);
    return () => {
      input.removeEventListener('beforeinput', track);
      inputRef.current = null;
    };
  }, []);

  useEffect(() => {
    const queryChanged = queryRef.current !== inputValue;
    const resultsArrived = itemsRef.current !== items;
    queryRef.current = inputValue;
    itemsRef.current = items;

    if (queryChanged) awaitingResultsRef.current = true;
    const newResults = resultsArrived && awaitingResultsRef.current;
    if (resultsArrived) awaitingResultsRef.current = false;
    // Forward typing over a static list is RAC's job. Anything else, also a
    // query set in code, counts as an edit. The flag only covers one change.
    const edited = queryChanged && !typedForwardRef.current;
    if (queryChanged) typedForwardRef.current = false;
    if (!edited && !newResults) return;

    const menu = menuRef.current;
    const activateFirst = () =>
      inputRef.current?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
      );

    activateFirst();
    if (!menu) return;
    // RAC rebuilds the collection one render after the children or `items`
    // change, and rows rendered as children can arrive later still, after a
    // loading state. So until the query changes again, every change to the
    // rows activates the first one, unless it already is. Once people move
    // to another row, by key or by pointer, the rows are theirs: a page
    // loaded at the end of the list must not throw them back to the top.
    const observer = new MutationObserver(() => {
      const first = menu.querySelector('[role^="menuitem"]');
      if (first && !first.hasAttribute('data-focused')) activateFirst();
    });
    observer.observe(menu, { childList: true, subtree: true });
    const input = inputRef.current;
    const stop = () => observer.disconnect();
    const onKeyDown = (e: KeyboardEvent) => {
      if (NAVIGATION_KEYS.has(e.key)) stop();
    };
    input?.addEventListener('keydown', onKeyDown);
    menu.addEventListener('pointermove', stop);
    return () => {
      observer.disconnect();
      input?.removeEventListener('keydown', onKeyDown);
      menu.removeEventListener('pointermove', stop);
    };
  }, [inputValue, items]);

  return { inputRef: inputCallbackRef, menuRef };
};
