import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { ChevronDown } from '../icons';

interface DateListBoxProps<T> {
  items: T[];
  getItemLabel: (item: T) => string;
  onSelect: (index: number) => void;
  className?: string;
}

export const DateListBox = <T,>({
  items,
  getItemLabel,
  onSelect,
  className,
}: DateListBoxProps<T>) => {
  const classNames = useClassNames({ component: 'Select' });

  return (
    <Select onSelectionChange={key => onSelect(Number(key))}>
      <Button
        className={cn(
          'flex w-full items-center justify-between gap-1 overflow-hidden',
          classNames.select
        )}
      >
        <SelectValue />
        <ChevronDown />
      </Button>
      <Popover>
        <ListBox className={className} layout="grid">
          {items.map((item, index) => (
            <ListBoxItem key={index} id={String(index)}>
              {getItemLabel(item)}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </Select>
  );
};
