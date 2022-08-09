import { forwardRef } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import {
  Link as MarigoldLink,
  LinkProps as MarigoldLinkProps,
} from '@marigold/components';

export interface LinkProps
  extends NextLinkProps,
    Pick<MarigoldLinkProps, 'variant' | 'target' | 'children'> {}

const InnerLink = forwardRef(
  ({ onClick, ...props }: Omit<LinkProps, 'href' | 'as'>, ref) => (
    <MarigoldLink onPress={onClick} {...props} ref={ref}>
      {props.children}
    </MarigoldLink>
  )
);

export const Link = ({ variant, href, children, target }: LinkProps) => {
  return (
    <NextLink href={href} passHref shallow={true}>
      <InnerLink variant={variant} target={target}>
        {children}
      </InnerLink>
    </NextLink>
  );
};
