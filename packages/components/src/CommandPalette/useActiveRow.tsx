import type { ReactNode } from 'react';
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MenuStateContext } from 'react-aria-components/Menu';
import { useDevWarning } from '../utils/useDevWarning';

// Keep the first row active
// ---------------
// The palette keeps one row active at all times, as Spotlight, Raycast and
// cmdk do, so Enter always runs something. The first row does it itself:
// it reads the menu's state from RAC's `MenuStateContext` and makes itself
// the active row when
//
// - no row is active (RAC clears it after a delete, paste or undo),
// - the active row is gone (the app replaced the rows), or
// - nobody picked a row since the query changed (new rows arrived while an
//   older row further down is still active).
//
// Picking a row, with the arrow keys or by pointing at it, keeps it active
// until the query changes, so a page loaded at the end stays where it is.
//
// Enter on stale rows
// ---------------
// Until the app has answered the last search, the first row is about to be
// replaced. Enter then waits and runs the first of the new rows, so a quick
// "jazz ↵" opens the jazz result and not the row that matched "ja". A row
// people picked runs right away, as does a click.
//
// The app has answered once its search no longer waits for the pause and,
// since the palette reported it, either `loading` went on and off again or
// `ANSWER_GRACE` passed without `loading`. The grace covers apps that set
// `loading` a little later and apps without `loading`.

// Keys that pick a row.
const NAVIGATION_KEYS = new Set([
  'ArrowDown',
  'ArrowUp',
  'PageDown',
  'PageUp',
  'Home',
  'End',
]);

const rowSelector = '[role^="menuitem"]';

// RAC's collection keys, which leave out React's `bigint`.
type Key = string | number;

/** How long the app has to set `loading` after a search, in ms. */
const ANSWER_GRACE = 100;

interface SearchStatus {
  /** Whether results are loading. */
  loading: boolean;
  /** Whether the app's search waits for people to pause typing. */
  searchWaiting: boolean;
}

interface ActiveRowContextValue {
  /** Whether people picked a row since the query last changed. */
  picked: () => boolean;
  /** Whether an Enter waits for the app's answer. */
  enterWaiting: () => boolean;
  /** Whether the app has answered the last search. */
  answered: () => boolean;
  /** Runs the Enter that waited, on the given row. */
  releaseEnter: (row: HTMLElement) => void;
  /**
   * What the values above depend on. A change re-renders the rows, so they
   * check again.
   */
  status: {
    query: string;
    loading: boolean;
    searchWaiting: boolean;
    revision: number;
  };
}

export const ActiveRowContext = createContext<ActiveRowContextValue | null>(
  null
);

