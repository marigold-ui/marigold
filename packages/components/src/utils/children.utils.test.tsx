import { render, screen } from '@testing-library/react';
import type { PropsWithChildren } from 'react';
import { splitChildren } from './children.utils';

describe('splitChilren', () => {
  const Component = ({ children, at }: PropsWithChildren<{ at?: number }>) => {
    const [left, right] = splitChildren(children, at);

    return (
      <>
        <div data-testid="left">{left}</div>
        <div data-testid="right">{right}</div>
      </>
    );
  };

  test('split children', () => {
    render(
      <Component at={2}>
        <span>Child 1</span>
        <span>Child 2</span>
        <span>Child 3</span>
        <span>Child 4</span>
      </Component>
    );
    expect(screen.getByTestId('left').textContent).toBe('Child 1Child 2');
    expect(screen.getByTestId('right').textContent).toBe('Child 3Child 4');
  });

  test('all children in first part when "at" it too large', () => {
    render(
      <Component at={4}>
        <span>Child 1</span>
        <span>Child 2</span>
        <span>Child 3</span>
        <span>Child 4</span>
      </Component>
    );

    expect(screen.getByTestId('left').textContent).toBe(
      'Child 1Child 2Child 3Child 4'
    );
    expect(screen.getByTestId('right').textContent).toBe('');
  });

  test('when "at" is 0', () => {
    render(
      <Component at={0}>
        <span>Child 1</span>
        <span>Child 2</span>
        <span>Child 3</span>
        <span>Child 4</span>
      </Component>
    );

    expect(screen.getByTestId('left').textContent).toBe('');
    expect(screen.getByTestId('right').textContent).toBe(
      'Child 1Child 2Child 3Child 4'
    );
  });

  test('when "at" is undefined', () => {
    render(
      <Component at={undefined}>
        <span>Child 1</span>
        <span>Child 2</span>
        <span>Child 3</span>
        <span>Child 4</span>
      </Component>
    );

    expect(screen.getByTestId('left').textContent).toBe(
      'Child 1Child 2Child 3Child 4'
    );
    expect(screen.getByTestId('right').textContent).toBe('');
  });
});
