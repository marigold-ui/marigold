import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import {
  Action,
  Basic,
  Bordered,
  WithDescription,
  WithImage,
  WithMultiSelection,
  WithSingleSelection,
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
    render(<WithSingleSelection.Component />);

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

    // RAC injects a checkbox in slot="selection" for each row when
    // selectionMode="multiple".
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

  test('renders image slot when present', () => {
    render(<WithImage.Component />);

    /* eslint-disable testing-library/no-node-access */
    const images = document.querySelectorAll('img');
    /* eslint-enable testing-library/no-node-access */
    expect(images.length).toBeGreaterThan(0);
  });

  test('supports non-string children with textValue', () => {
    render(<Action.Component />);

    expect(screen.getByText('Games')).toBeInTheDocument();
  });

  test('renders bordered variant', () => {
    render(<Bordered.Component />);

    expect(screen.getByText('Free')).toBeInTheDocument();
  });
});
