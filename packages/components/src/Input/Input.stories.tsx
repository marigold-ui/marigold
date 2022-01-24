import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Input } from './Input';
import { Label } from '../Label';

export default {
  title: 'Components/Input',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: '?',
      table: {
        defaultValue: {
          summary: '__default',
        },
      },
    },
    type: {
      control: {
        type: 'select',
      },
      options: [
        'date',
        'datetime-local',
        'email',
        'month',
        'number',
        'password',
        'search',
        'tel',
        'text',
        'time',
        'time',
        'url',
        'week',
      ],
      defaultValue: 'text',
      table: {
        defaultValue: {
          summary: 'text',
        },
      },
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Input> = args => (
  <Label htmlFor="input">
    Label
    <Input id="input" placeholder="Placeholder..." {...args} />
  </Label>
);
