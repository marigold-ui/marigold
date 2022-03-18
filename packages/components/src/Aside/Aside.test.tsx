/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { ThemeProvider } from '@marigold/system';
import { render, screen } from '@testing-library/react';

import { Aside } from './Aside';

// Setup
// ---------------
const theme = {
  space: {
    none: 0,
    small: 2,
    medium: 4,
    large: 8,
  },
  sizes: {
    none: 0,
    small: 250,
    medium: 350,
    large: 500,
  },
};

test('default spacing is "none"', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside>
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );

  const aside = screen.getByText(/aside/).parentElement;
  expect(aside).toHaveStyle(`gap: 0`);
});

test('accepts and uses spacing from theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside space="medium">
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );
  const aside = screen.getByText(/aside/).parentElement;
  expect(aside).toHaveStyle(`gap: 4px`);
});

test('aside is on the left by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside>
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );

  const aside = screen.getByText(/aside/);
  const content = screen.getByText(/content/);
  expect(aside).toHaveStyle('flex-grow: 1');
  expect(content).toHaveStyle('flex-grow: 999');
});

test('allows to have aisde on the right', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside side="right">
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );

  const aside = screen.getByText(/aside/);
  const content = screen.getByText(/content/);
  expect(aside).toHaveStyle('flex-grow: 999');
  expect(content).toHaveStyle('flex-grow: 1');
});

test('inherits asides children with by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside>
        <div style={{ width: 50 }}>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );
  const aside = screen.getByText(/aside/);
  expect(aside).toHaveStyle(`width: 50px`);
  expect(aside).not.toHaveStyle(`flex-basis: 50px`);
});

test('allows to set a width for the aside element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside sideWidth="200px">
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );
  const aside = screen.getByText(/aside/);
  expect(aside).toHaveStyle(`flex-basis: 200px`);
});

test('streches content by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside>
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );
  const parent = screen.getByText(/content/).parentElement;
  expect(parent).not.toHaveStyle('align-items: flex-start');
});

test('allows to disabled content stretching', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside stretch={false}>
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );
  const parent = screen.getByText(/content/).parentElement;
  expect(parent).toHaveStyle('align-items: flex-start');
});

test('wraps at 50% by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside>
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );
  const content = screen.getByText(/content/);
  expect(content).toHaveStyle('minInlineSize: 50%');
});

test('allows to customize wrapping', () => {
  render(
    <ThemeProvider theme={theme}>
      <Aside wrap="24%">
        <div>aside</div>
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );
  const content = screen.getByText(/content/);
  expect(content).toHaveStyle('minInlineSize: 24%');
});

test('works with SSR', () => {
  // Fake emotions SSR rendering, where emotion inlines styles
  const SSRComponent = () => (
    <>
      <style data-testid="ssr-style">{`.ssr { background: 'hotpink' }`}</style>
      <span data-testid="actual-element">aside</span>
    </>
  );

  render(
    <ThemeProvider theme={theme}>
      <Aside space="medium" wrap="1%">
        <SSRComponent />
        <div>content</div>
      </Aside>
    </ThemeProvider>
  );

  const style = screen.getByTestId('ssr-style');
  const aside = screen.getByTestId('actual-element');

  // Yes, this tests implementation details, but I can not think of another way to test this
  expect(style).not.toHaveStyle('flex-grow: 1');
  expect(aside).toHaveStyle('flex-grow: 1');
});
