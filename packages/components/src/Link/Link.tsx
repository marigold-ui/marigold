import { forwardRef } from 'react';
import type RAC from 'react-aria-components';
import { Link } from 'react-aria-components';
import { useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'isDisabled';

export interface LinkProps extends Omit<RAC.LinkProps, RemovedProps> {
  variant?: string;
  size?: string;
  /**
   * The link can't be clicked
   * @default false
   */
  disabled?: RAC.LinkProps['isDisabled'];
}

const _Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, size, disabled, children, ...props }, ref) => {
    const classNames = useClassNames({
      component: 'Link',
      variant,
      size,
    });

    return (
      <Link {...props} ref={ref} className={classNames} isDisabled={disabled}>
        {children}
      </Link>
    );
  }
);

export { _Link as Link };
