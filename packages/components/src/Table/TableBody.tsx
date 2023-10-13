import { TableBody } from 'react-aria-components';
import type RAC from 'react-aria-components';

type RemovedProps = 'className';
export interface TableBodyProps
  extends Omit<RAC.TableBodyProps<object>, RemovedProps> {}

const _TableBody = ({ children, ...props }: TableBodyProps) => (
  <TableBody {...props}>{children}</TableBody>
);

export { _TableBody as TableBody };
