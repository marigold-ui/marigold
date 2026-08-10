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

  // Upstream reads two different prop names for the same thing: react-aria-
  // components uses `hasChildItems` for the chevron and the data attributes,
  // while react-aria's `useTableRow` uses `hasChildRows` for `aria-expanded`.
  // Setting only one leaves the other half missing, so both are written until
  // upstream reconciles them. `hasChildRows` is not part of RAC's `RowProps`,
  // but every row prop ends up on the collection node, which is where
  // `useTableRow` looks for it.
  //
  // Both are spelled in terms of children the row does not have yet, which is
  // why the public prop is `expandable` instead: the row is what gains the
  // behaviour, and that stays true before anything is loaded.
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
