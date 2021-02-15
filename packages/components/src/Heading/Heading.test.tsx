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
      <Heading title="default" variant="h3">
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

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Heading className="custom-class-name" title="heading">
        Default
      </Heading>
    </MarigoldProvider>
  );
  const heading = screen.getByTitle(/heading/);

  expect(heading.className).toMatch('custom-class-name');
});
