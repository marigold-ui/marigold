/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';
import { Input } from './Input';
import { Delete, Search } from '@marigold/icons';
import { Button } from '../Button';

import { tv } from 'tailwind-variants';

const theme: Theme = {
  name: 'test',
  components: {
    Input: tv({
      slots: {
        input: ['font-["Inter"]'],
        container: ['bg-blue-600'],
        icon: ['pl-4'],
      },
      variants: {
        variant: {
          robo: {
            input: ['font-["Roboto"]'],
          },
        },
      },
    }),
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input title="input" />
    </ThemeProvider>
  );

  const input = screen.getByTitle('input');

  expect(input).toHaveClass(`w-full border-0 outline-0 pl-4 font-["Inter"]`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Input data-testid="input" variant="robo" title="input" />
    </ThemeProvider>
  );
  const input = screen.getByTitle('input');

  expect(input).toHaveClass(`w-full border-0 outline-0 pl-4 font-["Roboto"]`);
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
