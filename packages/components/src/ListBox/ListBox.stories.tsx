/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Header } from '../Header';
import { ListBox } from './ListBox';
import { Item } from './ListBoxOption';
import { Section } from './ListBoxSection';

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
      disabledKeys={['four']}
      {...args}
    >
      <Item key="one">One</Item>
      <Item key="two">Two</Item>
      <Item key="three">Three</Item>
      <Item key="four">Four</Item>
    </ListBox>
  ),
};

export const WithSections: Story = {
  render: args => (
    <ListBox {...args}>
      <Section>
        <Header>Veggies</Header>
        <Item key="lettuce">Lettuce</Item>
        <Item key="tomato">Tomato</Item>
        <Item key="onion">Onion</Item>
      </Section>
      <Section>
        <Header>Protein</Header>
        <Item key="ham">Ham</Item>
        <Item key="tuna">Tuna</Item>
        <Item key="tofu">Tofu</Item>
      </Section>
      <Section>
        <Header>Condiments</Header>
        <Item key="mayo">Mayonaise</Item>
        <Item key="mustard">Mustard</Item>
        <Item key="ranch">Ranch</Item>
      </Section>
    </ListBox>
  ),
};
