import { render, screen } from '@testing-library/react';
import { Basic, MultipleThumbs } from './Slider.stories';

test('supports disabled prop', () => {
  render(<Basic.Component disabled label="Example" />);

  const inputElement = screen.getByRole('slider');

  expect(inputElement).toHaveAttribute(`disabled`);
});

test('supports defaultValue (uncontrolled)', () => {
  render(<Basic.Component defaultValue={[25]} label="Example" />);
  const slider = screen.getByRole('slider');
  expect(slider).toHaveValue('25');
});

test('forwards ref', () => {
  const ref: { current: HTMLDivElement | null } = { current: null };
  render(<Basic.Component ref={ref} label="Percent" />);

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('renders multiple thumbs for range slider', () => {
  render(<MultipleThumbs.Component />);

  const sliders = screen.getAllByRole('slider');

  expect(sliders).toHaveLength(2);
});

test('applies width prop via --container-width CSS variable', () => {
  render(<Basic.Component label="x" width="1/2" />);
  const group = screen.getByRole('group');
  expect(group).toHaveClass('w-(--container-width)');
  expect(group.style.getPropertyValue('--container-width')).toBe(
    'calc((1 / 2) * 100%)'
  );
});

test('applies a string thumbLabels to the single thumb', () => {
  render(
    <Basic.Component label="Gebühren-Splitting" thumbLabels="Anteil Reservix" />
  );

  // react-aria appends the slider's own label after the thumb's, so match
  // loosely rather than pinning that upstream composition order
  expect(screen.getByRole('slider')).toHaveAccessibleName(/Anteil Reservix/);
});

test('applies each tuple thumbLabels entry to its own thumb', () => {
  render(<MultipleThumbs.Component />);

  const [start, end] = screen.getAllByRole('slider');

  expect(start).toHaveAccessibleName(/start/);
  expect(end).toHaveAccessibleName(/end/);
});

test('does not spread a string thumbLabels across a range slider', () => {
  render(
    <Basic.Component
      defaultValue={[20, 40]}
      label="Range"
      thumbLabels="Anteil Reservix"
    />
  );

  const [start, end] = screen.getAllByRole('slider');

  expect(start).toHaveAccessibleName(/Anteil Reservix/);
  // The unnamed thumb falls back to the slider's own label, so pin that
  // rather than asserting the absence of a name
  expect(end).toHaveAccessibleName('Range');
});
