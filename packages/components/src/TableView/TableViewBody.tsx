import type RAC from 'react-aria-components';
import { TableBody } from 'react-aria-components';

type RemovedProps = 'className' | 'style';

export type TableViewBodyProps<T extends object = object> = Omit<
  RAC.TableBodyProps<T>,
  RemovedProps
>;

const TableViewBody = <T extends object = object>(
  props: TableViewBodyProps<T>
) => {
  return <TableBody {...props} />;
};

export { TableViewBody };
