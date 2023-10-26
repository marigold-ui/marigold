import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { List } from './List';

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
      <List.Item>Cheese</List.Item>
      <List.Item>Milk</List.Item>
      <List.Item>Bread</List.Item>
    </List>
  ),
};

export const Ordered: Story = {
  render: args => (
    <List as="ol" {...args}>
      <List.Item>Cheese</List.Item>
      <List.Item>Milk</List.Item>
      <List.Item>Bread</List.Item>
    </List>
  ),
};

export const Nested: Story = {
  render: args => (
    <div className="p-4">
      <List {...args}>
        <List.Item>
          Crispy Chicken Burger
          <List>
            <List.Item>Hähnchen Filet im Crunchy Cornflakes Mantel</List.Item>
          </List>
        </List.Item>
        <List.Item>
          Cream Cheese Chicken Burger
          <List>
            <List.Item>Hähnchen Filet im Crunchy Cornflakes Mantel</List.Item>
            <List.Item>Rucola</List.Item>
            <List.Item>Frischkäse</List.Item>
          </List>
        </List.Item>
        <List.Item>
          Farmer
          <List>
            <List.Item>Rindfleisch</List.Item>
            <List.Item>Bacon</List.Item>
            <List.Item>Spiegelei</List.Item>
          </List>
        </List.Item>
      </List>
    </div>
  ),
};
