import React from 'react';
import { Box, Inline } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Token from '.';

export default {
  title: 'Token/Space',
} as Meta;

export const Fixed = () => (
  <Inline space="12px">
    {Object.values(Token.space.fixed).map(value => (
      <Box
        css={{
          display: 'grid',
          placeItems: 'center',
          color: Token.color.gray['00'],
          lineHeight: 1,
          bg: Token.color.gray['80'],
          p: value,
        }}
      >
        Content
      </Box>
    ))}
  </Inline>
);

export const Fluid = () => (
  <Inline space="12px">
    {Object.values(Token.space.fluid).map(value => (
      <Box
        css={{
          display: 'grid',
          placeItems: 'center',
          color: Token.color.gray['00'],
          lineHeight: 1,
          bg: Token.color.gray['80'],
          p: value,
        }}
      >
        Content
      </Box>
    ))}
  </Inline>
);
