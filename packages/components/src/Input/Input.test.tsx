/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Input } from './Input';
import { Delete, Search } from '@marigold/icons';
import { Button } from '../Button';

const theme = {
  fonts: {
    body: 'Inter',
    forms: 'Roboto',
  },
  components: {
    Input: {
      base: {
        input: {
          fontFamily: 'body',
        },
      },
      variant: {
        robo: {
          input: {
            fontFamily: 'forms',
          },
        },
      },
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" />
    </ThemeProvider>
  );

  const input = screen.getByTitle('input');

  expect(input).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input" variant="robo" title="input" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveStyle(`font-family: Roboto`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input instanceof HTMLInputElement).toBeTruthy();
});

test('supports custom prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" placeholder="placeholder" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveAttribute('placeholder');
});

test('renders correct HTML Div parentelement', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input.parentElement instanceof HTMLDivElement).toBeTruthy();
});

test('renders icons within', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input
        title="input"
        icon={<Search />}
        action={
          <Button>
            <Delete />
          </Button>
        }
      />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  // eslint-disable-next-line testing-library/no-node-access
  expect(input.children).toBeTruthy();
});
