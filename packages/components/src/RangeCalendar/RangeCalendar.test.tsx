import { CalendarDate } from '@internationalized/date';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components';
import { vi } from 'vitest';
import {
  Basic,
  ThreeMonths,
  TwoMonths,
  Unavailable,
  WithError,
} from './RangeCalendar.stories';

const renderWithLocale = (ui: ReactNode) =>
  render(<I18nProvider locale="en-US">{ui}</I18nProvider>);

describe('RangeCalendar', () => {
  const user = userEvent.setup();

  test('renders with default range value', () => {
    renderWithLocale(
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
    renderWithLocale(
      <Basic.Component
        defaultValue={{
          start: new CalendarDate(2019, 6, 5),
          end: new CalendarDate(2019, 6, 5),
        }}
        onChange={onChange}
      />
    );

    await user.click(screen.getByLabelText(/Monday, June 10, 2019/i));
    await user.click(screen.getByLabelText(/Saturday, June 15, 2019/i));

    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls.at(-1)?.[0];
    expect(lastCall.start).toEqual(new CalendarDate(2019, 6, 10));
    expect(lastCall.end).toEqual(new CalendarDate(2019, 6, 15));
  });

  test('marks all cells aria-disabled when disabled', () => {
    renderWithLocale(
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
    renderWithLocale(
      <Basic.Component
        defaultValue={{
          start: new CalendarDate(2019, 6, 5),
          end: new CalendarDate(2019, 6, 10),
        }}
        onChange={onChange}
        readOnly
      />
    );

    await user.click(screen.getByLabelText(/Saturday, June 15, 2019/i));

    expect(onChange).not.toHaveBeenCalled();
  });

  test('renders error message when provided', () => {
    renderWithLocale(<WithError.Component />);

    expect(screen.getByText(/please select/i)).toBeInTheDocument();
  });

  test('blocks dates marked unavailable', async () => {
    const onChange = vi.fn();
    renderWithLocale(<Unavailable.Component onChange={onChange} />);

    const cells = screen.getAllByRole('gridcell');
    const unavailable = cells.find(
      cell => cell.getAttribute('aria-disabled') === 'true'
    );

    expect(unavailable).toBeDefined();
  });

  test('opens the month dropdown when the month button is clicked', async () => {
    renderWithLocale(<Basic.Component />);

    expect(
      screen.queryByRole('listbox', { name: 'monthOptions' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Aug' }));

    expect(
      screen.getByRole('listbox', { name: 'monthOptions' })
    ).toBeInTheDocument();
  });

  test('opens the year dropdown when the year button is clicked', async () => {
    renderWithLocale(<Basic.Component />);

    expect(
      screen.queryByRole('listbox', { name: 'yearOptions' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '2025' }));

    expect(
      screen.getByRole('listbox', { name: 'yearOptions' })
    ).toBeInTheDocument();
  });

  test('selecting an option from the month dropdown closes it', async () => {
    renderWithLocale(<Basic.Component />);

    await user.click(screen.getByRole('button', { name: 'Aug' }));
    const monthOptions = screen.getByRole('listbox', { name: 'monthOptions' });
    const options = within(monthOptions).getAllByRole('option');

    await user.click(options[2]);

    expect(
      screen.queryByRole('listbox', { name: 'monthOptions' })
    ).not.toBeInTheDocument();
  });
});

describe('RangeCalendar - Multi-month', () => {
  const user = userEvent.setup();

  test('renders two months with visibleDuration', () => {
    renderWithLocale(<TwoMonths.Component />);

    const grids = screen.getAllByRole('grid');
    expect(grids).toHaveLength(2);

    const calendar = screen.getByRole('application');
    expect(calendar).toHaveTextContent(/February 2025/i);
    expect(calendar).toHaveTextContent(/March 2025/i);
  });

  test('renders three months with visibleDuration', () => {
    renderWithLocale(<ThreeMonths.Component />);

    const grids = screen.getAllByRole('grid');
    expect(grids).toHaveLength(3);

    const calendar = screen.getByRole('application');
    expect(calendar).toHaveTextContent(/May 2025/i);
    expect(calendar).toHaveTextContent(/June 2025/i);
    expect(calendar).toHaveTextContent(/July 2025/i);
  });

  test('navigates forward with next button', async () => {
    renderWithLocale(
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

    await user.click(screen.getAllByRole('button', { name: /next/i })[0]);

    expect(calendar).toHaveTextContent(/March 2025/i);
    expect(calendar).toHaveTextContent(/April 2025/i);
  });

  test('navigates backward with previous button', async () => {
    renderWithLocale(
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

    await user.click(screen.getAllByRole('button', { name: /previous/i })[0]);

    expect(calendar).toHaveTextContent(/January 2025/i);
    expect(calendar).toHaveTextContent(/February 2025/i);
  });

  test('selects a range across the second month with two clicks', async () => {
    const onChange = vi.fn();
    renderWithLocale(
      <TwoMonths.Component
        defaultValue={{
          start: new CalendarDate(2025, 2, 15),
          end: new CalendarDate(2025, 2, 15),
        }}
        onChange={onChange}
      />
    );

    const grids = screen.getAllByRole('grid');
    const startCell = within(grids[0]).getByLabelText(
      /Thursday, February 20, 2025/i
    );
    const endCell = within(grids[1]).getByLabelText(/Monday, March 10, 2025/i);

    await user.click(startCell);
    await user.click(endCell);

    expect(onChange).toHaveBeenCalled();
    const lastCall = onChange.mock.calls.at(-1)?.[0];
    expect(lastCall.start).toEqual(new CalendarDate(2025, 2, 20));
    expect(lastCall.end).toEqual(new CalendarDate(2025, 3, 10));
  });
});
