import type RAC from 'react-aria-components';
import { Separator } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';
export interface DividerProps extends Omit<RAC.SeparatorProps, RemovedProps> {
  variant?: 'default' | 'bold' | (string & {});
  size?: string & {};
}

const _Divider = ({ variant, size, orientation, ...props }: DividerProps) => {
  const classNames = useClassNames({
    component: 'Divider',
    variant,
    size,
  });

  const orientationStyles =
    orientation === 'vertical' ? 'min-h-8 w-px' : 'h-px min-w-full';

  return (
    <Separator
      orientation={orientation}
      className={cn('border-none', orientationStyles, classNames)}
      {...props}
    />
  );
};

export { _Divider as Divider };
