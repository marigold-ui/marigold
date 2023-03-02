import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { VisuallyHidden } from './VisuallyHidden';
import { Text } from '../Text';

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
