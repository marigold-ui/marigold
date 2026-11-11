import type { Ref } from 'react';
import { Button } from 'react-aria-components/Button';
import { Input } from 'react-aria-components/Input';
import { SearchField } from 'react-aria-components/SearchField';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import type { ComponentClassNames } from '@marigold/system';
import { Keyboard } from '../Keyboard/Keyboard';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { Search } from '../icons/Search';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';

// Props
// ---------------
export interface CommandPaletteSearchProps {
  placeholder?: string;
  loading: boolean;
  classNames: ComponentClassNames<'CommandPalette'>;
  ref: Ref<HTMLInputElement>;
}

// Component
// ---------------
// Internal. The palette's header rather than a form field: no frame of its
// own, a divider towards the list, and a trailing hint that changes with the
// state. Empty, it shows `Esc` (closes the palette). With a query, a clear
// button (Escape clears first). While loading, a spinner.
export const CommandPaletteSearch = ({
  placeholder,
  loading,
  classNames,
  ref,
}: CommandPaletteSearchProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <SearchField
      aria-label={stringFormatter.format('search')}
      autoFocus
      className={classNames.header}
    >
      {({ isEmpty }) => (
        <>
          <Search aria-hidden="true" size="18" />
          <Input
            ref={ref}
            placeholder={
              placeholder ?? stringFormatter.format('commandPaletteGoTo')
            }
            className={classNames.input}
          />
          {loading ? (
            <ProgressCircle />
          ) : isEmpty ? (
            <Keyboard aria-hidden="true">Esc</Keyboard>
          ) : (
            <Button aria-label={stringFormatter.format('clearSearch')}>
              <X size="16" />
            </Button>
          )}
        </>
      )}
    </SearchField>
  );
};
