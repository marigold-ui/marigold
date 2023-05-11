import React, { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Box, Columns, Stack } from '@marigold/components';

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
        type: 'select',
      },
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'xxlarge',
      ],
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
      <Box css={{ border: '1px solid #ced4da', bg: '#e9ecef', height: 150 }} />
      <Box css={{ border: '1px solid #ced4da', bg: '#e9ecef', height: 150 }} />
      <Box css={{ border: '1px solid #ced4da', bg: '#e9ecef', height: 150 }} />
    </Columns>
  ),
};

export const ComplexChildren: Story = {
  render: args => (
    <Columns {...args}>
      <Box
        as="main"
        css={{ border: '1px solid #ced4da', bg: '#e9ecef', height: 100 }}
      />
      <>
        <Box
          css={{ border: '1px solid #ced4da', bg: '#e9ecef', height: 100 }}
        />
        <Box
          css={{ border: '1px solid #ced4da', bg: '#e9ecef', height: 100 }}
        />
      </>
      <Box
        as="aside"
        css={{ border: '1px solid #ced4da', bg: '#e9ecef', height: 100 }}
      />
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
  <Box
    css={{
      height,
      background: 'hsla(218 16% 77% / 50%)',
      border: '1px solid hsla(218 16% 70% / 50%)',
      borderRadius: 12,
      p: 12,
    }}
  >
    {children}
  </Box>
);

export const MultiRow = () => (
  <Block>
    <Stack space="medium">
      <Block height={500}>
        <Columns columns={[4, 4, 4]} space="small" stretch>
          <Block height="100%">one</Block>
          <Block>two</Block>
          <Block height={200}>three</Block>
        </Columns>
      </Block>
      <Columns columns={[2, 1]} space="small">
        <Block>four</Block>
        <Block>five</Block>
      </Columns>
    </Stack>
  </Block>
);

export const FullHeight: Story = {
  render: args => (
    <Box css={{ height: 300, bg: '#adb5bd' }}>
      <Columns {...args}>
        <Box
          css={{ border: '1px solid #495057', bg: '#e9ecef', height: 150 }}
        />
        <Box
          css={{ border: '1px solid #495057', bg: '#e9ecef', height: 150 }}
        />
        <Box
          css={{
            border: '1px solid #495057',
            bg: '#e9ecef',
            height: '100%',
            p: 8,
          }}
        >
          I will grow, if you set <code>stretch</code> prop on the{' '}
          <code>Columns</code>!
        </Box>
      </Columns>
    </Box>
  ),
};
