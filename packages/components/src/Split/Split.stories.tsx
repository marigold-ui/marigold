import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
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

const meta = {
  title: 'Components/Split',
  component: Split,
} satisfies Meta<typeof Split>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInline: Story = {
  render: () => (
    <Inline space="medium">
      <Block>First</Block>
      <Block>Second</Block>
      <Split />
      <Block>Third</Block>
    </Inline>
  ),
};

export const WithStack: Story = {
  render: () => (
    <Box css={{ height: 400 }}>
      <Stack space="xsmall" stretch>
        <Block>First</Block>
        <Split />
        <Block>Second</Block>
        <Block>Third</Block>
      </Stack>
    </Box>
  ),
};
