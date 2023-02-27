import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import isChromatic from 'chromatic';
import { Delete, Search } from '@marigold/icons';
import { Button } from '../Button';
import { Input } from './Input';

export default {
  title: 'Components/Input',
  argTypes: {
    variant: {
      control: {
        type: 'text',
      },
      description: 'Input variant',
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
    },
    pattern: {
      control: {
        type: 'text',
      },
      description: 'Pattern for the input',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Input> = args => (
  <Input>
    <Input.Field placeholder="Placeholder..." {...args} />
  </Input>
);

Basic.parameters = {
  chromatic: { viewports: [320, 1200] },
  theme: isChromatic() ? 'b2b' : 'stacked',
};

export const WithIcons: ComponentStory<typeof Input> = args => (
  <Input disabled>
    <Search />
    <Input.Field placeholder="Placeholder..." />
    <Button size="small" variant="text">
      <Delete />
    </Button>
  </Input>
);
