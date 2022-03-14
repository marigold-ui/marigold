import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
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
      defaultValue: 'none',
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
      defaultValue: 'huge',
      description: `Represents the width of the sidebar when adjacent. If not set (undefined) it defaults to the sidebar's content width`,
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Aside> = args => (
  <Aside {...args}>
    <div>
      Ketchup was once sold as medicine. The condiment was prescribed and sold
      to people suffering with indigestion back in 1834.
    </div>
    <div>
      There is actually a word for someone giving an opinion on something they
      know nothing about. An 'ultracrepidarian' is someone who voices thoughts
      beyond their expertise.
    </div>
  </Aside>
);
