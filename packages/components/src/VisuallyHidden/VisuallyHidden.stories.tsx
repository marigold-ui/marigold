import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Text } from '../Text';
import { VisuallyHidden } from './VisuallyHidden';

const meta = {
  title: 'Components/Hidden',
  component: VisuallyHidden,
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: ({ children, ...args }) => (
    <>
      <Text>The Text below is visually hidden</Text>
      <VisuallyHidden {...args}>Invisible!</VisuallyHidden>
    </>
  ),
};
