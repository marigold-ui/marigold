import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'storybook/preview-api';
import { expect, userEvent, within } from 'storybook/test';
import { Inline } from '../Inline/Inline';
import { NumberField } from './NumberField';

const meta = {
  title: 'Components/NumberField',
  component: NumberField,
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
    hideStepper: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    description: 'This is a help text description',
    label: 'Label',
    hideStepper: false,
    readOnly: false,
    disabled: false,
    errorMessage: 'Something went wrong',
    error: false,
    required: false,
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <NumberField {...args} />,
};

export const WithFormatting: Story = {
  render: args => (
    <NumberField
      defaultValue={10}
      formatOptions={{
        style: 'currency',
        currency: 'EUR',
      }}
      {...args}
    />
  ),
};

// https://tc39.es/ecma402/#table-sanctioned-single-unit-identifiers
export const WithUnit: Story = {
  render: args => (
    <Inline space={4}>
      <NumberField
        {...args}
        label="Hours"
        width={52}
        defaultValue={2}
        formatOptions={{
          style: 'unit',
          unit: 'hour',
        }}
      />
      <NumberField
        {...args}
        label="Minutes"
        width={52}
        defaultValue={43}
        formatOptions={{
          style: 'unit',
          unit: 'minute',
        }}
      />
    </Inline>
  ),
};

export const MinMax: Story = {
  render: args => (
    <>
      <NumberField minValue={0} maxValue={100} step={10} {...args} />
      <small>min: 0, max: 100</small>
    </>
  ),
};

export const Controlled: Story = {
  render: args => {
    const [value, setValue] = useState(0);
    return (
      <>
        <NumberField {...args} value={value} onChange={setValue} />
        <pre>
          <strong>Input Value:</strong>
          {value}
        </pre>
      </>
    );
  },
};

export const SelectOnClick: Story = {
  tags: ['component-test'],
  args: {
    label: 'Price',
    defaultValue: 42,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input: HTMLInputElement = canvas.getByRole('textbox', {
      name: 'Price',
    });

    input.focus();
    await expect(input.selectionStart).toBe(0);
    await expect(input.selectionEnd).toBe(input.value.length);

    const selectionEnd = input.selectionEnd;
    await input.focus();
    await expect(input.selectionEnd).toBe(selectionEnd);

    await userEvent.tab();
    await input.focus();
    await expect(input.selectionStart).toBe(0);
    await expect(input.selectionEnd).toBe(input.value.length);
  },
};