export const useActiveRow = (
  inputValue: string,
  { loading, searchWaiting }: SearchStatus
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pickedRef = useRef(false);
  const enterWaitingRef = useRef(false);
  const statusRef = useRef({ loading, searchWaiting });
  // How the app answered the last reported search. Answered up front, so
  // without a reported search only `loading` and the pause hold Enter.
  const answerRef = useRef({ sawLoading: false, graceOver: true });
  const graceTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [revision, setRevision] = useState(0);
  const recheck = useCallback(() => setRevision(r => r + 1), []);

  const answered = useCallback(() => {
    const { loading, searchWaiting } = statusRef.current;
    const { sawLoading, graceOver } = answerRef.current;
    return !loading && !searchWaiting && (sawLoading || graceOver);
  }, []);

  // A callback ref, so the listeners follow the input whenever it mounts.
  const inputCallbackRef = useCallback(
    (input: HTMLInputElement | null) => {
      inputRef.current = input;
      if (!input) return;
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
          // Another Enter while one waits joins it, the row runs once.
          (!answered() || enterWaitingRef.current)
        ) {
          e.preventDefault();
          e.stopImmediatePropagation();
          enterWaitingRef.current = true;
        }
      };
      input.addEventListener('keydown', onKeyDown);
      return () => {
        input.removeEventListener('keydown', onKeyDown);
        inputRef.current = null;
      };
    },
    [answered]
  );

  // A pointer that lands on a row picks it.
  const menuCallbackRef = useCallback((menu: HTMLDivElement | null) => {
    if (!menu) return;
    const onPointerMove = (e: PointerEvent) => {
      if (e.target instanceof Element && e.target.closest(rowSelector))
        pickedRef.current = true;
    };
    menu.addEventListener('pointermove', onPointerMove);
    return () => menu.removeEventListener('pointermove', onPointerMove);
  }, []);

  // A new query starts over: nothing picked, and an Enter that waited for
  // the old one's rows is dropped. Before paint, so the rows check with it.
  const queryRef = useRef(inputValue);
  useLayoutEffect(() => {
    if (queryRef.current === inputValue) return;
    queryRef.current = inputValue;
    pickedRef.current = false;
    enterWaitingRef.current = false;
  }, [inputValue]);

  // The native Enter listener reads the status, so it updates before paint.
  useLayoutEffect(() => {
    statusRef.current = { loading, searchWaiting };
    if (loading) answerRef.current.sawLoading = true;
  }, [loading, searchWaiting]);

  useEffect(() => () => clearTimeout(graceTimerRef.current), []);

  // The palette calls this when it reports a search to the app.
  const searchReported = useCallback(() => {
    answerRef.current = {
      sawLoading: statusRef.current.loading,
      graceOver: false,
    };
    clearTimeout(graceTimerRef.current);
    graceTimerRef.current = setTimeout(() => {
      answerRef.current.graceOver = true;
      recheck();
    }, ANSWER_GRACE);
  }, [recheck]);

  // RAC runs a row from its click handler, whether it was pressed, clicked
  // or reached with Enter: the row's `onAction`, the menu's, a link, and
  // closing. A click runs all of it, so the palette copies none of it.
  const releaseEnter = useCallback(
    (row: HTMLElement) => {
      if (!enterWaitingRef.current || !answered()) return;
      enterWaitingRef.current = false;
      row.click();
    },
    [answered]
  );

  const context = useMemo<ActiveRowContextValue>(
    () => ({
      picked: () => pickedRef.current,
      enterWaiting: () => enterWaitingRef.current,
      answered,
      releaseEnter,
      status: { query: inputValue, loading, searchWaiting, revision },
    }),
    [answered, releaseEnter, inputValue, loading, searchWaiting, revision]
  );

  return {
    inputRef: inputCallbackRef,
    menuRef: menuCallbackRef,
    searchReported,
    context,
  };
};

// The first row
// ---------------
interface MenuCollection {
  getFirstKey(): Key | null;
  getKeyAfter(key: Key): Key | null;
  getItem(key: Key): { type: string } | null;
}

// The first row people can act on. Sections and their headers are skipped,
// and so are disabled rows.
const firstRowKey = (
  collection: MenuCollection,
  isDisabled: (key: Key) => boolean
) => {
  for (let key = collection.getFirstKey(); key != null;) {
    if (collection.getItem(key)?.type === 'item' && !isDisabled(key))
      return key;
    key = collection.getKeyAfter(key);
  }
  return null;
};

// Rendered in every row, inside the menu, where RAC provides its state. Only
// the first row acts.
const FirstRowRule = ({ id }: { id: Key }) => {
  const state = use(MenuStateContext);
  const active = use(ActiveRowContext);
  // Finds the row this rule sits in, to run it.
  const markerRef = useRef<HTMLSpanElement>(null);
  useDevWarning(
    !state,
    '[CommandPalette] The rows cannot reach `MenuStateContext`, so the ' +
      'first row no longer keeps itself active.'
  );

  // RAC hands out a new `state` whenever the rows or the active row change,
  // so this runs exactly then.
  useEffect(() => {
    if (!state || !active) return;
    const { collection, selectionManager: manager } = state;
    if (firstRowKey(collection, key => manager.isDisabled(key)) !== id) return;

    const current = manager.focusedKey;
    const isActive = current === id && manager.isFocused;
    const gone = current != null && collection.getItem(current) == null;
    if (!isActive && (current == null || gone || !active.picked())) {
      manager.setFocused(true);
      manager.setFocusedKey(id);
      return;
    }
    // The palette learns of the answer one render before RAC has turned the
    // new rows into its collection, so this row may be one the answer
    // replaces. RAC builds the new collection in a render React runs before
    // this microtask. The check reads RAC's live state: only the row that is
    // still the active one runs.
    if (isActive && active.enterWaiting())
      queueMicrotask(() => {
        const first = firstRowKey(state.collection, key =>
          manager.isDisabled(key)
        );
        const row = markerRef.current?.closest<HTMLElement>(rowSelector);
        if (manager.focusedKey === id && first === id && row)
          active.releaseEnter(row);
      });
  }, [state, active, id]);

  return <span ref={markerRef} hidden />;
};

/** Adds the first-row rule to a row's content. */
export const withFirstRowRule = (id: Key, content: ReactNode) => (
  <>
    {content}
    <FirstRowRule id={id} />
  </>
);
