import type { ReactNode } from 'react';
import { useContext } from 'react';
import {
  ComboBoxStateContext,
  Button as RACButton,
} from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { Button } from '../Button/Button';
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
  children?: ReactNode | ((item: object) => ReactNode);
  input: ReactNode;
}

// Trigger Display (for Mobile mode)
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
          // Error state: targets when parent FieldBase has data-error attribute
          'group-data-error/field:ui-state-error',
          // Focus state: targets when parent Button has data-focus-visible attribute
          'group-data-focus-visible/trigger:ui-state-focus',
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
      <RACButton className="group/trigger outline-none">
        <MobileAutocompleteTrigger placeholder={placeholder} />
      </RACButton>
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
        <Tray.Actions>
          <Button slot="close">{stringFormatter.format('close')}</Button>
        </Tray.Actions>
      </Tray>
    </Tray.Trigger>
  );
};

export { MobileAutocomplete, MobileAutocompleteTrigger };
