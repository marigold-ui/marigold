import React from 'react';
import { render } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Text } from './Text';

const theme = {
  breakpoints: [768, 1200],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 56, 64, 88],
  fonts: {
    body: 'Oswald Regular',
    heading: 'Inter Black',
  },
  fontSizes: ['0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '2rem'],
  fontWeights: {
    body: 300,
    heading: 800,
    bold: 600,
  },
  lineHeights: {
    body: 2,
    heading: 1.5,
  },
  colors: {
    text: '#ffe6f7',
    background: '#b30077',
    primary: '#00b300',
    secondary: '#e6b800',
    muted: '#99994d',
  },
  text: {
    body: {
      fontFamily: 'body',
      fontSize: 1,
      lineHeight: 'body',
      fontWeight: 'body',
      color: 'text',
    },
    heading: {
      fontFamily: 'heading',
      fontSize: 5,
      lineHeight: 'heading',
      fontWeight: 'heading',
      color: 'text',
    },
  },
};

test('support variants from a theme', () => {
  // Body Text
  const t1 = render(
    <MarigoldProvider theme={theme}>
      <Text as="p" variant="body">
        I am body Text
      </Text>
    </MarigoldProvider>
  );
  let element1 = t1.getByText('I am body Text');

  expect(element1).toHaveStyle(`font-family: Oswald Regular`);
  expect(element1).toHaveStyle(`font-weight: 300`);
  expect(element1).toHaveStyle(`color: #ffe6f7`);

  // Headline Text
  const t2 = render(
    <MarigoldProvider theme={theme}>
      <Text as="h1" variant="heading">
        I am headline Text
      </Text>
    </MarigoldProvider>
  );
  let element2 = t2.getByText('I am headline Text');

  expect(element2).toHaveStyle(`font-size: 2rem`);
  expect(element2).toHaveStyle(`font-family: Inter Black`);
  expect(element2).toHaveStyle(`line-height: 1.5`);
});
