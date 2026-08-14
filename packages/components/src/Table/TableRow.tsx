import type RAC from 'react-aria-components';
import { Button } from 'react-aria-components/Button';
import { Collection } from 'react-aria-components/Collection';
import { Cell, Row, useTableOptions } from 'react-aria-components/Table';
import { cn, useClassNames } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';
import { GripVertical } from '../icons/GripVertical';
import { useTableContext } from './Context';

type RemovedProps = 'className' | 'style';

export interface TableRowProps<T extends object = object> extends Omit<
  RAC.RowProps<T>,
  RemovedProps | 'hasChildItems'
> {
  variant?: 'grid' | 'default' | 'muted' | (string & {});
  size?: 'compact' | 'default' | 'spacious' | (string & {});
  /**
   * Whether the row can be expanded even though its nested rows are not there
   * yet. Only needed when they are fetched on demand: without it the row gets no
   * expand control, so there is nothing to trigger the fetch. Statically nested
   * rows and `Table.ExpandableRows` are detected automatically.
   */
  expandable?: boolean;
}

const TableRow = <T extends object>({
  id,
  columns,
  children,
  variant: variantProp,
  size: sizeProp,
  expandable,
  ...otherProps
}: TableRowProps<T>) => {
  let { selectionBehavior, allowsDragging } = useTableOptions();
  const context = useTableContext();

  // RAC reads `hasChildItems` for the control and the data attributes;
  // react-aria's `useTableRow` reads `hasChildRows` for `aria-expanded`. Setting
  // one leaves the other half missing, so write both until upstream unifies
  // them. `hasChildRows` isn't in RAC's `RowProps`, but row props reach the
  // collection node, which is where `useTableRow` looks.
  const expandableProps = {
    hasChildItems: expandable,
    hasChildRows: expandable,
  };
  const classNames = useClassNames({
    component: 'Table',
    variant: variantProp ?? context.variant,
    size: sizeProp ?? context.size,
  });

  return (
    <Row
      id={id}
      className={cn('group/row', classNames.row)}
      {...expandableProps}
      {...otherProps}
    >
      {allowsDragging && (
        <Cell className={classNames.cell}>
          <Button
            slot="drag"
            className={cn(
              'grid size-full place-items-center',
              classNames.dragHandle
            )}
          >
            <GripVertical />
          </Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell className={classNames.cell}>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  );
};

export { TableRow };
