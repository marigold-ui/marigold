import type RAC from 'react-aria-components';
import { Label } from 'react-aria-components/Label';
import { cn, useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'style';
export interface LabelProps extends Omit<RAC.LabelProps, RemovedProps> {
  size?: string;
  variant?: string;
}

const _Label = ({ size, variant, children, ...props }: LabelProps) => {
  const className = useClassNames({ component: 'Label', size, variant });

  return (
    <Label
      {...props}
      // `wrap-anywhere`: an unbreakable label would otherwise set the field's
      // min-content width and overflow the container. Not themeable on purpose.
      className={cn(
        className,
        'in-field:mb-1.5 inline-flex wrap-anywhere hyphens-auto'
      )}
    >
      {children}
    </Label>
  );
};

export { _Label as Label };
