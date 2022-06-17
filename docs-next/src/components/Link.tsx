import React from 'react';
import { Link as NextLink, NextLinkProps } from 'next/link';

import {
  Link as MarigoldLink,
  LinkProps as MarigoldLinkProps,
} from '@marigold/components';

import { colors } from '../theme/colors';

export interface LinkProps
  extends Pick<MarigoldLinkProps, 'variant' | 'target' | 'children'> {
  to: NextLinkProps<unknown>['href'];
}

export const Link = ({ children, to, ...props }: LinkProps) => {
  const regex = /https?:\/\/((?:[\w\d-]+\.)+[\w\d]{2,})/i;
  const externalLink = regex.test(to);

  return externalLink ? (
    <MarigoldLink href={to} {...props}>
      {children}
    </MarigoldLink>
  ) : (
    <MarigoldLink
      as={NextLink}
      href={to}
      activeStyle={{ color: colors.blue70 }}
      {...props}
    >
      {children}
    </MarigoldLink>
  );
};
