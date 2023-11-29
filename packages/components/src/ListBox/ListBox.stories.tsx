/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Header } from '../Header';
import { ListBox } from './ListBox';

const meta = {
  title: 'Components/ListBox',
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <ListBox
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
    <ListBox {...args}>
      <ListBox.Section>
        <Header>Veggies</Header>
        <ListBox.Item key="lettuce">Lettuce</ListBox.Item>
        <ListBox.Item key="tomato">Tomato</ListBox.Item>
        <ListBox.Item key="onion">Onion</ListBox.Item>
      </ListBox.Section>
      <ListBox.Section>
        <Header>Protein</Header>
        <ListBox.Item key="ham">Ham</ListBox.Item>
        <ListBox.Item key="tuna">Tuna</ListBox.Item>
        <ListBox.Item key="tofu">Tofu</ListBox.Item>
      </ListBox.Section>
      <ListBox.Section>
        <Header>Condiments</Header>
        <ListBox.Item key="mayo">Mayonaise</ListBox.Item>
        <ListBox.Item key="mustard">Mustard</ListBox.Item>
        <ListBox.Item key="ranch">Ranch</ListBox.Item>
      </ListBox.Section>
    </ListBox>
  ),
};
