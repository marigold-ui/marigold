import type { Key, ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import type RAC from 'react-aria-components';
import { Menu } from 'react-aria-components/Menu';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Search } from '../icons/Search';
import { intlMessages } from '../intl/messages';
import { useCommandPalette, useCommandPaletteEmptyState } from './Context';

// Props
// ---------------
export interface CommandPaletteListProps<T extends object> {
  /**
   * The groups and items, or a render function when `items` is used.
   */
  children: ReactNode | ((item: T) => ReactNode);

  /**
   * Items for a dynamic collection, e.g. results of a server-side search.
   */
  items?: Iterable<T>;

  /**
   * Values that invalidate the cached items, like a hook's dependency array.
   */
  dependencies?: RAC.MenuProps<T>['dependencies'];

  /**
   * Handler that is called when an item is chosen. The palette closes
   * afterwards.
   */
  onAction?: (key: Key) => void;
}

// Default empty state
// ---------------
const DefaultEmptyState = ({ query }: { query: string }) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  if (!query) return stringFormatter.format('commandPaletteTypeToSearch');
  return (
    <>
      <Search aria-hidden="true" />
      <strong>{stringFormatter.format('noResultsFor', { query })}</strong>
      <span>{stringFormatter.format('noResultsHint')}</span>
    </>
  );
};

// Keep the first row active
// ---------------
// The palette keeps one row active at all times, as Spotlight, Raycast and
// cmdk do, so Enter always runs something. RAC activates the first row on
// open (`autoFocus`) and when the user types forward. It clears the row after
// a delete, paste or undo, and keeps the old row when async results replace
// the list. This hook covers those two cases. Results loaded for the same
// query (the next page) keep the user's place.
//
// Known gap: when typing swaps in a different static list that starts with
// the same row, RAC activates nothing. Pressing `Home` there too races RAC's
// own handling.
//
// `Home` in the search input is RAC's own way to activate the first row, and
// DOM focus stays in the input.
const FORWARD_TYPING = new Set([
  'insertText',
  'insertCompositionText',
  'insertFromComposition',
]);

const getInput = (menu: HTMLElement | null) =>
  menu?.closest('[role="dialog"]')?.querySelector('input') ?? null;

const useKeepFirstItemActive = (inputValue: string, items: unknown) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const queryRef = useRef(inputValue);
  const itemsRef = useRef(items);
  const awaitingResultsRef = useRef(false);
  const typedForwardRef = useRef(false);

  useEffect(() => {
    const input = getInput(menuRef.current);
    if (!input) return;
    const track = (e: InputEvent) => {
      typedForwardRef.current = FORWARD_TYPING.has(e.inputType);
    };
    input.addEventListener('beforeinput', track);
    return () => input.removeEventListener('beforeinput', track);
  }, []);

  useEffect(() => {
    const queryChanged = queryRef.current !== inputValue;
    const resultsArrived = itemsRef.current !== items;
    queryRef.current = inputValue;
    itemsRef.current = items;

    if (queryChanged) awaitingResultsRef.current = true;
    const newResults = resultsArrived && awaitingResultsRef.current;
    if (resultsArrived) awaitingResultsRef.current = false;
    // Forward typing over a static list is RAC's job.
    const edited = queryChanged && !typedForwardRef.current;
    if (!edited && !newResults) return;

    const menu = menuRef.current;
    const activateFirst = () =>
      getInput(menu)?.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Home', bubbles: true })
      );

    activateFirst();
    // RAC rebuilds the collection one render after the children or `items`
    // change, so the press above can land on the old rows. Press again once
    // the new rows are in, unless the first row is already active.
    if (!menu) return;
    const observer = new MutationObserver(() => {
      observer.disconnect();
      const first = menu.querySelector('[role^="menuitem"]');
      if (first && !first.hasAttribute('data-focused')) activateFirst();
    });
    observer.observe(menu, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [inputValue, items]);

  return menuRef;
};

// Component
// ---------------
export const CommandPaletteList = <T extends object>({
  children,
  items,
  dependencies,
  onAction,
}: CommandPaletteListProps<T>) => {
  const { setOpen, inputValue, classNames } = useCommandPalette();
  const { loading, hasEmpty, setTarget } = useCommandPaletteEmptyState();
  const menuRef = useKeepFirstItemActive(inputValue, items);

  return (
    <Menu
      ref={menuRef}
      items={items}
      dependencies={dependencies}
      className={classNames.list}
      // The first row is active on open, so Enter runs it right away. Focus
      // stays in the input, the row only gets virtual focus.
      autoFocus="first"
      onAction={key => {
        onAction?.(key);
        setOpen(false);
      }}
      // `.Empty` and `.Loading` portal into this element, so their content
      // sits inside the menu where RAC announces it. Without either part, a
      // default "no results" message shows.
      renderEmptyState={() => (
        <div className={classNames.empty}>
          {!loading && !hasEmpty && <DefaultEmptyState query={inputValue} />}
          {/* A portal target must not hold React children of its own. */}
          <div ref={setTarget} className="contents" />
        </div>
      )}
    >
      {children}
    </Menu>
  );
};
