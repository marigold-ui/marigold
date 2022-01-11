import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';

import { Link as MarigoldLink } from '@marigold/components';

import { colors } from '../theme/colors';

export const Link: React.FC<GatsbyLinkProps<unknown>> = ({
  children,
  ...props
}) => (
  <MarigoldLink
    activeStyle={{ color: colors.blue70 }}
    {...props}
    as={GatsbyLink}
  >
    {children}
  </MarigoldLink>
);
