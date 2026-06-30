import { CalendarDate, DateValue } from '@internationalized/date';
import { useState } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { DateField } from './DateField';

const meta = preview.meta({
  title: 'Components/DateField',
  component: DateField,
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
  },
  args: {
    label: 'My Label',
    description: 'This is a help text description',
    error: false,
    errorMessage: 'Something went wrong',
    readOnly: false,
    disabled: false,
    required: false,
  } as const,
});

export const Basic = meta.story({
  tags: ['component-test'],
  render: args => (
    <I18nProvider locale="de-DE">
      <DateField {...args} />
    </I18nProvider>
  ),
});

Basic.test('Date entered', async ({ canvas, userEvent }) => {
  // de-DE renders the field as DD.MM.YYYY, so the segments are day, month, year.
  const [day, month, year] = canvas.getAllByRole('spinbutton');

  await userEvent.type(day, '16');
  await userEvent.type(month, '02');
  await userEvent.type(year, '1990');

  // Each segment shows and exposes the value it received, proving the full
  // date was captured — not just that focus moved to the last segment.
  expect(day).toHaveTextContent('16');
  expect(day).toHaveAttribute('aria-valuenow', '16');

  expect(month).toHaveTextContent('02');
  expect(month).toHaveAttribute('aria-valuenow', '2');

  expect(year).toHaveTextContent('1990');
  expect(year).toHaveAttribute('aria-valuenow', '1990');

  // Typing advances through the segments and ends on the year.
  await expect(year).toHaveFocus();
});

export const ControlledDateField = meta.story({
  parameters: { chromatic: { disableSnapshot: true } },
  render: args => {
    const [value, setValue] = useState<DateValue>(new CalendarDate(1970, 1, 1));
    return (
      <I18nProvider locale="de-DE">
        <DateField
          label="Date Field"
          value={value}
          onChange={newValue => setValue(newValue!)}
          {...args}
        />
        <pre data-testid="datefield-value" style={{ marginTop: '1rem' }}>
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
});

export const BritishLocal = meta.story({
  render: args => (
    <I18nProvider locale="en-GB">
      <DateField {...args} />
    </I18nProvider>
  ),
});
