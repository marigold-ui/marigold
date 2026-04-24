import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import {
  Action,
  Basic,
  Bordered,
  Disabled,
  EmptyState,
  Horizontal,
  WithDescription,
  WithError,
  WithMultiSelection,
} from './SelectList.stories';
import { SelectListAction } from './SelectListAction';

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

  test('action slot wraps children with order-last', () => {
    render(
      <SelectListAction>
        <button>Action</button>
      </SelectListAction>
    );

    /* eslint-disable testing-library/no-node-access */
    const action = screen.getByText('Action').parentElement;
    /* eslint-enable testing-library/no-node-access */
    expect(action).toHaveClass('order-last');
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

  test('renders items for multiple selection', () => {
    render(<WithMultiSelection.Component />);

    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Blastoise')).toBeInTheDocument();
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
    render(<Action.Component />);

    expect(screen.getByText('Games')).toBeInTheDocument();
  });

  test('renders bordered variant', () => {
    render(<Bordered.Component />);

    expect(screen.getByText('Free')).toBeInTheDocument();
  });

  test('renders label and associates it with the grid via aria-labelledby', () => {
    render(<Basic.Component />);

    const labelId = screen.getByText('Favorite fruit').getAttribute('id');
    expect(labelId).toBeTruthy();
    expect(screen.getByRole('grid')).toHaveAttribute(
      'aria-labelledby',
      labelId!
    );
  });

  test('renders description', () => {
    render(<Basic.Component />);

    expect(screen.getByText('Pick the one you like most.')).toBeInTheDocument();
  });

  test('renders errorMessage when error is true', () => {
    render(<WithError.Component />);

    expect(screen.getByText('Please choose a fruit.')).toBeInTheDocument();
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

  test('list-level disabled disables all items via context', () => {
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

  test('renders emptyState when there are no items', () => {
    render(<EmptyState.Component aria-label="Test" />);

    expect(screen.getByText('No items to display.')).toBeInTheDocument();
  });
});
