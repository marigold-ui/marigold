import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Basic, WithSingleSelection } from './SelectList.stories';
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

  test('action slot renders with order-last class', () => {
    render(
      <SelectListAction>
        <button>Action</button>
      </SelectListAction>
    );

    const action = screen.getByText('Action').parentElement;
    expect(action).toHaveClass('order-last');
  });

  test('should support focus ring-3', async () => {
    render(<WithSingleSelection.Component />);

    let row = screen.getAllByRole('row')[0];

    expect(row).not.toHaveAttribute('data-focus-visible');
    expect(row).not.toHaveClass('focus');

    await user.tab();
    /* eslint-disable testing-library/no-node-access */
    expect(document.activeElement).toBe(row);
    expect(row).toHaveAttribute('data-focus-visible', 'true');

    await user.tab();
    expect(row).not.toHaveAttribute('data-focus-visible');
  });
});
