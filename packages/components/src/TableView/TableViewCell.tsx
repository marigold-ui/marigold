import type RAC from 'react-aria-components';
import { Cell } from 'react-aria-components';

type RemovedProps = 'className' | 'style';

export type TableViewCellProps = Omit<RAC.CellProps, RemovedProps>;

const TableViewCell = (props: TableViewCellProps) => {
  return <Cell {...props} />;
};

export { TableViewCell };
