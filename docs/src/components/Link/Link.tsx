import React from 'react';
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby';
import { Link as MarigoldLink } from '@marigold/components';

export const Link: React.FC<GatsbyLinkProps<unknown>> = ({
  children,
  ...props
}) => <MarigoldLink as={GatsbyLink}>{children}</MarigoldLink>;
