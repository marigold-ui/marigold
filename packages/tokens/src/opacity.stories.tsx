import React from 'react';
import { Box, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Token from '.';

export default {
  title: 'Token',
} as Meta;

export const Opacity = () => (
  <Stack space="12px">
    {Object.entries(Token.opacity).map(([name, value]) => (
      <Box
        key={name}
        css={{
          display: 'grid',
          placeItems: 'center',
          color: value > 0 ? Token.color.gray['00'] : Token.color.gray['90'],
          bg: Token.color.gray['80'],
          blockSize: 100,
          aspectRatio: Token.aspect.square,
          opacity: value,
        }}
      >
        {name}
      </Box>
    ))}
  </Stack>
);
