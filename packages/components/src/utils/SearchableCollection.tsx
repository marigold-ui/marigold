import type { ReactNode } from 'react';
import { Autocomplete, useFilter } from 'react-aria-components/Autocomplete';

// Internal Usage Notes
// ---------------
// RAC `Autocomplete` with Marigold's default filter: locale- and accent-aware
// `contains` that keeps the collection's authored order and sections. Not the
// public `Autocomplete`, which is a search field with suggestions.
//
// RAC moves virtual focus by re-dispatching every keydown from the
// field on the active row. Those copies bubble to `document` with a row as
// their target, so page-level shortcuts that skip events from text fields
// (`c` to create, Storybook's own keys) would fire while people type a query.
// Typed characters stop here. Escape, arrows, Enter and modifier shortcuts
// like ⌘K still pass.
const stopTypedCharacter = (e: KeyboardEvent) => {
  if (e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
    e.stopPropagation();
  }
};

// A callback ref (with React 19 cleanup): the element mounts with the
// collection, for example when an overlay opens.
const containTypedCharacters = (el: HTMLDivElement | null) => {
  el?.addEventListener('keydown', stopTypedCharacter);
  return () => el?.removeEventListener('keydown', stopTypedCharacter);
};

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

  // `contents`, so the wrapper doesn't take part in the surrounding layout.
  return (
    <div ref={containTypedCharacters} className="contents">
      <Autocomplete {...props} filter={resolvedFilter}>
        {children}
      </Autocomplete>
    </div>
  );
};
