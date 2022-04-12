import React from 'react';
import { Box, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Token from '.';

export default {
  title: 'Token',
} as Meta;

export const Aspects = () => (
  <Stack space="12px">
    {Object.entries(Token.aspect).map(([name, value]) => (
      <Box
        key={name}
        css={{
          display: 'grid',
          placeItems: 'center',
          color: Token.color.gray['00'],
          bg: Token.color.gray['80'],
          blockSize: 100,
          aspectRatio: value,
        }}
      >
        {name}
      </Box>
    ))}
  </Stack>
);
