import { ReactNode, useEffect, useRef } from 'react';
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
  const listRef = useRef<HTMLDivElement>(null);
  const selectedItemKeys = items.flatMap((item, index) =>
    isSelected(item, index) ? [String(index)] : []
  );

  // RAC `autoFocus` scrolls the focused option only to the nearest edge, so we re-center it.
  // We run from a parent-effect rAF so it's queued after RAC's own scroll (scheduled in a
  // child-effect rAF) and wins. We target `aria-selected` (driven by `selectedKeys`) because
  // RAC's DOM-prop filter would strip a custom attr.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      listRef.current
        ?.querySelector('[aria-selected="true"]')
        ?.scrollIntoView({ block: 'center' });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <RACAriaListBox
      ref={listRef}
      className={cn(
        'grid h-full max-h-[300px] w-full grid-cols-3 gap-y-10 overflow-y-auto p-2'
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
        const label = format(item, index);
        return (
          <RACListBoxItem
            key={index}
            id={String(index)}
            textValue={String(label)}
            isDisabled={disabled}
            aria-label={`${label}${
              selected ? ' selected' : disabled ? ' not selectable' : ''
            }`}
            className={cn(
              classNames.calendarListboxButton,
              'inline-flex items-center justify-center gap-[0.5ch]',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            onPress={() => !disabled && onSelect(item, index)}
          >
            {label}
          </RACListBoxItem>
        );
      })}
    </RACAriaListBox>
  );
}
