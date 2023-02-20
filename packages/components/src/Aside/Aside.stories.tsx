import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '../Box';

import { Aside } from './Aside';
import isChromatic from 'chromatic';

const meta = {
  title: 'Components/Aside',
  component: Aside,
  argTypes: {
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
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'medium' },
      },
      description: 'Value representing the space between the two elements',
    },
    side: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'left' },
      },
      description: 'Which element to treat as the sidebar',
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
      description: 'Make the adjacent elements adopt their natural height',
    },
    sideWidth: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'xxlarge' },
      },
      description: `Represents the width of the sidebar when adjacent. If not set (undefined) it defaults to the sidebar's content width`,
    },
    wrap: {
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '50%' },
      },
      description:
        'The narrowest the content (main) element can be before wrapping. Should be a percentage.',
    },
  },
  args: {
    side: 'left',
    space: 'medium',
    wrap: '50%',
    stretch: true,
    sideWidth: 'xxlarges',
  },
} satisfies Meta<typeof Aside>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <Aside {...args}>
      <Box css={{ bg: '#f1f3f5' }}>
        Ketchup was once sold as medicine. The condiment was prescribed and sold
        to people suffering with indigestion back in 1834.
      </Box>
      <Box css={{ bg: '#f1f3f5' }}>
        There is actually a word for someone giving an opinion on something they
        know nothing about. An 'ultracrepidarian' is someone who voices thoughts
        beyond their expertise.
      </Box>
    </Aside>
  ),
};

export const InheritWidth: Story = {
  render: args => (
    <Aside space="large" {...args}>
      <img
        src="https://images.dog.ceo/breeds/pug/n02110958_13993.jpg"
        alt="Pug"
        width="250px"
      />
      <Box css={{ bg: '#f1f3f5' }}>
        Pugs were originally bred to be lapdogs for Chinese royalty. They lived
        in luxury with the emperor, his family, and members of the imperial
        court. They were royal and loyal companions, and were highly valued in
        society.
      </Box>
    </Aside>
  ),
};

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};
