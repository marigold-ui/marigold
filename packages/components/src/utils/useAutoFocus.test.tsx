import { render, screen } from '@testing-library/react';
import { type RefObject, createRef } from 'react';
import { useAutoFocus } from './useAutoFocus';

const Harness = ({
  inputRef,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
}) => {
  useAutoFocus(inputRef);

  return (
    <>
      <input ref={inputRef} aria-label="Search" />
      <button>Elsewhere</button>
    </>
  );
};

test('focuses the element on mount', () => {
  render(<Harness inputRef={createRef<HTMLInputElement>()} />);

  expect(screen.getByLabelText('Search')).toHaveFocus();
});

test('does not focus again when the ref changes identity', () => {
  const { rerender } = render(
    <Harness inputRef={createRef<HTMLInputElement>()} />
  );
  screen.getByRole('button', { name: 'Elsewhere' }).focus();

  rerender(<Harness inputRef={createRef<HTMLInputElement>()} />);

  expect(screen.getByRole('button', { name: 'Elsewhere' })).toHaveFocus();
});
