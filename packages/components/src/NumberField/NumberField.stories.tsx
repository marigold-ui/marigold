import { useState } from 'react';
import { expect, userEvent } from 'storybook/test';
import preview from '.storybook/preview';
import { Inline } from '../Inline/Inline';
import { NumberField } from './NumberField';

const meta = preview.meta({
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
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => <NumberField {...args} />,
});

Basic.test(
  'Selects value on input click',
  {
    args: {
      label: 'Price',
      defaultValue: 42,
    },
  },
  async ({ canvas }) => {
    const input: HTMLInputElement = canvas.getByRole('textbox', {
      name: 'Price',
    });

    await userEvent.click(input);
    await userEvent.type(input, '100');

    expect(input).toHaveFocus();
    expect(input).toHaveValue('42100');
  }
);

export const WithUnit = meta.story({
  render: args => (
    <Inline space={4}>
      <NumberField
        defaultValue={10}
        formatOptions={{
          style: 'currency',
          currency: 'EUR',
        }}
        {...args}
      />
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
});

export const MinMax = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => (
    <>
      <NumberField
        minValue={0}
        maxValue={100}
        step={10}
        defaultValue={0}
        {...args}
      />
      <small>min: 0, max: 100</small>
    </>
  ),
});

export const Controlled = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
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
});
