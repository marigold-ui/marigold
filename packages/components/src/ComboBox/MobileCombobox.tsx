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

interface MobileComboBoxTriggerProps<T extends object> {
  placeholder?: string;
  renderValue?: (selectedItems: T[]) => ReactNode;
}

interface MobileComboBoxProps<
  T extends object,
> extends MobileComboBoxTriggerProps<T> {
  label?: ReactNode;
  emptyState?: ReactNode;
  children?: ReactNode | ((item: T) => ReactNode);
}

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
          'group-data-error/field:ui-state-error',
          'group-data-focus-visible/trigger:ui-state-focus',
          inputClassNames.input
        )}
      >
        {({ selectedItems, isPlaceholder, defaultChildren }) => {
          if (isPlaceholder || selectedItems.length === 0) {
            return <span className="text-secondary">{placeholder}</span>;
          }
          if (renderValue) {
            return renderValue(selectedItems.filter((i): i is T => i != null));
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

export { MobileComboBox, MobileComboBoxTrigger };
