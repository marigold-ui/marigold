import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Heading } from '@marigold/components';

const theme = {
  text: {
    h2: {
      fontFamily: 'Inter',
    },
    h3: {
      fontFamily: 'Roboto',
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

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Heading title="default">Default</Heading>
    </ThemeProvider>
  );
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
