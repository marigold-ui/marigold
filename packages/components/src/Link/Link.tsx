import { forwardRef } from 'react';
import { Link } from 'react-aria-components';
import type RAC from 'react-aria-components';

import { useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'isDisabled';

export interface LinksProps extends Omit<RAC.LinkProps, RemovedProps> {
  variant?: string;
  size?: string;
  disabled?: RAC.LinkProps['isDisabled'];
}

const _Link = forwardRef<HTMLAnchorElement, LinksProps>(
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
