import React from 'react';

import { Headline, List, Text } from '@marigold/components';
import { ComponentProps } from '@marigold/types';

import { Link } from './components/Link';

// Typography
// ---------------
export const h1 = ({ children, ...props }: ComponentProps<'h1'>) => (
  <Headline level="1" {...props}>
    {children}
  </Headline>
);

export const h2 = ({ children, ...props }: ComponentProps<'h2'>) => (
  <Headline level="2" {...props}>
    {children}
  </Headline>
);

export const h3 = ({ children, ...props }: ComponentProps<'h3'>) => (
  <Headline level="3" {...props}>
    {children}
  </Headline>
);

export const h4 = ({ children, ...props }: ComponentProps<'h4'>) => (
  <Headline level="4" {...props}>
    {children}
  </Headline>
);

export const h5 = ({ children, ...props }: ComponentProps<'h5'>) => (
  <Headline level="5" {...props}>
    {children}
  </Headline>
);

export const h6 = ({ children, ...props }: ComponentProps<'h6'>) => (
  <Headline level="6" {...props}>
    {children}
  </Headline>
);

export const p = Text;

export const a = ({ children, href = '#', ...props }: ComponentProps<'a'>) => (
  <Link href={href} {...props}>
    {children}
  </Link>
);

export const ul = ({ children, ...props }: ComponentProps<'ul'>) => (
  <List></List>
);
