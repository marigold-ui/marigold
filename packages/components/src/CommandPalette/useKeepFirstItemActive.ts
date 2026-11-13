import { useCallback, useEffect, useRef } from 'react';

// Keep the first row active
// ---------------
// The palette keeps one row active at all times, as Spotlight, Raycast and
// cmdk do, so Enter always runs something. RAC activates the first row on
// open (`autoFocus`) and when the user types forward. It clears the row after
// a delete, paste or undo, and keeps the old row when async results replace
// the list. This hook covers those two cases. Once people pick another row,
// rows added later (the next page) keep their place.
//
// Known gap: when typing swaps in a different static list that starts with
// the same row, RAC activates nothing. Pressing `Home` there too races RAC's
// own handling.
//
// `Home` in the search input is RAC's own way to activate the first row, and
// DOM focus stays in the input. Returns refs for the input and the menu.
//
// Enter on stale rows
// ---------------
// Until the app has answered the last search, the first row is about to be
// replaced. Enter on it then waits and runs the first of the new rows, so a
// quick "jazz ↵" opens the jazz result and not the row that matched "ja". A
// row people picked runs right away, as does a click.
//
// The app has answered once its search no longer waits for the pause and,
// since the palette reported it, either `loading` went on and off again or
// `ANSWER_GRACE` passed without `loading`. The grace covers apps that set
// `loading` a little later (from their own effect or a transition) and apps
// without `loading`, whose rows change right away. Changed rows are no
// signal: the palette's own rows change at the same time.
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

const activeRow = '[role^="menuitem"][data-focused]';

/** How long the app has to set `loading` after a search, in ms. */
const ANSWER_GRACE = 100;

interface SearchStatus {
  /** Whether results are loading. */
  loading: boolean;
  /** Whether the app's search waits for people to pause typing. */
  searchWaiting: boolean;
}

