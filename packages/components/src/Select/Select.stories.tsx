import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'Components/Select',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the select label',
      defaultValue: 'Select for favorite:',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      table: {
        defaultValue: {
          summary: 'Select an option...',
        },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the select',
      defaultValue: false,
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Require the select',
      defaultValue: false,
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Set error state',
      defaultValue: false,
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Error Message',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Select.Option>Harry Potter</Select.Option>
    <Select.Option>Lord of the Rings</Select.Option>
    <Select.Option>Star Wars</Select.Option>
    <Select.Option>Star Trek</Select.Option>
  </Select>
);

export const Sections: ComponentStory<typeof Select> = args => (
  <Select {...args}>
    <Select.Section title="Fantasy">
      <Select.Option>Harry Potter</Select.Option>
      <Select.Option>Lord of the Rings</Select.Option>
    </Select.Section>
    <Select.Section title="Sci-Fi">
      <Select.Option>Star Wars</Select.Option>
      <Select.Option>Star Trek</Select.Option>
    </Select.Section>
  </Select>
);
