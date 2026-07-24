import { ReactNode, useLayoutEffect, useRef } from 'react';
import {
  ListBox as RACAriaListBox,
  ListBoxItem as RACListBoxItem,
} from 'react-aria-components/ListBox';
import { cn } from '@marigold/system';
import { useCalendarContext } from './Context';

interface ListBoxProps<T> {
  ariaLabel: string;
  items: T[];
  isDisabled?: (item: T) => boolean;
  isSelected: (item: T) => boolean;
  onSelect: (item: T) => void;
  format: (item: T) => ReactNode;
}

export function ListBox<T>({
  ariaLabel,
  items,
  isDisabled = () => false,
  isSelected,
  onSelect,
  format,
}: ListBoxProps<T>) {
  const { classNames } = useCalendarContext();
  const listRef = useRef<HTMLDivElement>(null);
  const selectedItemKeys = items.flatMap((item, index) =>
    isSelected(item) ? [String(index)] : []
  );

  // RAC `autoFocus` scrolls the selected option to the nearest edge from its own
  // passive effect + rAF (`useSelectableCollection`). We center before paint to avoid
  // a one-frame flash (a passive effect would show the list at scrollTop: 0 first),
  // and re-assert inside a rAF so we still win once RAC's later scroll has run.
  useLayoutEffect(() => {
    const center = () => {
      const list = listRef.current;
      const selected = list?.querySelector<HTMLElement>(
        '[aria-selected="true"]'
      );
      if (!list || !selected) return;
      const listRect = list.getBoundingClientRect();
      const selectedRect = selected.getBoundingClientRect();
      // Center within the list's own scroll area only — never scroll ancestors/the page.
      list.scrollTop +=
        selectedRect.top -
        listRect.top -
        (list.clientHeight - selected.clientHeight) / 2;
    };
    center();
    const raf = requestAnimationFrame(center);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <RACAriaListBox
      ref={listRef}
      className="grid h-full max-h-[300px] w-full grid-cols-3 gap-y-10 overflow-y-auto p-2"
      selectionMode="single"
      aria-label={ariaLabel}
      selectedKeys={selectedItemKeys}
      autoFocus
    >
      {items.map((item, index) => {
        const disabled = isDisabled(item);
        const label = format(item);
        return (
          <RACListBoxItem
            key={index}
            id={String(index)}
            textValue={String(label)}
            isDisabled={disabled}
            className={cn(
              classNames.calendarListboxButton,
              'inline-flex items-center justify-center gap-[0.5ch]',
              disabled && 'cursor-not-allowed opacity-50'
            )}
            onPress={() => !disabled && onSelect(item)}
          >
            {label}
          </RACListBoxItem>
        );
      })}
    </RACAriaListBox>
  );
}
