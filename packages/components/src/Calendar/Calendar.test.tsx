/* eslint-disable testing-library/no-node-access */
import { CalendarDate } from '@internationalized/date';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Basic, ThreeMonths, TwoMonths } from './Calendar.stories';

describe('Calendar', () => {
  const user = userEvent.setup();

  test('renders with default value', () => {
    render(<Basic.Component defaultValue={new CalendarDate(2019, 6, 5)} />);

    const gridCells = screen
      .getAllByRole('gridcell')
      .filter(cell => cell.getAttribute('aria-disabled') !== 'true');
    const selectedDate = screen.getByLabelText('Selected', { exact: false });

    expect(gridCells.length).toBe(30);
    expect(selectedDate.parentElement).toHaveAttribute('role', 'gridcell');
    expect(selectedDate.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(selectedDate).toHaveAttribute(
      'aria-label',
      'Wednesday, June 5, 2019 selected'
    );
  });

  test('renders with a value', () => {
    render(<Basic.Component value={new CalendarDate(2019, 6, 5)} />);

    const gridCells = screen
      .getAllByRole('gridcell')
      .filter(cell => cell.getAttribute('aria-disabled') !== 'true');
    const selectedDate = screen.getByLabelText('Selected', { exact: false });

    expect(gridCells.length).toBe(30);
    expect(selectedDate.parentElement).toHaveAttribute('role', 'gridcell');
    expect(selectedDate.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(selectedDate).toHaveAttribute(
      'aria-label',
      'Wednesday, June 5, 2019 selected'
    );
  });

  test('focus the selected date if autofocus is set', () => {
    render(<Basic.Component value={new CalendarDate(2019, 2, 3)} autoFocus />);

    const cell = screen.getByLabelText('selected', { exact: false });
    const grid = screen.getByRole('grid');

    expect(cell.parentElement).toHaveAttribute('role', 'gridcell');
    expect(cell.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(cell).toHaveFocus();
    expect(grid).not.toHaveAttribute('aria-activedescendant');
  });

  test('constrains the visible region depending on the minValue', () => {
    render(
      <Basic.Component
        value={new CalendarDate(2019, 2, 3)}
        minValue={new CalendarDate(2019, 2, 1)}
      />
    );

    const grids = screen.getAllByRole('grid');
    const cell = screen.getByLabelText('selected', { exact: false });

    expect(grids[0].contains(cell)).toBe(true);
  });

  test('shows era for BC dates', () => {
    render(<Basic.Component value={new CalendarDate('BC', 5, 2, 3)} />);

    const cell = screen.getByLabelText('selected', { exact: false });

    expect(cell).toHaveAttribute(
      'aria-label',
      'Saturday, February 3, 5 BC selected'
    );
  });

  test("Doesn't select a date on keydown Enter/Space if readOnly", async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component
        defaultValue={new CalendarDate(2019, 6, 5)}
        autoFocus
        onChange={onChange}
        readOnly
      />
    );

    let selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5');

    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{Enter}');
    selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5');
    expect(onChange).not.toHaveBeenCalled();

    await user.keyboard('{ArrowLeft}');
    await user.keyboard('{ }');
    selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5');
    expect(onChange).not.toHaveBeenCalled();
  });

  test('selects a date on click (uncontrolled)', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component
        defaultValue={new CalendarDate(2019, 6, 5)}
        onChange={onChange}
      />
    );
    const newDate = screen.getByText('17');
    await user.click(newDate);

    const selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('17');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2019, 6, 17));
  });

  test('selects a date on click (controlled)', async () => {
    const onChange = vi.fn();
    render(
      <Basic.Component
        value={new CalendarDate(2019, 6, 5)}
        onChange={onChange}
      />
    );

    const newDate = screen.getByText('17');
    await user.click(newDate);
    const selectedDate = screen.getByLabelText('selected', { exact: false });

    expect(selectedDate.textContent).toBe('5');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2019, 6, 17));
  });

  test('renders month selection', async () => {
    render(<Basic.Component value={new CalendarDate(2025, 1, 1)} />);

    expect(screen.queryByTestId('monthOptions')).not.toBeInTheDocument();

    const monthSelection = screen.getByRole('button', { name: 'Jan' });
    await user.click(monthSelection);

    expect(screen.getByTestId('monthOptions')).toBeInTheDocument();
  });

  test('select a month', async () => {
    render(<Basic.Component value={new CalendarDate(2025, 1, 1)} />);

    const monthSelection = screen.getByRole('button', { name: 'Jan' });
    await user.click(monthSelection);

    const monthOption = screen.getByText('Feb');
    await user.click(monthOption);

    expect(screen.queryByTestId('monthOptions')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Feb' })).toBeInTheDocument();
  });

  test('renders year selection', async () => {
    // Mock scrollIntoView to prevent errors in JSDOM
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    render(<Basic.Component value={new CalendarDate(2025, 1, 1)} />);

    expect(screen.queryByTestId('yearOptions')).not.toBeInTheDocument();

    const yearSelection = screen.getByRole('button', { name: '2025' });
    await user.click(yearSelection);

    expect(screen.getByTestId('yearOptions')).toBeInTheDocument();
  });

  test('select a year', async () => {
    // Mock scrollIntoView to prevent errors in JSDOM
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    render(<Basic.Component value={new CalendarDate(2025, 1, 1)} />);

    expect(screen.queryByTestId('yearOptions')).not.toBeInTheDocument();

    const yearSelection = screen.getByRole('button', { name: '2025' });
    await user.click(yearSelection);

    const yearhOption = screen.getByText('2024');
    await user.click(yearhOption);

    expect(screen.queryByTestId('yearhOptions')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2024' })).toBeInTheDocument();
  });
});

