import type { ReactNode } from 'react';
import { useContext } from 'react';
import { Button, ComboBoxStateContext } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { Center } from '../Center/Center';
import { ListBox } from '../ListBox/ListBox';
import { Tray } from '../Tray/Tray';
import { Search } from '../icons/Search';
import { intlMessages } from '../intl/messages';

// Props
// ---------------
interface MobileAutocompleteTriggerProps {
  loading?: boolean;
  placeholder?: string;
}

interface MobileAutocompleteProps {
  placeholder?: string;
  label?: ReactNode;
  emptyState?: ReactNode;
  children?: ReactNode | ((item: any) => ReactNode);
  input: ReactNode;
}

// Trigger Display (for Tray mode)
// Uses a styled div instead of SearchInput to avoid duplicate ids with the Input in Tray.Content
// ---------------
const MobileAutocompleteTrigger = ({
  placeholder,
}: MobileAutocompleteTriggerProps) => {
  const state = useContext(ComboBoxStateContext);
  const inputClassNames = useClassNames({ component: 'Input' });
  const displayText = state?.selectedItem?.textValue || '';

  return (
    <div className="group/input relative flex items-center" data-icon="">
      <Search
        aria-hidden="true"
        size="16"
        className={cn(
          'pointer-events-none absolute z-10',
          inputClassNames.icon
        )}
      />
      <span
        className={cn(
          'w-full flex-1 text-left',
          'group-data-error/field:ui-state-error',
          inputClassNames.input
        )}
      >
        {displayText || (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </span>
    </div>
  );
};

// Component
// ---------------
const MobileAutocomplete = ({
  placeholder,
  label,
  emptyState,
  children,
  input,
}: MobileAutocompleteProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <Tray.Trigger>
      <Button>
        <MobileAutocompleteTrigger placeholder={placeholder} />
      </Button>
      <Tray>
        <Tray.Title>{label}</Tray.Title>
        <Tray.Content className={'flex flex-col gap-2'}>
          {input}
          <ListBox
            renderEmptyState={() =>
              emptyState ?? (
                <Center>{stringFormatter.format('noResultsFound')}</Center>
              )
            }
          >
            {children}
          </ListBox>
        </Tray.Content>
      </Tray>
    </Tray.Trigger>
  );
};

export { MobileAutocomplete, MobileAutocompleteTrigger };
