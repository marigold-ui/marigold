import type { KeyboardEvent, PointerEvent, ReactNode, RefObject } from 'react';
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { setInteractionModality } from 'react-aria-components';
import { MenuStateContext } from 'react-aria-components/Menu';
import { useDevWarning } from '../utils/useDevWarning';

// Keeps one row active so Enter always runs something. The first row makes
// itself active when no row is, the active row is gone, or nobody picked a
// row since the query changed. Enter waits while the app answers the search,
// then runs the first new row. A picked row runs at once.
//
// RAC's autocomplete already activates the first row on open and while
// typing forward. It leaves no row active after deleting, or when async
// results replace the rows, and runs Enter on whatever row is active.

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

/** What people did since the query last changed. */
type Intent = 'none' | 'picked' | 'enterWaiting';

interface SearchStatus {
  loading: boolean;
  /** Whether the app's search waits for people to pause typing. */
  searchWaiting: boolean;
  /** The search last reported to the app, `null` when the app doesn't search. */
  search: object | null;
}

interface ActiveRowContextValue {
  intent: () => Intent;
  /** Whether the app has answered the last search. */
  answered: boolean;
  /** Runs the Enter that waited, on the given row. */
  releaseEnter: (row: HTMLElement) => void;
}

export const ActiveRowContext = createContext<ActiveRowContextValue | null>(
  null
);

export const useActiveRow = (
  inputValue: string,
  { loading, searchWaiting, search }: SearchStatus
) => {
  // A new search waits for the app's answer: `loading` going on and off, or
  // `ANSWER_GRACE` passing without it (apps that set `loading` late, or
  // never). Reset during render, so no commit sees the old answer.
  const [answer, setAnswer] = useState(() => ({
    search,
    sawLoading: loading,
    graceOver: search === null,
  }));
  if (answer.search !== search) {
    setAnswer({ search, sawLoading: loading, graceOver: search === null });
  } else if (loading && !answer.sawLoading) {
    setAnswer({ ...answer, sawLoading: true });
  }
  useEffect(() => {
    if (answer.graceOver) return;
    const timer = setTimeout(
      () =>
        setAnswer(current =>
          current.search === search ? { ...current, graceOver: true } : current
        ),
      ANSWER_GRACE
    );
    return () => clearTimeout(timer);
  }, [answer.graceOver, search]);
  const answered =
    !loading && !searchWaiting && (answer.sawLoading || answer.graceOver);

  // Tagged with its query, so a new query starts over at `none`.
  const intentRef = useRef<{ query: string; intent: Intent }>({
    query: inputValue,
    intent: 'none',
  });
  const intent = useCallback(
    () =>
      intentRef.current.query === inputValue
        ? intentRef.current.intent
        : 'none',
    [inputValue]
  );
  const setIntent = useCallback(
    (next: Intent) => {
      intentRef.current = { query: inputValue, intent: next };
    },
    [inputValue]
  );

  // A capture handler, so it runs before RAC's `onKeyDown` and can hold
  // Enter back from it.
  const onKeyDownCapture = (e: KeyboardEvent<HTMLInputElement>) => {
    // RAC leaves Shift+Home/End to the input while no row is active, so
    // they only select text there.
    const selectsText =
      e.shiftKey &&
      (e.key === 'Home' || e.key === 'End') &&
      !e.currentTarget.hasAttribute('aria-activedescendant');
    if (NAVIGATION_KEYS.has(e.key) && !selectsText) {
      setIntent('picked');
    } else if (
      e.key === 'Enter' &&
      !e.nativeEvent.isComposing &&
      intent() !== 'picked' &&
      // Another Enter while one waits joins it, the row runs once.
      (!answered || intent() === 'enterWaiting')
    ) {
      e.preventDefault();
      e.stopPropagation();
      setIntent('enterWaiting');
    }
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.target instanceof Element && e.target.closest(rowSelector))
      setIntent('picked');
  };

  // RAC runs a row from its click handler, whether it was pressed, clicked
  // or reached with Enter: the row's `onAction`, the menu's, a link, and
  // closing. A click runs all of it, so the palette copies none of it.
  const releaseEnter = useCallback(
    (row: HTMLElement) => {
      if (intent() !== 'enterWaiting' || !answered) return;
      setIntent('none');
      row.click();
      // A click sets the modality to `virtual`. RAC sets it back after its
      // own Enter, so focus rings keep showing for keyboard users.
      setInteractionModality('keyboard');
    },
    [intent, setIntent, answered]
  );

  const context = useMemo<ActiveRowContextValue>(
    () => ({ intent, answered, releaseEnter }),
    [intent, answered, releaseEnter]
  );

  return {
    inputProps: { onKeyDownCapture },
    menuProps: { onPointerMove },
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

interface FirstRowRuleProps {
  id: Key;
  /** The row this rule sits in, to run it. */
  rowRef: RefObject<HTMLElement | null>;
}

// A component in the row's content: the item component itself only renders
// while RAC builds the collection, where `MenuStateContext` doesn't exist.
// Rendered in every row, only the first row acts.
export const FirstRowRule = ({ id, rowRef }: FirstRowRuleProps): ReactNode => {
  const state = use(MenuStateContext);
  const active = use(ActiveRowContext);
  useDevWarning(
    !state,
    '[CommandPalette] The rows cannot reach `MenuStateContext`, so the ' +
      'first row no longer keeps itself active.'
  );

  // RAC hands out a new `state` on every menu render, so this runs in every
  // row each time. Only the first row gets past the check below.
  useEffect(() => {
    if (!state || !active) return;
    const { collection, selectionManager: manager } = state;
    if (firstRowKey(collection, key => manager.isDisabled(key)) !== id) return;

    const current = manager.focusedKey;
    const isActive = current === id && manager.isFocused;
    const gone = current != null && collection.getItem(current) == null;
    if (
      !isActive &&
      (current == null || gone || active.intent() !== 'picked')
    ) {
      manager.setFocused(true);
      manager.setFocusedKey(id);
      return;
    }
    // The palette learns of the answer one render before RAC has turned the
    // new rows into its collection, so this row may be one the answer
    // replaces. RAC builds the new collection in a render React runs before
    // this microtask, and the new first row makes itself active there. RAC
    // reads `focusedKey` through a ref, so the check below sees that, while
    // `state` is still this render's: only the row that is still active runs.
    if (isActive && active.intent() === 'enterWaiting')
      queueMicrotask(() => {
        const row = rowRef.current;
        if (manager.focusedKey === id && row?.isConnected)
          active.releaseEnter(row);
      });
  }, [state, active, id, rowRef]);

  return null;
};
