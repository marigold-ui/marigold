import type RAC from 'react-aria-components';
import { Label } from 'react-aria-components';
import { cn, useClassNames } from '@marigold/system';
import { Asterisk } from '../icons/Asterisk';

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
      <span aria-hidden="true" className={cn('hidden', classNames.indicator)}>
        *
      </span>
    </Label>
  );
};

export { _Label as Label };
