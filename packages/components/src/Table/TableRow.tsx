import type RAC from 'react-aria-components';
import {
  Button,
  Cell,
  Collection,
  Row,
  useTableOptions,
} from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';
import { GripVertical } from '../icons/GripVertical';
import { useTableContext } from './Context';

type RemovedProps = 'className' | 'style';

export interface TableRowProps<T extends object = object> extends Omit<
  RAC.RowProps<T>,
  RemovedProps
> {
  variant?: 'grid' | 'default' | 'muted' | (string & {});
  size?: 'compact' | 'default' | 'spacious' | (string & {});
}

const TableRow = <T extends object>({
  id,
  columns,
  children,
  variant: variantProp,
  size: sizeProp,
  ...otherProps
}: TableRowProps<T>) => {
  let { selectionBehavior, allowsDragging } = useTableOptions();
  const context = useTableContext();
  const classNames = useClassNames({
    component: 'Table',
    variant: variantProp ?? context.variant,
    size: sizeProp ?? context.size,
  });

  return (
    <Row id={id} className={cn('group/row', classNames.row)} {...otherProps}>
      {allowsDragging && (
        <Cell>
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
