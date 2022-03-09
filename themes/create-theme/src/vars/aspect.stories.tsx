import React from 'react';
import { Box, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Vars from '.';

export default {
  title: 'Vars',
} as Meta;

export const Aspects = () => (
  <Stack space="12px">
    {Object.entries(Vars.aspect).map(([name, value]) => (
      <Box
        key={name}
        css={{
          display: 'grid',
          placeItems: 'center',
          color: Vars.color.gray['00'],
          bg: Vars.color.gray['80'],
          blockSize: 100,
          aspectRatio: value,
        }}
      >
        {name}
      </Box>
    ))}
  </Stack>
);
