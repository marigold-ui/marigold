import { render, screen } from '@testing-library/react';
import { Scrollable } from './Scrollable';

test('should be rendered', () => {
  render(
    <Scrollable data-testid="scroll">
      <div>something</div>
    </Scrollable>
  );
  const scroll = screen.getByTestId('scroll');

  expect(scroll).toBeInTheDocument();
  expect(scroll).toBeValid();
});

test('should have classNames', () => {
  render(
    <Scrollable data-testid="scroll">
      <div>something</div>
    </Scrollable>
  );
  const scroll = screen.getByTestId('scroll');

  expect(scroll.className).toMatchInlineSnapshot(
    `"sticky h-(--height) overflow-auto overscroll-auto w-full"`
  );
  expect(scroll).toBeValid();
});

test('support width and height prop', () => {
  render(
    <Scrollable data-testid="scroll" width="1/2" height="200px">
      <div>something</div>
    </Scrollable>
  );
  const scroll = screen.getByTestId('scroll');
  expect(scroll.className).toMatchInlineSnapshot(
    `"sticky h-(--height) overflow-auto overscroll-auto w-1/2"`
  );
});
