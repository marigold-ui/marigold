import type { Key, ReactNode, Ref } from 'react';
import {
  forwardRef,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type RAC from 'react-aria-components';
import {
  Autocomplete,
  Group,
  Select as ReactAriaSelect,
  SearchField,
  SelectStateContext,
  TagGroup,
  TagList,
  useFilter,
} from 'react-aria-components';
import { useLocalizedStringFormatter } from '@react-aria/i18n';
import { forwardRefType } from '@react-types/shared';
import { type WidthProp, cn, createVar, useClassNames } from '@marigold/system';
import { FieldBase } from '../FieldBase/FieldBase';
import { IconButton } from '../IconButton/IconButton';
import { SearchInput } from '../Input/SearchInput';
import { ListBox } from '../ListBox/ListBox';
import { Popover } from '../Overlay/Popover';
import { Tag } from '../TagGroup/Tag';
import { ChevronsVertical } from '../icons/ChevronsVertical';
import { intlMessages } from '../intl/messages';

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

  /**
   * Provides content to display when there are no items in the list.
   */
  emptyState?: ReactNode;
}

// Inner component that reads SelectStateContext to render tags
// ---------------
interface TagDisplayProps {
  placeholder?: string;
  classNames: Record<string, string>;
  disabled?: boolean;
}

const TagDisplay = ({ placeholder, classNames, disabled }: TagDisplayProps) => {
  const state = useContext(SelectStateContext);

  if (!state) {
    return null;
  }

  const selectedKeys = [...state.selectionManager.selectedKeys];

  if (selectedKeys.length === 0) {
    return <span>{placeholder}</span>;
  }

  const selectedItems: { id: Key; textValue: string }[] = [];
  for (const key of selectedKeys) {
    const item = state.collection.getItem(key);
    if (item) {
      selectedItems.push({ id: key, textValue: item.textValue });
    }
  }

  return (
    <TagGroup
      aria-label="Selected items"
      className={classNames.tagGroup}
      onRemove={
        disabled
          ? undefined
          : keys => {
              const currentKeys = new Set(state.selectionManager.selectedKeys);
              for (const key of keys) {
                currentKeys.delete(key);
              }
              state.selectionManager.setSelectedKeys(currentKeys);
            }
      }
    >
      <TagList items={selectedItems} className={classNames.listItems}>
        {(item: { id: Key; textValue: string }) => (
          <Tag id={item.id as string | number} disabled={disabled}>
            {item.textValue}
          </Tag>
        )}
      </TagList>
    </TagGroup>
  );
};

// Component
// ---------------
const _TagField = (forwardRef as forwardRefType)(function TagField<
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
    emptyState,
    ...rest
  }: TagFieldProps<T>,
  ref: Ref<HTMLDivElement>
) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const { contains } = useFilter({ sensitivity: 'base' });

  useLayoutEffect(() => {
    const el = triggerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;

    const observer = new ResizeObserver(() => {
      setTriggerWidth(el.offsetWidth);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const props: RAC.SelectProps<T, 'multiple'> = {
    selectionMode: 'multiple',
    isDisabled: disabled,
    isInvalid: error,
    isOpen: open,
    isRequired: required,
    ...rest,
  };

  const classNames = useClassNames({ component: 'TagField', variant, size });
  const stringFormatter = useLocalizedStringFormatter(intlMessages);

  return (
    <FieldBase
      as={ReactAriaSelect}
      ref={ref}
      variant={variant}
      size={size}
      {...props}
    >
      <Group
        ref={triggerRef}
        className={cn(
          'w-(--field-width) max-w-full min-w-0',
          classNames.trigger
        )}
      >
        <TagDisplay
          placeholder={placeholder}
          classNames={classNames}
          disabled={disabled}
        />
        <IconButton className={classNames.button}>
          <ChevronsVertical />
        </IconButton>
      </Group>
      <Popover triggerRef={triggerRef}>
        <div
          className={classNames.container}
          style={createVar({
            'tagfield-trigger-width': triggerWidth
              ? `${triggerWidth}px`
              : undefined,
          })}
        >
          <Autocomplete filter={contains}>
            <SearchField aria-label="Search" autoFocus>
              <SearchInput placeholder={placeholder} />
            </SearchField>
            <ListBox
              items={items}
              renderEmptyState={() =>
                emptyState ?? (
                  <div className="flex items-center">
                    {stringFormatter.format('noResultsFound')}
                  </div>
                )
              }
            >
              {children}
            </ListBox>
          </Autocomplete>
        </div>
      </Popover>
    </FieldBase>
  );
});

export const TagField = Object.assign(_TagField, {
  Option: ListBox.Item,
  Section: ListBox.Section,
});
