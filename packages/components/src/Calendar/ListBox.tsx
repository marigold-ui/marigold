import { ReactNode } from 'react';
import {
  ListBox as RACAriaListBox,
  ListBoxItem as RACListBoxItem,
} from 'react-aria-components';
import { cn } from '@marigold/system';
import { useCalendarContext } from './Context';

interface ListBoxProps<T> {
  dataTestid: string;
  items: T[];
  isDisabled: (item: T, index: number) => boolean;
  isSelected: (item: T, index: number) => boolean;
  onSelect: (item: T, index: number) => void;
  format: (item: T, index: number) => ReactNode;
}

export function ListBox<T>({
  dataTestid,
  items,
  isDisabled,
  isSelected,
  onSelect,
  format,
}: ListBoxProps<T>) {
  const { classNames } = useCalendarContext();
  const selectedItemKeys = items
    .map((item, index) => (isSelected(item, index) ? String(index) : undefined))
    .filter((key): key is string => typeof key === 'string');

  return (
    <RACAriaListBox
      className={cn(
        'grid h-full max-h-[300px] min-w-[300px] grid-cols-3 gap-y-10 overflow-y-auto p-2'
      )}
      data-testid={dataTestid}
      selectionMode="single"
      aria-label={dataTestid}
      selectedKeys={selectedItemKeys}
      autoFocus={true}
    >
      {items.map((item, index) => {
        const disabled = isDisabled(item, index);
        const selected = isSelected(item, index);
        return (
          <RACListBoxItem
            key={index}
            id={String(index)}
            textValue={String(format(item, index))}
            isDisabled={disabled}
            aria-current={selected ? 'true' : undefined}
            aria-label={`${format(item, index)}${
              selected ? ' selected' : disabled ? ' not selectable' : ''
            }`}
            className={cn(
              classNames.calendarListboxButton,
              'inline-flex items-center justify-center gap-[0.5ch]',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            onPress={() => !disabled && onSelect(item, index)}
          >
            {format(item, index)}
          </RACListBoxItem>
        );
      })}
    </RACAriaListBox>
  );
}
