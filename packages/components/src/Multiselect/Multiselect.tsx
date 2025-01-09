import {
  ForwardRefExoticComponent,
  Key,
  KeyboardEvent,
  ReactNode,
  RefAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type RAC from 'react-aria-components';
import { Tag, TagGroup, TagList } from 'react-aria-components';
import { useFilter } from '@react-aria/i18n';
import { ListData, useListData } from '@react-stately/data';
import { FieldBase, FieldBaseProps } from '../FieldBase';
import { ListBox } from '../ListBox';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isDisabled'
  | 'isRequired'
  | 'isInvalid'
  | 'isReadOnly'
  | 'defaultInputValue'
  | 'inputValue'
  | 'onInputChange'
  | 'items';

export interface MultiselectProps<T extends object>
  extends Omit<RAC.ComboBoxProps<any>, RemovedProps>,
    Pick<
      FieldBaseProps<'label'>,
      'width' | 'label' | 'description' | 'errorMessage'
    > {
  variant?: string;
  size?: string;

  items: { id: string; name: string }[];

  // TODO: Remove any 🙂
  selectedItems: ListData<any>;

  /**
   * If `true`, the input is disabled.
   * @default false
   */
  disabled?: RAC.ComboBoxProps<any>['isDisabled'];

  /**
   * If `true`, the input is required.
   * @default false
   */
  required?: RAC.ComboBoxProps<any>['isRequired'];

  /**
   * If `true`, the input is readOnly.
   * @default false
   */
  readOnly?: RAC.ComboBoxProps<any>['isReadOnly'];

  /**
   * If `true`, the field is considered invalid and if set the `errorMessage` is shown instead of the `description`.
   * @default false
   */
  error?: RAC.ComboBoxProps<any>['isInvalid'];

  /**
   * The value of the input (uncontrolled).
   */
  defaultValue?: RAC.ComboBoxProps<any>['defaultInputValue'];

  /**
   * The value of the input (controlled).
   */
  value?: RAC.ComboBoxProps<any>['inputValue'];

  /**
   * Called when the input value changes.
   */
  onChange?: RAC.ComboBoxProps<any>['onInputChange'];

  // TODO: Add description
  onItemCleared?: (key: Key) => void;

  // TODO: Add description
  onItemInserted?: (key: Key) => void;

  /**
   * ReactNode or function to render the list of items.
   */
  children?: ReactNode | ((item: any) => ReactNode);

  /**
   * Set the placeholder for the select.
   */
  placeholder?: string;
}

interface MultiselectComponent
  extends ForwardRefExoticComponent<
    MultiselectProps<object> & RefAttributes<HTMLInputElement>
  > {
  /**
   * Options for the Combobox.
   */
  Option: typeof ListBox.Item;

  /**
   * Section for the Combobox, to put options in.
   */
  Section: typeof ListBox.Section;
}

// Component
// ---------------

export const Multiselect = forwardRef<HTMLInputElement, MultiselectProps<any>>(
  (
    {
      variant,
      size,
      required,
      disabled,
      readOnly,
      error,
      defaultValue,
      value,
      onChange,
      onItemCleared,
      onItemInserted,
      children,
      selectedItems,
      items,
      ...rest
    },
    ref
  ) => {
    const tagGroupIdentifier = useId();
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const [width, setWidth] = useState(0);

    const { contains } = useFilter({
      sensitivity: 'base',
    });

    const selectedKeys = selectedItems?.items?.map(item => item.id);

    const filter = useCallback(
      (item: { id: string; name: string }, filterText: string) => {
        return (
          !selectedKeys.includes(item.id) && contains(item.name, filterText)
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

    const clearInput = () => {
      setFieldState({
        inputValue: '',
        selectedKey: null,
      });
    };

    const onRemove = useCallback(
      (keys: Set<Key>) => {
        // TODO: clarify why this is an array
        const key = keys.values().next().value;
        if (key) {
          selectedItems.remove(key);
          clearInput();
          onItemCleared?.(key);
        }
      },
      [selectedItems, onItemCleared]
    );

    const onSelectionChange = (id: Key) => {
      if (!id) {
        return;
      }
      /**
       * first use key to get the selectedItem from the accessible list
       * after getting this item from the accessible list push/append it into selectedItems
       * the selectedKeys will automatically updated since selectitems is one of its dependencies
       */
      const item = accessibleList.getItem(id);

      if (!selectedKeys.includes(id)) {
        selectedItems.append(item);
        clearInput();
        onItemInserted?.(id);
      }
    };

    const onInputChange = (value: string) => {
      setFieldState(prev => ({
        inputValue: value,
        selectedKey: value === '' ? null : prev.selectedKey,
      }));

      accessibleList.setFilterText(value);
    };

    const popLast = useCallback(() => {
      if (selectedItems.items?.length === 0) {
        return;
      }

      // Getting the last selected item
      const endKey = selectedItems.items?.at(-1);

      if (endKey) {
        selectedItems.remove(endKey.id);
        onItemCleared?.(endKey.id);
      }
      clearInput();
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

    return (
      // container
      <div>
        <TagGroup>
          <TagList>
            <Tag>Osama</Tag>
            <Tag>Osama</Tag>
          </TagList>
        </TagGroup>
      </div>
    );
  }
);

/**
 * -container
 *  --tag group (we use their tag group giving it the same styles like ours)
 *  --fieldbase
 *  ---input
 */
