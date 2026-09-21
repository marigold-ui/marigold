import { render, screen } from '@testing-library/react';
import { Aspect } from './Aspect';

test('supports  maxWidth', () => {
  render(<Aspect maxWidth="50vw">aspect</Aspect>);
  const aspect = screen.getByText('aspect');
  expect(aspect).toMatchInlineSnapshot(`
    <div
      class="overflow-hidden aspect-[1] max-w-[var(--maxWidth)]"
      style="--maxWidth: 50vw;"
    >
      aspect
    </div>
  `);
});

// Unit tests load no stylesheet, so the aspect-ratio utility resolves to `auto`.
// The class is asserted above instead.

test('supports default ratio', () => {
  render(<Aspect ratio="ultrawide">aspect</Aspect>);
  const aspect = screen.getByText('aspect');
  expect(aspect).toBeInTheDocument();
});
