import { CalendarDate, DateValue } from '@internationalized/date';
import { useState } from 'react';
import { expect } from 'storybook/test';
import { I18nProvider } from '@react-aria/i18n';
import preview from '../../../../.storybook/preview';
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

export const Basic: any = meta.story({
  render: args => (
    <I18nProvider locale="de-DE">
      <DateField {...args} />
    </I18nProvider>
  ),
});

export const ControlledDateField: any = meta.story({
  tags: ['component-test'],
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
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getAllByRole('spinbutton');
    const result = canvas.getByTestId('datefield-value');

    await userEvent.tab();
    await userEvent.type(input[0], '16');
    await userEvent.tab();
    await userEvent.type(input[1], '02');
    await userEvent.tab();
    await userEvent.type(input[2], '1990');

    await expect(input[2]).toHaveFocus();
    await expect(result).toHaveTextContent(
      'DateField Value: day:16 month: 2 year:1990'
    );
  },
});

export const BritishLocal: any = meta.story({
  render: args => (
    <I18nProvider locale="en-GB">
      <DateField {...args} />
    </I18nProvider>
  ),
});
