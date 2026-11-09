import { Button } from 'react-aria-components/Button';
import { Input } from 'react-aria-components/Input';
import { SearchField } from 'react-aria-components/SearchField';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { Keyboard } from '../Keyboard/Keyboard';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { Search } from '../icons/Search';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';
import { useCommandPalette, useCommandPaletteEmptyState } from './Context';

// Props
// ---------------
export interface CommandPaletteInputProps {
  /**
   * Placeholder text of the search input.
   */
  placeholder?: string;

  /**
   * Accessible name of the search input.
   * @default 'Search'
   */
  'aria-label'?: string;
}

// Component
// ---------------
// The palette's header rather than a form field: no frame of its own, a
// divider towards the list, and a trailing hint that changes with the state.
// Empty, it shows `Esc` (closes the palette). With a query, a clear button
// (Escape clears first). While `.Loading` is mounted, a spinner.
export const CommandPaletteInput = ({
  placeholder,
  'aria-label': ariaLabel,
}: CommandPaletteInputProps) => {
  const { classNames } = useCommandPalette();
  const { loading } = useCommandPaletteEmptyState();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <SearchField
      aria-label={ariaLabel ?? stringFormatter.format('search')}
      autoFocus
      className={classNames.header}
    >
      {({ isEmpty }) => (
        <>
          <Search aria-hidden="true" size="18" />
          <Input placeholder={placeholder} className={classNames.input} />
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
