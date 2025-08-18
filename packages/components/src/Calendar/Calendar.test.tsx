/* eslint-disable testing-library/no-node-access */
import { CalendarDate } from '@internationalized/date';
import { composeStories } from '@storybook/react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import * as stories from '../Calendar/Calendar.stories';

const { Basic } = composeStories(stories);

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
    render(<Basic defaultValue={new CalendarDate(2019, 6, 5)} />);

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
    render(<Basic value={new CalendarDate(2019, 6, 5)} />);

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
    render(<Basic value={new CalendarDate(2019, 2, 3)} autoFocus />);

    const cell = screen.getByLabelText('selected', { exact: false });
    const grid = screen.getByRole('grid');

    expect(cell.parentElement).toHaveAttribute('role', 'gridcell');
    expect(cell.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(cell).toHaveFocus();
    expect(grid).not.toHaveAttribute('aria-activedescendant');
  });

  test('constrains the visible region depending on the minValue', () => {
    render(
      <Basic
        value={new CalendarDate(2019, 2, 3)}
        minValue={new CalendarDate(2019, 2, 1)}
      />
    );

    const grids = screen.getAllByRole('grid');
    const cell = screen.getByLabelText('selected', { exact: false });

    expect(grids[0].contains(cell)).toBe(true);
  });

  test('shows era for BC dates', () => {
    render(<Basic value={new CalendarDate('BC', 5, 2, 3)} />);

    const cell = screen.getByLabelText('selected', { exact: false });

    expect(cell).toHaveAttribute(
      'aria-label',
      'Saturday, February 3, 5 BC selected'
    );
  });

  test("Doesn't select a date on keydown Enter/Space if readOnly", () => {
    const onChange = vi.fn();
    render(
      <Basic
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
      <Basic defaultValue={new CalendarDate(2019, 6, 5)} onChange={onChange} />
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
    render(<Basic value={new CalendarDate(2019, 6, 5)} onChange={onChange} />);

    const newDate = screen.getByText('17');
    await user.click(newDate);
    const selectedDate = screen.getByLabelText('selected', { exact: false });

    expect(selectedDate.textContent).toBe('5');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2019, 6, 17));
  });

  test('renders month selection', async () => {
    render(<Basic value={new CalendarDate(2025, 1, 1)} />);

    expect(screen.queryByTestId('monthOptions')).not.toBeInTheDocument();

    const monthSelection = screen.getByRole('button', { name: 'Jan' });
    await user.click(monthSelection);

    expect(screen.getByTestId('monthOptions')).toBeInTheDocument();
  });

  test('select a month', async () => {
    render(<Basic value={new CalendarDate(2025, 1, 1)} />);

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

    render(<Basic value={new CalendarDate(2025, 1, 1)} />);

    expect(screen.queryByTestId('yearOptions')).not.toBeInTheDocument();

    const yearSelection = screen.getByRole('button', { name: '2025' });
    await user.click(yearSelection);

    expect(screen.getByTestId('yearOptions')).toBeInTheDocument();
  });

  test('select a year', async () => {
    // Mock scrollIntoView to prevent errors in JSDOM
    window.HTMLElement.prototype.scrollIntoView = vi.fn();

    render(<Basic value={new CalendarDate(2025, 1, 1)} />);

    expect(screen.queryByTestId('yearOptions')).not.toBeInTheDocument();

    const yearSelection = screen.getByRole('button', { name: '2025' });
    await user.click(yearSelection);

    const yearhOption = screen.getByText('2024');
    await user.click(yearhOption);

    expect(screen.queryByTestId('yearhOptions')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2024' })).toBeInTheDocument();
  });

  test('month and year buttons are disabled if only one value is allowed', async () => {
    render(
      <Basic
        minValue={new CalendarDate(2020, 5, 5)}
        maxValue={new CalendarDate(2020, 5, 20)}
        value={new CalendarDate(2020, 5, 5)}
      />
    );
    const monthButton = screen.getByTestId('month');
    const yearButton = screen.getByTestId('year');
    expect(monthButton).toBeDisabled();
    expect(yearButton).toBeDisabled();
    await user.click(monthButton);
    await user.click(yearButton);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('cannot select month outside min/max', async () => {
    render(
      <Basic
        minValue={new CalendarDate(2020, 1, 15)}
        maxValue={new CalendarDate(2020, 2, 15)}
        value={new CalendarDate(2020, 1, 30)}
      />
    );
    const monthSelection = screen.getByRole('button', { name: 'Jan' });
    await user.click(monthSelection);

    const monthOptions = screen.getAllByRole('option');
    const janOption = monthOptions.find(opt => opt.textContent === 'Jan');
    const febOption = monthOptions.find(opt => opt.textContent === 'Feb');
    const marOption = monthOptions.find(opt => opt.textContent === 'Mar');

    expect(janOption).toHaveAttribute('aria-label', 'Jan selected');
    expect(febOption).toHaveAttribute('aria-label', 'Feb');
    expect(marOption).toHaveAttribute('aria-label', 'Mar not selectable');

    const allMonthOptions = screen
      .getAllByTestId('monthOptions')
      .flatMap(opt => Array.from(opt.querySelectorAll('[role="option"]')));
    allMonthOptions.forEach(option => {
      const text = option.textContent;
      if (text !== 'Jan' && text !== 'Feb') {
        expect(option).toHaveAttribute('aria-disabled', 'true');
      } else {
        expect(option).not.toHaveAttribute('aria-disabled');
      }
    });

    const monthOptionMar = screen.getByText('Mar');
    await user.click(monthOptionMar);

    const monthOptionDec = screen.getByText('Dec');
    await user.click(monthOptionDec);

    const monthOptionFeb = screen.getByText('Feb');
    await user.click(monthOptionFeb);

    expect(screen.queryByTestId('monthOptions')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Feb' })).toBeInTheDocument();
  });

  test('cannot select year outside min/max', async () => {
    render(
      <Basic
        minValue={new CalendarDate(2020, 1, 15)}
        maxValue={new CalendarDate(2021, 2, 15)}
        value={new CalendarDate(2020, 1, 30)}
      />
    );
    const yearSelection = screen.getByRole('button', { name: '2020' });
    await user.click(yearSelection);

    const allYearOptions = screen
      .getAllByTestId('yearOptions')
      .flatMap(opt => Array.from(opt.querySelectorAll('[role="option"]')));
    allYearOptions.forEach(option => {
      const text = option.textContent;
      if (text !== '2020' && text !== '2021') {
        expect(option).toHaveAttribute('aria-disabled', 'true');
      } else {
        expect(option).not.toHaveAttribute('aria-disabled');
      }
    });

    const yearOption2022 = screen.getByText('2022');
    await user.click(yearOption2022);

    const yearOption2019 = screen.getByText('2019');
    await user.click(yearOption2019);

    const yearOption2021 = screen.getByText('2021');
    await user.click(yearOption2021);

    expect(screen.queryByTestId('yearOptions')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2021' })).toBeInTheDocument();
  });
});
