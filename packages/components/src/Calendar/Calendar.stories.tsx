import { CalendarDate } from '@internationalized/date';
import { waitFor } from '@testing-library/react';
import { DateValue } from 'react-aria-components';
import { useState } from 'storybook/preview-api';
import { expect, fn, userEvent, within } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { Calendar } from './Calendar';

const meta = preview.meta({
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'Disable the Calendar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autoFocus: {
      control: {
        type: 'boolean',
      },
      description:
        'Whether to automatically focus the calendar when it mounts.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    readOnly: {
      control: {
        type: 'boolean',
      },
      description: 'Make the Calendar not editable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    width: {
      control: {
        type: 'text',
      },
      description: 'Width of the Calendar',
      table: {
        type: { summary: 'text' },
        defaultValue: { summary: 'fit' },
      },
    },
  },
  args: {
    defaultValue: new CalendarDate(2025, 8, 7),
  },
});

export const Basic = meta.story({
  render: args => <Calendar {...args} data-testid="selectedDate" />,
});

export const Controlled = meta.story({
  tags: ['component-test'],
  render: args => {
    const [value, setValue] = useState<DateValue>(new CalendarDate(2019, 6, 5));
    return (
      <>
        <Calendar {...args} value={value} onChange={setValue} autoFocus />
        <pre style={{ marginTop: '1rem' }} data-testid="selectedDate">
          <strong>DateField Value:</strong>
          {'Day:' + value.day + ' Month:' + value.month + ' Year:' + value.year}
        </pre>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.keyboard('{arrowleft}');
    await userEvent.keyboard('{enter}');
    const result = await canvas.findByTestId('selectedDate');

    await waitFor(() => {
      expect(result).toHaveTextContent('Day:4 Month:6 Year:2019');
    });
  },
});

export const Uncontrolled = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    defaultValue: new CalendarDate(2019, 6, 5),
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('year'));
    await userEvent.click(canvas.getByText('2018'));
    await userEvent.click(canvas.getByTestId('month'));
    await userEvent.click(canvas.getByText('Feb'));
    await userEvent.click(canvas.getByText('10'));

    await expect(canvas.getByTestId('year')).toHaveTextContent('2018');
    await expect(canvas.getByTestId('month')).toHaveTextContent('Feb');
    await expect(args.onChange).toHaveBeenCalledOnce();
  },
});

export const Disabled = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    disabled: true,
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendar = canvas.getByRole('application');
    const days = canvas.getAllByRole('gridcell');
    const monthButton = canvas.getByTestId('month');
    const yearButton = canvas.getByTestId('year');

    await expect(calendar).toHaveAttribute('data-disabled');
    for (const day of days.slice(0, 3)) {
      await expect(day).toHaveAttribute('aria-disabled', 'true');
    }
    await expect(monthButton).toHaveAttribute('disabled');
    await expect(yearButton).toHaveAttribute('disabled');
  },
});

export const ReadOnly = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    readOnly: true,
    onChange: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByText('15'));
    await userEvent.click(canvas.getByText('19'));

    await expect(args.onChange).not.toHaveBeenCalled();
  },
});

export const OnlyOneMonthAndYear = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 5, 5),
    maxValue: new CalendarDate(2020, 5, 20),
    onChange: fn(),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const monthButton = canvas.getByTestId('month');
    const yearButton = canvas.getByTestId('year');

    await userEvent.click(monthButton);
    await userEvent.click(yearButton);

    expect(monthButton).toBeDisabled();
    expect(yearButton).toBeDisabled();
    expect(canvas.queryByRole('dialog')).toBeNull();
    expect(canvas.queryByRole('listbox')).toBeNull();
  },
});

export const OnlyOneMonthAndYearAriaLabel = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 5, 5),
    maxValue: new CalendarDate(2020, 5, 20),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const monthButton = canvas.getByTestId('month');
    const yearButton = canvas.getByTestId('year');

    await expect(monthButton).toHaveAttribute(
      'aria-label',
      'May not selectable'
    );
    await expect(yearButton).toHaveAttribute(
      'aria-label',
      '2020 not selectable'
    );
  },
});

export const MonthOptionsAccessibility = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2020, 2, 15),
    value: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const monthSelection = canvas.getByRole('button', { name: 'Jan' });
    await userEvent.click(monthSelection);

    const monthOptions = canvas.getAllByRole('option');
    const janOption = monthOptions.find(opt => opt.textContent === 'Jan');
    const febOption = monthOptions.find(opt => opt.textContent === 'Feb');
    const marOption = monthOptions.find(opt => opt.textContent === 'Mar');

    await expect(janOption).toHaveAttribute('aria-label', 'Jan selected');
    await expect(febOption).toHaveAttribute('aria-label', 'Feb');
    await expect(marOption).toHaveAttribute('aria-label', 'Mar not selectable');

    const allMonthOptions = canvas
      .getAllByTestId('monthOptions')
      .flatMap(opt => Array.from(opt.querySelectorAll('[role="option"]')));
    for (const option of allMonthOptions) {
      const text = option.textContent;
      if (text !== 'Jan' && text !== 'Feb') {
        await expect(option).toHaveAttribute('aria-disabled', 'true');
      } else {
        await expect(option).not.toHaveAttribute('aria-disabled');
      }
    }
  },
});

export const SelectedMonthAriaSelected = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2020, 2, 15),
    value: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const monthSelection = canvas.getByRole('button', { name: 'Jan' });
    await userEvent.click(monthSelection);

    const monthOptions = canvas.getAllByRole('option');
    const janOption = monthOptions.find(opt => opt.textContent === 'Jan');
    await expect(janOption).toHaveAttribute('aria-selected', 'true');
  },
});

export const MonthSelectionMinMax = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2020, 2, 15),
    value: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const monthSelection = canvas.getByRole('button', { name: 'Jan' });
    await userEvent.click(monthSelection);

    const monthOptionMar = canvas.getByText('Mar');
    const monthOptionDec = canvas.getByText('Dec');
    const monthOptionFeb = canvas.getByText('Feb');

    await userEvent.click(monthOptionMar);
    await userEvent.click(monthOptionDec);
    await userEvent.click(monthOptionFeb);

    await expect(canvas.queryByTestId('monthOptions')).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Feb' })
    ).toBeInTheDocument();
  },
});

export const YearSelectionMinMax = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2021, 2, 15),
    value: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    const yearSelection = canvas.getByRole('button', { name: '2020' });
    await userEvent.click(yearSelection);

    const yearOption2022 = canvas.getByText('2022');
    const yearOption2021 = canvas.getByText('2021');
    const yearOption2019 = canvas.getByText('2019');

    await userEvent.click(yearOption2022);
    await userEvent.click(yearOption2019);
    await userEvent.click(yearOption2021);

    await expect(canvas.queryByTestId('yearOptions')).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: '2021' })
    ).toBeInTheDocument();
  },
});
