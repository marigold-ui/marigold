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
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Slider, { 'aria-label': 'slider', maxValue: 5 })
    )
  );
  const slider = screen.getByRole(/slider/);
  fireEvent.change(slider, { target: { value: '2' } });
  expect(slider).toHaveValue('2');
});
test('supports keyboard mouse up and down', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Slider, { maxValue: 5 }, 'Example')
    )
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
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Slider, { maxValue: 5 }, 'Example')
    )
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
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Slider, { disabled: true }, 'Example')
    )
  );
  const inputElement = screen.getByRole(/slider/);
  expect(inputElement).toHaveAttribute(`disabled`);
});
test('supports defaultValue (uncontrolled)', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Slider, { defaultValue: [25] }, 'Example')
    )
  );
  const slider = screen.getByRole(/slider/);
  expect(slider).toHaveValue('25');
});
test('supports changing value (controlled)', () => {
  const TestComponent = () => {
    const [value, setValue] = React.useState([75]);
    return React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Slider,
        { value: value, onChange: setValue },
        'Example'
      )
    );
  };
  render(React.createElement(TestComponent, null));
  const slider = screen.getByRole(/slider/);
  expect(slider).toHaveValue('75');
  fireEvent.change(slider, { target: { value: '25' } });
  expect(slider).toHaveValue('25');
});
test('supports formatOptions prop', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(
        Slider,
        { formatOptions: { style: 'percent' }, step: 0.01, maxValue: 1 },
        'Percent'
      )
    )
  );
  expect(screen.getByRole(/status/)).toContainHTML('0%');
  const slider = screen.getByRole(/slider/);
  fireEvent.change(slider, { target: { value: '0.5' } });
  expect(slider).toHaveValue('0.5');
  expect(screen.getByRole(/status/)).toContainHTML('50%');
});
test('takes full width by default', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Slider, null, 'Percent')
    )
  );
  const container = screen.getByRole('group');
  expect(container).toHaveStyle('width: 100%');
});
test('allows to set width via prop', () => {
  render(
    React.createElement(
      ThemeProvider,
      { theme: theme },
      React.createElement(Slider, { width: 'large' }, 'Percent')
    )
  );
  const container = screen.getByRole('group');
  expect(container).toHaveStyle(`width: ${theme.sizes.large}px`);
});
//# sourceMappingURL=Slider.test.js.map
