import { ReactNode } from 'react';
import { Button } from 'react-aria-components';
import { cn } from '@marigold/system';

interface ListBoxProps<T> {
  dataTestid: string;
  items: T[];
  isDisabled: (item: T, index: number) => boolean;
  isSelected: (item: T, index: number) => boolean;
  onSelect: (item: T, index: number) => void;
  format: (item: T, index: number) => ReactNode;
  buttonClassName?: string;
  ulClassName?: string;
  activeButtonRef?: React.RefObject<HTMLButtonElement>;
}

export function ListBox<T>({
  dataTestid,
  items,
  isDisabled,
  isSelected,
  onSelect,
  format,
  buttonClassName,
  ulClassName,
  activeButtonRef,
}: ListBoxProps<T>) {
  return (
    <ul
      className={cn(
        'grid h-full max-h-[300px] min-w-[300px] grid-cols-3 gap-y-10 p-2',
        ulClassName
      )}
      data-testid={dataTestid}
    >
      {items.map((item, index) => {
        const disabled = isDisabled(item, index);
        const selected = isSelected(item, index);
        return (
          <li className="flex justify-center" key={index}>
            <Button
              slot="previous"
              ref={selected && activeButtonRef ? activeButtonRef : undefined}
              onPress={() => onSelect(item, index)}
              isDisabled={disabled}
              aria-current={selected}
              className={cn(
                buttonClassName,
                'inline-flex items-center justify-center gap-[0.5ch]',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {format(item, index)}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
