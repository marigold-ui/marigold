import { Asterisk } from 'packages/components/src/icons/Asterisk';
import type RAC from 'react-aria-components';
import { Label } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className';
export interface LabelProps extends Omit<RAC.LabelProps, RemovedProps> {
  size?: string;
  variant?: string;
}

const _Label = ({ size, variant, children, ...props }: LabelProps) => {
  const classNames = useClassNames({ component: 'Label', size, variant });

  return (
    <Label {...props} className={cn(classNames.container, 'inline-flex')}>
      {children}
      <Asterisk className={cn('hidden', classNames.indicator)} />
    </Label>
  );
};

export { _Label as Label };
