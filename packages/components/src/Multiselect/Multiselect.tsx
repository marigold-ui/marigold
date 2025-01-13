'use client';

import * as React from 'react';
import { useState } from 'react';
import type {
  ComboBoxProps as ComboBoxPrimitiveProps,
  Key,
  ValidationResult,
} from 'react-aria-components';
import {
  ComboBox,
  Input,
  ListBoxItem,
  Tag,
  TagGroup,
  TagList,
} from 'react-aria-components';
import { useFilter } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { ListData } from '@react-stately/data';
import { useListData } from '@react-stately/data';
import { cn, cva, useClassNames } from '@marigold/system';
import { Button } from '../Button';
import { FieldBase, FieldBaseProps } from '../FieldBase';
import { ListBox } from '../ListBox';
// import type { FieldProps } from "./field"
import { Popover } from '../Overlay';

interface SelectedKey {
  id: Key;
  name: string;
}

interface MultipleSelectProps<T extends object>
  extends Omit<FieldBaseProps<any>, 'children'>,
    Omit<
      ComboBoxPrimitiveProps<T>,
      | 'children'
      | 'validate'
      | 'allowsEmptyCollection'
      | 'inputValue'
      | 'selectedKey'
      | 'className'
      | 'value'
      | 'onSelectionChange'
      | 'onInputChange'
    > {
  variant?: string;
  size?: string;
  items: Array<T>;
  selectedItems?: Array<T>;
  className?: string;
  onItemInserted?: (key: Key) => void;
  onItemCleared?: (key: Key) => void;
  renderEmptyState?: (inputValue: string) => React.ReactNode;
  tag: (item: T) => React.ReactNode;
  children: React.ReactNode | ((item: T) => React.ReactNode);
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const Multiselect = <T extends SelectedKey>({
  children,
  items,
  selectedItems = [],
  onItemCleared,
  onItemInserted,
  className,
  name,
  renderEmptyState,
  errorMessage,
  variant,
  size,
  ...props
}: MultipleSelectProps<T>) => {
  if (!items) {
    return;
  }
  const tagGroupIdentifier = React.useId();
  const triggerRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState(0);

  const { contains } = useFilter({ sensitivity: 'base' });
  const selectedItemsElements = useListData({
    initialItems: selectedItems,
  });

  console.log('selectedItemsElements.items', selectedItemsElements.items);
  const selectedKeys = selectedItemsElements?.items?.map(i => i.id);
  console.log('selectedKeys', selectedKeys);
  const filter = React.useCallback(
    (item: T, filterText: string) => {
      return (
        !selectedKeys?.includes(item.id) && contains(item.name, filterText)
      );
    },
    [contains, selectedItemsElements]
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

  const onRemove = React.useCallback(
    (keys: Set<Key>) => {
      // keys => [currentKey] -> keys[0].value
      const key = keys.values().next().value;
      if (key) {
        selectedItemsElements.remove(key);
        setFieldState({
          inputValue: '',
          selectedKey: null,
        });
        onItemCleared?.(key);
      }
    },
    [selectedItems, onItemCleared]
  );

  const onSelectionChange = (id: Key | null) => {
    console.log('call');
    if (!id) {
      return;
    }

    const item = accessibleList.getItem(id);

    if (!item) {
      return;
    }

    if (!selectedKeys?.includes(id)) {
      console.log('successfully', item);
      selectedItemsElements?.append(item);
      console.log('selectedItems', selectedItems);
      setFieldState({
        inputValue: '',
        selectedKey: id,
      });
      onItemInserted?.(id);
    }

    accessibleList.setFilterText('');
  };

  const onInputChange = (value: string) => {
    setFieldState(prev => ({
      inputValue: value,
      selectedKey: value === '' ? null : prev.selectedKey,
    }));

    accessibleList.setFilterText(value);
  };

  const popLast = React.useCallback(() => {
    if (selectedItemsElements.items?.length == 0) {
      return;
    }

    const endKey = selectedItemsElements.items?.at(-1);

    if (endKey !== null) {
      selectedItemsElements.remove(endKey.id);
      onItemCleared?.(endKey.id);
    }

    setFieldState({
      inputValue: '',
      selectedKey: null,
    });
  }, [selectedItemsElements, onItemCleared]);

  const onKeyDownCapture = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && fieldState.inputValue === '') {
        popLast();
      }
    },
    [popLast, fieldState.inputValue]
  );

  React.useEffect(() => {
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

  const triggerButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const classNames = useClassNames({
    component: 'MultiSelect',
    size,
    variant,
  });

  return (
    <div>
      <FieldBase {...props} aria-label="Available items">
        <div ref={triggerRef} className={classNames.container}>
          {selectedItemsElements.items.length !== 0 ? (
            <TagGroup
              aria-label="Selected items"
              id={tagGroupIdentifier}
              onRemove={onRemove}
              className={'flex items-center'}
            >
              <TagList
                items={selectedItemsElements?.items}
                className={classNames.listItems}
              >
                <Tag className={classNames.tag}>
                  selectedItems {selectedItemsElements.items.length}
                </Tag>
                {/* {(item) => <Tag>{item.name}</Tag>} */}
              </TagList>
            </TagGroup>
          ) : null}
          <ComboBox
            {...props}
            allowsEmptyCollection
            aria-label="Available items"
            items={accessibleList?.items}
            selectedKey={fieldState.selectedKey}
            inputValue={fieldState.inputValue}
            onSelectionChange={onSelectionChange}
            onInputChange={onInputChange}
            className={'flex-1 items-center'}
          >
            <div className="flex">
              <Input
                className={cn(classNames.input, 'flex-1')}
                onBlur={() => {
                  setFieldState({
                    inputValue: '',
                    selectedKey: null,
                  });
                  accessibleList.setFilterText('');
                }}
                onKeyDownCapture={onKeyDownCapture}
              />
              <button
                type="button"
                onClick={() => triggerButtonRef.current?.click()}
                tabIndex={-1}
              >
                chev down
              </button>
              <VisuallyHidden>
                <Button
                  slot="remove"
                  type="button"
                  aria-label="Remove"
                  size="square-petite"
                  ref={triggerButtonRef}
                >
                  chev down
                </Button>
              </VisuallyHidden>
            </div>
            <Popover
              style={{ width: `${width}px` }}
              triggerRef={triggerRef}
              trigger="ComboBox"
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
          </ComboBox>
        </div>
      </FieldBase>

      {props.description && <p>{props.description}</p>}
      {/* {<p>{errorMessage}</p>} */}
      {name && (
        <input hidden name={name} value={selectedKeys.join(',')} readOnly />
      )}
    </div>
  );
};

Multiselect.Tag = Tag;
Multiselect.Option = ListBox.Item;

export { Multiselect, type SelectedKey };
