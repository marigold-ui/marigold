import React, { ReactNode } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box } from '@marigold/system';
import { shadow } from '@marigold/tokens';

import { Inline } from '../Inline';
import { Stack } from '../Stack';

import { Split } from './Split';

const Block = ({ children }: { children: ReactNode }) => (
  <Box
    css={{
      border: '1px solid #364fc7',
      borderRadius: 16,
      bg: '#4263eb',
      color: '#edf2ff',
      px: 32,
      py: 12,
      boxShadow: shadow['medium-1'],
    }}
  >
    {children}
  </Box>
);

export default {
  title: 'Components/Split',
  argTypes: {},
} as Meta;

export const WithInline: ComponentStory<typeof Split> = () => (
  <Inline space="medium">
    <Block>First</Block>
    <Block>Second</Block>
    <Split />
    <Block>Third</Block>
  </Inline>
);

export const WithStack: ComponentStory<typeof Split> = () => (
  <Box css={{ height: 400 }}>
    <Stack space="xsmall">
      <Block>First</Block>
      <Split />
      <Block>Second</Block>
      <Block>Third</Block>
    </Stack>
  </Box>
);
