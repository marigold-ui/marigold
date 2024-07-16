/* eslint-disable react-hooks/rules-of-hooks */
import { DateValue } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { I18nProvider } from '@react-aria/i18n';

import { DateField, DateFieldProps } from './DateField';

const meta = {
  title: 'Components/DateField',
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Date Field label',
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
      description: 'Is the DateField invalid?',
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
    width: {
      control: {
        type: 'text',
      },
      description: 'Width of the field',
      table: {
        type: { summary: 'string' },
      },
    },
    required: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
    },
  },
  args: {
    label: 'My Label',
    description: 'This is a help text description',
    errorMessage: 'Something went wrong',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: args => (
    <I18nProvider locale="de-DE">
      <DateField {...args} />
    </I18nProvider>
  ),
};

export const ControlledDateField: Story = {
  render: args => {
    const [value, setValue] = useState<DateValue>();
    return (
      <I18nProvider locale="de-DE">
        <DateField
          label="Date Field"
          value={value}
          onChange={setValue}
          {...args}
        />
        <pre>
          <strong>DateField Value: </strong>
          {value &&
            'day:' +
              value?.day +
              ' month: ' +
              value?.month +
              ' year:' +
              value?.year}
        </pre>
      </I18nProvider>
    );
  },
};

export const BritishLocal: Story = {
  render: args => (
    <I18nProvider locale="en-GB">
      <DateField {...args} />
    </I18nProvider>
  ),
};
