import React from 'react';
import { Box, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Token from '.';

export default {
  title: 'Token',
} as Meta;

export const Shadows = () => {
  const Shadow = ({ value }: { value: string }) => (
    <Box
      css={{
        height: 100,
        width: 100,
        bg: Token.color.gray['00'],
        boxShadow: value,
      }}
    />
  );

  const shadow = Token.shadow;
  return (
    <Box
      css={{
        bg: Token.color.gray['30'],
        p: 40,
      }}
    >
      <Stack space="32px" alignX="center">
        {Object.values(shadow).map(value => (
          <Shadow key={value} value={value} />
        ))}
      </Stack>
    </Box>
  );
};
