/* eslint-disable testing-library/no-node-access */
import { Calendar } from '../';
import { CalendarDate } from '@internationalized/date';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';

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
  beforeAll(() => {
    jest.useRealTimers();
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  test('renders with default value', () => {
    render(<Calendar defaultValue={new CalendarDate(2019, 6, 5)} />);

    const gridCells = screen
      .getAllByRole('gridcell')
      .filter(cell => cell.getAttribute('aria-disabled') !== 'true');
    expect(gridCells.length).toBe(30);

    const selectedDate = screen.getByLabelText('Selected', { exact: false });
    expect(selectedDate.parentElement).toHaveAttribute('role', 'gridcell');
    expect(selectedDate.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(selectedDate).toHaveAttribute(
      'aria-label',
      'Wednesday, June 5, 2019 selected'
    );
  });
  test('renders with a value', () => {
    render(<Calendar value={new CalendarDate(2019, 6, 5)} />);

    const gridCells = screen
      .getAllByRole('gridcell')
      .filter(cell => cell.getAttribute('aria-disabled') !== 'true');
    expect(gridCells.length).toBe(30);

    const selectedDate = screen.getByLabelText('Selected', { exact: false });
    expect(selectedDate.parentElement).toHaveAttribute('role', 'gridcell');
    expect(selectedDate.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(selectedDate).toHaveAttribute(
      'aria-label',
      'Wednesday, June 5, 2019 selected'
    );
  });
  test('focueses the selected date if autofocus is set', () => {
    render(<Calendar value={new CalendarDate(2019, 2, 3)} autoFocus />);
    const cell = screen.getByLabelText('selected', { exact: false });
    const grid = screen.getByRole('grid');
    expect(cell.parentElement).toHaveAttribute('role', 'gridcell');
    expect(cell.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(cell).toHaveFocus();
    expect(grid).not.toHaveAttribute('aria-activedescendant');
  });
  test('constrains the visible region depending on the minValue', () => {
    render(
      <Calendar
        value={new CalendarDate(2019, 2, 3)}
        minValue={new CalendarDate(2019, 2, 1)}
      />
    );
    const grids = screen.getAllByRole('grid');
    const cell = screen.getByLabelText('selected', { exact: false });
    expect(grids[0].contains(cell)).toBe(true);
  });
  test('shows era for BC dates', () => {
    render(<Calendar value={new CalendarDate('BC', 5, 2, 3)} />);
    const cell = screen.getByLabelText('selected', { exact: false });
    expect(cell).toHaveAttribute(
      'aria-label',
      'Saturday, February 3, 5 BC selected'
    );
  });
  test('selects a date on keyDown Enter/Space (uncontrolled)', async () => {
    const onChange = jest.fn();
    render(
      <Calendar
        defaultValue={new CalendarDate(2019, 6, 5)}
        autoFocus
        onChange={onChange}
      />
    );

    const grid = screen.getByRole('grid');
    let selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5');

    // Select a new date
    fireEvent.keyDown(grid, { key: 'ArrowLeft', keyCode: keyCodes.ArrowLeft });
    fireEvent.keyDown(grid, { key: 'Enter', keyCode: keyCodes.Enter });
    selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('4');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2019, 6, 4));

    fireEvent.keyDown(grid, { key: 'ArrowLeft', keyCode: keyCodes.ArrowLeft });
    fireEvent.keyDown(grid, { key: ' ', keyCode: keyCodes[' '] });
    selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('3');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toEqual(new CalendarDate(2019, 6, 3));
  });

  test('selects a date on keyDown Enter/Space (controlled)', () => {
    const onChange = jest.fn();
    render(
      <Calendar
        value={new CalendarDate(2019, 6, 5)}
        autoFocus
        onChange={onChange}
      />
    );
    const grid = screen.getByRole('grid');
    let selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5');

    fireEvent.keyDown(grid, { key: 'ArrowLeft', keyCode: keyCodes.ArrowLeft });
    fireEvent.keyDown(grid, { key: 'Enter', keyCode: keyCodes.Enter });
    selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5'); // controlled
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2019, 6, 4));

    fireEvent.keyDown(grid, { key: 'ArrowLeft', keyCode: keyCodes.ArrowLeft });
    fireEvent.keyDown(grid, { key: ' ', keyCode: keyCodes[' '] });
    selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5'); // controlled
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][0]).toEqual(new CalendarDate(2019, 6, 3));
  });

  test("Doesn't select a date on keydown Enter/Space if readOnly", () => {
    const onChange = jest.fn();
    render(
      <Calendar
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

  test('selects a date on click (uncontrolled)', () => {
    const onChange = jest.fn();
    render(
      <Calendar
        defaultValue={new CalendarDate(2019, 6, 5)}
        onChange={onChange}
      />
    );
    const newDate = screen.getByText('17');
    fireEvent.click(newDate);

    const selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('17');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2019, 6, 17));
  });

  test('selects a date on click (controlled)', () => {
    const onChange = jest.fn();
    render(
      <Calendar value={new CalendarDate(2019, 6, 5)} onChange={onChange} />
    );

    const newDate = screen.getByText('17');
    fireEvent.click(newDate);

    const selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toEqual(new CalendarDate(2019, 6, 17));
  });

  test('does not select a date on click if disabled', () => {
    const onChange = jest.fn();
    render(
      <Calendar
        value={new CalendarDate(2019, 6, 5)}
        onChange={onChange}
        disabled
      />
    );

    const newDate = screen.getByText('17');
    fireEvent.click(newDate);

    expect(() => {
      screen.getAllByLabelText('selected', { exact: false });
    }).toThrow();
    expect(onChange).not.toHaveBeenCalled();
  });

  test('does not select a date on click if isReadOnly', () => {
    const onChange = jest.fn();
    render(
      <Calendar
        value={new CalendarDate(2019, 6, 5)}
        onChange={onChange}
        readOnly
      />
    );

    const newDate = screen.getByText('17');
    fireEvent.click(newDate);

    const selectedDate = screen.getByLabelText('selected', { exact: false });
    expect(selectedDate.textContent).toBe('5');
    expect(onChange).not.toHaveBeenCalled();
  });

  test('support validationState', () => {
    render(
      <Calendar
        defaultValue={new CalendarDate(2022, 3, 11)}
        validationState="invalid"
      />
    );

    const cell = screen.getByRole('button', {
      name: 'Friday, March 11, 2022 selected',
    });
    expect(cell).toHaveAttribute('aria-invalid', 'true');
    expect(cell.parentElement).toHaveAttribute('aria-selected', 'true');
    expect(cell.parentElement).toHaveAttribute('aria-invalid', 'true');
  });
  test('renders select components', async () => {
    render(<Calendar />);
    const monthButton = screen.getByTestId('month');
    expect(monthButton).toBeInTheDocument();
    fireEvent.click(monthButton);
    const monthOptions = screen.getByRole('listbox');
    const mar = within(monthOptions).getByText('Mar');
    fireEvent.click(mar);
    expect(monthButton).toHaveTextContent('Mar');

    const yearButton = screen.getByTestId('year');
    expect(yearButton).toBeInTheDocument();
    fireEvent.click(yearButton);
    const yearOptions = screen.getByRole('listbox');
    expect(yearOptions).toBeInTheDocument();
    const nineteen = within(yearOptions).getByText('2019');
    expect(nineteen).toBeInTheDocument();
    fireEvent.click(nineteen);
    expect(yearButton).toHaveTextContent('2019');
    fireEvent.click(monthButton);
  });
});
