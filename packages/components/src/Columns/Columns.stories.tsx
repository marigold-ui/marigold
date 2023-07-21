import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Columns, Stack } from '@marigold/components';

const meta = {
  title: 'Components/Columns',
  component: Columns,
  argTypes: {
    columns: {
      control: {
        type: 'select',
      },
      options: [
        [4, 4, 4],
        [2, 8, 2],
        [2, 5, 5],
        [3, 6, 3],
        [8, 2, 2],
      ],
      description: 'array of numbers to set width of every column',

      table: {
        type: { summary: 'select' },
        defaultValue: { summary: [2, 8, 2] },
      },
    },
    space: {
      control: {
        type: 'text',
      },

      description: 'Responsive Style Value',
    },
    collapseAt: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '40em' },
      },
      description: 'Responsive Style Value',
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
      description: 'Let columns container fill height',
    },
  },
  args: {
    collapseAt: '40em',
    stretch: false,
    columns: [2, 8, 2],
  },
} satisfies Meta<typeof Columns>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Columns {...args}>
      <div className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
      <div className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
      <div className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
    </Columns>
  ),
};

export const ComplexChildren: Story = {
  render: args => (
    <Columns {...args}>
      <main className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
      <>
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
        <div className="h-[100px] border border-[#ced4da] bg-[#e9ecef]" />
      </>
      <aside className="h-[150px] border border-[#ced4da] bg-[#e9ecef]" />
    </Columns>
  ),
};

const Block = ({
  children,
  height,
}: {
  children: ReactNode;
  height?: number | string;
}) => (
  <div
    style={{ height }}
    className=" h-[--height] rounded border border-solid border-[#67686c] bg-[#858cab] p-3 text-[#edf2ff]
     "
  >
    {children}
  </div>
);

export const MultiRow = () => (
  <Block>
    <Stack space={4}>
      <Block height={500}>
        <Columns columns={[4, 4, 4]} space={2} stretch>
          <Block height="100%">one</Block>
          <Block>two</Block>
          <Block height={200}>three</Block>
        </Columns>
      </Block>
      <Columns columns={[2, 1]} space={2}>
        <Block>four</Block>
        <Block>five</Block>
      </Columns>
    </Stack>
  </Block>
);

export const FullHeight: Story = {
  render: args => (
    <div className="h-[300px] bg-[#adb5bd]">
      <Columns {...args}>
        <div className="h-[150px] border border-[#495057] bg-[#e9ecef]" />
        <div className="h-[150px] border border-[#495057] bg-[#e9ecef]" />
        <div className="h-full border border-[#495057] bg-[#e9ecef] p-2">
          I will grow, if you set <code>stretch</code> prop on the{' '}
          <code>Columns</code>!
        </div>
      </Columns>
    </div>
  ),
};
