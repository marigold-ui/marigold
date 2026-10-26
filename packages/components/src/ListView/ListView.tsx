import type { ReactNode, Ref } from 'react';
import { useCallback, useMemo } from 'react';
import type RAC from 'react-aria-components';
import { GridList as RACGridList } from 'react-aria-components/GridList';
import type { SelectionMode } from '@react-types/shared';
import { useClassNames } from '@marigold/system';
import { SelectAllHeader, useSelectableKeys } from '../utils/SelectAll';
import { useLiftedSelection } from '../utils/useLiftedSelection';
import { ListViewContext } from './Context';
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
  RemovedProps
> {
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
  /**
   * Whether to show a select-all checkbox above the rows, with a count of what
   * is selected. Has no effect unless `selectionMode="multiple"`.
   * @default false
   */
  allowSelectAll?: boolean;
  ref?: Ref<HTMLDivElement>;
}

interface ListViewComponent {
  (props: ListViewProps): ReactNode;
  Item: typeof ListViewItem;
}

const ListViewBase = ({
  variant,
  size,
  emptyState,
  selectionMode = 'none',
  allowSelectAll,
  selectedKeys,
  defaultSelectedKeys,
  onSelectionChange,
  children,
  ref,
  ...rest
}: ListViewProps) => {
  const classNames = useClassNames({ component: 'ListView', variant, size });

  const hasSelectAll = allowSelectAll === true && selectionMode === 'multiple';

  const [selection, setSelection] = useLiftedSelection(
    selectedKeys,
    defaultSelectedKeys,
    onSelectionChange
  );

  const keys = useSelectableKeys({
    children,
    items: rest.items,
    disabledKeys: rest.disabledKeys,
    enabled: hasSelectAll,
  });

  const onSelectAll = useCallback(
    (selected: boolean) => {
      if (!selected && rest.disallowEmptySelection) {
        return;
      }
      setSelection(selected ? 'all' : new Set());
    },
    [setSelection, rest.disallowEmptySelection]
  );

  // `useClassNames` returns a fresh object, so memoise on the slot strings.
  const { item, label, description, title, indicator, actions } = classNames;
  const contextValue = useMemo(
    () => ({
      classNames: { item, label, description, title, indicator, actions },
    }),
    [item, label, description, title, indicator, actions]
  );

  return (
    <ListViewContext value={contextValue}>
      <div className={classNames.container}>
        {hasSelectAll && (
          <SelectAllHeader
            keys={keys}
            selection={selection}
            onChange={onSelectAll}
            labelledBy={rest['aria-labelledby']}
            classNames={{
              header: classNames.header,
              count: classNames.count,
            }}
          />
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
          className={classNames.list}
        >
          {children}
        </RACGridList>
      </div>
    </ListViewContext>
  );
};

const ListViewExported = ListViewBase as ListViewComponent;
ListViewExported.Item = ListViewItem;

export { ListViewExported as ListView };
