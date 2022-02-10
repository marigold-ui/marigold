import React from 'react';
import { Box, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Vars from '.';

export default {
  title: 'Vars',
} as Meta;

export const Shadows = () => {
  const Shadow = ({ value }: { value: string }) => (
    <Box
      css={{
        height: 100,
        width: 100,
        bg: Vars.color.gray['gray-00'],
        boxShadow: value,
      }}
    />
  );

  const shadow = Vars.shadow;
  return (
    <Box bg={Vars.color.gray['gray-30']} p={40}>
      <Stack space="32px" align="center">
        {Object.values(shadow).map(value => (
          <Shadow key={value} value={value} />
        ))}
      </Stack>
    </Box>
  );
};
