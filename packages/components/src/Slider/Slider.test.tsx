import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Slider } from './Slider';
import userEvent from '@testing-library/user-event';

const theme = {
  colors: {
    primary: 'orange',
    secondary: 'blue',
    disabled: 'gray',
  },
  sizes: {
    none: 0,
    large: 120,
  },
  components: {
    Slider: {
      base: {
        track: {
          color: 'green',
          '&:focus': {
            bg: 'primary',
          },
          '&:checked': {
            bg: 'secondary',
          },
          '&:disabled': {
            bg: 'disabled',
          },
        },
        thumb: {
          color: 'green',
          '&:focus': {
            bg: 'primary',
          },
          '&:disabled': {
            bg: 'disabled',
          },
        },
        label: {
          color: 'text',
          fontSize: 'xxsmall',
          fontWeight: 'body',
        },
        output: {
          color: 'text',
          fontSize: 'xxsmall',
          fontWeight: 'body',
        },
      },
    },
  },
};

test('supports mouse click on value on track', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider aria-label="slider" maxValue={5} />
    </ThemeProvider>
  );
  const slider = screen.getByRole(/slider/);

  fireEvent.change(slider, { target: { value: '2' } });
  expect(slider).toHaveValue('2');
});

test('supports keyboard move up and down', async () => {
  const user = userEvent.setup();

  render(
    <ThemeProvider theme={theme}>
      <Slider maxValue={5}>Example</Slider>
    </ThemeProvider>
  );
  const slider = screen.getByRole(/slider/);

  fireEvent.click(screen.getByText(/Example/));
  await user.keyboard('{arrowup}');
  expect(slider).toHaveValue('1');
  await user.keyboard('{arrowdown}');
  expect(slider).toHaveValue('0');
});

test('supports keyboard move right and left', async () => {
  const user = userEvent.setup();

  render(
    <ThemeProvider theme={theme}>
      <Slider maxValue={5}>Example</Slider>
    </ThemeProvider>
  );
  const slider = screen.getByRole(/slider/);

  fireEvent.click(screen.getByText(/Example/));
  await user.keyboard('{arrowright}');
  expect(slider).toHaveValue('1');
  await user.keyboard('{arrowleft}');
  expect(slider).toHaveValue('0');
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider disabled>Example</Slider>
    </ThemeProvider>
  );
  const inputElement = screen.getByRole(/slider/);
  expect(inputElement).toHaveAttribute(`disabled`);
});

test('supports defaultValue (uncontrolled)', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider defaultValue={[25]}>Example</Slider>
    </ThemeProvider>
  );
  const slider = screen.getByRole(/slider/);
  expect(slider).toHaveValue('25');
});

test('supports changing value (controlled)', () => {
  const TestComponent = () => {
    const [value, setValue] = React.useState(75);
    return (
      <ThemeProvider theme={theme}>
        <Slider value={value} onChange={(val: any) => setValue(val)}>
          Example
        </Slider>
      </ThemeProvider>
    );
  };
  render(<TestComponent />);

  const slider = screen.getByRole(/slider/);
  expect(slider).toHaveValue('75');
  fireEvent.change(slider, { target: { value: '25' } });
  expect(slider).toHaveValue('25');
});

test('supports formatOptions prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider formatOptions={{ style: 'percent' }} step={0.01} maxValue={1}>
        Percent
      </Slider>
    </ThemeProvider>
  );

  expect(screen.getByRole(/status/)).toContainHTML('0%');
  const slider = screen.getByRole(/slider/);
  fireEvent.change(slider, { target: { value: '0.5' } });
  expect(slider).toHaveValue('0.5');
  expect(screen.getByRole(/status/)).toContainHTML('50%');
});

test('takes full width by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider>Percent</Slider>
    </ThemeProvider>
  );

  const container = screen.getByRole('group');
  expect(container).toHaveStyle('width: 100%');
});

test('allows to set width via prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider width="large">Percent</Slider>
    </ThemeProvider>
  );

  const container = screen.getByRole('group');
  expect(container).toHaveStyle(`width: ${theme.sizes.large}px`);
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLDivElement>();
  render(
    <ThemeProvider theme={theme}>
      <Slider ref={ref}>Percent</Slider>
    </ThemeProvider>
  );

  expect(ref.current).toBeInstanceOf(HTMLDivElement);
});
