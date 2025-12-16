import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Basic } from './Slider.stories';

const user = userEvent.setup();

test('supports keyboard move up and down', async () => {
  render(<Basic.Component label="Example" />);
  const slider = screen.getByRole('slider');

  await user.click(screen.getByText(/Example/));

  await user.keyboard('{arrowup}');
  expect(slider).toHaveValue('1');

  await user.keyboard('{arrowdown}');
  expect(slider).toHaveValue('0');
});

test('supports keyboard move right and left', async () => {
  render(<Basic.Component label="Example" />);

  const slider = screen.getByRole('slider');
  await user.click(screen.getByText(/Example/));

  await user.keyboard('{arrowright}');
  expect(slider).toHaveValue('1');

  await user.keyboard('{arrowleft}');
  expect(slider).toHaveValue('0');
});

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
  const ref = createRef<HTMLDivElement>();
  render(<Basic.Component ref={ref as any} label="Percent" />);

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('multiple thumbs', () => {
  render(
    <Basic.Component
      defaultValue={[30, 60]}
      thumbLabels={['start', 'end']}
      label="Range"
    />
  );

  const slider = screen.getAllByRole('slider');
  expect(slider[0]).toHaveValue('30');
  expect(slider[1]).toHaveValue('60');
});
