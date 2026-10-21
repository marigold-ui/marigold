import type { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Autocomplete, useFilter } from 'react-aria-components/Autocomplete';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { SearchField } from '../SearchField/SearchField';
import { intlMessages } from '../intl/messages';
import { usePopoverContext } from './Context';

// Props
// ---------------
type RemovedProps =
  'children' | 'disableAutoFocusFirst' | 'disableVirtualFocus';

export interface PopoverSearchProps extends Omit<
  RAC.AutocompleteProps<object>,
  RemovedProps
> {
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
   * The `<Popover.Content>` holding the collection to filter, e.g. a
   * `<ListView>`. Each item is matched by its `textValue`, or by its text when
   * it has none.
   */
  children: ReactNode;
}

// Component
// ---------------
/**
 * A search field that filters the collection in the `<Popover.Content>` it
 * wraps, built on React Aria's `Autocomplete` like `TagField`'s dropdown.
 * `Autocomplete` connects field and collection through context and renders no
 * element itself, so the field becomes its own row above the content and
 * stays in place while the results scroll.
 */
export const PopoverSearch = ({
  label,
  'aria-label': ariaLabel,
  placeholder,
  autoFocus = true,
  filter,
  children,
  ...props
}: PopoverSearchProps) => {
  const { classNames } = usePopoverContext();
  const { contains } = useFilter({ sensitivity: 'base' });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <Autocomplete {...props} filter={filter ?? contains}>
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
      {children}
    </Autocomplete>
  );
};
