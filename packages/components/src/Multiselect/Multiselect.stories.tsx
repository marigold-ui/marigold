/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { Stack } from '../Stack';
import { Multiselect2 } from './Multiselect';

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
    placeholder: undefined,
    label: 'Label',
  },
} satisfies Meta;

export default meta;

const drinks = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export const Basic: StoryObj<any> = {
  render: args => (
    <Multiselect2
      label="Label"
      placeholder="Enter value"
      items={drinks}
      {...args}
    />
  ),
};

export const Controlled: StoryObj<any> = {
  render: args => {
    const [current, setCurrent] = useState<string>('');
    const [selectedValues, setSelectedValues] = useState<Array<object>>([]);

    return (
      <Stack space={3}>
        <Multiselect2
          label="Label"
          items={drinks}
          onChange={value => setCurrent(value)}
          onSelectionChange={(selectedValues: object[]) =>
            setSelectedValues(selectedValues)
          }
          {...args}
        />
        <hr />
        <pre>
          current: {current}, selected:{' '}
          {selectedValues
            .map(({ value }: { value: string }) => value)
            .join(', ')}
        </pre>
      </Stack>
    );
  },
};