describe('Calendar - Multi-month', () => {
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

  test('navigation buttons appear on correct months', () => {
    render(<TwoMonths.Component />);

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons.find(b => b.getAttribute('slot') === 'previous');
    const nextButton = buttons.find(b => b.getAttribute('slot') === 'next');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  test('navigates forward with next button', async () => {
    render(
      <TwoMonths.Component defaultValue={new CalendarDate(2025, 1, 15)} />
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
      <TwoMonths.Component defaultValue={new CalendarDate(2025, 3, 15)} />
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

  test('selects a date in the second month', async () => {
    const onChange = vi.fn();
    render(
      <TwoMonths.Component
        defaultValue={new CalendarDate(2025, 2, 15)}
        onChange={onChange}
      />
    );

    const grids = screen.getAllByRole('grid');
    const secondGrid = grids[1];
    const cells = within(secondGrid).getAllByRole('gridcell');
    const day10Cell = cells.find(
      cell =>
        cell.textContent === '10' &&
        cell.getAttribute('aria-disabled') !== 'true'
    );

    expect(day10Cell).toBeDefined();

    const button =
      day10Cell!.querySelector('span[role="button"], span[tabindex]') ||
      day10Cell!.firstChild;
    expect(button).toBeDefined();

    await user.click(button as Element);
    expect(onChange).toHaveBeenCalled();
    expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2025, 3, 10));
  });

  test('does not show month/year dropdowns in multi-month view', () => {
    render(<TwoMonths.Component />);

    expect(screen.queryByTestId('month')).not.toBeInTheDocument();
    expect(screen.queryByTestId('year')).not.toBeInTheDocument();
  });

  test('single page behavior advances by one month', async () => {
    render(
      <Basic.Component
        visibleDuration={{ months: 2 }}
        pageBehavior="single"
        defaultValue={new CalendarDate(2025, 1, 15)}
      />
    );

    const calendar = screen.getByRole('application');
    expect(calendar).toHaveTextContent(/January 2025/i);
    expect(calendar).toHaveTextContent(/February 2025/i);

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons.find(b => b.getAttribute('slot') === 'next');
    expect(nextButton).toBeDefined();
    await user.click(nextButton!);

    expect(calendar).toHaveTextContent(/February 2025/i);
    expect(calendar).toHaveTextContent(/March 2025/i);
  });
});
