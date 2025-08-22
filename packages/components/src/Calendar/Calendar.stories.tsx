import { CalendarDate } from '@internationalized/date';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { waitFor } from '@testing-library/react';
import { DateValue } from 'react-aria-components';
import { useState } from 'storybook/preview-api';
import { Calendar } from './Calendar';

const meta = {
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
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: args => <Calendar {...args} data-testid="selectedDate" />,
};

export const Controlled: Story = {
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
};

export const Uncontrolled: Story = {
  ...Basic,
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
};

export const Disabled: Story = {
  ...Basic,
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
};

export const ReadOnly: Story = {
  ...Basic,
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
};

export const OnlyOneMonthAndYear: Story = {
  ...Basic,
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

    await expect(monthButton).toHaveAttribute('disabled');
    await expect(yearButton).toHaveAttribute('disabled');
  },
};
