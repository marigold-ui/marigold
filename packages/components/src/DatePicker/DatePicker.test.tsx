/* eslint-disable testing-library/no-node-access */

/* eslint-disable testing-library/no-node-access */
import { CalendarDate } from '@internationalized/date';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Theme, cva } from '@marigold/system';

import { setup } from '../test.utils';
import { DatePicker } from './DatePicker';

const getTextValue = (el: HTMLElement): any => {
  if (
    el.className?.includes?.('DatePicker-placeholder') &&
    !el?.parentElement?.className.includes('is-placeholder')
  ) {
    return '';
  }
  return [...el.childNodes]
    .map(el =>
      el?.nodeType === 3 ? el.textContent : getTextValue(el as HTMLElement)
    )
    .join('');
};

const theme: Theme = {
  name: 'date picker test',
  components: {
    DatePicker: {
      button: cva(''),
      container: cva(''),
    },
    DateField: {
      action: cva(''),
      field: cva(''),
      segment: cva(''),
    },
    Field: cva(''),
    Label: {
      container: cva(''),
      indicator: cva(''),
    },
    Button: cva(''),
    Underlay: cva(''),
    Calendar: {
      calendar: cva(''),
      calendarCell: cva(''),
      calendarControllers: cva(''),
      calendarHeader: cva(''),
      calendarGrid: cva(''),
    },
    Select: {
      icon: cva(''),
      select: cva(''),
    },
    Popover: cva(['mt-0.5'], {
      variants: {
        variant: {
          top: ['mb-0.5'],
        },
      },
    }),
    HelpText: {
      container: cva(),
      icon: cva(),
    },
  },
};

const { render } = setup({ theme });

