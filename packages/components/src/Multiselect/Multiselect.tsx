import {
  ForwardRefExoticComponent,
  Key,
  ReactNode,
  RefAttributes,
  forwardRef,
  useCallback,
  useId,
  useRef,
  useState,
} from 'react';
import type RAC from 'react-aria-components';
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

    const selectedKeys = selectedItems.items.map(item => item.id);

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

    const onRemove = useCallback(
      (keys: Set<Key>) => {
        // TODO: clarify why this is an array
        const key = keys.values().next().value;
        if (key) {
          selectedItems.remove(key);
          setFieldState({
            inputValue: '',
            selectedKey: null,
          });
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
        setFieldState({
          inputValue: '',
          selectedKey: null,
        });
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

    const popLast = useCallback(() => {}, []);

    return (
      // container
      <div>wfe</div>
    );
  }
);

/**
 * -container
 *  --tag group (we use their tag group giving it the same styles like ours)
 *  --fieldbase
 *  ---input
 */
