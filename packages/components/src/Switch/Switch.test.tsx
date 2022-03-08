import React, { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Switch } from './Switch';
import userEvent from '@testing-library/user-event';

const theme = {
  fonts: {
    regular: 'Oswald Regular',
    body: 'Inter',
  },
  switch: {
    __default: {
      fill: 'blue',
    },
    custom: {
      fill: 'green',
    },
    ':checked': {
      fill: 'orange',
    },
    ':disabled': {
      fill: 'gray',
    },
  },
};

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Switch>Label</Switch>
    </ThemeProvider>
  );
  const svg = screen.getByText(/Label/).lastChild!;
  expect(svg.firstChild).toHaveStyle(`fill: blue`);
});

test('supports other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Switch variant="custom">Label</Switch>
    </ThemeProvider>
  );
  const svg = screen.getByText(/Label/).lastChild!;
  expect(svg.firstChild).toHaveStyle(`fill: green`);
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Switch disabled>Label</Switch>
    </ThemeProvider>
  );
  const switchInput = screen.getByRole(/switch/);
  const svg = screen.getByText(/Label/).lastChild!;

  expect(switchInput).toHaveAttribute('disabled');
  expect(svg.firstChild).toHaveStyle(`fill: gray`);
  expect(svg).toHaveStyle(`cursor: not-allowed`);
});

test('renders hidden <input> element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Switch>Label</Switch>
    </ThemeProvider>
  );
  const switchComp = screen.getByRole(/switch/);
  expect(switchComp instanceof HTMLInputElement).toBeTruthy();
});

test('toggle switch per click', () => {
  render(
    <ThemeProvider theme={theme}>
      <Switch>Label</Switch>
    </ThemeProvider>
  );
  const switchInput = screen.getByRole(/switch/);
  const svg = screen.getByText(/Label/).lastChild!;
  fireEvent.click(switchInput);
  expect(svg.firstChild).toHaveStyle(`fill: orange`);
  expect(switchInput).toHaveAttribute('aria-checked', 'true');

  fireEvent.click(switchInput);
  expect(svg.firstChild).toHaveStyle(`fill: blue`);
  expect(switchInput).toHaveAttribute('aria-checked', 'false');
});

test('focus element and toggle switch per keyboard space', () => {
  render(
    <ThemeProvider theme={theme}>
      <Switch>Label</Switch>
    </ThemeProvider>
  );
  const switchInput = screen.getByRole(/switch/);
  const svg = screen.getByText(/Label/).lastChild!;
  switchInput.focus();
  userEvent.keyboard('{space}');
  expect(svg.firstChild).toHaveStyle(`fill: orange`);
  expect(switchInput).toHaveAttribute('aria-checked', 'true');

  userEvent.keyboard('{space}');
  expect(svg.firstChild).toHaveStyle(`fill: blue`);
  expect(switchInput).toHaveAttribute('aria-checked', 'false');
});

test('supports controlled component usage', () => {
  const TestComponent = () => {
    const [selected, setSelected] = useState(false);
    return (
      <ThemeProvider theme={theme}>
        <Switch isSelected={selected} onChange={() => setSelected(!selected)}>
          Label
        </Switch>
      </ThemeProvider>
    );
  };
  render(<TestComponent />);

  const switchInput = screen.getByRole(/switch/);
  fireEvent.click(switchInput);
  expect(switchInput).toHaveAttribute('aria-checked', 'true');
  fireEvent.click(switchInput);
  expect(switchInput).toHaveAttribute('aria-checked', 'false');
});
