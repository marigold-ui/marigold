import { Collection, Row, useTableOptions } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { cn, useClassNames } from '@marigold/system';

import { Checkbox } from '../Checkbox';
import { useTableContext } from './Context';
import { TableCell } from './TableCell';

type RemovedProps = 'className';
export interface TableRowProps
  extends Omit<RAC.RowProps<object>, RemovedProps> {
  variant?: string;
  size?: string;
}

const _TableRow = ({
  id,
  columns,
  children,
  variant,
  size,
  ...props
}: TableRowProps) => {
  const { selectionBehavior, selectionMode } = useTableOptions();

  const interactive = selectionMode !== 'none';
  const { ...ctx } = useTableContext();

  const classNames = useClassNames({
    component: 'Table',
    variant: variant || ctx.variant,
    size: size || ctx.size,
  });

  return (
    <Row
      {...props}
      id={id}
      className={cn(
        [!interactive ? 'cursor-text' : 'cursor-pointer'],
        classNames?.row
      )}
    >
      {selectionBehavior === 'toggle' && (
        <TableCell>
          <Checkbox slot="selection" />
        </TableCell>
      )}
      <Collection items={columns}>{children}</Collection>
    </Row>
  );
};

export { _TableRow as TableRow };
