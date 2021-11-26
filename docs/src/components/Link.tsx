import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import { Link as MarigoldLink } from '@marigold/components';

export const Link: React.FC<GatsbyLinkProps<unknown>> = ({
  children,
  ...props
}) => (
  <MarigoldLink activeStyle={{ color: '#1D67B6' }} {...props} as={GatsbyLink}>
    {children}
  </MarigoldLink>
);