describe('DatePicker', () => {
  beforeAll(() => {
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

  const mockMatchMedia = (matches: string[]) =>
    jest.fn().mockImplementation(query => ({
      matches: matches.includes(query),
    }));

  window.matchMedia = mockMatchMedia(['(max-width: 600px)']);

  afterEach(cleanup);

  describe('basics', () => {
    test('renders date picker with specified date', () => {
      render(
        <DatePicker label="Date" defaultValue={new CalendarDate(2019, 2, 3)} />
      );

      const dateinput = screen.getAllByRole('group')[0];
      expect(dateinput).toBeVisible();
      expect(dateinput).not.toHaveAttribute('aria-disabled');
      expect(dateinput).not.toHaveAttribute('aria-invalid');

      const segments = screen.getAllByRole('spinbutton');
      expect(segments.length).toBe(3);
      expect(getTextValue(segments[0])).toBe('02');
      expect(segments[0].getAttribute('aria-label')).toBe('month, ');
      expect(segments[0].getAttribute('aria-valuenow')).toBe('2');
      expect(segments[0].getAttribute('aria-valuetext')).toBe('2 – February');
      expect(segments[0].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[0].getAttribute('aria-valuemax')).toBe('12');

      expect(getTextValue(segments[1])).toBe('03');
      expect(segments[1].getAttribute('aria-label')).toBe('day, ');
      expect(segments[1].getAttribute('aria-valuenow')).toBe('3');
      expect(segments[1].getAttribute('aria-valuetext')).toBe('3');
      expect(segments[1].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[1].getAttribute('aria-valuemax')).toBe('28');

      expect(getTextValue(segments[2])).toBe('2019');
      expect(segments[2].getAttribute('aria-label')).toBe('year, ');
      expect(segments[2].getAttribute('aria-valuenow')).toBe('2019');
      expect(segments[2].getAttribute('aria-valuetext')).toBe('2019');
      expect(segments[2].getAttribute('aria-valuemin')).toBe('1');
      expect(segments[2].getAttribute('aria-valuemax')).toBe('9999');
    });

    test('renders the calendar when date picker is open', () => {
      window.matchMedia = mockMatchMedia([
        'screen and (min-width: 40em)',
        'screen and (min-width: 52em)',
        'screen and (min-width: 64em)',
      ]);
      render(<DatePicker label="date picker" data-testid="date picker" open />);

      const picker = screen.getByTestId('date picker');

      expect(picker).toBeVisible();
      const tableGrid = screen.getByRole('application');
      expect(tableGrid).toBeVisible();
    });

    test('does not render calendar when date picker is not open', () => {
      render(<DatePicker aria-label="date picker" />);
      const heading = screen.queryByRole('heading');
      expect(heading).not.toBeInTheDocument();
    });
    test('supports autoFocus', () => {
      render(<DatePicker label="Date" autoFocus />);
      expect(document.activeElement).toBe(screen.getAllByRole('spinbutton')[0]);
    });
    test('passes through data attributes', () => {
      window.matchMedia = mockMatchMedia([
        'screen and (min-width: 40em)',
        'screen and (min-width: 52em)',
        'screen and (min-width: 64em)',
      ]);
      render(<DatePicker label="Date" data-testid="foo" />);

      expect(screen.getByTestId('foo')).toHaveAttribute('data-rac');
    });
  });

  describe('labeling', () => {
    test('supports labeling with aria-label', () => {
      render(<DatePicker aria-label="Birth date" />);

      const group = screen.getByRole('group');
      expect(group).toHaveAttribute('id');
      expect(group).toHaveAttribute('aria-label', 'Birth date');
      const comboboxId = group.getAttribute('id');

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Calendar');
      expect(button).toHaveAttribute('id');
      const buttonId = button.getAttribute('id');
      expect(button).toHaveAttribute(
        'aria-labelledby',
        `${buttonId} ${comboboxId}`
      );

      const segments = screen.getAllByRole('spinbutton');
      for (let segment of segments) {
        expect(segment).toHaveAttribute('id');
        expect(
          segment?.getAttribute('aria-label')?.endsWith('Birth date')
        ).toBe(true);
        expect(segment).not.toHaveAttribute('aria-labelledby');
      }
    });

    test('supports field structure', () => {
      render(
        <DatePicker
          label="A Label"
          description="Some helpful text"
          errorMessage="Whoopsie"
        />
      );

      const label = screen.queryByText('A Label');
      expect(label).toBeInTheDocument();

      const description = screen.queryByText('Some helpful text');
      expect(description).toBeInTheDocument();

      const error = screen.queryByText('Whoopsie');
      expect(error).not.toBeInTheDocument();
    });

    test('supports field structure (with error)', () => {
      render(
        <DatePicker
          label="A Label"
          description="Some helpful text"
          error={true}
          errorMessage="Whoopsie"
        />
      );

      const label = screen.queryByText('A Label');
      expect(label).toBeInTheDocument();

      const description = screen.queryByText('Some helpful text');
      expect(description).not.toBeInTheDocument();

      const error = screen.queryByText('Whoopsie');
      expect(error).toBeInTheDocument();
    });
  });

  describe('events', function () {
    const onBlurSpy = jest.fn();
    const onFocusChangeSpy = jest.fn();
    const onFocusSpy = jest.fn();
    const onKeyDownSpy = jest.fn();
    const onKeyUpSpy = jest.fn();

    afterEach(() => {
      onBlurSpy.mockClear();
      onFocusChangeSpy.mockClear();
      onFocusSpy.mockClear();
      onKeyDownSpy.mockClear();
      onKeyUpSpy.mockClear();
    });

    test('focuses field, move a segment, and open popover and does not blur', async () => {
      const user = userEvent.setup();
      render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const segments = screen.getAllByRole('spinbutton');
      const button = screen.getByRole('button');

      screen.getAllByRole('spinbutton');
      screen.getByRole('button');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await userEvent.tab();
      expect(segments[0]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await userEvent.tab();
      expect(segments[1]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      user.click(button);
      // act(() => jest.runAllTimers());

      const popovers = screen.getAllByRole('presentation');
      expect(popovers[0]).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should focus field and leave to blur', async () => {
      render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const segments = screen.getAllByRole('spinbutton');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await userEvent.tab();
      expect(segments[0]).toHaveFocus();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      await userEvent.click(document.body);
      expect(document.body).toHaveFocus();
      expect(onBlurSpy).toHaveBeenCalledTimes(1);
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(2);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should open popover and call picker onFocus', async () => {
      const user = userEvent.setup();
      render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const button = screen.getByRole('button');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.click(button);
      // act(() => jest.runAllTimers());

      const popover = screen.getByRole('application');
      expect(popover).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should open and close popover and only call blur when focus leaves picker', async () => {
      const user = userEvent.setup();
      render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
        />
      );
      const button = screen.getByRole('button');

      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.click(button);

      const popover = screen.getByRole('application');
      expect(popover).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document.activeElement as Element, { key: 'Escape' });
      fireEvent.keyUp(document.activeElement as Element, { key: 'Escape' });
      await waitFor(() => {
        expect(popover).not.toBeInTheDocument();
      });

      expect(popover).not.toBeInTheDocument();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });

    test('should trigger right arrow key event for segment navigation', async () => {
      render(
        <DatePicker
          label="Date"
          onKeyDown={onKeyDownSpy}
          onKeyUp={onKeyUpSpy}
        />
      );
      const segments = screen.getAllByRole('spinbutton');

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();

      await userEvent.tab();
      expect(segments[0]).toHaveFocus();
      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document.activeElement as Element, {
        key: 'ArrowRight',
      });
      fireEvent.keyUp(document.activeElement as Element, { key: 'ArrowRight' });
      expect(segments[1]).toHaveFocus();
      expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(2);
    });

    test('should trigger key event in popover and focus/blur/key events are not called', async () => {
      const user = userEvent.setup();
      render(
        <DatePicker
          label="Date"
          onBlur={onBlurSpy}
          onFocus={onFocusSpy}
          onFocusChange={onFocusChangeSpy}
          onKeyDown={onKeyDownSpy}
          onKeyUp={onKeyUpSpy}
        />
      );
      let button = screen.getByRole('button');

      expect(onKeyDownSpy).not.toHaveBeenCalled();
      expect(onKeyUpSpy).not.toHaveBeenCalled();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).not.toHaveBeenCalled();
      expect(onFocusSpy).not.toHaveBeenCalled();

      await user.click(button);

      const popover = screen.getByRole('application');
      expect(popover).toBeVisible();
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);

      fireEvent.keyDown(document.activeElement as Element, {
        key: 'ArrowRight',
      });
      fireEvent.keyUp(document.activeElement as Element, { key: 'ArrowRight' });
      expect(onKeyDownSpy).toHaveBeenCalledTimes(0);
      expect(onKeyUpSpy).toHaveBeenCalledTimes(0);
      expect(onBlurSpy).not.toHaveBeenCalled();
      expect(onFocusChangeSpy).toHaveBeenCalledTimes(1);
      expect(onFocusSpy).toHaveBeenCalledTimes(1);
    });
  });
});

test('DatePicker supports width prop', () => {
  render(
    <DatePicker data-testid="picker" aria-label="date picker" width={10} />
  );
  const picker = screen.getByTestId('picker');
  const child = picker.firstChild as HTMLInputElement;
  expect(child.className).toMatchInlineSnapshot(`""`);
});
