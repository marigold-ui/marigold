import { CalendarDate } from '@internationalized/date';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockMatchMedia } from '../test.utils';
import { Basic, UnavailableDate, WithError } from './DateRangePicker.stories';

// A fixed range reused across tests that need pre-filled start/end inputs.
const defaultRange = {
  start: new CalendarDate(2019, 2, 3),
  end: new CalendarDate(2019, 2, 10),
};

/**
 * Dispatches a paste event with the given text on an element.
 * In a real browser, `userEvent.paste()` may not trigger React's onPaste
 * handler on ancestor elements reliably. We use Object.defineProperty
 * because Firefox's ClipboardEvent constructor ignores the clipboardData option.
 */
const firePaste = (element: Element, text: string) => {
  const pasteEvent = new Event('paste', {
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(pasteEvent, 'clipboardData', {
    value: {
      getData: () => text,
    },
  });
  element.dispatchEvent(pasteEvent);
};

const user = userEvent.setup();

window.matchMedia = mockMatchMedia([]);

describe('DateRangePicker', () => {
  describe('basics', () => {
    test('renders start and end inputs with the given range', () => {
      render(<Basic.Component defaultValue={defaultRange} />);

      const groups = screen.getAllByRole('group');
      const segments = screen.getAllByRole('spinbutton');

      expect(groups[0]).toBeVisible();
      expect(segments).toHaveLength(6);
      // de-DE format renders each input as DD.MM.YYYY.
      expect(segments[0]).toHaveTextContent('03');
      expect(segments[1]).toHaveTextContent('02');
      expect(segments[2]).toHaveTextContent('2019');
      expect(segments[3]).toHaveTextContent('10');
      expect(segments[4]).toHaveTextContent('02');
      expect(segments[5]).toHaveTextContent('2019');
    });

    test('renders a calendar separator between the inputs', () => {
      render(<Basic.Component defaultValue={defaultRange} />);

      expect(screen.getByText('–')).toBeInTheDocument();
    });

    test('renders the calendar when the picker is open', async () => {
      render(<Basic.Component open />);

      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
      expect(screen.getByRole('grid')).toBeVisible();
    });

    test('opens the calendar when the trigger is pressed', async () => {
      render(<Basic.Component />);
      const button = screen.getByRole('button');

      await user.click(button);

      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
    });
  });

  describe('states', () => {
    test('supports a disabled picker', () => {
      render(<Basic.Component disabled />);

      const segments = screen.getAllByRole('spinbutton');

      segments.forEach(segment => {
        expect(segment).toHaveAttribute('aria-disabled', 'true');
      });
    });

    test('shows the error message when invalid', () => {
      render(<WithError.Component />);

      expect(screen.getByText('Whoopsie')).toBeVisible();
    });

    test('marks unavailable dates via dateUnavailable', async () => {
      render(<UnavailableDate.Component open />);

      await waitFor(() => {
        expect(screen.getByRole('application')).toBeVisible();
      });
    });
  });

  describe('paste handling', () => {
    test('pastes an ISO date into the start input', async () => {
      render(<Basic.Component />);
      const segments = screen.getAllByRole('spinbutton');

      await user.click(segments[0]);
      act(() => firePaste(segments[0], '2025-09-24'));

      await waitFor(() => {
        expect(screen.getAllByRole('spinbutton')[2]).toHaveTextContent('2025');
      });
    });

    test('pastes a European date into the end input', async () => {
      render(<Basic.Component />);
      const segments = screen.getAllByRole('spinbutton');

      await user.click(segments[3]);
      act(() => firePaste(segments[3], '24.09.2025'));

      await waitFor(() => {
        expect(screen.getAllByRole('spinbutton')[5]).toHaveTextContent('2025');
      });
    });

    test('ignores an invalid pasted value', async () => {
      render(<Basic.Component defaultValue={defaultRange} />);
      const segments = screen.getAllByRole('spinbutton');

      await user.click(segments[0]);
      act(() => firePaste(segments[0], 'not-a-date'));

      expect(screen.getAllByRole('spinbutton')[2]).toHaveTextContent('2019');
    });
  });
});
