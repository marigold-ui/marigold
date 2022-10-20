import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Label } from './Label';

const theme = {
  fonts: {
    body: 'Inter Regular',
    label: 'Oswald',
  },
  colors: {
    text: 'black',
  },
  components: {
    Label: {
      base: {
        fontFamily: 'body',
        color: 'text',
      },
    },
  },
};

test('uses base styles from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label>label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveStyle(`font-family: Inter Regular`);
  expect(label).toHaveStyle(`color: black`);
});

test('supports htmlFor prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label htmlFor="labelId">label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);

  expect(label).toHaveAttribute('for');
});

test('supports required prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label data-testid="label" required>
        label
      </Label>
    </ThemeProvider>
  );
  const label = screen.getByTestId(/label/);
  const requiredIcon = within(label).getByRole('presentation');
  expect(requiredIcon).toBeInTheDocument();
});

test('renders <label> element by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label>label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label instanceof HTMLLabelElement).toBeTruthy();
});

test('can render as <span>', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label as="span">label</Label>
    </ThemeProvider>
  );
  const label = screen.getByText(/label/);
  expect(label instanceof HTMLSpanElement).toBeTruthy();
});

test('allows to set side prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label side="left" data-testid="label">
        <input type="text" />
      </Label>
    </ThemeProvider>
  );

  const container = screen.getByTestId('label');
  expect(container).toHaveStyle('flexDirection: row');
  expect(container).toHaveStyle('alignItems: baseline');
});

test('allows to set side prop on the right', () => {
  render(
    <ThemeProvider theme={theme}>
      <Label side="right" data-testid="label">
        <input type="text" />
      </Label>
    </ThemeProvider>
  );

  const container = screen.getByTestId('label');
  expect(container).toHaveStyle('flexDirection: row-reverse');
  expect(container).toHaveStyle('alignItems: baseline');
});
