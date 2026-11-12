import type { KeyboardEvent, Ref } from 'react';
import { Button } from 'react-aria-components/Button';
import { Input } from 'react-aria-components/Input';
import { SearchField } from 'react-aria-components/SearchField';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { ProgressCircle } from '../ProgressCircle/ProgressCircle';
import { Search } from '../icons/Search';
import { X } from '../icons/X';
import { intlMessages } from '../intl/messages';
import { useCommandPalette } from './Context';

// Props
// ---------------
interface CommandPaletteSearchProps {
  placeholder?: string;
  loading: boolean;
  ref: Ref<HTMLInputElement>;
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
  ref,
}: CommandPaletteSearchProps) => {
  const { classNames, scope, leaveScope } = useCommandPalette();
  const stringFormatter = useLocalizedStringFormatter(intlMessages);
  const scopedLabel = scope
    ? stringFormatter.format('commandPaletteSearchIn', { scope: scope.title })
    : null;

  // Backspace in the empty field leaves the scope from the keyboard.
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Backspace' || !scope || e.currentTarget.value !== '') return;
    leaveScope();
  };

  return (
    <SearchField
      aria-label={scopedLabel ?? stringFormatter.format('search')}
      autoFocus
      className={classNames.header}
    >
      {({ isEmpty }) => (
        <>
          <Search aria-hidden="true" size="18" />
          {scope && (
            <span className={classNames.scope}>
              {scope.title}
              {/* A plain button, not a Tab stop, like the clear button.
                  Marigold's CloseButton would be one, and inside the
                  SearchField it would take over the clear button's role. */}
              <button
                type="button"
                tabIndex={-1}
                aria-label={stringFormatter.format(
                  'commandPaletteSearchEverywhere'
                )}
                onClick={leaveScope}
              >
                <X size="12" />
              </button>
            </span>
          )}
          <Input
            ref={ref}
            placeholder={
              scopedLabel ??
              placeholder ??
              stringFormatter.format('commandPaletteGoTo')
            }
            className={classNames.input}
            onKeyDown={onKeyDown}
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
