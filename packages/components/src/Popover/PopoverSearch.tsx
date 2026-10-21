import type { ReactNode, RefObject } from 'react';
import {
  createContext,
  use,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type RAC from 'react-aria-components';
import { Autocomplete, useFilter } from 'react-aria-components/Autocomplete';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { SearchField } from '../SearchField/SearchField';
import { intlMessages } from '../intl/messages';
import { AutocompleteBoundary } from '../utils/AutocompleteBoundary';
import { usePopoverContext } from './Context';

// Context
// ---------------
interface PopoverSearchOptions {
  filter?: RAC.AutocompleteProps<object>['filter'];
  onInputChange?: (value: string) => void;
}

interface PopoverSearchContextValue {
  /** Marks a search as present; returns the cleanup that unmarks it. */
  registerSearch: () => () => void;
  /** Latest callbacks of the mounted search, read when they are called. */
  optionsRef: RefObject<PopoverSearchOptions>;
  setInputValue: (value: string) => void;
}

const PopoverSearchContext = createContext<PopoverSearchContextValue | null>(
  null
);

// Scope
// ---------------
/**
 * Wraps the popover's children in React Aria's `Autocomplete`, which links a
 * search field to a collection through context and renders no element. That
 * is what lets `<Popover.Search>` sit next to `<Popover.Content>` instead of
 * around it. The scope owns the input value, so the search only registers
 * itself and its options.
 */
export const PopoverSearchScope = ({ children }: { children?: ReactNode }) => {
  const { contains } = useFilter({ sensitivity: 'base' });
  const [hasSearch, setHasSearch] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const optionsRef = useRef<PopoverSearchOptions>({});

  const registerSearch = useCallback(() => {
    setHasSearch(true);
    return () => setHasSearch(false);
  }, []);
  const ctx = useMemo(
    () => ({ registerSearch, optionsRef, setInputValue }),
    [registerSearch]
  );
  // Stable, so React Aria only re-filters the collection when the text changes.
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    optionsRef.current.onInputChange?.(value);
  }, []);
  const filter = useCallback<NonNullable<PopoverSearchOptions['filter']>>(
    (textValue, input, node) =>
      (optionsRef.current.filter ?? contains)(textValue, input, node),
    [contains]
  );

  return (
    <PopoverSearchContext value={ctx}>
      <Autocomplete<object>
        inputValue={inputValue}
        onInputChange={handleInputChange}
        filter={filter}
        disableVirtualFocus={!hasSearch}
      >
        {/* Without a mounted search, a collection in the popover (say a
            `ListView`) would switch to virtual focus with no field to drive
            it, so the contexts only pass through while one is mounted. */}
        <AutocompleteBoundary disabled={hasSearch}>
          {children}
        </AutocompleteBoundary>
      </Autocomplete>
    </PopoverSearchContext>
  );
};

// Props
// ---------------
export interface PopoverSearchProps {
  /**
   * Accessible label of the search field. The field has no visible label, it
   * is a row of the popover, so name what is searched, e.g. "Search team
   * members".
   * @default localized "Search"
   */
  'aria-label'?: string;

  /**
   * Placeholder text of the search field. Say what the user can search for,
   * since the placeholder is the only visible hint.
   */
  placeholder?: string;

  /**
   * Whether the search field takes focus when the popover opens.
   * @default true
   */
  autoFocus?: boolean;

  /**
   * The current search text (controlled).
   */
  inputValue?: string;

  /**
   * The initial search text (uncontrolled).
   */
  defaultInputValue?: string;

  /**
   * Handler that is called when the search text changes.
   */
  onInputChange?: (value: string) => void;

  /**
   * Decides whether an item matches the search text. Items are matched by
   * their `textValue`, or by their text when they have none.
   * @default case- and accent-insensitive "contains"
   */
  filter?: RAC.AutocompleteProps<object>['filter'];
}

// Component
// ---------------
/**
 * A search field that filters the collection in the popover's
 * `<Popover.Content>`, e.g. a `<ListView>`. It renders as a borderless row
 * spanning the popover, so it stays in view while the results scroll. Under a
 * `<Title>` it sits between two dividers. Without a title it becomes the
 * popover's header (name the popover with `aria-label` then). Tab moves into
 * the results: React Aria keeps real focus in a `ListView` (a `GridList`),
 * because its rows hold their own controls. A `ListBox` would take arrow keys
 * from the field.
 */
export const PopoverSearch = ({
  'aria-label': ariaLabel,
  placeholder,
  autoFocus = true,
  inputValue,
  defaultInputValue,
  onInputChange,
  filter,
}: PopoverSearchProps) => {
  const { classNames } = usePopoverContext();
  // Always set: `<Popover>` renders the scope inside the popover context, and
  // `usePopoverContext` above already throws outside of it.
  const { registerSearch, optionsRef, setInputValue } =
    use(PopoverSearchContext)!;
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  useLayoutEffect(() => registerSearch(), [registerSearch]);

  useLayoutEffect(() => {
    optionsRef.current = { filter, onInputChange };
  });

  // Seed once from the uncontrolled default, then follow a controlled value.
  const [defaultValue] = useState(defaultInputValue);
  useLayoutEffect(() => {
    const value = inputValue ?? defaultValue;
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [inputValue, defaultValue, setInputValue]);

  return (
    <div data-slot="search" className={classNames.search}>
      <SearchField
        aria-label={ariaLabel ?? stringFormatter.format('search')}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </div>
  );
};
