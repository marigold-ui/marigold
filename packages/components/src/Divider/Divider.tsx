import type RAC from 'react-aria-components';
import { Separator } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';
export interface DividerProps extends Omit<RAC.SeparatorProps, RemovedProps> {
  variant?: 'default' | 'bold' | (string & {});
}

const _Divider = ({ variant, ...props }: DividerProps) => {
  const classNames = useClassNames({ component: 'Divider', variant });
  return <Separator className={cn('border-none', classNames)} {...props} />;
};

export { _Divider as Divider };
