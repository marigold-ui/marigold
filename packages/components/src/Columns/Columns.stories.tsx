import React, { ReactNode } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';

import { Box, Columns, Stack } from '@marigold/components';

export default {
  title: 'Components/Columns',
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
      defaultValue: [2, 8, 2],
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
      defaultValue: '40em',
      description: 'Responsive Style Value',
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: 'Let columns container fill height',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Columns> = args => (
  <Columns {...args}>
    <Box border="1px solid #ced4da" bg="#e9ecef" height="150px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="150px" />
    <Box border="1px solid #ced4da" bg="#e9ecef" height="150px" />
  </Columns>
);

export const ComplexChildren: ComponentStory<typeof Columns> = args => (
  <Columns {...args}>
    <Box as="main" border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    <>
      <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
      <Box border="1px solid #ced4da" bg="#e9ecef" height="100px" />
    </>
    <Box as="aside" border="1px solid #ced4da" bg="#e9ecef" height="100px" />
  </Columns>
);

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

export const FullHeight: ComponentStory<typeof Columns> = args => (
  <Box css={{ height: 300, bg: '#adb5bd' }}>
    <Columns {...args}>
      <Box border="1px solid #495057" bg="#e9ecef" height="150px" />
      <Box border="1px solid #495057" bg="#e9ecef" height="150px" />
      <Box border="1px solid #495057" bg="#e9ecef" height="100%" p={8}>
        I will grow, if you set <code>stretch</code> prop on the{' '}
        <code>Columns</code>!
      </Box>
    </Columns>
  </Box>
);
