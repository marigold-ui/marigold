import type { ReactNode } from 'react';
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
 */
export const AutocompleteBoundary = ({
  children,
}: {
  children?: ReactNode;
}) => (
  <Provider
    values={[
      [SelectableCollectionContext, null],
      [FieldInputContext, null],
    ]}
  >
    {children}
  </Provider>
);
