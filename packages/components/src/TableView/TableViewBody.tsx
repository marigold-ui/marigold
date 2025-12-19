import type RAC from 'react-aria-components';
import { TableBody } from 'react-aria-components';
import { cn } from '@marigold/system';
import { useTableViewContext } from './Context';

type RemovedProps = 'className' | 'style';

export type TableViewBodyProps<T extends object = object> = Omit<
  RAC.TableBodyProps<T>,
  RemovedProps
>;

const TableViewBody = <T extends object = object>(
  props: TableViewBodyProps<T>
) => {
  const { classNames } = useTableViewContext();
  return <TableBody className={cn(classNames?.body)} {...props} />;
};

export { TableViewBody };
