import type { ReactNode, Ref } from 'react';
import { memo } from 'react';
import { theme } from '@marigold/theme-rui';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { Description } from '../Description/Description';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { TextValue } from '../TextValue/TextValue';
import { ListView } from './ListView';
import {
  Basic,
  EmptyState,
  InPanel,
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

      const [dismiss] = screen.getAllByRole('button', { name: 'Dismiss' });
      expect(dismiss).toHaveFocus();
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
    // Every region is placed by the row's CSS grid, and `data-grid-area` is
    // what the slot contexts publish. Asserting it is asserting the placement.
    const RowText = memo(() => (
      <>
        <TextValue>Wrapped label</TextValue>
        <Description>Wrapped description</Description>
      </>
    ));

    const renderRow = (children: ReactNode) =>
      render(
        <MarigoldProvider theme={theme}>
          <ListView aria-label="Layout">
            <ListView.Item id="row" textValue="Wrapped label">
              {children}
            </ListView.Item>
          </ListView>
        </MarigoldProvider>
      );

    test('places text authored through a fragment behind `memo()`', () => {
      renderRow(<RowText />);

      expect(screen.getByText('Wrapped label')).toHaveAttribute(
        'data-grid-area',
        'label'
      );
      expect(screen.getByText('Wrapped description')).toHaveAttribute(
        'data-grid-area',
        'description'
      );
    });

    // A description is not restricted to a plain string: inline markup inside
    // it stays in the description cell, so a row can emphasise part of its
    // supporting text.
    test('keeps inline markup inside the description cell', () => {
      renderRow(
        <>
          <TextValue>Quarterly report</TextValue>
          <Description>
            Updated <strong>today</strong>
          </Description>
        </>
      );

      const description = screen.getByText(/Updated/);

      expect(description).toHaveAttribute('data-grid-area', 'description');
      expect(description).toContainElement(screen.getByText('today'));
    });

    test('places a single trailing control in the actions cell', () => {
      renderRow(
        <>
          <TextValue>Row</TextValue>
          <Button size="icon" aria-label="Dismiss" />
        </>
      );

      const dismiss = screen.getByRole('button', { name: 'Dismiss' });

      expect(dismiss).toHaveAttribute('data-grid-area', 'actions');
      // The `ghost` cascade rides on the same context as the placement.
      expect(dismiss.className).toContain('col-start-2');
    });

    test('places a `<ButtonGroup>` of controls in the actions cell, not its buttons', () => {
      renderRow(
        <>
          <TextValue>Row</TextValue>
          <ButtonGroup>
            <Button size="icon" aria-label="Dismiss" />
            <Button size="icon" aria-label="Archive" />
          </ButtonGroup>
        </>
      );

      const group = screen.getByRole('toolbar');
      const dismiss = screen.getByRole('button', { name: 'Dismiss' });

      // ButtonGroup re-provides its own context, so the positional className
      // stays on the group and only the cascade reaches its children.
      expect(group).toHaveAttribute('data-grid-area', 'actions');
      expect(dismiss).not.toHaveAttribute('data-grid-area');
    });

    test('wraps a string child so the shorthand row gets the label cell', () => {
      renderRow('Plain string row');

      expect(screen.getByText('Plain string row')).toHaveAttribute(
        'data-grid-area',
        'label'
      );
    });
  });

  describe('variant="plain" inside a bled container', () => {
    // `--bleed-px` is a cross-component contract: a bled `Panel.Content`
    // publishes it, and a `plain` list sources its row padding from it so row
    // text lines up with the Panel title. Nothing type-checks that wiring, so
    // assert both halves the way `Accordion`/`Table` do — otherwise renaming
    // `--panel-px`, or moving which element publishes `--bleed-px`, silently
    // reverts `plain` to its standalone padding with every test still green.
    test('sources the row padding from the container `--bleed-px`', () => {
      render(<InPanel.Component />);

      const list = screen.getByRole('grid', { name: 'Attachments' });

      expect(list.className).toContain(
        '[--listview-item-px:var(--bleed-px,var(--spacing-stretch-regular-x))]'
      );
      // The publisher half: `Panel.Content bleed` declares the property the
      // list above reads. Match the declaration (`--bleed-px:`), not a bare
      // `--bleed-px`, which the list's own `var()` reference would also match.
      // eslint-disable-next-line testing-library/no-node-access
      const contentWrapper = list.closest('[class*="[--bleed-px:"]')!;
      expect(contentWrapper).not.toBeNull();
      expect(contentWrapper.className).toContain(
        '[--bleed-px:var(--panel-px)]'
      );
    });

    test('falls back to the standalone padding outside a bled container', () => {
      render(
        <MarigoldProvider theme={theme}>
          <ListView variant="plain" aria-label="Standalone">
            <ListView.Item id="row" textValue="Row">
              <TextValue>Row</TextValue>
            </ListView.Item>
          </ListView>
        </MarigoldProvider>
      );

      const list = screen.getByRole('grid', { name: 'Standalone' });

      // eslint-disable-next-line testing-library/no-node-access
      expect(list.closest('[class*="[--bleed-px:"]')).toBeNull();
      expect(list.className).toContain(
        'var(--bleed-px,var(--spacing-stretch-regular-x))'
      );
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
