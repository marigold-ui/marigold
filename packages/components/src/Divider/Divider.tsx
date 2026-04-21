import type RAC from 'react-aria-components';
import { Separator } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';
export interface DividerProps extends Omit<RAC.SeparatorProps, RemovedProps> {
  variant?: 'default' | 'bold' | (string & {});
}

const _Divider = ({ variant, orientation, ...props }: DividerProps) => {
  const classNames = useClassNames({
    component: 'Divider',
    variant,
  });
  const orientationStyles =
    orientation === 'vertical'
      ? 'min-h-full w-px shrink-0 border-0 self-stretch'
      : 'h-px min-w-full';
  return (
    <Separator
      className={cn('border-none', orientationStyles, classNames)}
      {...props}
    />
  );
};

export { _Divider as Divider };
