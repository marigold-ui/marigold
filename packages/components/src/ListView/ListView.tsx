import type { ReactNode, Ref } from 'react';
import { useCallback, useMemo, useState } from 'react';
import type RAC from 'react-aria-components';
import { GridList as RACGridList } from 'react-aria-components/GridList';
import { useControlledState } from '@react-stately/utils';
import type { Key, Selection, SelectionMode } from '@react-types/shared';
import { useClassNames } from '@marigold/system';
import { SelectAllContext, useSelectableKeys } from '../utils/SelectAll';
import type { CollectionChildren } from '../utils/children.utils';
import { splitCollectionHeader } from '../utils/children.utils';
import { ListViewContext } from './Context';
import { ListViewHeader } from './ListViewHeader';
import { ListViewItem } from './ListViewItem';

// A collection view, not a form field: selection is view state the consumer
// reads and commits. Never name/form/validate — that is SelectList's job.
type RemovedProps =
  | 'className'
  | 'style'
  | 'selectionMode'
  | 'selectionBehavior'
  | 'dragAndDropHooks'
  | 'renderEmptyState'
  | 'orientation'
  | 'layout';

export interface ListViewProps extends Omit<
  RAC.GridListProps<object>,
  RemovedProps | 'children'
> {
  /**
   * The rows of the list, plus an optional `<ListView.Header>` carrying the
   * select-all. Rows are either `<ListView.Item>` children or, together with
   * `items`, a render function.
   */
  children?: CollectionChildren<object>;
  /**
   * Visual variant of the list. `default` draws no outer frame, divider lines
   * only — the container around it owns the surface.
   * @default 'default'
   */
  variant?: 'default' | (string & {});
  /**
   * Size token applied to the list.
   */
  size?: string;
  /**
   * Content to render when the list is empty.
   */
  emptyState?: ReactNode;
  /**
   * Whether rows can be selected, and how many at a time. Selection is view
   * state: read it with `onSelectionChange` and commit it yourself. For a
   * selection that submits with a form, use `SelectList` instead.
   * @default 'none'
   */
  selectionMode?: SelectionMode;
  ref?: Ref<HTMLDivElement>;
}

interface ListViewComponent {
  (props: ListViewProps): ReactNode;
  Item: typeof ListViewItem;
  Header: typeof ListViewHeader;
}

// A `Set` is passed through rather than copied, and the result is memoised on
// the prop: react-aria resets the range anchor when the selection it is handed
// changes identity, so a fresh `Set` per render would break Shift+click.
const toSelection = (
  value: Selection | Iterable<Key> | undefined
): Selection =>
  value === 'all' ? 'all' : value instanceof Set ? value : new Set(value ?? []);

const ListViewBase = ({
  variant,
  size,
  emptyState,
  selectionMode = 'none',
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  children,
  ref,
  ...rest
}: ListViewProps) => {
  const classNames = useClassNames({ component: 'ListView', variant, size });

  // The header is a part, not a row, so it never reaches the collection.
  const [header, items] = splitCollectionHeader(children, ListViewHeader);
  const hasSelectAll = header !== null && selectionMode === 'multiple';

  // Held here rather than inside the GridList, because the select-all sits
  // outside it and RAC publishes its collection state only to its own
  // children. This is the same hook RAC uses internally, so an uncontrolled
  // list keeps behaving as it did.
  const controlledSelection = useMemo(
    () => (selectedKeys !== undefined ? toSelection(selectedKeys) : undefined),
    [selectedKeys]
  );
  const [initialSelection] = useState<Selection>(() =>
    toSelection(defaultSelectedKeys)
  );
  const [selection, setSelection] = useControlledState<Selection>(
    controlledSelection,
    initialSelection,
    onSelectionChange
  );

  const keys = useSelectableKeys({
    children: items,
    items: rest.items,
    disabledKeys: rest.disabledKeys,
    warn: hasSelectAll,
  });

  // `'all'` rather than the resolved keys: that is what React Aria's own
  // Cmd/Ctrl+A reports on this list already, so a consumer has one shape to
  // handle either way.
  const onSelectAll = useCallback(
    (selected: boolean) => setSelection(selected ? 'all' : new Set()),
    [setSelection]
  );

  const selectAll = useMemo(
    () => ({ keys, selection, onChange: onSelectAll }),
    [keys, selection, onSelectAll]
  );

  // `useClassNames` returns a fresh object, so memoise on the slot strings.
  const {
    container,
    header: headerClassName,
    list,
    item,
    label,
    description,
    title,
    indicator,
    actions,
  } = classNames;
  const contextValue = useMemo(
    () => ({
      classNames: {
        container,
        header: headerClassName,
        list,
        item,
        label,
        description,
        title,
        indicator,
        actions,
      },
    }),
    [
      container,
      headerClassName,
      list,
      item,
      label,
      description,
      title,
      indicator,
      actions,
    ]
  );

  return (
    <ListViewContext value={contextValue}>
      <div className={container}>
        {hasSelectAll && (
          <SelectAllContext value={selectAll}>{header}</SelectAllContext>
        )}
        <RACGridList
          {...(rest as RAC.GridListProps<object>)}
          {...(emptyState !== undefined && {
            renderEmptyState: () => emptyState,
          })}
          ref={ref}
          selectionMode={selectionMode}
          selectionBehavior="toggle"
          selectedKeys={selection}
          onSelectionChange={setSelection}
          className={list}
        >
          {items}
        </RACGridList>
      </div>
    </ListViewContext>
  );
};

const ListViewExported = ListViewBase as ListViewComponent;
ListViewExported.Item = ListViewItem;
ListViewExported.Header = ListViewHeader;

export { ListViewExported as ListView };
