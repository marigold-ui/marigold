import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Key, ValidationResult } from 'react-aria-components';
import { ComboBox } from 'react-aria-components';
import { useFilter } from '@react-aria/i18n';
import { ListData, useListData } from '@react-stately/data';
import { Button } from '../Button';
import { ChevronDown } from '../Chevron';
import { FieldBase, FieldBaseProps } from '../FieldBase';
import { Input } from '../Input';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { Tag } from '../TagGroup';
import { VisuallyHidden } from '../VisuallyHidden';

//Props
//-----------------
export interface MultiselectProps<T extends object>
  extends Pick<
    FieldBaseProps<'label'>,
    'description' | 'width' | 'errorMessage' | 'label'
  > {
  items: Array<T>;
  selectedItems: ListData<T>;
  onItemInserted?: (key: Key) => void;
  onItemCleared?: (key: Key) => void;
  renderEmptyState?: (inputValue: string) => React.ReactNode;
  tag: (item: T) => React.ReactNode;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  errorMessage?: string | ((validation: ValidationResult) => string);
}

interface SelectedKey {
  id: Key;
  name: string;
}

// Component
// ----------------
export const MultiSelect = <T extends SelectedKey>({
  children,
  items,
  selectedItems,
  onItemInserted,
  onItemCleared,
  renderEmptyState,
  errorMessage,
  ...props
}: MultiselectProps<T>) => {
  const tagGroupIdentifier = useId();
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const { contains } = useFilter({ sensitivity: 'base' });
  const selectedKeys = selectedItems?.items.map(i => i.id);

  const filter = useCallback(
    (item: T, filterText: string) => {
      return (
        !selectedKeys?.includes(item.id) && contains(item.name, filterText)
      );
    },
    [contains, selectedKeys]
  );

  const accessibleList = useListData({
    initialItems: items,
    filter,
  });

  const [fieldState, setFieldState] = useState<{
    selectedKey: Key | null;
    inputValue: string;
  }>({
    selectedKey: null,
    inputValue: '',
  });

  const onRemove = useCallback(
    (keys: Set<Key>) => {
      const key = keys.values().next().value;

      if (key) {
        selectedItems.remove(key);
        setFieldState({
          selectedKey: null,
          inputValue: '',
        });
        onItemCleared?.(key);
      }
    },
    [onItemCleared, selectedItems]
  );

  const onSelectionChange = (id: Key | null) => {
    if (!id) return;

    const item = accessibleList.getItem(id);

    if (!item) return;

    if (!selectedKeys.includes(id)) {
      selectedItems.append(item);

      setFieldState({
        selectedKey: id,
        inputValue: '',
      });

      onItemInserted?.(id);
    }

    accessibleList.setFilterText('');
  };

  const onInputChange = (value: string) => {
    setFieldState(prev => ({
      inputValue: value,
      selectedKey: value === '' ? null : prev.inputValue,
    }));
    accessibleList.setFilterText(value);
  };

  // Used to delete the last selectedItem using back space key 🔙
  const popLast = useCallback(() => {
    if (selectedItems.items.length === 0) return;
    const endKey = selectedItems.items.at(-1);
    if (endKey) {
      selectedItems.remove(endKey.id);
      onItemCleared?.(endKey.id);
    }

    setFieldState({
      inputValue: '',
      selectedKey: null,
    });
  }, [selectedItems, onItemCleared]);

  const onKeyDownCapture = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && fieldState.inputValue === '') {
        popLast();
      }
    },
    [popLast, fieldState.inputValue]
  );

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(entry.target.clientWidth);
      }
    });
    observer.observe(trigger);
    return () => {
      observer.unobserve(trigger);
    };
  }, [triggerRef]);

  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  /**
   * tags
   * input
   */
  return (
    <div ref={triggerRef} className="flex flex-col">
      <Tag.Group
        aria-label="Selected items"
        id={tagGroupIdentifier}
        onRemove={onRemove}
        items={selectedItems?.items}
      >
        {({ name }: { id: number; name: string }) => <Tag>{name}</Tag>}
      </Tag.Group>
      <FieldBase
        {...props}
        as={ComboBox}
        allowsEmptyCollection
        aria-label="Available items"
        items={accessibleList.items}
        selectedKey={fieldState.selectedKey}
        inputValue={fieldState.inputValue}
        onSelectionChange={onSelectionChange}
        onInputChange={onInputChange}
      >
        <Input
          onBlur={() => {
            setFieldState({
              inputValue: '',
              selectedKey: null,
            });
            accessibleList.setFilterText('');
          }}
          onKeyDownCapture={onKeyDownCapture}
          action={
            <Button>
              <ChevronDown className="size-4" />
            </Button>
          }
        />
        <VisuallyHidden>
          <Button
            slot="remove"
            type="button"
            aria-label="Remove"
            size="square-petite"
            ref={triggerButtonRef}
          >
            <ChevronDown className="size-4" />
          </Button>
        </VisuallyHidden>
        <Popover
          // className="max-w-none"
          // style={{ width: `${width}px` }}
          triggerRef={triggerRef}
          trigger="ComboBox"

          // open={triggerState.isOpen}
          // onClose={triggerState.cl`ose()}
        >
          <ListBox
            renderEmptyState={() =>
              renderEmptyState ? (
                renderEmptyState(fieldState.inputValue)
              ) : (
                <p className="block p-3">
                  {fieldState.inputValue ? (
                    <>
                      No results found for:{' '}
                      <strong className="text-fg font-medium">
                        {fieldState.inputValue}
                      </strong>
                    </>
                  ) : (
                    `No options`
                  )}
                </p>
              )
            }
            selectionMode="multiple"
          >
            {children}
          </ListBox>
        </Popover>
      </FieldBase>

      {/* {name && <input hidden name={name} value={selectedKeys.join(",")} readOnly />} */}
    </div>
  );
};
MultiSelect.Tag = Tag;
MultiSelect.Option = ListBox.Item;
