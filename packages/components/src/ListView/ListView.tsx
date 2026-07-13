import type { ReactNode, Ref } from 'react';
import { useMemo } from 'react';
import type RAC from 'react-aria-components';
import { GridList as RACGridList } from 'react-aria-components/GridList';
import { cn, useClassNames } from '@marigold/system';
import { ListViewContext } from './Context';
import { ListViewItem } from './ListViewItem';

// ListView is deliberately NOT a form field: no FieldBase, no hidden input,
// no name/form/validate, no selection. It's a non-form list of rows the user
// operates in place (toggle / dismiss / open a row menu), staying on the
// page. For "pick one/some from a set" use SelectList/Select/ListBox instead.
type RemovedProps =
  | 'className'
  | 'style'
  | 'selectionMode'
  | 'selectionBehavior'
  | 'selectedKeys'
  | 'defaultSelectedKeys'
  | 'onSelectionChange'
  | 'disallowEmptySelection'
  | 'dragAndDropHooks'
  | 'renderEmptyState'
  | 'orientation';

export interface ListViewProps extends Omit<
  RAC.GridListProps<object>,
  RemovedProps
> {
  variant?: 'default' | (string & {});
  size?: string;
  /**
   * Content to render when the list is empty.
   */
  emptyState?: ReactNode;
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
  children,
  ref,
  ...rest
}: ListViewProps) => {
  const classNames = useClassNames({ component: 'ListView', variant, size });

  const contextValue = useMemo(() => ({ classNames }), [classNames]);

  return (
    <ListViewContext value={contextValue}>
      <RACGridList
        {...(rest as RAC.GridListProps<object>)}
        {...(emptyState !== undefined && {
          renderEmptyState: () => emptyState,
        })}
        ref={ref}
        layout="grid"
        selectionMode="none"
        className={cn('group/list', classNames.list)}
      >
        {children}
      </RACGridList>
    </ListViewContext>
  );
};

const ListViewExported = ListViewBase as ListViewComponent;
ListViewExported.Item = ListViewItem;

export { ListViewExported as ListView };
