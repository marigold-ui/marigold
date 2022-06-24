import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import {
  Link as MarigoldLink,
  LinkProps as MarigoldLinkProps,
} from '@marigold/components';

import { colors } from '../theme/colors';

export interface LinkProps
  extends Pick<MarigoldLinkProps, 'variant' | 'target' | 'children'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref'> {
  to: NextLinkProps['href'];
}

export const Link = ({ children, to, ...props }: LinkProps) => {
  const regex = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
  const externalLink = regex.test(to.toString());

  return externalLink ? (
    <MarigoldLink href={to} {...props}>
      {children}
    </MarigoldLink>
  ) : (
    <MarigoldLink
      as={NextLink}
      passHref={true}
      href={to}
      legacyBehavior={false}
      // its a gatsby thing
      //activeStyle={{ color: colors.blue70 }}
      {...props}
    >
      {children}
    </MarigoldLink>
  );
};
