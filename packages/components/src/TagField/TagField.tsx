import type { Key, ReactNode, Ref } from 'react';
import { forwardRef, useContext, useRef } from 'react';
import type RAC from 'react-aria-components';
import {
  Autocomplete,
  Button,
  Group,
  Input,
  Select as ReactAriaSelect,
  SearchField,
  SelectStateContext,
  TagGroup,
  TagList,
  useFilter,
} from 'react-aria-components';
import { forwardRefType } from '@react-types/shared';
import { type WidthProp, cn, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';
import { Tag } from '../TagGroup/Tag';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { Search } from '../icons/Search';

// Props
// ---------------
type RemovedProps =
  | 'children'
  | 'isInvalid'
  | 'isDisabled'
  | 'isOpen'
  | 'isRequired'
  | 'style'
  | 'className'
  | 'selectionMode';

export interface TagFieldProps<T extends object>
  extends Omit<RAC.SelectProps<T, 'multiple'>, RemovedProps>, WidthProp {
  variant?: string;
  size?: string;

  /**
   * Children of the tag field (options).
   */
  children?: ReactNode | ((item: T) => ReactNode);

  /**
   * Set a label for the field.
   */
  label?: ReactNode;

  /**
   * Set a description for the field.
   */
  description?: string;

  /**
   * Set an error message for the field.
   */
  errorMessage?: string | ((validation: RAC.ValidationResult) => string);

  /**
   * Items of the tag field.
   */
  items?: Iterable<T>;

  /**
   * If the field should be required.
   * @default false
   */
  required?: boolean;

  /**
   * If the field should be disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If the dropdown should be open.
   * @default false
   */
  open?: boolean;

  /**
   * If the field should show an error state.
   * @default false
   */
  error?: boolean;

  /**
   * Placeholder text when no items are selected.
   */
  placeholder?: string;
}

// Inner component that reads SelectStateContext to render tags
// ---------------
interface TagDisplayProps {
  placeholder?: string;
  classNames: Record<string, string>;
}

const TagDisplay = ({ placeholder, classNames }: TagDisplayProps) => {
  const state = useContext(SelectStateContext);

  if (!state) {
    return null;
  }

  const selectedKeys = [...state.selectionManager.selectedKeys];

  if (selectedKeys.length === 0) {
    return <span className={classNames.emptyState}>{placeholder}</span>;
  }

  const selectedItems: { id: Key; textValue: string }[] = [];
  for (const key of selectedKeys) {
    const item = state.collection.getItem(key);
    if (item) {
      selectedItems.push({ id: key, textValue: item.textValue ?? '' });
    }
  }

  return (
    <TagGroup
      aria-label="Selected items"
      onRemove={keys => {
        const s = state as any;
        if (Array.isArray(s.value)) {
          s.setValue(s.value.filter((k: Key) => !(keys as Set<Key>).has(k)));
        }
      }}
    >
      <TagList items={selectedItems} className={classNames.listItems}>
        {(item: { id: Key; textValue: string }) => (
          <Tag id={item.id as string | number}>{item.textValue}</Tag>
        )}
      </TagList>
    </TagGroup>
  );
};

// Component
// ---------------
const TagFieldBase = (forwardRef as forwardRefType)(function TagField<
  T extends object,
>(
  {
    disabled,
    required,
    items,
    variant,
    size,
    error,
    open,
    children,
    placeholder,
    ...rest
  }: TagFieldProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const { contains } = useFilter({ sensitivity: 'base' });

  const props: RAC.SelectProps<T, 'multiple'> = {
    selectionMode: 'multiple',
    isDisabled: disabled,
    isInvalid: error,
    isOpen: open,
    isRequired: required,
    ...rest,
  };

  const classNames = useClassNames({ component: 'TagField', variant, size });

  return (
    <FieldBase
      as={ReactAriaSelect}
      ref={ref as never}
      variant={variant}
      size={size}
      {...props}
    >
      <Group
        ref={triggerRef}
        className={cn(
          'flex w-full items-center justify-between gap-1',
          classNames.trigger
        )}
      >
        <div
          className={cn(
            'flex flex-1 flex-wrap items-center gap-1',
            classNames.tags
          )}
        >
          <TagDisplay placeholder={placeholder} classNames={classNames} />
        </div>
        <Button className={classNames.button}>
          <ChevronsVertical size="16" className={classNames.icon} />
        </Button>
      </Group>
      <Popover triggerRef={triggerRef}>
        <div className="flex flex-col overflow-hidden">
          <Autocomplete filter={contains}>
            <SearchField
              aria-label="Search"
              autoFocus
              className={classNames.search}
            >
              <div className={classNames.searchInput}>
                <Search aria-hidden size="16" />
                <Input placeholder={placeholder} className={classNames.input} />
              </div>
            </SearchField>
            <ListBox items={items}>{children}</ListBox>
          </Autocomplete>
        </div>
      </Popover>
    </FieldBase>
  );
});

export const TagField = Object.assign(TagFieldBase, {
  Option: ListBox.Item,
  Section: ListBox.Section,
});
