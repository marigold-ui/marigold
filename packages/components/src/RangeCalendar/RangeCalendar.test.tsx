import { CalendarDate } from '@internationalized/date';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components/I18nProvider';
import { mockMatchMedia, smallScreenQuery } from '../test.utils';
import {
  Basic,
  Presets,
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

describe('presets on small screens', () => {
  const user = userEvent.setup();

  afterEach(() => {
    window.matchMedia = mockMatchMedia([]);
  });

  test('quick selection opens a tray whose items show the resolved range as a trailing sublabel', async () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    render(<Presets.Component />);

    // The preset UI is lazy-loaded, so the first query must await its chunk.
    await user.click(
      await screen.findByRole('button', { name: 'Quick selection' })
    );
    const dialog = await screen.findByRole('dialog');

    const option = within(dialog).getByRole('option', { name: 'January 2027' });
    // Intl range formatting varies in dash/space characters across ICU
    // versions, so match loosely.
    expect(option.textContent).toMatch(/Jan 5.*11/);
  });

  test('the grid stays; selecting a preset in the tray applies and closes it', async () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    render(<Presets.Component />);

    expect(screen.getByRole('grid')).toBeVisible();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    const trigger = await screen.findByRole('button', {
      name: 'Quick selection',
    });
    expect(trigger).not.toHaveFocus();
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await user.click(trigger);
    const dialog = await screen.findByRole('dialog');
    expect(
      within(dialog).getByRole('listbox', { name: 'Quick selection' })
    ).toBeVisible();
    // The grid is visible right behind the sheet.
    expect(screen.getByRole('grid')).toBeVisible();

    await user.click(
      within(dialog).getByRole('option', { name: 'Next 7 days' })
    );
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(screen.getByRole('grid')).toBeVisible();
  });

  test('the tray close button dismisses without selecting', async () => {
    window.matchMedia = mockMatchMedia([smallScreenQuery]);
    render(<Presets.Component />);

    await user.click(
      await screen.findByRole('button', { name: 'Quick selection' })
    );
    const dialog = await screen.findByRole('dialog');

    await user.click(within(dialog).getByRole('button', { name: 'Close' }));
    await waitFor(() =>
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    );
    expect(screen.getByRole('grid')).toBeVisible();
  });
});
