import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
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
    <MarigoldProvider theme={theme}>
      <Heading title="default">Default</Heading>
    </MarigoldProvider>
  );
  const heading = screen.getByTitle(/default/);

  expect(heading).toHaveStyle(`font-family: Inter`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Heading title="default" headingStyle="h3">
        Default
      </Heading>
    </MarigoldProvider>
  );
  const heading = screen.getByTitle(/default/);

  expect(heading).toHaveStyle(`font-family: Roboto`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Heading title="default">Default</Heading>
    </MarigoldProvider>
  );
  const heading = screen.getByTitle(/default/);

  expect(heading instanceof HTMLHeadingElement).toBeTruthy();
});

test('variant styles cannot be overridden with CSS prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Heading css={{ fontFamily: 'Arial' }} title="default">
        Default
      </Heading>
    </MarigoldProvider>
  );
  const heading = screen.getByTitle(/default/);

  expect(heading).not.toHaveStyle(`font-family: Arial`);
});
