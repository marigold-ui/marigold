/* eslint-disable testing-library/no-node-access */
import { CalendarDate } from '@internationalized/date';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Basic } from './Calendar.stories';

const keyCodes = {
  Enter: 13,
  ' ': 32,
  PageUp: 33,
  PageDown: 34,
  End: 35,
  Home: 36,
  ArrowLeft: 37,
  ArrowUp: 38,
  ArrowRight: 39,
  ArrowDown: 40,
};

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

  test("Doesn't select a date on keydown Enter/Space if readOnly", () => {
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
    const activeElement = document.activeElement as Element;

    fireEvent.keyDown(activeElement, {
      key: 'ArrowLeft',
      keyCode: keyCodes.ArrowLeft,
    });
    fireEvent.keyDown(activeElement, { key: 'Enter', keyCode: keyCodes.Enter });
    selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5');
    expect(onChange).not.toHaveBeenCalled();

    fireEvent.keyDown(activeElement, {
      key: 'ArrowLeft',
      keyCode: keyCodes.ArrowLeft,
    });
    fireEvent.keyDown(activeElement, { key: ' ', keyCode: keyCodes[' '] });
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
