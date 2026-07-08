import { CalendarDate } from '@internationalized/date';
import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components';
import {
  Basic,
  ThreeMonths,
  TwoMonths,
  WithErrorMessage,
} from './RangeCalendar.stories';

const renderWithLocale = (ui: ReactNode) =>
  render(<I18nProvider locale="en-US">{ui}</I18nProvider>);

describe('RangeCalendar', () => {
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

  test('renders error message when provided', () => {
    renderWithLocale(<WithErrorMessage.Component />);

    expect(screen.getByText(/please select/i)).toBeInTheDocument();
  });
});

describe('RangeCalendar - Multi-month', () => {
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
});
