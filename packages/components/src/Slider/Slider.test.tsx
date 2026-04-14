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
  const ref: RefObject<HTMLDivElement | null> = { current: null };
  render(<Basic.Component ref={ref} label="Percent" />);

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('renders multiple thumbs for range slider', () => {
  render(<MultipleThumbs.Component />);

  const sliders = screen.getAllByRole('slider');

  expect(sliders).toHaveLength(2);
});
