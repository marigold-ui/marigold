import React from 'react';
import { Box, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Vars from '.';

export default {
  title: 'Vars',
} as Meta;

export const Opacity = () => (
  <Stack space="12px">
    {Object.entries(Vars.opacity).map(([name, value]) => (
      <Box
        key={name}
        css={{
          display: 'grid',
          placeItems: 'center',
          color: value > 0 ? Vars.color.gray['00'] : Vars.color.gray['90'],
          bg: Vars.color.gray['80'],
          blockSize: 100,
          aspectRatio: Vars.aspect.square,
          opacity: value,
        }}
      >
        {name}
      </Box>
    ))}
  </Stack>
);