export const useKeepFirstItemActive = (
  inputValue: string,
  items: unknown,
  { loading, searchWaiting }: SearchStatus
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const queryRef = useRef(inputValue);
  const itemsRef = useRef(items);
  const awaitingResultsRef = useRef(false);
  const typedForwardRef = useRef(false);
  // Whether people picked a row since the query last changed.
  const pickedRef = useRef(false);
  const enterWaitingRef = useRef(false);
  const heldKeyUpRef = useRef(false);
  const statusRef = useRef({ loading, searchWaiting });
  // How the app answered the last reported search. Answered up front, so
  // without a reported search only `loading` and the pause hold Enter.
  const answerRef = useRef({ sawLoading: false, graceOver: true });
  const graceTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const frameRef = useRef(0);

  const answered = useCallback(() => {
    const { loading, searchWaiting } = statusRef.current;
    const { sawLoading, graceOver } = answerRef.current;
    return !loading && !searchWaiting && (sawLoading || graceOver);
  }, []);

  const activateFirst = useCallback(
    () =>
      inputRef.current?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
      ),
    []
  );

  // A callback ref, so the listener follows the input whenever it mounts.
  // React's `onBeforeInput` is a polyfill without `inputType`.
  const inputCallbackRef = useCallback(
    (input: HTMLInputElement | null) => {
      inputRef.current = input;
      if (!input) return;
      const track = (e: InputEvent) => {
        typedForwardRef.current = FORWARD_TYPING.has(e.inputType);
      };
      // On the input itself, so it runs before RAC's handler, which React
      // calls from the root.
      const onKeyDown = (e: KeyboardEvent) => {
        if (NAVIGATION_KEYS.has(e.key)) {
          pickedRef.current = true;
          enterWaitingRef.current = false;
        }
        if (
          e.key === 'Enter' &&
          !e.isComposing &&
          !pickedRef.current &&
          !answered()
        ) {
          e.preventDefault();
          e.stopImmediatePropagation();
          enterWaitingRef.current = true;
          heldKeyUpRef.current = true;
        }
      };
      // The key press is held as a whole. RAC replays the keyup of the input
      // on the active row from a capturing listener on `document`, so this one
      // sits on `window` to run first.
      const onKeyUp = (e: KeyboardEvent) => {
        if (e.key !== 'Enter' || e.target !== input || !heldKeyUpRef.current)
          return;
        heldKeyUpRef.current = false;
        e.stopImmediatePropagation();
      };
      const win = input.ownerDocument.defaultView;
      input.addEventListener('beforeinput', track);
      input.addEventListener('keydown', onKeyDown);
      win?.addEventListener('keyup', onKeyUp, true);
      return () => {
        input.removeEventListener('beforeinput', track);
        input.removeEventListener('keydown', onKeyDown);
        win?.removeEventListener('keyup', onKeyUp, true);
        inputRef.current = null;
      };
    },
    [answered]
  );

  // A pointer that lands on a row picks it.
  const menuCallbackRef = useCallback((menu: HTMLDivElement | null) => {
    menuRef.current = menu;
    if (!menu) return;
    const onPointerMove = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest('[role^="menuitem"]'))
        pickedRef.current = true;
    };
    menu.addEventListener('pointermove', onPointerMove);
    return () => {
      menu.removeEventListener('pointermove', onPointerMove);
      menuRef.current = null;
    };
  }, []);

  // Runs the Enter that waited, once the app has answered. A frame later,
  // so the first of the new rows is active by then, and checked again there.
  const release = useCallback(() => {
    if (!enterWaitingRef.current || !answered()) return;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (!enterWaitingRef.current || !answered()) return;
      enterWaitingRef.current = false;
      // Cancelable like a real key press: RAC cancels it once the row ran,
      // otherwise it clicks the row a second time.
      inputRef.current?.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          bubbles: true,
          cancelable: true,
        })
      );
    });
  }, [answered]);

  useEffect(() => {
    statusRef.current = { loading, searchWaiting };
    if (loading) answerRef.current.sawLoading = true;
    release();
  }, [loading, searchWaiting, release]);

  useEffect(
    () => () => {
      clearTimeout(graceTimerRef.current);
      cancelAnimationFrame(frameRef.current);
    },
    []
  );

  // The palette calls this when it reports a search to the app.
  const searchReported = useCallback(() => {
    answerRef.current = {
      sawLoading: statusRef.current.loading,
      graceOver: false,
    };
    clearTimeout(graceTimerRef.current);
    graceTimerRef.current = setTimeout(() => {
      answerRef.current.graceOver = true;
      release();
    }, ANSWER_GRACE);
  }, [release]);

  useEffect(() => {
    const queryChanged = queryRef.current !== inputValue;
    const resultsArrived = itemsRef.current !== items;
    queryRef.current = inputValue;
    itemsRef.current = items;

    if (queryChanged) {
      awaitingResultsRef.current = true;
      // A new query starts over: nothing picked, and an Enter that waited
      // for the old one's rows is dropped.
      pickedRef.current = false;
      enterWaitingRef.current = false;
    }
    const newResults = resultsArrived && awaitingResultsRef.current;
    if (resultsArrived) awaitingResultsRef.current = false;
    // Forward typing over a static list is RAC's job. Anything else, also a
    // query set in code, counts as an edit. The flag only covers one change.
    const edited = queryChanged && !typedForwardRef.current;
    if (queryChanged) typedForwardRef.current = false;
    if (!edited && !newResults) return;

    const menu = menuRef.current;
    activateFirst();
    if (!menu) return;
    // RAC rebuilds the collection one render after the children or `items`
    // change, and rows rendered as children can arrive later still, after a
    // loading state. So until the query changes again, every change to the
    // rows activates the first one, unless it already is. Once people pick
    // another row, with the keys or by pointing at it, the rows are theirs: a
    // page loaded at the end must not throw them back to the top. A pointer
    // that only brushes the list picks nothing. And when no row is active at
    // all, say the picked one was replaced, the first one is activated anyway,
    // so Enter always runs something.
    const observer = new MutationObserver(() => {
      if (pickedRef.current && menu.querySelector(activeRow)) return;
      const first = menu.querySelector('[role^="menuitem"]');
      if (first && !first.hasAttribute('data-focused')) activateFirst();
    });
    observer.observe(menu, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [inputValue, items, activateFirst]);

  return {
    inputRef: inputCallbackRef,
    menuRef: menuCallbackRef,
    searchReported,
  };
};
