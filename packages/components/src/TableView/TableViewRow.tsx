import { GripVertical } from 'lucide-react';
import type RAC from 'react-aria-components';
import {
  Button,
  Cell,
  Collection,
  Row,
  useTableOptions,
} from 'react-aria-components';
import { Checkbox } from '../Checkbox/Checkbox';

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

  return (
    <Row id={id} {...otherProps}>
      {allowsDragging && (
        <Cell>
          <Button slot="drag">
            <GripVertical />
          </Button>
        </Cell>
      )}
      {selectionBehavior === 'toggle' && (
        <Cell>
          <Checkbox slot="selection" />
        </Cell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  );
};

export { TableViewRow };
