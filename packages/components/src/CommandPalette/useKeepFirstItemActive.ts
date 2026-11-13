import { useCallback, useEffect, useRef } from 'react';

// Keep the first row active
// ---------------
// The palette keeps one row active at all times, as Spotlight, Raycast and
// cmdk do, so Enter always runs something. RAC activates the first row on
// open (`autoFocus`) and when the user types forward. It clears the row after
// a delete, paste or undo, keeps the old row when async results replace the
// list, and activates nothing when forward typing removes the active row,
// for example when the search narrows to a group. This hook covers those
// cases. Once people pick another row, rows added later (the next page) keep
// their place.
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
//
// Once answered, the Enter still waits for the rows: until they stopped
// changing for a frame and the first one is active. RAC moves the active row
// a moment after new rows arrive, up to half a second when the old active row
// is gone, and an Enter before that runs the old row or nothing at all.

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

const row = '[role^="menuitem"]';
const activeRow = `${row}[data-focused]`;

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
  // Stops watching the rows for a waiting Enter.
  const stopWatchingRef = useRef<() => void>(undefined);

  // Drops a waiting Enter and stops watching the rows for it.
  const dropEnter = useCallback(() => {
    enterWaitingRef.current = false;
    stopWatchingRef.current?.();
  }, []);

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
          dropEnter();
        }
        if (
          e.key === 'Enter' &&
          !e.isComposing &&
          !pickedRef.current &&
          // Another Enter while one waits joins it, the row runs once.
          (!answered() || enterWaitingRef.current)
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
    [answered, dropEnter]
  );

  // A pointer that lands on a row picks it.
  const menuCallbackRef = useCallback((menu: HTMLDivElement | null) => {
    menuRef.current = menu;
    if (!menu) return;
    const onPointerMove = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest(row))
        pickedRef.current = true;
    };
    menu.addEventListener('pointermove', onPointerMove);
    return () => {
      menu.removeEventListener('pointermove', onPointerMove);
      menuRef.current = null;
    };
  }, []);

  // Runs the Enter that waited, once the app has answered and the first of
  // the new rows is active. Checked a frame after the rows last changed, and
  // the rows are only watched while the Enter waits.
  const release = useCallback(() => {
    const menu = menuRef.current;
    if (!menu || !enterWaitingRef.current || !answered()) return;
    stopWatchingRef.current?.();
    let frame = 0;
    const settle = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    };
    const observer = new MutationObserver(settle);
    const stop = () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      stopWatchingRef.current = undefined;
    };
    const check = () => {
      if (!enterWaitingRef.current || !answered()) return stop();
      if (!menu.querySelector(row)?.hasAttribute('data-focused')) return;
      stop();
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
    };
    stopWatchingRef.current = stop;
    observer.observe(menu, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-focused'],
    });
    settle();
  }, [answered]);

  useEffect(() => {
    statusRef.current = { loading, searchWaiting };
    if (loading) answerRef.current.sawLoading = true;
    release();
  }, [loading, searchWaiting, release]);

  useEffect(
    () => () => {
      clearTimeout(graceTimerRef.current);
      stopWatchingRef.current?.();
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
      dropEnter();
    }
    const newResults = resultsArrived && awaitingResultsRef.current;
    if (resultsArrived) awaitingResultsRef.current = false;
    // Forward typing is RAC's job, so the rows are only watched, without
    // pressing `Home` now, which would race RAC's handling of the keystroke.
    // Anything else, also a query set in code, counts as an edit. The flag
    // only covers one change.
    const edited = queryChanged && !typedForwardRef.current;
    if (queryChanged) typedForwardRef.current = false;
    const activateNow = edited || newResults;
    if (!activateNow && !queryChanged) return;

    const menu = menuRef.current;
    if (activateNow) activateFirst();
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
    //
    // After forward typing the active row is RAC's, and the hook only steps
    // in when there is none: RAC activates nothing when typing removes the
    // active row, as narrowing to a group or server rows replacing earlier
    // ones do. `Home` then waits for the rows, so it never races RAC.
    const observer = new MutationObserver(() => {
      const active = menu.querySelector(activeRow);
      if (active && (pickedRef.current || !activateNow)) return;
      const first = menu.querySelector(row);
      if (first && !first.hasAttribute('data-focused')) activateFirst();
    });
    observer.observe(menu, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [inputValue, items, activateFirst, dropEnter]);

  return {
    inputRef: inputCallbackRef,
    menuRef: menuCallbackRef,
    searchReported,
  };
};
