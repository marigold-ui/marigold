import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';

import {
  Link as MarigoldLink,
  LinkProps as MarigoldLinkProps,
} from '@marigold/components';

import { colors } from '../theme/colors';

export interface LinkProps
  extends Pick<MarigoldLinkProps, 'variant' | 'target'> {
  to: GatsbyLinkProps<unknown>['to'];
}
export const Link: React.FC<LinkProps> = ({ children, ...props }) => (
  <MarigoldLink
    activeStyle={{ color: colors.blue70 }}
    as={GatsbyLink}
    {...props}
  >
    {children}
  </MarigoldLink>
);
