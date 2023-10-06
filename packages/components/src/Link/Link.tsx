import { forwardRef } from 'react';
import {
  Link as RACLink,
  type LinkProps as RACLinkProps,
} from 'react-aria-components';

import { useClassNames } from '@marigold/system';

type RemovedProps = 'className' | 'isDisabled';

export interface LinksProps extends Omit<RACLinkProps, RemovedProps> {
  variant?: string;
  size?: string;
  disabled?: RACLinkProps['isDisabled'];
}

export const Link = forwardRef<HTMLAnchorElement, LinksProps>(
  ({ variant, size, disabled, children, ...props }, ref) => {
    const classNames = useClassNames({
      component: 'Link',
      variant,
      size,
    });

    return (
      <RACLink
        {...props}
        ref={ref}
        className={classNames}
        isDisabled={disabled}
      >
        {children}
      </RACLink>
    );
  }
);
