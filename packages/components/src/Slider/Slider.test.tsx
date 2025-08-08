import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { Theme, cva } from '@marigold/system';
import { setup } from '../test.utils';
import { Slider } from './Slider';

const theme: Theme = {
  name: 'slider testing',
  components: {
    Field: cva(),
    Label: {
      container: cva(),
      indicator: cva(),
    },
    Slider: {
      container: cva(''),
      track: cva([
        'absolute top-4 h-2 w-full',
        'rounded-lg border-none border-transparent',
        'bg-slider-track-background text-transparent',
      ]),
      selectedTrack: cva(['bg-bg-selected-input/80 rounded-lg']),
      thumb: cva([
        'align-middle',
        'border-slider-thumb-border rounded-lg border-4 border-solid',
        'size-4',
        'bg-slider-thumb-background',
        ' focus:border-slider-thumb-focus',
        ' disabled:bg-slider-thumb-disabled-background  disabled:border-slider-thumb-disabled-border',
      ]),
      output: cva('text-slider-ouput-text text-base font-normal'),
    },
    HelpText: {
      container: cva(),
      icon: cva(),
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

  render(<Slider maxValue={5} label="Example" />);
  const slider = screen.getByRole('slider');

  fireEvent.click(screen.getByText(/Example/));
  await user.keyboard('{arrowup}');
  expect(slider).toHaveValue('1');
  await user.keyboard('{arrowdown}');
  expect(slider).toHaveValue('0');
});

test('supports keyboard move right and left', async () => {
  const user = userEvent.setup();

  render(<Slider maxValue={5} label="Example" />);
  const slider = screen.getByRole('slider');

  fireEvent.click(screen.getByText(/Example/));
  await user.keyboard('{arrowright}');
  expect(slider).toHaveValue('1');
  await user.keyboard('{arrowleft}');
  expect(slider).toHaveValue('0');
});

test('supports disabled prop', () => {
  render(<Slider disabled label="Example" />);
  const inputElement = screen.getByRole('slider');
  expect(inputElement).toHaveAttribute(`disabled`);
});

test('supports defaultValue (uncontrolled)', () => {
  render(<Slider defaultValue={[25]} label="Example" />);
  const slider = screen.getByRole('slider');
  expect(slider).toHaveValue('25');
});

test('supports changing value (controlled)', () => {
  const TestComponent = () => {
    const [value, setValue] = React.useState(75);
    return (
      <Slider
        value={value}
        onChange={(val: any) => setValue(val)}
        label="Example"
      />
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
    <Slider
      formatOptions={{ style: 'percent' }}
      step={0.01}
      maxValue={1}
      label="Percent"
    />
  );

  expect(screen.getByRole('status')).toContainHTML('0%');
  const slider = screen.getByRole('slider');
  fireEvent.change(slider, { target: { value: '0.5' } });
  expect(slider).toHaveValue('0.5');
  expect(screen.getByRole('status')).toContainHTML('50%');
});

test('takes full width by default', () => {
  render(<Slider label="Percent" />);

  const container = screen.getByRole('group');
  expect(container.className).toMatchInlineSnapshot(
    `"group/field flex-col grid grid-cols-[auto_1fr] gap-y-1 w-full"`
  );
});

test('allows to set width via prop', () => {
  render(<Slider width={44} label="Percent" />);

  const container = screen.getByRole('group');
  expect(container.className).toMatchInlineSnapshot(
    `"group/field flex-col grid grid-cols-[auto_1fr] gap-y-1 w-44"`
  );
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(<Slider ref={ref as any} label="Percent" />);

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});

test('multiple thumbs', () => {
  render(
    <Slider
      defaultValue={[30, 60]}
      thumbLabels={['start', 'end']}
      label="Range"
    />
  );

  const slider = screen.getAllByRole('slider');
  expect(slider[0]).toHaveValue('30');
  expect(slider[1]).toHaveValue('60');
});

test('supports changing value (controlled) with multiple thumbs', () => {
  const TestComponent = () => {
    const [value, setValue] = useState<number | number[]>([25, 75]);

    return (
      <Slider value={value} onChange={setValue} label="Tickets for sale" />
    );
  };
  render(<TestComponent />);

  const slider = screen.getAllByRole('slider');
  expect(slider[0]).toHaveValue('25');
  fireEvent.change(slider[0], { target: { value: '15' } });
  expect(slider[0]).toHaveValue('15');
  expect(slider[1]).toHaveValue('75');
  fireEvent.change(slider[1], { target: { value: '80' } });
  expect(slider[1]).toHaveValue('80');
});

test('supports disabled prop with multiple thumbs', () => {
  render(
    <Slider
      defaultValue={[20, 30]}
      maxValue={100}
      thumbLabels={['start', 'end']}
      disabled
    />
  );

  const inputElements = screen.getAllByRole('slider');
  inputElements.forEach(inputElement => {
    expect(inputElement).toHaveAttribute('disabled');
  });
});
