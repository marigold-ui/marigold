'use client';

import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type {
  ComboBoxProps as ComboBoxPrimitiveProps,
  Key,
  ValidationResult,
} from 'react-aria-components';
import {
  ComboBox,
  FieldError,
  FieldErrorContext,
  Input,
  Provider,
  Tag,
  TagGroup,
  TagList,
} from 'react-aria-components';
import { useFilter } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { ListData, useListData } from '@react-stately/data';
import { cn, width as twWidth, useClassNames } from '@marigold/system';
import { Button } from '../Button';
import { FieldBase, FieldBaseProps } from '../FieldBase';
import { HelpText } from '../HelpText';
import { Label } from '../Label';
import { ListBox } from '../ListBox';
import { Popover } from '../Overlay';
import { ChevronDown } from '../icons';

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
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  error?: boolean;
  variant?: string;
  size?: string;
  items?: Array<T>;
  selectedItems: ListData<T>;
  defaultSelectedItems?: Array<T>;
  onItemInserted?: (key: Key) => void;
  onItemCleared?: (key: Key) => void;
  renderEmptyState?: (inputValue: string) => ReactNode;
  children: ReactNode | ((item: T) => ReactNode);
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const CloseButton = ({
  className,
  clearSelectedItems,
  disabled,
}: {
  className: string;
  disabled?: boolean;
  clearSelectedItems: () => void;
}) => {
  return (
    <Button
      slot="remove"
      className={className}
      onPress={clearSelectedItems}
      disabled={disabled}
    >
      <svg viewBox="0 0 20 20" fill="currentColor" width={20} height={20}>
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
      </svg>
    </Button>
  );
};

const Multiselect = <T extends SelectedKey>({
  disabled,
  required,
  readOnly,
  error,
  ...rest
}: MultipleSelectProps<T>) => {
  const {
    children,
    selectedItems,
    name,
    errorMessage,
    variant,
    size,
    items,
    width = 'full',
    onItemCleared,
    onItemInserted,
    renderEmptyState,
    ...props
  }: MultipleSelectProps<T> & { isDisabled?: boolean } = {
    isDisabled: disabled,
    isReadOnly: readOnly,
    isRequired: required,
    isInvalid: error,
    error,
    ...rest,
  };

  const tagGroupIdentifier = useId();
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [fieldWidth, setFieldWidth] = useState(0);

  const { contains } = useFilter({ sensitivity: 'base' });

  const selectedKeys = selectedItems?.items?.map(i => i.id);
  const filter = useCallback(
    (item: T, filterText: string) => {
      console.log(
        !selectedKeys?.includes(item.id) && contains(item.name, filterText)
      );
      return (
        !selectedKeys?.includes(item.id) && contains(item.name, filterText)
      );
    },
    [contains, selectedItems]
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

  const onSelectionChange = (id: Key | null) => {
    if (!id) {
      return;
    }

    const item = accessibleList.getItem(id);

    if (!item) {
      return;
    }

    if (!selectedKeys?.includes(id)) {
      selectedItems?.append(item);
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

  const popLast = useCallback(() => {
    if (selectedItems.items?.length == 0) {
      return;
    }

    const endKey = selectedItems.items?.at(-1);

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
        clearSelectedItems();
      }
    },
    [popLast, fieldState.inputValue]
  );

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setFieldWidth(entry.target.clientWidth);
      }
    });

    observer.observe(trigger);
    return () => {
      observer.unobserve(trigger);
    };
  }, [triggerRef]);

  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);

  const classNames = useClassNames({
    component: 'MultiSelect',
    size,
    variant,
  });

  const clearSelectedItems = () => {
    selectedItems.items.forEach(item => selectedItems.remove(item.id));
  };

  return (
    <>
      <div
        className={cn(
          'group/field',
          twWidth[width],
          classNames.field,
          !props.label && `gap-x-0`
        )}
      >
        <Label>{props.label}</Label>
        <div
          ref={triggerRef}
          className={cn('relative flex', classNames.container)}
        >
          {selectedItems.items.length !== 0 ? (
            <TagGroup
              aria-label="Selected items"
              id={tagGroupIdentifier}
              className={'flex items-center'}
            >
              <TagList
                items={selectedItems?.items}
                className={classNames.listItems}
              >
                <Tag className={classNames.tag}>
                  selectedItems {selectedItems.items.length}
                  <CloseButton
                    className={classNames.closeButton}
                    clearSelectedItems={clearSelectedItems}
                    disabled={disabled || readOnly}
                  />
                </Tag>
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
            className={'size-full flex-1 items-center'}
          >
            <Input
              className={cn('size-full', classNames.input)}
              onBlur={() => {
                setFieldState({
                  inputValue: '',
                  selectedKey: null,
                });
                accessibleList.setFilterText('');
              }}
              onKeyDownCapture={onKeyDownCapture}
            />
            <Button className={classNames.icon}>
              <ChevronDown className={'size-4'} />
            </Button>
            <VisuallyHidden>
              <Button
                slot="remove"
                type="button"
                aria-label="Remove"
                size="square-petite"
                ref={triggerButtonRef}
              >
                <ChevronDown className={'size-4'} />
              </Button>
            </VisuallyHidden>

            <Popover
              //@ts-ignore
              style={{ width: `${fieldWidth}px` }}
              triggerRef={triggerRef}
              trigger="ComboBox"
            >
              <ListBox
                items={accessibleList.items}
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
        <HelpText
          variant={variant}
          size={size}
          description={props.description}
          errorMessage={errorMessage}
        />
      </div>
      {name && (
        <input hidden name={name} value={selectedKeys.join(',')} readOnly />
      )}
    </>
  );
};

Multiselect.Tag = Tag;
Multiselect.Option = ListBox.Item;

export { Multiselect, type SelectedKey };

const fruits = [
  { id: 10, name: 'Lemon' },
  { id: 11, name: 'Mango' },
  { id: 12, name: 'Nectarine' },
  { id: 13, name: 'Orange' },
  { id: 14, name: 'Papaya' },
  { id: 15, name: 'Quince' },
  { id: 16, name: 'Raspberry' },
  { id: 17, name: 'Strawberry' },
  { id: 18, name: 'Tangerine' },
  { id: 19, name: 'Ugli Fruit' },
  { id: 20, name: 'Watermelon' },
];

export const BasicComponent = () => {
  const selectedItems = useListData<{ id: Key; name: string }>({
    initialItems: [fruits[0], fruits[1]],
  });
  return (
    <Multiselect
      label="Fruits"
      items={fruits}
      selectedItems={selectedItems}
      // description={'some description here'}
      // required
      error
      errorMessage={'oops something went wrong '}
    >
      {item => (
        <Multiselect.Option textValue={item.name}>
          {item.name}
        </Multiselect.Option>
      )}
    </Multiselect>
  );
};
