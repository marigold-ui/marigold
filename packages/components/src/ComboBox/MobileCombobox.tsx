import type { ReactNode } from 'react';
import { useContext } from 'react';
import { Button, ComboBoxStateContext } from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { Center } from '../Center/Center';
import { Input } from '../Input/Input';
import { ListBox } from '../ListBox/ListBox';
import { Tray } from '../Tray/Tray';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { intlMessages } from '../intl/messages';

// Props
// ---------------
interface MobileComboBoxTriggerProps {
  placeholder?: string;
}

interface MobileComboBoxProps {
  placeholder?: string;
  label?: ReactNode;
  emptyState?: ReactNode;
  children?: ReactNode | ((item: any) => ReactNode);
}

// Trigger Display (for Mobile mode)
// ---------------
const MobileComboBoxTrigger = ({ placeholder }: MobileComboBoxTriggerProps) => {
  const state = useContext(ComboBoxStateContext);
  const inputClassNames = useClassNames({ component: 'Input' });
  const comboBoxClassNames = useClassNames({ component: 'ComboBox' });
  const displayText = state?.selectedItem?.textValue || '';

  return (
    <div className="group/input relative flex items-center">
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
      <span
        className={cn(
          'absolute right-0 cursor-pointer',
          inputClassNames.action,
          comboBoxClassNames
        )}
      >
        <ChevronsVertical size="16" />
      </span>
    </div>
  );
};

// Component
// ---------------
const MobileComboBox = ({
  placeholder,
  label,
  emptyState,
  children,
}: MobileComboBoxProps) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <Tray.Trigger>
      <Button className="group/trigger outline-none">
        <MobileComboBoxTrigger placeholder={placeholder} />
      </Button>
      <Tray>
        <Tray.Title>{label}</Tray.Title>
        <Tray.Content className={'flex flex-col gap-2'}>
          <Input />
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

export { MobileComboBox, MobileComboBoxTrigger };
