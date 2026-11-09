import type { ReactNode } from 'react';
import { Autocomplete, useFilter } from 'react-aria-components/Autocomplete';

// Internal Usage Notes
// ---------------
// RAC `Autocomplete` with Marigold's default filter: locale- and accent-aware
// `contains` that keeps the collection's authored order and sections. Not the
// public `Autocomplete`, which is a search field with suggestions.

export type SearchableCollectionFilter = (
  textValue: string,
  inputValue: string
) => boolean;

export interface SearchableCollectionProps {
  /** Custom filter, or `false` to filter outside (e.g. on the server). */
  filter?: SearchableCollectionFilter | false;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  children: ReactNode;
}

export const SearchableCollection = ({
  filter,
  children,
  ...props
}: SearchableCollectionProps) => {
  const { contains } = useFilter({ sensitivity: 'base' });
  const resolvedFilter = filter === false ? undefined : (filter ?? contains);

  return (
    <Autocomplete {...props} filter={resolvedFilter}>
      {children}
    </Autocomplete>
  );
};
