/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Multiselect } from './Multiselect';

const meta = {
  title: 'Components/Multiselect',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Set the label of the Multiselect',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: '' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Set the help text description.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable Multiselect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Is the input invalid?',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      description: 'Set the Error Message',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'Set the placeholder text',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'undefined' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description:
        'The width of the field. For that we use the Tailwind tokens.',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'full' },
      },
    },
  },
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    error: false,
    disabled: false,
    width: 'full',
    label: 'Label',
  },
} satisfies Meta;

export default meta;

const ticketCategories = [
  { value: 'general', label: 'General Admission' },
  { value: 'vip', label: 'VIP Experience' },
  { value: 'backstage', label: 'Backstage Pass' },
  { value: 'early', label: 'Early Bird Special' },
];

const ticketPriorities = [
  { value: 'low', label: 'Low Priority' },
  { value: 'medium', label: 'Medium Priority' },
  { value: 'high', label: 'High Priority' },
  { value: 'critical', label: 'Critical Issue' },
];

export const Basic: StoryObj<any> = {
  render: args => (
    <Multiselect
      label="Ticket Categories"
      items={ticketCategories}
      placeholder="Select categories..."
      isOptionDisabled={(item: { value: string }) => item.value === 'backstage'}
      {...args}
    />
  ),
};

export const Controlled: StoryObj<any> = {
  render: args => {
    const [current, setCurrent] = useState<string>('');
    const [selectedItems, setSelectedItems] = useState<Array<object>>([]);

    return (
      <Stack space={3}>
        <Multiselect
          label="Ticket Priorities"
          placeholder="Set priorities..."
          items={ticketPriorities}
          isOptionDisabled={(item: { value: string }) =>
            item.value === 'critical'
          }
          onChange={value => setCurrent(value)}
          onSelectionChange={(selectedValues: object[]) =>
            setSelectedItems(selectedValues)
          }
          {...args}
          selectedItems={selectedItems}
        />
        <hr />
        <pre>
          Current Input: {current}
          <br />
          Selected Priorities:{' '}
          {selectedItems
            .map(({ value }: { value: string }) => value)
            .join(', ')}
        </pre>
      </Stack>
    );
  },
};
