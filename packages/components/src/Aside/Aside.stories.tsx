import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Aside } from './Aside';
import { Stack } from '../Stack';

const meta = {
  title: 'Components/Aside',
  component: Aside,
  argTypes: {
    space: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: { summary: '0' },
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
    space: '0',
    wrap: '50%',
    stretch: true,
    sideWidth: 'xxlarges',
  },
} satisfies Meta;

export default meta;

export const Basic: StoryObj<typeof Aside> = {
  render: args => (
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
  ),
};

export const InheritWidth: StoryObj<typeof Aside> = {
  render: args => (
    <Aside space={8} {...args}>
      <img
        src="https://images.dog.ceo/breeds/pug/n02110958_13993.jpg"
        alt="Pug"
        width="250px"
      />
      <div className="h-full">
        <Stack stretch>
          <p>
            Pugs were originally bred to be lapdogs for Chinese royalty. They
            lived in luxury with the emperor, his family, and members of the
            imperial court. They were royal and loyal companions, and were
            highly valued in society.
          </p>
          <p>
            Pugs were most likely originally bred as lapdogs for Chinese
            monarchs and were originally known as the lo-chiang-sze or the foo
            dog. It is unclear as to how long ago the breed actually first
            appeared. Some believe that Pugs date back to the Han and Tang
            Dynasties, around 150 BCE, whereas others place the date back even
            further to the Shang Dynasty, around 400 BCE (Pug).
          </p>
        </Stack>
      </div>
    </Aside>
  ),
};
