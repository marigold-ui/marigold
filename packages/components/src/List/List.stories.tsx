import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';
import isChromatic from 'chromatic';

const meta = {
  title: 'Components/List',
  component: List,
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'The variant of the list',
    },
    size: {
      control: {
        type: 'text',
      },
      description: 'The size of the list',
    },
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <List {...args}>
      <List.Item>Käse</List.Item>
      <List.Item>Milch</List.Item>
      <List.Item>Brot</List.Item>
    </List>
  ),
};

export const Ordered: Story = {
  render: args => (
    <List as="ol" {...args}>
      <List.Item>Käse</List.Item>
      <List.Item>Milch</List.Item>
      <List.Item>Brot</List.Item>
    </List>
  ),
};

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
