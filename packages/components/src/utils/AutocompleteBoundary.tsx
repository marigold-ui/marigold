import type { ReactNode } from 'react';
import { use } from 'react';
import {
  FieldInputContext,
  SelectableCollectionContext,
} from 'react-aria-components/Autocomplete';
import { Provider } from 'react-aria-components/slots';

/**
 * Stops an outer React Aria `Autocomplete` at an overlay's edge. Its contexts
 * pass through portals like any React context, and `ListBox`, `Menu` and
 * `GridList` all read them, so without this boundary a `<Popover.Search>`
 * would also filter the options of a `Select` or the items of a `Menu` opened
 * from inside the popover. An `Autocomplete` inside the overlay (as in
 * `TagField`) provides its contexts again and is unaffected.
 *
 * `disabled` lets the outer contexts through. The element tree stays the
 * same either way, so toggling it does not remount the children.
 */
export const AutocompleteBoundary = ({
  disabled = false,
  children,
}: {
  disabled?: boolean;
  children?: ReactNode;
}) => {
  const collection = use(SelectableCollectionContext);
  const input = use(FieldInputContext);

  return (
    <Provider
      values={[
        [SelectableCollectionContext, disabled ? collection : null],
        [FieldInputContext, disabled ? input : null],
      ]}
    >
      {children}
    </Provider>
  );
};
