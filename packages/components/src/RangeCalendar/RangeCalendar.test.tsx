import { CalendarDate } from '@internationalized/date';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { theme } from '@marigold/theme-rui';
import { mockMatchMedia } from '../test.utils';
import {
  Basic,
  Presets,
  ThreeMonths,
  TwoMonths,
  WithErrorMessage,
} from './RangeCalendar.stories';

const smallScreenQuery = `(width < ${theme.screens!.sm})`;

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

describe('presets on small screens', () => {
  const user = userEvent.setup();

  afterEach(() => {
    window.matchMedia = mockMatchMedia([]);
  });

  test('stack items show the resolved range as a trailing sublabel', () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    render(<Presets.Component defaultPresetsOpen />);

    const option = screen.getByRole('option', { name: 'January 2027' });
    // Intl range formatting varies in dash/space characters across ICU
    // versions, so match loosely.
    expect(option.textContent).toMatch(/Jan 5.*11/);
  });

  test('shows the grid first; Quick selection opens the list; Custom… returns', async () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    render(<Presets.Component />);

    expect(screen.getByRole('grid')).toBeVisible();
    expect(
      screen.queryByRole('listbox', { name: 'Quick selection' })
    ).not.toBeInTheDocument();
    const open = screen.getByRole('button', { name: 'Quick selection' });
    expect(open).not.toHaveFocus();

    await user.click(open);
    expect(
      screen.getByRole('listbox', { name: 'Quick selection' })
    ).toBeVisible();
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Custom…' })).toBeVisible();

    await user.click(screen.getByRole('button', { name: 'Custom…' }));
    expect(screen.getByRole('grid')).toBeVisible();
    const openAgain = screen.getByRole('button', { name: 'Quick selection' });
    expect(openAgain).toBeVisible();
    expect(openAgain).toHaveFocus();
  });

  test('defaultPresetsOpen starts on the list; calendar view shows Back', async () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    render(<Presets.Component defaultPresetsOpen />);

    expect(
      screen.getByRole('listbox', { name: 'Quick selection' })
    ).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'Custom…' }));
    expect(screen.getByRole('grid')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Back' })).toBeVisible();
  });
});
