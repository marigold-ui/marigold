import React from 'react';
import { Box, Inline, Stack } from '@marigold/components';
import { Meta } from '@storybook/blocks';

import * as Token from '.';

export default {
  title: 'Token/Border',
} as Meta;

export const Size = () => (
  <Inline space="12px">
    {Object.values(Token.border.width).map(value => (
      <Box
        key={value}
        css={{
          width: 100,
          height: 100,
          bg: Token.color.gray['20'],
          borderStyle: 'solid',
          borderColor: Token.color.gray['80'],
          borderWidth: value,
        }}
      />
    ))}
  </Inline>
);

export const Radius = () => (
  <Stack space="12px">
    {Object.values(Token.border.radius).map(value => (
      <Box
        key={value}
        css={{
          width: 200,
          height: 200,
          borderStyle: 'solid',
          borderColor: Token.color.gray['80'],
          borderWidth: Token.border.width['medium-1'],
          borderRadius: value,
        }}
      />
    ))}
  </Stack>
);
