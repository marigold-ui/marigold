import { render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef } from 'react';
import {
  Action,
  Basic,
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
    const { result } = renderHook(() => useRef<HTMLUListElement>(null));
    render(<Basic.Component aria-label="Test" ref={result.current} />);

    expect(result.current.current).toBeInstanceOf(HTMLUListElement);
  });

  test('action slot renders with order-last class', () => {
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

  test('renders items for multiple selection', () => {
    render(<WithMultiSelection.Component />);

    expect(screen.getByText('Charizard')).toBeInTheDocument();
    expect(screen.getByText('Blastoise')).toBeInTheDocument();
  });

  test('supports non-string children with textValue', () => {
    render(<Action.Component />);

    expect(screen.getByText('Games')).toBeInTheDocument();
  });
});
