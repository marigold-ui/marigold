/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';

import { Item, Section } from '@react-stately/collections';
import { ListProps, useListState } from '@react-stately/list';

import { ListBox } from './ListBox';

const meta = {
  title: 'Components/ListBox',
} satisfies Meta<typeof ListBox>;

export default meta;
type Story = StoryObj<typeof meta>;

const List = (props: ListProps<any>) => {
  const state = useListState(props);
  return <ListBox state={state} />;
};

export const Basic: Story = {
  render: args => (
    <List
      selectionMode="single"
      defaultSelectedKeys={['one']}
      disabledKeys={['four']}
      {...args}
    >
      <Item key="one">One</Item>
      <Item key="two">Two</Item>
      <Item key="three">Three</Item>
      <Item key="four">Four</Item>
    </List>
  ),
};

export const WithSections: Story = {
  render: args => (
    <List {...args}>
      <Section title="Veggies">
        <Item key="lettuce">Lettuce</Item>
        <Item key="tomato">Tomato</Item>
        <Item key="onion">Onion</Item>
      </Section>
      <Section title="Protein">
        <Item key="ham">Ham</Item>
        <Item key="tuna">Tuna</Item>
        <Item key="tofu">Tofu</Item>
      </Section>
      <Section title="Condiments">
        <Item key="mayo">Mayonaise</Item>
        <Item key="mustard">Mustard</Item>
        <Item key="ranch">Ranch</Item>
      </Section>
    </List>
  ),
};
