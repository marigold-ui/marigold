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
import {
  Autocomplete,
  FieldInputContext,
  SelectableCollectionContext,
  useFilter,
} from 'react-aria-components/Autocomplete';
import { Provider } from 'react-aria-components/slots';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { SearchField } from '../SearchField/SearchField';
import { intlMessages } from '../intl/messages';
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
 * Passes React Aria's autocomplete contexts through only while a search is
 * mounted. Without one, a collection in the popover (say a `ListView`) would
 * switch to virtual focus with no field to drive it.
 */
const SearchGate = ({
  active,
  children,
}: {
  active: boolean;
  children?: ReactNode;
}) => {
  const collection = use(SelectableCollectionContext);
  const input = use(FieldInputContext);

  return (
    <Provider
      values={[
        [SelectableCollectionContext, active ? collection : null],
        [FieldInputContext, active ? input : null],
      ]}
    >
      {children}
    </Provider>
  );
};

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

  return (
    <PopoverSearchContext value={ctx}>
      <Autocomplete<object>
        inputValue={inputValue}
        onInputChange={value => {
          setInputValue(value);
          optionsRef.current.onInputChange?.(value);
        }}
        filter={(textValue, input, node) =>
          (optionsRef.current.filter ?? contains)(textValue, input, node)
        }
        disableVirtualFocus={!hasSearch}
      >
        <SearchGate active={hasSearch}>{children}</SearchGate>
      </Autocomplete>
    </PopoverSearchContext>
  );
};

// Props
// ---------------
export interface PopoverSearchProps {
  /**
   * Visible label of the search field. Without it, the field is labelled by
   * `aria-label`, and falls back to a localized "Search".
   */
  label?: ReactNode;

  /**
   * Accessible label of the search field when there is no visible `label`.
   */
  'aria-label'?: string;

  /**
   * Placeholder text of the search field.
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
 * `<Popover.Content>`, e.g. a `<ListView>`. It renders as its own row, so it
 * stays in view while the results scroll. Tab moves into the results: React
 * Aria keeps real focus in a `ListView` (a `GridList`), because its rows hold
 * their own controls. A `ListBox` would take arrow keys from the field.
 */
export const PopoverSearch = ({
  label,
  'aria-label': ariaLabel,
  placeholder,
  autoFocus = true,
  inputValue,
  defaultInputValue,
  onInputChange,
  filter,
}: PopoverSearchProps) => {
  const { classNames } = usePopoverContext();
  const search = use(PopoverSearchContext);
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  if (search === null) {
    throw new Error(
      'Popover sub-components must be used within a <Popover> component.'
    );
  }

  const { registerSearch, optionsRef, setInputValue } = search;

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
        label={label}
        aria-label={
          label ? undefined : (ariaLabel ?? stringFormatter.format('search'))
        }
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </div>
  );
};
