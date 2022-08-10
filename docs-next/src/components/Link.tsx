import { forwardRef } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import {
  Link as MarigoldLink,
  LinkProps as MarigoldLinkProps,
} from '@marigold/components';

export interface LinkProps
  extends NextLinkProps,
    Pick<MarigoldLinkProps, 'variant' | 'target' | 'children'> {}

// why the onPress not works: https://github.com/adobe/react-spectrum/issues/2525
const InnerLink = forwardRef(
  ({ onClick, ...props }: Omit<LinkProps, 'href' | 'as'>, ref) => (
    <MarigoldLink onClick={onClick} {...props} ref={ref}>
      {props.children}
    </MarigoldLink>
  )
);

export const Link = ({ variant, href, children, target }: LinkProps) => {
  return (
    <NextLink href={href} passHref>
      <InnerLink variant={variant} target={target}>
        {children}
      </InnerLink>
    </NextLink>
  );
};
