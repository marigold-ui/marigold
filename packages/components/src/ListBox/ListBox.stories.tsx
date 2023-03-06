/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ListProps, useListState } from '@react-stately/list';
import { Item } from '@react-stately/collections';

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
    <List {...args}>
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </List>
  ),
};
