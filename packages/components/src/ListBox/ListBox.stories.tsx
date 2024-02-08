/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Header } from '../Header';
import { ListBox } from './ListBox';

const meta = {
  title: 'Components/ListBox',
  argTypes: {
    selectionMode: {
      control: {
        type: 'select',
      },
      options: ['single', 'multiple'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'single' },
      },
      description: 'Set selection mode of the grid list',
      defaultValue: false,
    },
  },
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <ListBox
      aria-labelledby="listbox"
      selectionMode="single"
      defaultSelectedKeys={['one']}
      {...args}
      disabledKeys={['four']}
    >
      <ListBox.Item id="one">one</ListBox.Item>
      <ListBox.Item id="two">Two</ListBox.Item>
      <ListBox.Item id="three">Three</ListBox.Item>
      <ListBox.Item id="four">Four</ListBox.Item>
    </ListBox>
  ),
};

export const WithSections: Story = {
  render: args => (
    <ListBox aria-labelledby="listbox" selectionMode="multiple" {...args}>
      <ListBox.Section>
        <Header>Veggies</Header>
        <ListBox.Item id="lettuce">Lettuce</ListBox.Item>
        <ListBox.Item id="tomato">Tomato</ListBox.Item>
        <ListBox.Item id="onion">Onion</ListBox.Item>
      </ListBox.Section>
      <ListBox.Section>
        <Header>Protein</Header>
        <ListBox.Item id="ham">Ham</ListBox.Item>
        <ListBox.Item id="tuna">Tuna</ListBox.Item>
        <ListBox.Item id="tofu">Tofu</ListBox.Item>
      </ListBox.Section>
      <ListBox.Section>
        <Header>Condiments</Header>
        <ListBox.Item id="mayo">Mayonaise</ListBox.Item>
        <ListBox.Item id="mustard">Mustard</ListBox.Item>
        <ListBox.Item id="ranch">Ranch</ListBox.Item>
      </ListBox.Section>
    </ListBox>
  ),
};
