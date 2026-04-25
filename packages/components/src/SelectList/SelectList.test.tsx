import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import {
  Basic,
  Bordered,
  Disabled,
  EmptyState,
  Horizontal,
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

    test('forwards refs to the underlying HTMLElement', () => {
      const ref = createRef<HTMLDivElement>();

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
