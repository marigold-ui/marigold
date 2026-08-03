import type { Ref } from 'react';
import { memo } from 'react';
import { theme } from '@marigold/theme-rui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Description } from '../Description/Description';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { Switch } from '../Switch/Switch';
import { TextValue } from '../TextValue/TextValue';
import { ListView } from './ListView';
import {
  Basic,
  EmptyState,
  NotificationsFeed,
  WithDescription,
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
    test('names the row, and a missing one warns exactly once (RAC only)', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <MarigoldProvider theme={theme}>
          <ListView aria-label="Test">
            <ListView.Item id="named" textValue="Named row">
              <Description>Has a textValue</Description>
            </ListView.Item>
            <ListView.Item id="row">
              <Description>No textValue provided</Description>
            </ListView.Item>
          </ListView>
        </MarigoldProvider>
      );

      // RAC appends a row's `<Description>` to its name via `aria-labelledby`,
      // so the accessible name starts with — but isn't only — the textValue.
      expect(
        screen.getByRole('row', { name: /^Named row/ })
      ).toBeInTheDocument();
      // RAC's GridList already warns about a missing `textValue`, so
      // ListView.Item deliberately adds none of its own — one mistake must
      // not produce two console lines.
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('<GridListItem>')
      );

      warnSpy.mockRestore();
    });
  });

  describe('row layout', () => {
    // Every region is placed by the row's CSS grid, so `data-grid-area` is
    // what the slot contexts publish and what the theme's leading-media rule
    // keys off. Asserting it here is asserting the placement itself.
    const RowText = memo(() => (
      <>
        <TextValue>Wrapped label</TextValue>
        <Description>Wrapped description</Description>
      </>
    ));

    const renderRow = () =>
      render(
        <MarigoldProvider theme={theme}>
          <ListView aria-label="Layout">
            <ListView.Item id="row" textValue="Wrapped label">
              <svg data-testid="media" aria-hidden />
              <RowText />
              <ListView.Actions>
                <Switch aria-label="Toggle row" />
              </ListView.Actions>
            </ListView.Item>
          </ListView>
        </MarigoldProvider>
      );

    test('places text authored through a fragment behind `memo()`', () => {
      renderRow();

      expect(screen.getByText('Wrapped label')).toHaveAttribute(
        'data-grid-area',
        'label'
      );
      expect(screen.getByText('Wrapped description')).toHaveAttribute(
        'data-grid-area',
        'description'
      );
    });

    test('leaves the leading media unclaimed so the row places it by position', () => {
      renderRow();

      expect(screen.getByTestId('media')).not.toHaveAttribute('data-grid-area');
      // RAC's `gridcell` wrapper is `display: contents`, so the row's first
      // *grid* item is that wrapper's first child — which is what the theme's
      // leading-media rule selects. Reaching into the DOM is the assertion
      // here: the rule is positional, so position is what has to hold.
      // eslint-disable-next-line testing-library/no-node-access
      expect(screen.getByRole('gridcell').firstElementChild).toBe(
        screen.getByTestId('media')
      );
    });

    test('gives the trailing controls their own region', () => {
      renderRow();

      const toggle = screen.getByRole('switch', { name: 'Toggle row' });

      // The region has no role of its own — it's a layout box — so the only
      // way to assert a control landed inside it is to walk up from it.
      // eslint-disable-next-line testing-library/no-node-access
      expect(toggle.closest('[data-grid-area="actions"]')).toBeInTheDocument();
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
      render(<WithDescription.Component />);

      expect(screen.queryAllByRole('heading')).toHaveLength(0);
      expect(screen.getByText('Acme Inc').tagName).toBe('SPAN');
    });
  });
});
