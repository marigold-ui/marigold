import React, { useState } from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import { Select } from './Select';
import { Container } from '../Container';

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
      description: 'Set the placeholder text',
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Set the field description',
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
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
} as Meta;

export const Basic: ComponentStory<typeof Select> = args => {
  const [selected, setSelected] = useState<string | number>('');
  return (
    <Container size="small">
      <Select
        {...args}
        onSelectionChange={setSelected}
        disabledKeys={['Firefly']}
      >
        <Select.Option key="Harry Potter">Harry Potter</Select.Option>
        <Select.Option key="Lord of the Rings">Lord of the Rings</Select.Option>
        <Select.Option key="Star Wars">Star Wars</Select.Option>
        <Select.Option key="Star Trek">Star Trek</Select.Option>
        <Select.Option key="Firefly">Firefly</Select.Option>
      </Select>
      <hr />
      <pre>selected: {selected}</pre>
    </Container>
  );
};

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
