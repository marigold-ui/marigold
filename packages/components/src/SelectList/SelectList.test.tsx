import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import {
  Basic,
  Bordered,
  Disabled,
  EmptyState,
  Horizontal,
  WithDescription,
  WithError,
  WithIconAction,
  WithMultiSelection,
} from './SelectList.stories';

const user = userEvent.setup({ pointerEventsCheck: 0 });

describe('SelectList', () => {
  test('support DOM props', () => {
    render(<Basic.Component aria-label="Test" data-foo="bar" />);

    let grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('data-foo', 'bar');
  });

  test('support slot', () => {
    render(<Basic.Component aria-label="Test" slot="test" />);

    let grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('slot', 'test');
  });

  test('support refs', () => {
    const SelectListRef = createRef();
    render(<Basic.Component aria-label="Test" ref={SelectListRef as any} />);

    expect(SelectListRef.current).toBeInstanceOf(HTMLElement);
  });

  test('should support focus ring', async () => {
    render(<Basic.Component />);

    let row = screen.getAllByRole('row')[0];

    expect(row).not.toHaveAttribute('data-focus-visible');

    await user.tab();
    /* eslint-disable testing-library/no-node-access */
    expect(document.activeElement).toBe(row);
    expect(row).toHaveAttribute('data-focus-visible', 'true');

    await user.tab();
    expect(row).not.toHaveAttribute('data-focus-visible');
  });

  test('renders options for multiple selection', () => {
    render(<WithMultiSelection.Component />);

    expect(screen.getByText('Parcel insurance')).toBeInTheDocument();
    expect(screen.getByText('Gift wrap')).toBeInTheDocument();
  });

  test('renders a visible selection checkbox in multi mode', () => {
    render(<WithMultiSelection.Component />);

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);
  });

  test('renders label and description slots', () => {
    render(<WithDescription.Component />);

    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(
      screen.getByText('For teams up to 50 members with priority support.')
    ).toBeInTheDocument();
  });

  test('supports non-string children with textValue', () => {
    render(<WithIconAction.Component />);

    expect(screen.getByText('Credit card')).toBeInTheDocument();
  });

  test('nested IconButton click does not toggle row selection', async () => {
    render(<WithIconAction.Component />);

    const button = screen.getAllByRole('button', {
      name: /learn more about/i,
    })[0];
    const row = button.closest('[role="row"]')!;

    expect(row).toHaveAttribute('aria-selected', 'false');

    // Intercept the alert that the story triggers
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});
    await user.click(button);
    alertSpy.mockRestore();

    expect(row).toHaveAttribute('aria-selected', 'false');
  });

  test('renders bordered variant', () => {
    render(<Bordered.Component />);

    expect(screen.getByText('Visa ending in 4242')).toBeInTheDocument();
  });

  test('renders label and associates it with the grid via aria-labelledby', () => {
    render(<Basic.Component />);

    const labelId = screen.getByText('Payment method').getAttribute('id');
    expect(labelId).toBeTruthy();
    expect(screen.getByRole('grid')).toHaveAttribute(
      'aria-labelledby',
      labelId!
    );
  });

  test('renders description', () => {
    render(<Basic.Component />);

    expect(
      screen.getByText("Choose how you'd like to pay.")
    ).toBeInTheDocument();
  });

  test('renders errorMessage when error is true', () => {
    render(<WithError.Component />);

    expect(
      screen.getByText('Please choose a payment method to continue.')
    ).toBeInTheDocument();
  });

  test('applies RAC-compatible data attributes when error is true', () => {
    const { container } = render(<WithError.Component />);

    /* eslint-disable testing-library/no-node-access, testing-library/no-container */
    const field = container.querySelector('.group\\/field');
    /* eslint-enable testing-library/no-node-access, testing-library/no-container */
    expect(field).toHaveAttribute('data-rac');
    expect(field).toHaveAttribute('data-invalid', 'true');
    expect(field).toHaveAttribute('data-error', 'true');
  });

  test('list-level disabled disables all options via context', () => {
    render(<Disabled.Component />);

    screen
      .getAllByRole('row')
      .forEach(row => expect(row).toHaveAttribute('data-disabled', 'true'));
  });

  test('applies data-disabled on the field wrapper when disabled', () => {
    const { container } = render(<Disabled.Component />);

    /* eslint-disable testing-library/no-node-access, testing-library/no-container */
    const field = container.querySelector('.group\\/field');
    /* eslint-enable testing-library/no-node-access, testing-library/no-container */
    expect(field).toHaveAttribute('data-disabled', 'true');
  });

  test('defaults to vertical orientation', () => {
    render(<Basic.Component aria-label="Test" />);

    expect(screen.getByRole('grid')).toHaveAttribute(
      'data-orientation',
      'vertical'
    );
  });

  test('reflects horizontal orientation via data-orientation', () => {
    render(<Horizontal.Component aria-label="Test" />);

    expect(screen.getByRole('grid')).toHaveAttribute(
      'data-orientation',
      'horizontal'
    );
  });

  test('renders emptyState when there are no options', () => {
    render(<EmptyState.Component aria-label="Test" />);

    expect(
      screen.getByText('No saved payment methods yet.')
    ).toBeInTheDocument();
  });
});
