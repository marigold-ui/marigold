import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Label } from './Label';

export default {
  title: 'Components/Label',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: '?',
      table: {
        defaultValue: {
          summary: 'above',
        },
      },
    },
    htmlFor: {
      control: {
        type: 'text',
      },
      defaultValue: 'input',
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Adds required Icon to label',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Label> = args => (
  <Label {...args}>Label</Label>
);
