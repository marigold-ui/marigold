import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Heading } from './Heading';

const theme = {
  fonts: {
    body: 'Roboto',
    headings: 'Inter',
  },
  text: {
    h2: {
      fontFamily: 'headings',
    },
    h3: {
      fontFamily: 'body',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Heading title="default">Default</Heading>
    </ThemeProvider>
  );
  const heading = screen.getByTitle(/default/);

  expect(heading).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Heading title="default" variant="h3">
        Default
      </Heading>
    </ThemeProvider>
  );
  const heading = screen.getByTitle(/default/);

  expect(heading).toHaveStyle(`font-family: Roboto`);
});

test('supports default as prop', () => {
  render(<Heading title="default">Default</Heading>);
  const heading = screen.getByTitle(/default/);

  expect(heading.tagName).toEqual('H2');
});

test('accepts other as prop than default', () => {
  render(
    <Heading as="h3" title="default" variant="h3">
      Default
    </Heading>
  );
  const heading = screen.getByTitle(/default/);

  expect(heading.tagName).toEqual('H3');
});

test('renders correct HTML element', () => {
  render(<Heading title="default">Default</Heading>);
  const heading = screen.getByTitle(/default/);

  expect(heading instanceof HTMLHeadingElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Heading className="custom-class-name" title="heading">
        Default
      </Heading>
    </ThemeProvider>
  );
  const heading = screen.getByTitle(/heading/);

  expect(heading.className).toMatch('custom-class-name');
});
