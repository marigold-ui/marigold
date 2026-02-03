import { CalendarDate } from '@internationalized/date';
import { useState } from 'react';
import { DateValue } from 'react-aria-components';
import { expect, fn, userEvent, within } from 'storybook/test';
import preview from '.storybook/preview';
import { Calendar } from './Calendar';

const meta = preview.meta({
  title: 'Components/Calendar',
  component: Calendar,
  decorators: [
    Story => (
      <div id="storybook-root">
        <Story />
      </div>
    ),
  ],
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
});

export const Disabled = meta.story({
  ...Basic.input,
  args: {
    disabled: true,
  },
});

export const ReadOnly = meta.story({
  ...Basic.input,
  args: {
    readOnly: true,
  },
});

export const MonthYearSelection = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    defaultValue: new CalendarDate(2019, 6, 5),
    onChange: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Change year via dropdown
    await userEvent.click(canvas.getByTestId('year'));
    await userEvent.click(canvas.getByText('2018'));

    // Change month via dropdown
    await userEvent.click(canvas.getByTestId('month'));
    await userEvent.click(canvas.getByText('Feb'));

    await expect(canvas.getByTestId('year')).toHaveTextContent('2018');
    await expect(canvas.getByTestId('month')).toHaveTextContent('Feb');
  },
});

export const ConstrainedDateRange = meta.story({
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

    // When only one month/year is selectable, buttons should be disabled
    await userEvent.click(monthButton);
    await userEvent.click(yearButton);

    await expect(monthButton).toBeDisabled();
    await expect(yearButton).toBeDisabled();

    // Verify aria-labels indicate not selectable
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

export const MonthSelectionAccessibility = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2020, 2, 15),
    value: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Jan' }));

    const monthOptions = canvas.getAllByRole('option');
    const janOption = monthOptions.find(opt => opt.textContent === 'Jan');
    const febOption = monthOptions.find(opt => opt.textContent === 'Feb');
    const marOption = monthOptions.find(opt => opt.textContent === 'Mar');

    // Selected month has proper aria attributes
    await expect(janOption).toHaveAttribute('aria-selected', 'true');
    await expect(janOption).toHaveAttribute('aria-label', 'Jan selected');

    // Available month has proper aria attributes
    await expect(febOption).toHaveAttribute('aria-label', 'Feb');
    await expect(febOption).not.toHaveAttribute('aria-disabled');

    // Unavailable month is disabled with proper label
    await expect(marOption).toHaveAttribute('aria-label', 'Mar not selectable');
    await expect(marOption).toHaveAttribute('aria-disabled', 'true');
  },
});

export const MonthSelectionWithMinMax = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2020, 2, 15),
    value: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Jan' }));

    // Clicking disabled months should not change selection
    await userEvent.click(canvas.getByText('Mar'));
    await userEvent.click(canvas.getByText('Dec'));

    // Clicking valid month should work
    await userEvent.click(canvas.getByText('Feb'));

    await expect(canvas.queryByTestId('monthOptions')).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: 'Feb' })
    ).toBeInTheDocument();
  },
});

export const YearSelectionWithMinMax = meta.story({
  ...Basic.input,
  tags: ['component-test'],
  args: {
    minValue: new CalendarDate(2020, 1, 15),
    maxValue: new CalendarDate(2021, 2, 15),
    value: new CalendarDate(2020, 1, 30),
  },
  play: async ({ canvasElement, userEvent }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: '2020' }));

    // Clicking disabled years should not change selection
    await userEvent.click(canvas.getByText('2022'));
    await userEvent.click(canvas.getByText('2019'));

    // Clicking valid year should work
    await userEvent.click(canvas.getByText('2021'));

    await expect(canvas.queryByTestId('yearOptions')).not.toBeInTheDocument();
    await expect(
      canvas.getByRole('button', { name: '2021' })
    ).toBeInTheDocument();
  },
});

export const TwoMonths = meta.story({
  args: {
    visibleDuration: { months: 2 },
    defaultValue: new CalendarDate(2025, 2, 15),
  },
  render: args => <Calendar {...args} />,
});

export const ThreeMonths = meta.story({
  args: {
    visibleDuration: { months: 3 },
    defaultValue: new CalendarDate(2025, 6, 1),
  },
  render: args => <Calendar {...args} />,
});

export const MultiMonthNavigation = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    defaultValue: new CalendarDate(2025, 1, 15),
    onChange: fn(),
  },
  render: args => <Calendar {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Navigate forward
    await userEvent.click(canvas.getByRole('button', { name: /next/i }));

    // With pageBehavior='visible' (default), should advance by 2 months
    let headings = canvas.getAllByRole('heading');
    await expect(headings[0]).toHaveTextContent(/March 2025/i);
    await expect(headings[1]).toHaveTextContent(/April 2025/i);

    // Navigate back
    await userEvent.click(canvas.getByRole('button', { name: /previous/i }));

    headings = canvas.getAllByRole('heading');
    await expect(headings[0]).toHaveTextContent(/January 2025/i);
    await expect(headings[1]).toHaveTextContent(/February 2025/i);
  },
});

export const MultiMonthSelection = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    defaultValue: new CalendarDate(2025, 2, 15),
    onChange: fn(),
  },
  render: args => <Calendar {...args} />,
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Select a date in the second month (March)
    const grids = canvas.getAllByRole('grid');
    const secondGridCells = within(grids[1]).getAllByRole('gridcell');
    const day10 = secondGridCells.find(
      cell => cell.textContent === '10' && !cell.getAttribute('aria-disabled')
    );

    expect(day10).toBeDefined();
    await userEvent.click(day10!);
    await expect(args.onChange).toHaveBeenCalled();
  },
});

export const MultiMonthSinglePageBehavior = meta.story({
  tags: ['component-test'],
  args: {
    visibleDuration: { months: 2 },
    pageBehavior: 'single',
    defaultValue: new CalendarDate(2025, 1, 15),
  },
  render: args => <Calendar {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // With pageBehavior='single', should advance by 1 month
    await userEvent.click(canvas.getByRole('button', { name: /next/i }));

    const headings = canvas.getAllByRole('heading');
    await expect(headings[0]).toHaveTextContent(/February 2025/i);
    await expect(headings[1]).toHaveTextContent(/March 2025/i);
  },
});
