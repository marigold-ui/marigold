import type { Ref } from 'react';
import { theme } from '@marigold/theme-rui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Description } from '../Description/Description';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { ListView } from './ListView';
import {
  Basic,
  EmptyState,
  NotificationsFeed,
  WithTitle,
} from './ListView.stories';

const user = userEvent.setup({ pointerEventsCheck: 0 });

describe('ListView', () => {
  describe('rendering', () => {
    test('renders a non-form grid with the expected number of rows', () => {
      render(<Basic.Component />);

      const grid = screen.getByRole('grid', { name: 'Recent files' });
      const rows = screen.getAllByRole('row');

      expect(grid).toBeInTheDocument();
      expect(rows).toHaveLength(3);
    });

    test('rows have no aria-selected — ListView has no selection', () => {
      render(<Basic.Component />);

      for (const row of screen.getAllByRole('row')) {
        expect(row).not.toHaveAttribute('aria-selected');
      }
    });

    test('forwards refs to the underlying HTMLElement', () => {
      const ref: { current: HTMLDivElement | null } = { current: null };

      render(<Basic.Component ref={ref as Ref<HTMLDivElement>} />);

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('keyboard navigation', () => {
    test('arrow keys move focus between rows, skipping the disabled row', async () => {
      render(<Basic.Component />);

      const rows = screen.getAllByRole('row');
      rows[0].focus();
      expect(rows[0]).toHaveFocus();

      // rows[1] ("Budget draft") is in `disabledKeys` and is skipped.
      await user.keyboard('{ArrowDown}');
      expect(rows[2]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(rows[0]).toHaveFocus();
    });

    test('tab reaches a nested interactive control inside the focused row', async () => {
      render(<NotificationsFeed.Component />);

      const rows = screen.getAllByRole('row');
      rows[0].focus();

      await user.tab();

      const [muteSwitch] = screen.getAllByRole('switch', {
        name: 'Mute this thread',
      });
      expect(muteSwitch).toHaveFocus();
    });
  });

  describe('textValue', () => {
    test('warns in development when children is not a string and textValue is missing', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <MarigoldProvider theme={theme}>
          <ListView aria-label="Test">
            <ListView.Item id="row">
              <Description>No textValue provided</Description>
            </ListView.Item>
          </ListView>
        </MarigoldProvider>
      );

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('`textValue` is required')
      );

      warnSpy.mockRestore();
    });
  });

  describe('emptyState', () => {
    test('renders the emptyState content when there are no items', () => {
      render(<EmptyState.Component />);

      expect(screen.getByText('No resources yet.')).toBeInTheDocument();
      // RAC's GridList still renders one structural row to host the empty
      // state (for the grid's live region), so assert there's exactly that
      // one row rather than zero rows outright.
      expect(screen.getAllByRole('row')).toHaveLength(1);
    });
  });

  describe('Title as span', () => {
    test('a row using <Title> does not emit a document heading', () => {
      render(<WithTitle.Component />);

      expect(screen.queryAllByRole('heading')).toHaveLength(0);
      expect(screen.getByText('Jane Cooper').tagName).toBe('SPAN');
    });
  });
});
