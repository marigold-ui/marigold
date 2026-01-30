import { GripVertical } from 'lucide-react';
import type RAC from 'react-aria-components';
import {
  Button,
  Cell,
  Collection,
  Row,
  useTableOptions,
} from 'react-aria-components';
import { cn } from '@marigold/system';
import { Checkbox } from '../Checkbox/Checkbox';
import { useTableViewContext } from './Context';

type RemovedProps = 'className' | 'style';

export type TableViewRowProps<T extends object = object> = Omit<
  RAC.RowProps<T>,
  RemovedProps
>;

const TableViewRow = <T extends object>({
  id,
  columns,
  children,
  ...otherProps
}: TableViewRowProps<T>) => {
  let { selectionBehavior, allowsDragging } = useTableOptions();
  const { classNames } = useTableViewContext();

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

export { TableViewRow };
