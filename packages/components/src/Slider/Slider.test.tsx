import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { Slider } from './Slider';
import userEvent from '@testing-library/user-event';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';

const theme: Theme = {
  name: 'slider testing',
  components: {
    Field: cva(),
    Slider: {
      track: cva([
        'absolute top-4 h-2 w-full',
        'rounded-lg border-none border-transparent',
        'bg-slider-track-background text-transparent',
      ]),
      thumb: cva([
        'align-middle',
        'border-slider-thumb-border rounded-lg border-4 border-solid',
        'h-4 w-4',
        'bg-slider-thumb-background',
        ' focus:border-slider-thumb-focus',
        ' disabled:bg-slider-thumb-disabled-background  disabled:border-slider-thumb-disabled-border',
      ]),
      label: cva('text-slider-label-text text-base font-normal'),
      output: cva('text-slider-ouput-text text-base font-normal'),
    },
  },
};

const { render } = setup({ theme });

test('supports mouse click on value on track', () => {
  render(<Slider aria-label="slider" maxValue={5} />);
  const slider = screen.getByRole('slider');

  fireEvent.change(slider, { target: { value: '2' } });
  expect(slider).toHaveValue('2');
});

test('supports keyboard move up and down', async () => {
  const user = userEvent.setup();

  render(<Slider maxValue={5}>Example</Slider>);
  const slider = screen.getByRole('slider');

  fireEvent.click(screen.getByText(/Example/));
  await user.keyboard('{arrowup}');
  expect(slider).toHaveValue('1');
  await user.keyboard('{arrowdown}');
  expect(slider).toHaveValue('0');
});

test('supports keyboard move right and left', async () => {
  const user = userEvent.setup();

  render(<Slider maxValue={5}>Example</Slider>);
  const slider = screen.getByRole('slider');

  fireEvent.click(screen.getByText(/Example/));
  await user.keyboard('{arrowright}');
  expect(slider).toHaveValue('1');
  await user.keyboard('{arrowleft}');
  expect(slider).toHaveValue('0');
});

test('supports disabled prop', () => {
  render(<Slider disabled>Example</Slider>);
  const inputElement = screen.getByRole('slider');
  expect(inputElement).toHaveAttribute(`disabled`);
});

test('supports defaultValue (uncontrolled)', () => {
  render(<Slider defaultValue={[25]}>Example</Slider>);
  const slider = screen.getByRole('slider');
  expect(slider).toHaveValue('25');
});

test('supports changing value (controlled)', () => {
  const TestComponent = () => {
    const [value, setValue] = React.useState(75);
    return (
      <Slider value={value} onChange={(val: any) => setValue(val)}>
        Example
      </Slider>
    );
  };
  render(<TestComponent />);

  const slider = screen.getByRole('slider');
  expect(slider).toHaveValue('75');
  fireEvent.change(slider, { target: { value: '25' } });
  expect(slider).toHaveValue('25');
});

test('supports formatOptions prop', () => {
  render(
    <Slider formatOptions={{ style: 'percent' }} step={0.01} maxValue={1}>
      Percent
    </Slider>
  );

  expect(screen.getByRole('status')).toContainHTML('0%');
  const slider = screen.getByRole('slider');
  fireEvent.change(slider, { target: { value: '0.5' } });
  expect(slider).toHaveValue('0.5');
  expect(screen.getByRole('status')).toContainHTML('50%');
});

test('takes full width by default', () => {
  render(<Slider>Percent</Slider>);

  const container = screen.getByRole('group');
  expect(container).toHaveAttribute('style', '--slideWidth: 100%;');
});

test('allows to set width via prop', () => {
  render(<Slider width="200px">Percent</Slider>);

  const container = screen.getByRole('group');
  expect(container).toHaveAttribute('style', '--slideWidth: 200px;');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(<Slider ref={ref}>Percent</Slider>);

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});
