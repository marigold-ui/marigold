import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { theme } from '@marigold/theme-rui';
import { Description } from '../Description/Description';
import { MarigoldProvider } from '../Provider/MarigoldProvider';
import { SelectList } from './SelectList';
import {
  Basic,
  Bordered,
  Disabled,
  EmptyState,
  Horizontal,
  WithActionMenu,
  WithError,
  WithIconAction,
  WithMultiSelection,
} from './SelectList.stories';

const user = userEvent.setup({ pointerEventsCheck: 0 });

describe('SelectList', () => {
  describe('rendering', () => {
    test('renders a grid with the expected number of rows', () => {
      render(<Basic.Component aria-label="Test" />);

      const grid = screen.getByRole('grid');
      const rows = screen.getAllByRole('row');

      expect(grid).toBeInTheDocument();
      expect(rows).toHaveLength(3);
    });

    test('forwards arbitrary DOM props to the grid', () => {
      render(<Basic.Component aria-label="Test" data-foo="bar" />);

      const grid = screen.getByRole('grid');

      expect(grid).toHaveAttribute('data-foo', 'bar');
    });

    test('forwards the "slot" prop to the grid', () => {
      render(<Basic.Component aria-label="Test" slot="test" />);

      const grid = screen.getByRole('grid');

      expect(grid).toHaveAttribute('slot', 'test');
    });

    test('cascades the ghost variant to a nested Button inside an option', () => {
      render(<WithIconAction.Component aria-label="Payments" />);

      // The story's Button sets no `variant`; the option cascades `ghost`.
      const [button] = screen.getAllByRole('button', {
        name: /Learn more about/,
      });

      expect(button).toHaveClass('hover:ui-state-hover-ghost');
    });

    test('forwards refs to the underlying HTMLElement', () => {
      const ref: { current: HTMLDivElement | null } = { current: null };

      render(<Basic.Component aria-label="Test" ref={ref as any} />);

      expect(ref.current).toBeInstanceOf(HTMLElement);
    });
  });

  describe('label, description, and error message', () => {
    test('renders the label and connects it via aria-labelledby', () => {
      render(<Basic.Component />);

      const labelId = screen.getByText('Payment method').getAttribute('id');
      const grid = screen.getByRole('grid');

      expect(labelId).toBeTruthy();
      expect(grid).toHaveAttribute('aria-labelledby', labelId!);
    });

    test('renders the visible label as a span (for accessibility)', () => {
      render(<Basic.Component />);

      const label = screen.getByText('Payment method');

      expect(label.tagName).toBe('SPAN');
    });

    test('renders the description below the list', () => {
      render(<Basic.Component />);

      const description = screen.getByText("Choose how you'd like to pay.");

      expect(description).toBeInTheDocument();
    });

    test('renders nested label/description slots inside options', () => {
      render(<Basic.Component />);

      const label = screen.getByText('Credit card');
      const description = screen.getByText(
        'Visa, Mastercard, and Amex accepted.'
      );

      expect(label).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test('shows the errorMessage when error is true', () => {
      render(<WithError.Component />);

      const message = screen.getByText(
        'Please choose a payment method to continue.'
      );

      expect(message).toBeInTheDocument();
    });

    test('does not render an errorMessage when error is not set', () => {
      render(<Basic.Component />);

      const message = screen.queryByText(
        'Please choose a payment method to continue.'
      );

      expect(message).not.toBeInTheDocument();
    });

    test('marks the field with RAC-compatible invalid attributes when error is true', () => {
      const { container } = render(<WithError.Component />);

      /* eslint-disable testing-library/no-node-access, testing-library/no-container */
      const field = container.querySelector('.group\\/field');
      /* eslint-enable testing-library/no-node-access, testing-library/no-container */

      expect(field).toHaveAttribute('data-rac');
      expect(field).toHaveAttribute('data-invalid', 'true');
      expect(field).toHaveAttribute('data-error', 'true');
    });

    test('supports aria-label as a label substitute', () => {
      render(<EmptyState.Component aria-label="Saved methods" />);

      const grid = screen.getByRole('grid');

      expect(grid).toHaveAttribute('aria-label', 'Saved methods');
    });
  });

  describe('variants and orientation', () => {
    test('renders the bordered variant content', () => {
      render(<Bordered.Component />);

      const item = screen.getByText('Visa ending in 4242');

      expect(item).toBeInTheDocument();
    });

    test('defaults to vertical orientation', () => {
      render(<Basic.Component aria-label="Test" />);

      const grid = screen.getByRole('grid');

      expect(grid).toHaveAttribute('data-orientation', 'vertical');
    });

    test('reflects horizontal orientation via data-orientation', () => {
      render(<Horizontal.Component aria-label="Test" />);

      const grid = screen.getByRole('grid');

      expect(grid).toHaveAttribute('data-orientation', 'horizontal');
    });

    test('horizontal lists are wrapped in an @container/selectlist scope', () => {
      render(<Horizontal.Component aria-label="Test" />);

      const grid = screen.getByRole('grid');
      // eslint-disable-next-line testing-library/no-node-access
      const containerScope = grid.closest('.\\@container\\/selectlist');

      expect(containerScope).not.toBeNull();
      expect(containerScope).toHaveClass('w-(--container-width)');
    });
  });

  describe('width', () => {
    test('applies the container-width class via the width prop', () => {
      render(<Basic.Component width="1/2" />);

      // eslint-disable-next-line testing-library/no-node-access
      const wrapper = screen.getByText('Payment method').parentElement;

      expect(wrapper).toHaveClass('w-(--container-width)');
    });
  });

  describe('single selection', () => {
    test('respects defaultSelectedKeys (uncontrolled)', () => {
      render(<Basic.Component />);

      const selectedRow = screen.getByRole('row', { name: /credit card/i });

      expect(selectedRow).toHaveAttribute('aria-selected', 'true');
    });

    test('respects selectedKeys (controlled)', () => {
      render(<Basic.Component selectedKeys={['paypal']} />);

      const paypalRow = screen.getByRole('row', { name: /paypal/i });
      const creditRow = screen.getByRole('row', { name: /credit card/i });

      expect(paypalRow).toHaveAttribute('aria-selected', 'true');
      expect(creditRow).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('multiple selection', () => {
    test('renders a visible checkbox indicator on every row', () => {
      render(<WithMultiSelection.Component />);

      const checkboxes = screen.getAllByRole('checkbox');

      expect(checkboxes.length).toBeGreaterThan(0);
    });

    test('renders all multi-selection options', () => {
      render(<WithMultiSelection.Component />);

      const insurance = screen.getByText('Parcel insurance');
      const giftWrap = screen.getByText('Gift wrap');

      expect(insurance).toBeInTheDocument();
      expect(giftWrap).toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    test('moves focus to the selected row on Tab and shows focus ring', async () => {
      render(<Basic.Component />);
      const creditRow = screen.getByRole('row', { name: /credit card/i });

      await user.tab();

      /* eslint-disable testing-library/no-node-access */
      expect(document.activeElement).toBe(creditRow);
      /* eslint-enable testing-library/no-node-access */
      expect(creditRow).toHaveAttribute('data-focus-visible', 'true');
    });

    test('removes focus ring when focus leaves the grid', async () => {
      render(<Basic.Component />);
      const creditRow = screen.getByRole('row', { name: /credit card/i });
      await user.tab();

      await user.tab();

      expect(creditRow).not.toHaveAttribute('data-focus-visible');
    });

    test('moves focus to the next row on ArrowDown', async () => {
      render(<Basic.Component />);
      await user.tab();

      await user.keyboard('{ArrowDown}');

      const paypalRow = screen.getByRole('row', { name: /paypal/i });
      /* eslint-disable testing-library/no-node-access */
      expect(document.activeElement).toBe(paypalRow);
      /* eslint-enable testing-library/no-node-access */
    });

    test('moves focus to the previous row on ArrowUp', async () => {
      render(<Basic.Component />);
      await user.tab();
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      await user.keyboard('{ArrowUp}');

      const paypalRow = screen.getByRole('row', { name: /paypal/i });
      /* eslint-disable testing-library/no-node-access */
      expect(document.activeElement).toBe(paypalRow);
      /* eslint-enable testing-library/no-node-access */
    });

    // Guards the hardcoded `layout="grid"`: under RAC's `"stack"` default the row
    // captures Left/Right to walk its own focusable children instead, and a
    // horizontal list stops being navigable.
    test('moves focus between rows on ArrowRight/ArrowLeft when horizontal', async () => {
      render(<Horizontal.Component />);
      const standardRow = screen.getByRole('row', { name: /standard/i });
      const expressRow = screen.getByRole('row', { name: /express/i });

      /* eslint-disable testing-library/no-node-access */
      await user.tab();
      // Tab lands here only because the story sets `defaultSelectedKeys`.
      expect(document.activeElement).toBe(standardRow);

      await user.keyboard('{ArrowRight}');

      expect(document.activeElement).toBe(expressRow);

      await user.keyboard('{ArrowLeft}');

      expect(document.activeElement).toBe(standardRow);
      /* eslint-enable testing-library/no-node-access */
    });
  });

  describe('disabled state', () => {
    test('marks every row as data-disabled when the list is disabled', () => {
      render(<Disabled.Component />);

      const rows = screen.getAllByRole('row');

      rows.forEach(row => expect(row).toHaveAttribute('data-disabled', 'true'));
    });

    test('marks the field wrapper data-disabled when the list is disabled', () => {
      const { container } = render(<Disabled.Component />);

      /* eslint-disable testing-library/no-node-access, testing-library/no-container */
      const field = container.querySelector('.group\\/field');
      /* eslint-enable testing-library/no-node-access, testing-library/no-container */

      expect(field).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('empty state', () => {
    test('renders the emptyState content when there are no items', () => {
      render(<EmptyState.Component aria-label="Test" />);

      const empty = screen.getByText('No saved payment methods yet.');

      expect(empty).toBeInTheDocument();
    });

    test('does not render the emptyState content when there are items', () => {
      render(<Basic.Component />);

      const empty = screen.queryByText('No saved payment methods yet.');

      expect(empty).not.toBeInTheDocument();
    });
  });

  describe('SelectList.Option', () => {
    test('renders non-string children with their textValue', () => {
      render(<WithIconAction.Component />);

      const label = screen.getByText('Credit card');
      const row = screen.getByRole('row', { name: /credit card/i });

      expect(label).toBeInTheDocument();
      expect(row).toBeInTheDocument();
    });

    test('a missing textValue warns exactly once (RAC only)', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <MarigoldProvider theme={theme}>
          <SelectList aria-label="Test">
            <SelectList.Option id="named" textValue="Named option">
              <Description>Has a textValue</Description>
            </SelectList.Option>
            <SelectList.Option id="option">
              <Description>No textValue provided</Description>
            </SelectList.Option>
          </SelectList>
        </MarigoldProvider>
      );

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('<GridListItem>')
      );

      warnSpy.mockRestore();
    });

    test('an option named by aria-label does not warn', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <MarigoldProvider theme={theme}>
          <SelectList aria-label="Test">
            <SelectList.Option id="option" aria-label="Named by aria-label">
              <Description>No textValue provided</Description>
            </SelectList.Option>
          </SelectList>
        </MarigoldProvider>
      );

      // RAC accepts an `aria-label` in place of a `textValue`, so the row is
      // named correctly and neither layer should complain.
      expect(warnSpy).not.toHaveBeenCalled();

      warnSpy.mockRestore();
    });

    test('applies the action slot placement to a trailing action button', () => {
      render(<WithIconAction.Component />);

      const action = screen.getByRole('button', {
        name: /learn more about credit card/i,
      });

      // Action spans both rows so a tall control doesn't stretch the title row and gap the description.
      expect(action).toHaveClass('col-start-3', 'row-span-2');
    });

    test('applies the action slot placement to a trailing ActionMenu trigger', () => {
      render(<WithActionMenu.Component />);

      // ActionMenu's trigger reads the Marigold ButtonContext through a different chain than a plain Button.
      const trigger = screen.getAllByRole('button', { name: /manage/i })[0];

      expect(trigger).toHaveClass('col-start-3', 'row-span-2');
    });
  });

  describe('item padding', () => {
    test('does not set inline padding vars when no prop is passed (theme provides defaults)', () => {
      render(<Basic.Component aria-label="Test" />);

      const grid = screen.getByRole('grid') as HTMLElement;

      expect(grid.style.getPropertyValue('--selectlist-item-px')).toBe('');
      expect(grid.style.getPropertyValue('--selectlist-item-py')).toBe('');
    });

    test('numeric `p` writes both axis vars as scale values (not -x/-y suffixed)', () => {
      render(<Basic.Component p={4} />);

      const grid = screen.getByRole('grid') as HTMLElement;

      expect(grid.style.getPropertyValue('--selectlist-item-px')).toBe(
        'calc(var(--spacing) * 4)'
      );
      expect(grid.style.getPropertyValue('--selectlist-item-py')).toBe(
        'calc(var(--spacing) * 4)'
      );
    });

    test('uniform `p` writes both axis vars inline, deriving from the inset token', () => {
      render(<Basic.Component p="square-loose" />);

      const grid = screen.getByRole('grid') as HTMLElement;

      expect(grid.style.getPropertyValue('--selectlist-item-px')).toBe(
        'var(--spacing-square-loose-x)'
      );
      expect(grid.style.getPropertyValue('--selectlist-item-py')).toBe(
        'var(--spacing-square-loose-y)'
      );
    });

    test('`p="collapsed"` writes the unsuffixed token on both axes', () => {
      render(<Basic.Component p="collapsed" />);

      const grid = screen.getByRole('grid') as HTMLElement;

      // `collapsed` means "no spacing" on both axes, so there is no
      // `--spacing-collapsed-x` / `-y` for a theme to declare.
      expect(grid.style.getPropertyValue('--selectlist-item-px')).toBe(
        'var(--spacing-collapsed)'
      );
      expect(grid.style.getPropertyValue('--selectlist-item-py')).toBe(
        'var(--spacing-collapsed)'
      );
    });

    test('axis-specific `px` / `py` write only the matching axis var inline', () => {
      render(<Basic.Component px="padding-relaxed" py="padding-tight" />);

      const grid = screen.getByRole('grid') as HTMLElement;

      expect(grid.style.getPropertyValue('--selectlist-item-px')).toBe(
        'var(--spacing-padding-relaxed)'
      );
      expect(grid.style.getPropertyValue('--selectlist-item-py')).toBe(
        'var(--spacing-padding-tight)'
      );
    });

    test('options consume the cascading CSS vars via Tailwind classes', () => {
      render(<Basic.Component />);

      const rows = screen.getAllByRole('row');
      rows.forEach(row =>
        expect(row).toHaveClass(
          'px-(--selectlist-item-px)',
          'py-(--selectlist-item-py)'
        )
      );
    });
  });

  describe('forms', () => {
    test('renders a hidden native select inside the field', () => {
      const { container } = render(<Basic.Component name="payment" />);

      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const select = container.querySelector('select[name="payment"]');

      expect(select).toBeInTheDocument();
    });

    test('reflects single selection in the hidden select value', () => {
      const { container } = render(
        <Basic.Component name="payment" selectedKeys={['paypal']} />
      );

      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const select = container.querySelector(
        'select[name="payment"]'
      ) as HTMLSelectElement;

      expect(select.multiple).toBe(false);
      expect(select.value).toBe('paypal');
    });

    test('reflects multiple selections in the hidden select', () => {
      const { container } = render(
        <WithMultiSelection.Component
          name="addons"
          selectedKeys={['insurance', 'gift-wrap']}
        />
      );

      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const select = container.querySelector(
        'select[name="addons"]'
      ) as HTMLSelectElement;
      const values = Array.from(select.selectedOptions, o => o.value);

      expect(select.multiple).toBe(true);
      expect(values).toEqual(
        expect.arrayContaining(['insurance', 'gift-wrap'])
      );
    });

    test('marks the hidden select required for native validation', () => {
      const { container } = render(
        <Basic.Component
          name="payment"
          required
          validationBehavior="native"
          defaultSelectedKeys={[]}
        />
      );

      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const select = container.querySelector(
        'select[name="payment"]'
      ) as HTMLSelectElement;

      expect(select.required).toBe(true);
    });

    test('does not mark the hidden select required when validationBehavior is aria', () => {
      const { container } = render(
        <Basic.Component
          name="payment"
          required
          validationBehavior="aria"
          defaultSelectedKeys={[]}
        />
      );

      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const select = container.querySelector(
        'select[name="payment"]'
      ) as HTMLSelectElement;

      expect(select.required).toBe(false);
    });

    test('disables the hidden select when the list is disabled', () => {
      const { container } = render(<Disabled.Component name="shipping" />);

      // eslint-disable-next-line testing-library/no-node-access, testing-library/no-container
      const select = container.querySelector(
        'select[name="shipping"]'
      ) as HTMLSelectElement;

      expect(select.disabled).toBe(true);
    });
  });
});
