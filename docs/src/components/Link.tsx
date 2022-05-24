import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';

import {
  Link as MarigoldLink,
  LinkProps as MarigoldLinkProps,
} from '@marigold/components';

import { colors } from '../theme/colors';

export interface LinkProps
  extends Pick<MarigoldLinkProps, 'variant' | 'target' | 'children'> {
  to: GatsbyLinkProps<unknown>['to'];
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
      as={GatsbyLink}
      to={to}
      activeStyle={{ color: colors.blue70 }}
      {...props}
    >
      {children}
    </MarigoldLink>
  );
};
