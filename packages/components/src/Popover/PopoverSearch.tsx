import { use, useLayoutEffect } from 'react';
import type RAC from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useControlledState } from '@react-stately/utils';
import { SearchField } from '../SearchField/SearchField';
import { intlMessages } from '../intl/messages';
import { PopoverSearchContext, usePopoverContext } from './Context';

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
 * spanning the popover above the results. Under a
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

  // The search owns the text, so a controlled `inputValue` is the only source
  // of truth: a keystroke the consumer rejects or rewrites never reaches the
  // field or the filter.
  const [value, setValue] = useControlledState(
    inputValue,
    defaultInputValue ?? '',
    onInputChange
  );

  useLayoutEffect(() => {
    optionsRef.current = { filter, onInputChange: setValue };
  });

  useLayoutEffect(() => setInputValue(value), [value, setInputValue]);

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
