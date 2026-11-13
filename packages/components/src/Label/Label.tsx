import type RAC from 'react-aria-components';
import { Label as RACLabel } from 'react-aria-components/Label';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';
export interface LabelProps extends Omit<RAC.LabelProps, RemovedProps> {
  size?: string;
  variant?: string;
}

const Label = ({ size, variant, children, ...props }: LabelProps) => {
  const className = useClassNames({ component: 'Label', size, variant });

  return (
    <RACLabel
      {...props}
      className={cn(
        className,
        'in-field:mb-1.5 inline-flex wrap-anywhere hyphens-auto'
      )}
    >
      {children}
    </RACLabel>
  );
};

export { Label };
