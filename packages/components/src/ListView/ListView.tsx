import type { ReactNode, Ref } from 'react';
import { useMemo } from 'react';
import type RAC from 'react-aria-components';
import { GridList as RACGridList } from 'react-aria-components/GridList';
import type { SelectionMode } from '@react-types/shared';
import { useClassNames } from '@marigold/system';
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
  children,
  ref,
  ...rest
}: ListViewProps) => {
  const classNames = useClassNames({ component: 'ListView', variant, size });

  // `useClassNames` returns a fresh object, so memoise on the slot strings.
  const { list, item, label, description, title, indicator, actions } =
    classNames;
  const contextValue = useMemo(
    () => ({
      classNames: { list, item, label, description, title, indicator, actions },
    }),
    [list, item, label, description, title, indicator, actions]
  );

  return (
    <ListViewContext value={contextValue}>
      <RACGridList
        {...(rest as RAC.GridListProps<object>)}
        {...(emptyState !== undefined && {
          renderEmptyState: () => emptyState,
        })}
        ref={ref}
        selectionMode={selectionMode}
        selectionBehavior="toggle"
        className={classNames.list}
      >
        {children}
      </RACGridList>
    </ListViewContext>
  );
};

const ListViewExported = ListViewBase as ListViewComponent;
ListViewExported.Item = ListViewItem;

export { ListViewExported as ListView };
