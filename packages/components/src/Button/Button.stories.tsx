import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Facebook } from '@marigold/icons';
import { Button } from './Button';

export default {
  title: 'Components/Button',
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'ghost', 'text', 'menu', 'select'],
      description: 'What the button looks like',
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['large', 'small'],
      description: 'How big the button is rendered',
      table: {
        defaultValue: {
          summary: 'large',
        },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      options: [true, false],
      description: 'Disable the button',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Button> = args => (
  <Button {...args}>
    <Facebook /> Like me
  </Button>
);
