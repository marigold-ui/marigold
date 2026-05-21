import type { ReactNode } from 'react';
import { Button as RACButton } from 'react-aria-components/Button';
import { ComboBoxValue } from 'react-aria-components/ComboBox';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { cn, useClassNames } from '@marigold/system';
import { Button } from '../Button/Button';
import { Center } from '../Center/Center';
import { Input } from '../Input/Input';
import { ListBox } from '../ListBox/ListBox';
import { Tray } from '../Tray/Tray';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { intlMessages } from '../intl/messages';

// Props
// ---------------
interface MobileComboBoxTriggerProps<T extends object> {
  placeholder?: string;
  renderValue?: (selectedItems: T[]) => ReactNode;
}

interface MobileComboBoxProps<T extends object> {
  placeholder?: string;
  label?: ReactNode;
  emptyState?: ReactNode;
  children?: ReactNode | ((item: T) => ReactNode);
  renderValue?: (selectedItems: T[]) => ReactNode;
}

// Trigger Display (for Mobile mode)
// ---------------
const MobileComboBoxTrigger = <T extends object>({
  placeholder,
  renderValue,
}: MobileComboBoxTriggerProps<T>) => {
  const inputClassNames = useClassNames({ component: 'Input' });
  const comboBoxClassNames = useClassNames({ component: 'ComboBox' });

  return (
    <div className={comboBoxClassNames.mobileTrigger}>
      <ComboBoxValue<T>
        className={cn(
          'w-full flex-1 truncate text-left text-nowrap',
          // Error state: targets when parent FieldBase has data-error attribute
          'group-data-error/field:ui-state-error',
          // Focus state: targets when parent Button has data-focus-visible attribute
          'group-data-focus-visible/trigger:ui-state-focus',
          inputClassNames.input
        )}
      >
        {({ selectedItems, isPlaceholder, defaultChildren }) => {
          if (isPlaceholder || selectedItems.length === 0) {
            return <span className="text-secondary">{placeholder}</span>;
          }
          if (renderValue) {
            const items = selectedItems.filter(
              (item): item is T => item != null
            );
            return renderValue(items);
          }
          return defaultChildren;
        }}
      </ComboBoxValue>
      <span
        className={cn(
          'absolute right-2 cursor-pointer',
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
const MobileComboBox = <T extends object>({
  placeholder,
  label,
  emptyState,
  children,
  renderValue,
}: MobileComboBoxProps<T>) => {
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <Tray.Trigger>
      <RACButton className="group/trigger outline-none">
        <MobileComboBoxTrigger<T>
          placeholder={placeholder}
          renderValue={renderValue}
        />
      </RACButton>
      <Tray>
        <Tray.Title>{label}</Tray.Title>
        <Tray.Content className={'flex flex-col gap-2'}>
          <Input autoFocus />
          <ListBox
            renderEmptyState={() =>
              emptyState ?? (
                <Center>{stringFormatter.format('noResultsFound')}</Center>
              )
            }
          >
            {children as any}
          </ListBox>
        </Tray.Content>
        <Tray.Actions>
          <Button slot="close">{stringFormatter.format('close')}</Button>
        </Tray.Actions>
      </Tray>
    </Tray.Trigger>
  );
};

export { MobileComboBox, MobileComboBoxTrigger };
