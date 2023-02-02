import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { List } from './List';
import isChromatic from 'chromatic';

export default {
  title: 'Components/List',
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
} as Meta;

export const Basic: ComponentStory<typeof List> = args => (
  <List {...args}>
    <List.Item>Käse</List.Item>
    <List.Item>Milch</List.Item>
    <List.Item>Brot</List.Item>
  </List>
);

export const Ordered: ComponentStory<typeof List> = args => (
  <List as="ol" {...args}>
    <List.Item>Käse</List.Item>
    <List.Item>Milch</List.Item>
    <List.Item>Brot</List.Item>
  </List>
);

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
