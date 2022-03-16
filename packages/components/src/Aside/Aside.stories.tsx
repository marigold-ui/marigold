import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Box } from '../Box';

import { Aside } from './Aside';

export default {
  title: 'Components/Aside',
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
      defaultValue: 'medium',
      description: 'Value representing the space between the two elements',
    },
    side: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
      defaultValue: 'left',
      description: 'Which element to treat as the sidebar',
    },
    stretch: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
      description: 'Make the adjacent elements adopt their natural height',
    },
    sideWidth: {
      control: {
        type: 'text',
      },
      defaultValue: 'xxlarge',
      description: `Represents the width of the sidebar when adjacent. If not set (undefined) it defaults to the sidebar's content width`,
    },
    wrap: {
      control: {
        type: 'text',
      },
      defaultValue: '50%',
      description:
        'The narrowest the content (main) element can be before wrapping. Should be a percentage.',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Aside> = args => (
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
);

export const InheritWidth: ComponentStory<typeof Aside> = () => (
  <Aside space="large">
    <img
      src="https://images.dog.ceo/breeds/pug/n02110958_13993.jpg"
      alt="Pug"
      width="250px"
    />
    <Box css={{ bg: '#f1f3f5' }}>
      Pugs were originally bred to be lapdogs for Chinese royalty. They lived in
      luxury with the emperor, his family, and members of the imperial court.
      They were royal and loyal companions, and were highly valued in society.
    </Box>
  </Aside>
);
