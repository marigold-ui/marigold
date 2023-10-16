import {
  Collection,
  TableHeader,
  useTableOptions,
} from 'react-aria-components';
import type RAC from 'react-aria-components';

import { Checkbox } from '../Checkbox';
import { TableColumnHeader } from './TableColumnHeader';

type RemovedProps = 'className';

export interface TableHeaderProps
  extends Omit<RAC.TableHeaderProps<object>, RemovedProps> {}

const _TableHeader = ({ columns, children, ...props }: TableHeaderProps) => {
  const { selectionBehavior, selectionMode } = useTableOptions();

  return (
    <TableHeader {...props}>
      {selectionBehavior === 'toggle' && (
        <TableColumnHeader>
          {selectionMode === 'multiple' && <Checkbox slot="selection" />}
        </TableColumnHeader>
      )}
      <Collection items={columns}>{children}</Collection>
    </TableHeader>
  );
};

export { _TableHeader as TableHeader };
