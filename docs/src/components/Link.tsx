import { forwardRef } from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { useRouter } from 'next/router';

import {
  Link as MarigoldLink,
  LinkProps as MarigoldLinkProps,
} from '@marigold/components';

export interface LinkProps
  extends NextLinkProps,
    Pick<
      MarigoldLinkProps,
      'variant' | 'target' | 'children' | 'ariaCurrent'
    > {}

// why the onPress not works: https://github.com/adobe/react-spectrum/issues/2525
const InnerLink = forwardRef(
  ({ onClick, ...props }: Omit<LinkProps, 'href' | 'as'>, ref) => {
    return (
      <MarigoldLink onClick={onClick} {...props} ref={ref}>
        {props.children}
      </MarigoldLink>
    );
  }
);

export const Link = ({ variant, href, children, target }: LinkProps) => {
  const { asPath } = useRouter();
  const link = href + '/';

  const ariaCurrent = link === asPath ? 'active' : undefined;

  return (
    <NextLink href={href} passHref>
      <InnerLink variant={variant} target={target} ariaCurrent={ariaCurrent}>
        {children}
      </InnerLink>
    </NextLink>
  );
};
