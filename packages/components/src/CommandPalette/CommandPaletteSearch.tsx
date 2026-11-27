import type { DOMAttributes } from 'react';
import { useRef } from 'react';
import { Button } from 'react-aria-components/Button';
import { Input } from 'react-aria-components/Input';
import { SearchField } from 'react-aria-components/SearchField';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { useClassNames } from '@marigold/system';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { Search } from '../icons/Search';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';
import { useAutoFocus } from '../utils/useAutoFocus';

// Props
// ---------------
interface CommandPaletteSearchProps {
  placeholder?: string;
  loading: boolean;
  /** Handlers the palette adds to the input. */
  inputProps: DOMAttributes<HTMLInputElement>;
}

// Component
// ---------------
// Internal. The palette's header rather than a form field: no frame of its
// own, a divider towards the list, and a trailing hint that changes with the
// state: a clear button once there is a query, a spinner while loading. The
// legend explains Escape.
export const CommandPaletteSearch = ({
  placeholder,
  loading,
  inputProps,
}: CommandPaletteSearchProps) => {
  const classNames = useClassNames({ component: 'CommandPalette' });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const inputRef = useRef<HTMLInputElement>(null);
  // Not a native `autoFocus`, see `useAutoFocus`.
  useAutoFocus(inputRef);

  return (
    <SearchField
      aria-label={stringFormatter.format('search')}
      className={classNames.header}
    >
      {({ isEmpty }) => (
        <>
          <Search aria-hidden="true" size="18" />
          <Input
            {...inputProps}
            ref={inputRef}
            placeholder={
              placeholder ?? stringFormatter.format('commandPaletteGoTo')
            }
            className={classNames.input}
          />
          {loading ? (
            <ProgressCircle />
          ) : isEmpty ? null : (
            <Button aria-label={stringFormatter.format('clearSearch')}>
              <X size="16" />
            </Button>
          )}
        </>
      )}
    </SearchField>
  );
};
