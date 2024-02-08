/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { GridList } from './GridList';

const meta = {
  title: 'Components/GridList',
} satisfies Meta<typeof GridList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <GridList
      aria-labelledby="GridList"
      selectionMode="multiple"
      defaultSelectedKeys={['one']}
      {...args}
      disabledKeys={['four']}
    >
      <GridList.Item id="one">one</GridList.Item>
      <GridList.Item id="two">Two</GridList.Item>
      <GridList.Item id="three">Three</GridList.Item>
      <GridList.Item id="four">Four</GridList.Item>
    </GridList>
  ),
};
