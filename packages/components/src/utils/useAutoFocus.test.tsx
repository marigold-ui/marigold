import { render, screen, waitFor } from '@testing-library/react';
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

const SheetHarness = ({
  inputRef,
  entering = false,
}: {
  inputRef: RefObject<HTMLInputElement | null>;
  entering?: boolean;
}) => {
  useAutoFocus(inputRef);

  return (
    <div data-entering={entering || undefined}>
      <div data-sheet-content tabIndex={-1} aria-label="Sheet" role="dialog">
        <p>Sheet text</p>
        <input ref={inputRef} aria-label="Search" />
        <button>Elsewhere</button>
      </div>
    </div>
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

test('in a sheet, focuses the element once the sheet takes focus', () => {
  render(<SheetHarness inputRef={createRef<HTMLInputElement>()} />);

  expect(screen.getByLabelText('Search')).not.toHaveFocus();

  screen.getByRole('dialog').focus();

  expect(screen.getByLabelText('Search')).toHaveFocus();
});

test('in a sheet, keeps focus on a control tapped before the sheet took focus', () => {
  render(<SheetHarness inputRef={createRef<HTMLInputElement>()} />);

  screen.getByRole('button', { name: 'Elsewhere' }).focus();

  expect(screen.getByRole('button', { name: 'Elsewhere' })).toHaveFocus();

  // RAC focuses the sheet once it has slid in.
  screen.getByRole('dialog').focus();

  expect(screen.getByLabelText('Search')).not.toHaveFocus();
});

test('in a sheet, does not take focus from a tapped control when the ref changes identity', () => {
  const { rerender } = render(
    <SheetHarness inputRef={createRef<HTMLInputElement>()} />
  );
  screen.getByRole('button', { name: 'Elsewhere' }).focus();

  rerender(<SheetHarness inputRef={createRef<HTMLInputElement>()} />);

  expect(screen.getByRole('button', { name: 'Elsewhere' })).toHaveFocus();
});

test('in a sheet, waits for the slide-in when the sheet takes focus while entering', async () => {
  const inputRef = createRef<HTMLInputElement>();
  const { rerender } = render(<SheetHarness inputRef={inputRef} entering />);
  // A tap on the sheet's text focuses the sheet itself.
  screen.getByRole('dialog').focus();

  expect(screen.getByLabelText('Search')).not.toHaveFocus();

  rerender(<SheetHarness inputRef={inputRef} />);

  await waitFor(() => expect(screen.getByLabelText('Search')).toHaveFocus());
});

test('in a sheet, keeps a control tapped while waiting for the slide-in', async () => {
  const inputRef = createRef<HTMLInputElement>();
  const { rerender } = render(<SheetHarness inputRef={inputRef} entering />);
  screen.getByRole('dialog').focus();
  screen.getByRole('button', { name: 'Elsewhere' }).focus();

  rerender(<SheetHarness inputRef={inputRef} />);
  // Lets the MutationObserver callback run.
  await new Promise(resolve => setTimeout(resolve, 0));

  expect(screen.getByRole('button', { name: 'Elsewhere' })).toHaveFocus();
});
