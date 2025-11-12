import type RAC from 'react-aria-components';
import { Label } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className';
export interface LabelProps extends Omit<RAC.LabelProps, RemovedProps> {
  size?: string;
  variant?: string;
}

const _Label = ({ size, variant, children, ...props }: LabelProps) => {
  const className = useClassNames({ component: 'Label', size, variant });

  return (
    <Label {...props} className={cn(className, 'inline-flex')}>
      {children}
    </Label>
  );
};

export { _Label as Label };
