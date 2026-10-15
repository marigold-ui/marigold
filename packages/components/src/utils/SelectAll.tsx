import type { ReactNode } from 'react';
import {
  Children,
  createContext,
  isValidElement,
  use,
  useEffect,
  useMemo,
} from 'react';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { Key, Selection } from '@react-types/shared';
import { Checkbox } from '../Checkbox/Checkbox';
import { intlMessages } from '../intl/messages';

// The select-all control for a GridListItem-backed collection, shared by
// ListView and SelectList — the two multi-select lists with no header row of
// their own.
//
// It renders *outside* the grid element instead of faking a `columnheader`
// inside it. A `<Table>` has real column semantics to head; a GridList is a
// single logical column whose rows carry one `gridcell` each, so there is no
// column for a header cell to belong to. The checkbox therefore owns its own
// accessible name through a visible label, and the region around it carries no
// role: it is chrome, not data. What the collection still owns is the
// alignment, because only the component can line the checkbox up with the row
// indicators (the padding is a custom property declared on the list itself).

// Context
// ---------------
export interface SelectAllContextValue {
  /** The keys a select-all covers: every item, minus the disabled ones. */
  keys: Key[];
  /** The collection's current selection, as its parent holds it. */
  selection: Selection;
  /** Called with the next checked state. The parent owns what "all" means. */
  onChange: (selected: boolean) => void;
  /** Whether the whole collection is disabled. */
  disabled?: boolean;
}

export const SelectAllContext = createContext<SelectAllContextValue | null>(
  null
);

const useSelectAll = () => {
  const context = use(SelectAllContext);

  if (!context) {
    throw new Error(
      'Marigold: a select-all header has to be a child of its own list — ' +
        '`<ListView.Header>` inside a `<ListView>`, `<SelectList.Header>` ' +
        'inside a `<SelectList>`.'
    );
  }

  return context;
};

// Keys
// ---------------
// Dev-only, and once per page: a missing `id` is an authoring mistake, and the
// same list re-renders often enough to turn a per-render warning into noise.
let hasWarnedMissingIds = false;

// Test-only: lets each test assert the warning without racing another file.
export const __resetMissingIdsWarning = () => {
  hasWarnedMissingIds = false;
};

interface SelectableKeysOptions<T> {
  /** The collection's children, with any header part already split off. */
  children: ReactNode | ((item: T) => ReactNode);
  /** The data of a dynamic collection, if the consumer passed one. */
  items?: Iterable<T>;
  disabledKeys?: Iterable<Key>;
  /** Warn about a missing `id` only where a select-all needs the keys. */
  warn?: boolean;
}

// `key` as well as `id`: a collection takes its item keys from either, and
// `key` is the older spelling still in use.
const idOf = (item: unknown) => {
  const candidate = item as { id?: Key; key?: Key } | null;
  return candidate?.id ?? candidate?.key;
};

/**
 * The keys a select-all may reach, read from the collection the consumer
 * passed: the data for a dynamic collection, the elements for a static one.
 *
 * Disabled items are left out, so a list with one disabled row still reads as
 * fully selected once every row the user *can* select is.
 */
export const useSelectableKeys = <T,>({
  children,
  items,
  disabledKeys,
  warn,
}: SelectableKeysOptions<T>): Key[] => {
  const { keys, hasMissingIds } = useMemo(() => {
    const disabled = new Set<Key>(disabledKeys ?? []);
    const candidates: (Key | undefined)[] = items
      ? Array.from(items, idOf)
      : Children.toArray(children as ReactNode).flatMap(child => {
          if (!isValidElement<{ id?: Key; disabled?: boolean }>(child)) {
            return [];
          }
          // A disabled item is skipped rather than reported as key-less.
          return child.props.disabled ? [] : [child.props.id];
        });

    return {
      keys: candidates.filter(
        (key): key is Key => key != null && !disabled.has(key)
      ),
      hasMissingIds: candidates.some(key => key == null),
    };
  }, [children, items, disabledKeys]);

  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' ||
      !warn ||
      !hasMissingIds ||
      hasWarnedMissingIds
    ) {
      return;
    }

    hasWarnedMissingIds = true;
    console.warn(
      'Marigold: a select-all needs an `id` on every item to know what it ' +
        'covers, and an item without one is left out of it.'
    );
  }, [warn, hasMissingIds]);

  return keys;
};

// Component
// ---------------
export interface SelectAllCheckboxProps {
  /** Replaces the default "Select all" label. */
  children?: ReactNode;
}

export const SelectAllCheckbox = ({ children }: SelectAllCheckboxProps) => {
  const { keys, selection, onChange, disabled } = useSelectAll();
  const stringFormatter = useLocalizedStringFormatter(intlMessages, 'marigold');

  // Counted against the selectable keys rather than read off `selection.size`:
  // `'all'` carries no size, and a key that is selected but since disabled or
  // removed must not read as a full selection.
  const selectedCount =
    selection === 'all'
      ? keys.length
      : keys.filter(key => selection.has(key)).length;
  const checked = keys.length > 0 && selectedCount === keys.length;

  return (
    <Checkbox
      checked={checked}
      indeterminate={selectedCount > 0 && !checked}
      disabled={disabled}
      onChange={onChange}
      label={children ?? stringFormatter.format('selectAll')}
    />
  );
};
