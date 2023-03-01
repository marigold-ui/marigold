import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Input } from './_Input';
import { Delete, Search } from '@marigold/icons';

const theme = {
  fonts: {
    body: 'Inter',
    forms: 'Roboto',
  },
  components: {
    Input: {
      base: {
        fontFamily: 'body',
      },
      variant: {
        robo: {
          fontFamily: 'forms',
        },
      },
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input">
        <Input.Field title="input" />
      </Input>
    </ThemeProvider>
  );
  const input = screen.getByTestId('input');

  expect(input).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input" variant="robo">
        <Input.Field title="input" />
      </Input>
    </ThemeProvider>
  );
  const input = screen.getByTestId('input');

  expect(input).toHaveStyle(`font-family: Roboto`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input">
        <Input.Field title="input" />
      </Input>
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('supports custom prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input">
        <Input.Field title="input" placeholder="placeholder" />
      </Input>
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveAttribute('placeholder');
});

test('renders correct HTML Div element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input">
        <Input.Field title="input" />
      </Input>
    </ThemeProvider>
  );
  const input = screen.getByTestId('input');

  expect(input instanceof HTMLDivElement).toBeTruthy();
});

test('renders space prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input" space="4px">
        <Input.Field title="input" />
      </Input>
    </ThemeProvider>
  );
  const input = screen.getByTestId('input');

  expect(input).toHaveStyle('gap: 4px');
});

test('renders icons within', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input">
        <Search />
        <Input.Field title="input" />
        <Delete />
      </Input>
    </ThemeProvider>
  );
  const input = screen.getByTestId('input');

  // eslint-disable-next-line testing-library/no-node-access
  expect(input.children).toBeTruthy();
});
