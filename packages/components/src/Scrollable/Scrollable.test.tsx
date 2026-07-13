import { render, screen } from '@testing-library/react';
import { Basic } from './Scrollable.stories';

test('should be rendered', () => {
  render(
    <Basic.Component data-testid="scroll">
      <div>something</div>
    </Basic.Component>
  );
  const scroll = screen.getByTestId('scroll');

  expect(scroll).toBeInTheDocument();
  expect(scroll).toBeValid();
});

test('should have classNames', () => {
  render(
    <Basic.Component data-testid="scroll">
      <div>something</div>
    </Basic.Component>
  );
  const scroll = screen.getByTestId('scroll');

  expect(scroll.className).toMatchInlineSnapshot(
    `"sticky h-(--height) w-(--width) overflow-auto overscroll-auto"`
  );
  // Basic defaults to width="1/5", which maps to the fractional calc value.
  expect(scroll.style.getPropertyValue('--width')).toBe('calc((1 / 5) * 100%)');
  expect(scroll).toBeValid();
});

test('support width and height prop', () => {
  render(
    <Basic.Component data-testid="scroll" width="1/2" height="200px">
      <div>something</div>
    </Basic.Component>
  );
  const scroll = screen.getByTestId('scroll');

  expect(scroll.className).toMatchInlineSnapshot(
    `"sticky h-(--height) w-(--width) overflow-auto overscroll-auto"`
  );
  expect(scroll.style.getPropertyValue('--width')).toBe('calc((1 / 2) * 100%)');
  expect(scroll.style.getPropertyValue('--height')).toBe('200px');
});
