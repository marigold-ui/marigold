import React from 'react';
import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider } from '@marigold/system';

import { Card } from './Card';
import { Header } from '../Header';
import { Body } from '../Body';
import { Footer } from '../Footer';

import { cva } from 'class-variance-authority';

const theme: Theme = {
  name: 'test',
  components: {
    Header: cva(),
    Footer: cva(),
    Body: cva(),
    Card: cva('p-1 border-solid border border-gray-700', {
      variants: {
        variant: {
          yellow: 'bg-yellow-300',
        },
        size: {
          medium: 'p-4',
        },
      },
    }),
  },
};

test('renders as a "div" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" />
    </ThemeProvider>
  );

  const card = screen.getByTestId('card');
  expect(card instanceof HTMLDivElement).toBeTruthy();
});

test('uses base styling form "Card" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" />
    </ThemeProvider>
  );
  const card = screen.getByTestId('card');
  expect(card).toMatchInlineSnapshot(`
    <div
      class="flex flex-col p-1 border-solid border border-gray-700 gap-0"
      data-testid="card"
    />
  `);
});

test('accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const card = screen.getByTestId('card');
  expect(card).toHaveClass(`bg-yellow-300 p-4`);
});

test('supports padding as style prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="p" p={3} />
      <Card data-testid="pxy" px={2} py={1} />
      <Card data-testid="ptblr" pt={3} pb={2} pl={3} pr={3} />
    </ThemeProvider>
  );

  const p = screen.getByTestId('p');
  expect(p).toHaveClass(`p-3`);

  const pxy = screen.getByTestId('pxy');
  expect(pxy).toHaveClass(`px-2`);
  expect(pxy).toHaveClass(`py-1`);

  const ptblr = screen.getByTestId('ptblr');
  expect(ptblr).toHaveClass(`pt-3`);
  expect(ptblr).toHaveClass(`pb-2`);
  expect(ptblr).toHaveClass(`pr-3`);
  expect(ptblr).toHaveClass(`pl-3`);
});

test('padding props override variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" size="medium" py={2} />
    </ThemeProvider>
  );

  const card = screen.getByTestId('card');
  expect(card).toMatchInlineSnapshot(`
    <div
      class="flex flex-col border-solid border border-gray-700 p-4 gap-0 py-2"
      data-testid="card"
    />
  `);
});

test('has no default spacing', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card">
        <Header>Header</Header>
        <Body>This is the body</Body>
        <Footer>Footer!</Footer>
      </Card>
    </ThemeProvider>
  );

  const card = screen.getByTestId('card');
  expect(card).toHaveClass(`gap-0`);
});

test('allows to set spacing between children', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" space={5}>
        <Header>Header</Header>
        <Body>This is the body</Body>
        <Footer>Footer!</Footer>
      </Card>
    </ThemeProvider>
  );

  const card = screen.getByTestId('card');
  expect(card).toHaveClass(`gap-5`);
});
