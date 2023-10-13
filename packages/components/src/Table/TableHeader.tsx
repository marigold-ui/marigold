import { TableHeader } from 'react-aria-components';
import type RAC from 'react-aria-components';

type RemovedProps = 'className';

export interface TableHeaderProps
  extends Omit<RAC.TableHeaderProps<object>, RemovedProps> {}

const _TableHeader = ({ children, ...props }: TableHeaderProps) => {
  return <TableHeader {...props}>{children}</TableHeader>;
};

export { _TableHeader as TableHeader };
