import type { Meta, StoryObj } from '@storybook/react';
import { waitFor } from '@testing-library/react';
import React from 'react';
import { useState } from 'storybook/preview-api';
import { expect, fn, within } from 'storybook/test';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Label text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
      description: 'Required',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Read only',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: {
        type: 'boolean',
      },
      description: 'Error state',
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
    description: {
      control: {
        type: 'text',
      },
      description: 'The description',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'This is a help text description' },
      },
    },
    orientation: {
      control: {
        type: 'radio',
      },
      options: ['vertical', 'horizontal'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'vertical' },
      },
      description: 'Sets the direction of the checkbox group',
    },
  },
  args: {
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
    label: 'This is a label',
    readOnly: false,
    disabled: false,
    required: false,
    error: false,
    children: 'This is a Checkbox',
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <>
        <CheckboxGroup
          {...args}
          onChange={setSelected}
          description="Choose your Options"
          errorMessage="Oh no"
        >
          <Checkbox value="ham" data-testid="one" label="Ham" />
          <Checkbox value="salami" data-testid="two" disabled label="Salami" />
          <Checkbox value="cheese" data-testid="three" label="Cheese" />
          <Checkbox value="tomato" data-testid="four" label="Tomate" />
          <Checkbox value="cucumber" data-testid="five" label="Cucumber" />
          <Checkbox value="onions" data-testid="six" label="Onions" />
        </CheckboxGroup>
        <hr />
        <pre data-testid="result">Selected values: {selected.join(', ')}</pre>
      </>
    );
  },
};

export const Error: Story = {
  render: args => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <>
        <CheckboxGroup
          {...args}
          onChange={setSelected}
          description="my desc"
          error
          errorMessage="This is an error"
        >
          <Checkbox value="ham" label="Ham" />
          <Checkbox value="salami" disabled label="Salami" />
          <Checkbox value="cheese" label="Cheese" />
          <Checkbox value="tomato" label="Tomate" />
          <Checkbox value="cucumber" label="Cucumber" />
          <Checkbox value="onions" label="Onions" />
        </CheckboxGroup>
        <hr />
        <pre>Selected values: {selected.join(', ')}</pre>
      </>
    );
  },
};

export const Controlled: Story = {
  ...Basic,
  args: {
    onChange: fn(),
  },
  render: args => {
    return (
      <>
        <CheckboxGroup
          {...args}
          label="Select Event Types"
          onChange={args.onChange}
        >
          <Checkbox value="concert" label="Concert" />
          <Checkbox value="festival" label="Festival" disabled />
          <Checkbox value="conference" label="Conference" />
          <Checkbox value="meetup" label="Meetup" />
          <Checkbox value="webinar" label="Webinar" />
        </CheckboxGroup>
      </>
    );
  },
  play: async ({ args, canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    let concert = canvas.getByRole('checkbox', { name: /Concert/i });
    let festival = canvas.getByRole('checkbox', { name: /Festival/i });
    let conference = canvas.getByRole('checkbox', { name: /Conference/i });

    await userEvent.click(concert);
    await userEvent.click(festival);
    await userEvent.click(conference);

    await expect(concert).toBeChecked();
    await expect(festival).not.toBeChecked();
    await expect(conference).toBeChecked();
    await waitFor(() => {
      expect(args.onChange).toHaveBeenCalledWith(['concert', 'conference']);
      expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  },
};
