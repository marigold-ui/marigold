import { useState } from 'react';
import preview from '.storybook/preview';
import { Button } from '../Button/Button';
import { Form } from '../Form/Form';
import { Stack } from '../Stack/Stack';
import { TextField } from './TextField';

const meta = preview.meta({
  title: 'Components/TextField',
  component: TextField,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'The label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Label' },
      },
    },
    description: {
      control: {
        type: 'text',
      },
      description: 'Help Text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'This is a help text description' },
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
      description: 'Error Message',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Something went wrong' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
        'password',
        'search',
        'tel',
        'text',
        'time',
        'time',
        'url',
        'week',
      ],
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'text' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'The width of the field',
    },
  },
  args: {
    label: 'Label',
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    type: 'text',
    readOnly: false,
    disabled: false,
    required: false,
    error: false,
  },
});

export const Basic = meta.story({
  args: {
    label: 'My label is great.',
  },
  render: args => <TextField {...args} />,
});

export const WithError = meta.story({
  args: {
    label: 'My label is great.',
    error: true,
  },
  render: args => <TextField {...args} />,
});

export const Controlled = meta.story({
  render: args => {
    const [value, setValue] = useState('');
    return (
      <>
        <TextField
          {...args}
          value={value}
          onChange={setValue}
          placeholder="Placeholder"
        />
        <pre>
          <strong>Input Value:</strong>
          {value}
        </pre>
      </>
    );
  },
});

export const WithCustomValidation = meta.story({
  args: {
    label: 'Email Address',
    description: '',
    error: undefined,
    errorMessage: undefined,
  },
  render: args => (
    <TextField
      {...args}
      data-testid="text-field"
      name="email"
      type="email"
      placeholder="Enter your email address"
      required
      validate={(val: string) =>
        val.length && /^\S+@\S+\.\S+$/.test(val)
          ? ''
          : 'Please enter a valid email address!'
      }
    />
  ),
});

export const WithFormValidation = meta.story({
  args: {
    label: 'Email Address',
    description: '',
    error: undefined,
    errorMessage: undefined,
  },
  render: args => (
    <Form>
      <Stack space={2}>
        <TextField
          {...args}
          data-testid="text-field"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
          errorMessage={({ validationDetails }) =>
            validationDetails.valueMissing
              ? 'Please enter your email address!'
              : ''
          }
        />
        <Button variant="primary" type="submit" data-testid="button">
          Subscribe
        </Button>
      </Stack>
    </Form>
  ),
});
