import React from 'react';
import { Box, Inline, Stack } from '@marigold/components';
import type { Meta } from '@storybook/react';

import * as Token from '.';

export default {
  title: 'Token/Size',
} as Meta;

export const Fixed = () => (
  <Inline space="12px">
    {Object.values(Token.size.fixed).map(value => (
      <Box
        css={{
          display: 'grid',
          placeItems: 'center',
          color: Token.color.gray['00'],
          bg: Token.color.gray['80'],
          blockSize: 100,
          height: Token.size.fixed.xxlarge,
          width: value,
        }}
      />
    ))}
  </Inline>
);

export const Fluid = () => (
  <Inline space="12px">
    {Object.values(Token.size.fluid).map(value => (
      <Box
        css={{
          display: 'grid',
          placeItems: 'center',
          color: Token.color.gray['00'],
          bg: Token.color.gray['80'],
          blockSize: 100,
          height: Token.size.fixed.xxlarge,
          width: value,
        }}
      />
    ))}
  </Inline>
);

export const Headlines = () => (
  <Stack space="24px">
    {Object.values(Token.size.header).map(value => (
      <Box
        css={{
          fontSize: Token.typography.size.fluid.regular,
          fontFamily: Token.typography.font.sans,
          maxWidth: value,
        }}
      >
        You'll Be in Hot Water if You Miss This Guide to Celebrating Valentine’s
        Day
      </Box>
    ))}
  </Stack>
);

export const Content = () => (
  <Stack space="24px">
    {Object.values(Token.size.content).map(value => (
      <Box
        key={value}
        css={{
          fontSize: Token.typography.size.fluid.small,
          fontFamily: Token.typography.font.sans,
          maxWidth: value,
        }}
      >
        In the wild, giraffes almost never lie down because of vulnerability to
        predators. They usually sleep standing, sometimes sitting, and they give
        birth standing up. When giraffes sleep, they curl their necks and sleep
        for about five minutes at a time, sleeping no more than 30 minutes a
        day.
      </Box>
    ))}
  </Stack>
);
