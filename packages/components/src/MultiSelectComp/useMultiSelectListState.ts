import { useListState } from '@react-stately/list';
import { MultipleSelectionStateProps } from '@react-stately/selection';
import { useControlledState } from '@react-stately/utils';
import type { CollectionBase, Node, Selection } from '@react-types/shared';
import { ListState } from './types';

/**
 * Pulled directly from the following library and augmented for our needs:
 *
 * https://github.com/so99ynoodles/headless-react/blob/main/packages/shared/src/hooks/useMultiSelectListState.tsx
 */

export interface MultiSelectListState<T> extends ListState<T> {
  /** The value of the currently selected item. */
  readonly selectedItems: Node<T>[];
  /** The key for the currently selected item. */
  readonly selectedKeys: Selection;
  /** Sets the selected keys. */
  setSelectedKeys: (keys: Set<React.Key>) => void;
}

export interface MultiSelectListProps<T>
  extends CollectionBase<T>,
    MultipleSelectionStateProps {
  /** Filter function to generate a filtered list of nodes. */
  filter?: (nodes: Iterable<Node<T>>) => Iterable<Node<T>>;
  /** @private */
  suppressTextValueWarning?: boolean;
}

export function useMultiSelectListState<T extends object>(
  props: MultiSelectListProps<T>
): MultiSelectListState<T> {
  const {
    defaultSelectedKeys = new Set(),
    onSelectionChange,
    selectedKeys: selectedKeysProp,
  } = props;

  const [selectedKeys, setSelectedKeys] = useControlledState<Selection>(
    selectedKeysProp as Selection,
    defaultSelectedKeys as Selection,
    onSelectionChange!
  );

  const { collection, disabledKeys, selectionManager } = useListState({
    ...props,
    allowDuplicateSelectionEvents: true,
    selectionMode: 'multiple',
    selectedKeys,
    onSelectionChange: (keys: Selection) => {
      if (props.onSelectionChange) {
        props.onSelectionChange(keys);
      }

      setSelectedKeys(keys);
    },
  });

  const selectedItems: any =
    selectedKeys === 'all'
      ? [...collection]
      : [...selectedKeys].map(key => collection.getItem(key));

  return {
    collection,
    disabledKeys,
    selectionManager,
    selectedKeys,
    setSelectedKeys: setSelectedKeys.bind(selectionManager) as any,
    selectedItems,
  };
}
