import { render, screen } from '@testing-library/react';
import { Theme, ThemeProvider, cva } from '@marigold/system';
import { Body } from '../Body';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Card } from './Card';

const theme: Theme = {
  name: 'test',
  components: {
    Header: cva(),
    Footer: cva(),
    Body: cva(),
    Card: cva('border border-solid border-gray-700 p-1', {
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
  expect(card.className).toMatchInlineSnapshot(
    `"flex flex-col border border-solid border-gray-700 p-1 gap-0"`
  );
});

test('accepts a variant and size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Card data-testid="card" variant="yellow" size="medium" />
    </ThemeProvider>
  );
  const card = screen.getByTestId('card');
  expect(card.className).toMatchInlineSnapshot(
    `"flex flex-col border border-solid border-gray-700 bg-yellow-300 p-4 gap-0"`
  );
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
  expect(card.className).toMatchInlineSnapshot(
    `"flex flex-col border border-solid border-gray-700 p-4 gap-0 py-2"`
  );
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
