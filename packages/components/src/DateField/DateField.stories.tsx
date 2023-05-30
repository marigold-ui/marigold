/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DateField, DateFieldProps } from './DateField';
import { DateValue } from '@internationalized/date';
import { Calendar } from '@marigold/icons';
import { I18nProvider } from '@react-aria/i18n';

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
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
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
        defaultValue: { summary: false },
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
  },
  args: {
    label: 'Label',
    description: 'This is a help text description',
    error: false,
    errorMessage: 'Something went wrong',
  },
} satisfies Meta<DateFieldProps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => (
    <I18nProvider locale="de-DE">
      <DateField {...args} label="date field" />
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

export const DateFieldWithIcons: Story = {
  render: args => (
    <I18nProvider locale="de-DE">
      <DateField action={<Calendar />} {...args} />
    </I18nProvider>
  ),
};
