import type { ReactNode } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Autocomplete, useFilter } from 'react-aria-components/Autocomplete';
import { AutocompleteBoundary } from '../utils/AutocompleteBoundary';
import type { PopoverSearchOptions } from './Context';
import { PopoverSearchContext } from './Context';

// Component
// ---------------
/**
 * Wraps the popover's children in React Aria's `Autocomplete`, which links a
 * search field to a collection through context and renders no element. That
 * is what lets `<Popover.Search>` sit next to `<Popover.Content>` instead of
 * around it. The search owns the input value and mirrors it into the scope,
 * the scope only hands each keystroke back to the search.
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
