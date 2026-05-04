/* eslint-disable testing-library/no-node-access */
import { CalendarDate } from '@internationalized/date';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import {
  Basic,
  ThreeMonths,
  TwoMonths,
  Unavailable,
  WithError,
} from './RangeCalendar.stories';

describe('RangeCalendar', () => {
  const user = userEvent.setup();

  test('renders with default range value', () => {
    render(
      <Basic.Component
        defaultValue={{
          start: new CalendarDate(2019, 6, 5),
          end: new CalendarDate(2019, 6, 10),
        }}
      />
    );

    const selected = screen
      .getAllByRole('gridcell')
      .filter(cell => cell.getAttribute('aria-selected') === 'true');

    expect(selected.length).toBeGreaterThanOrEqual(2);
  });

  test('selects a range with two clicks (uncontrolled)', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component
        defaultValue={{
          start: new CalendarDate(2019, 6, 5),
          end: new CalendarDate(2019, 6, 5),
        }}
        onChange={onChange}
      />
    );

    const startCell = screen.getByText('10');
    await user.click(startCell);

    const endCell = screen.getByText('15');
    await user.click(endCell);

    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls.at(-1)?.[0];
    expect(lastCall.start).toEqual(new CalendarDate(2019, 6, 10));
    expect(lastCall.end).toEqual(new CalendarDate(2019, 6, 15));
  });

  test('marks all cells aria-disabled when disabled', () => {
    render(
      <Basic.Component
        defaultValue={{
          start: new CalendarDate(2019, 6, 5),
          end: new CalendarDate(2019, 6, 10),
        }}
        disabled
      />
    );

    const cells = screen.getAllByRole('gridcell');
    expect(cells.every(c => c.getAttribute('aria-disabled') === 'true')).toBe(
      true
    );
  });

  test('does not call onChange when readOnly', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component
        defaultValue={{
          start: new CalendarDate(2019, 6, 5),
          end: new CalendarDate(2019, 6, 10),
        }}
        onChange={onChange}
        readOnly
      />
    );

    const cell = screen.getByText('15');
    await user.click(cell);

    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders error message when provided', () => {
    render(<WithError.Component />);

    expect(screen.getByText(/please select/i)).toBeInTheDocument();
  });

  test('blocks dates marked unavailable', async () => {
    const onChange = vi.fn();
    render(<Unavailable.Component onChange={onChange} />);

    const cells = screen.getAllByRole('gridcell');
    const unavailable = cells.find(
      cell => cell.getAttribute('aria-disabled') === 'true'
    );

    expect(unavailable).toBeDefined();
  });

  test('opens the month dropdown when the month button is clicked', async () => {
    render(<Basic.Component />);

    expect(screen.queryByTestId('monthOptions')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('month'));

    expect(screen.getByTestId('monthOptions')).toBeInTheDocument();
  });

  test('opens the year dropdown when the year button is clicked', async () => {
    render(<Basic.Component />);

    expect(screen.queryByTestId('yearOptions')).not.toBeInTheDocument();

    await user.click(screen.getByTestId('year'));

    expect(screen.getByTestId('yearOptions')).toBeInTheDocument();
  });

  test('selecting an option from the month dropdown closes it', async () => {
    render(<Basic.Component />);

    await user.click(screen.getByTestId('month'));
    const monthOptions = screen.getByTestId('monthOptions');
    const options = within(monthOptions).getAllByRole('option');

    await user.click(options[2]);

    expect(screen.queryByTestId('monthOptions')).not.toBeInTheDocument();
  });
});

describe('RangeCalendar - Multi-month', () => {
  const user = userEvent.setup();

  test('renders two months with visibleDuration', () => {
    render(<TwoMonths.Component />);

    const grids = screen.getAllByRole('grid');
    expect(grids).toHaveLength(2);

    const calendar = screen.getByRole('application');
    expect(calendar).toHaveTextContent(/February 2025/i);
    expect(calendar).toHaveTextContent(/March 2025/i);
  });

  test('renders three months with visibleDuration', () => {
    render(<ThreeMonths.Component />);

    const grids = screen.getAllByRole('grid');
    expect(grids).toHaveLength(3);

    const calendar = screen.getByRole('application');
    expect(calendar).toHaveTextContent(/May 2025/i);
    expect(calendar).toHaveTextContent(/June 2025/i);
    expect(calendar).toHaveTextContent(/July 2025/i);
  });

  test('navigates forward with next button', async () => {
    render(
      <TwoMonths.Component
        defaultValue={{
          start: new CalendarDate(2025, 1, 15),
          end: new CalendarDate(2025, 1, 20),
        }}
      />
    );

    const calendar = screen.getByRole('application');
    expect(calendar).toHaveTextContent(/January 2025/i);
    expect(calendar).toHaveTextContent(/February 2025/i);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find(b => b.getAttribute('slot') === 'next');
    expect(nextButton).toBeDefined();
    await user.click(nextButton!);

    expect(calendar).toHaveTextContent(/March 2025/i);
    expect(calendar).toHaveTextContent(/April 2025/i);
  });

  test('navigates backward with previous button', async () => {
    render(
      <TwoMonths.Component
        defaultValue={{
          start: new CalendarDate(2025, 3, 15),
          end: new CalendarDate(2025, 3, 20),
        }}
      />
    );

    const calendar = screen.getByRole('application');
    expect(calendar).toHaveTextContent(/March 2025/i);
    expect(calendar).toHaveTextContent(/April 2025/i);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons.find(b => b.getAttribute('slot') === 'previous');
    expect(prevButton).toBeDefined();
    await user.click(prevButton!);

    expect(calendar).toHaveTextContent(/January 2025/i);
    expect(calendar).toHaveTextContent(/February 2025/i);
  });

  test('selects a range across the second month with two clicks', async () => {
    const onChange = vi.fn();
    render(
      <TwoMonths.Component
        defaultValue={{
          start: new CalendarDate(2025, 2, 15),
          end: new CalendarDate(2025, 2, 15),
        }}
        onChange={onChange}
      />
    );

    const grids = screen.getAllByRole('grid');
    const firstGrid = grids[0];
    const secondGrid = grids[1];

    const startCell = within(firstGrid)
      .getAllByRole('gridcell')
      .find(
        cell =>
          cell.textContent === '20' &&
          cell.getAttribute('aria-disabled') !== 'true'
      )!;
    const endCell = within(secondGrid)
      .getAllByRole('gridcell')
      .find(
        cell =>
          cell.textContent === '10' &&
          cell.getAttribute('aria-disabled') !== 'true'
      )!;

    await user.click(startCell.firstChild as Element);
    await user.click(endCell.firstChild as Element);

    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls.at(-1)?.[0];
    expect(lastCall.start).toEqual(new CalendarDate(2025, 2, 20));
    expect(lastCall.end).toEqual(new CalendarDate(2025, 3, 10));
  });
});
