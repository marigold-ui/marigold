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
  ...{
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

test('supports keyboard mouse up and down', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider maxValue={5}>Example</Slider>
    </ThemeProvider>
  );
  const slider = screen.getByRole(/slider/);

  fireEvent.click(screen.getByText(/Example/));
  userEvent.keyboard('{arrowup}');
  expect(slider).toHaveValue('1');
  userEvent.keyboard('{arrowdown}');
  expect(slider).toHaveValue('0');
});

test('supports keyboard mouse right and left', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider maxValue={5}>Example</Slider>
    </ThemeProvider>
  );
  const slider = screen.getByRole(/slider/);

  fireEvent.click(screen.getByText(/Example/));
  userEvent.keyboard('{arrowright}');
  expect(slider).toHaveValue('1');
  userEvent.keyboard('{arrowleft}');
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

test('supports width prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider width={180}>Example</Slider>
    </ThemeProvider>
  );
  const inputElement = screen.getByRole(/group/);
  expect(inputElement).toHaveStyle(`width: 180px`);
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
    const [value, setValue] = React.useState([75]);
    return (
      <ThemeProvider theme={theme}>
        <Slider value={value} onChange={setValue}>
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
