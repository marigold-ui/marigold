import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import {
  Link as MarigoldLink,
  LinkProps as MarigoldLinkProps,
} from '@marigold/components';

export interface LinkProps
  extends NextLinkProps,
    Pick<MarigoldLinkProps, 'variant' | 'target' | 'children'> {
  href: string;
}

const Foo = ({ onClick, ...props }: Omit<LinkProps, 'href' | 'as'>) => (
  <MarigoldLink onPress={onClick} {...props}>
    {props.children}
  </MarigoldLink>
);

export const Link = ({ variant, href, children }: LinkProps) => {
  return (
    <NextLink href={href} passHref>
      <Foo variant={variant}>{children}</Foo>
    </NextLink>
  );
};
