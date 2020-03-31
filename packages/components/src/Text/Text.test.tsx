import React from 'react';
import { render } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Text } from './Text';

const theme = {
  text: {
    body: {
      fontFamily: 'Oswald Regular',
      fontSize: '1rem',
      lineHeight: 2,
      fontWeight: 300,
      color: '#ffe6f7',
    },
    heading: {
      fontFamily: 'Inter Black',
      fontSize: '2rem',
      lineHeight: 1.5,
      fontWeight: 800,
      color: '#ffe6f8',
    },
  },
};

test('support default themeSection and variant from a theme', () => {
  const t1 = render(
    <MarigoldProvider theme={theme}>
      <Text as="p" variant="body">
        I am body Text
      </Text>
    </MarigoldProvider>
  );
  let element1 = t1.getByText('I am body Text');

  expect(element1).toHaveStyle(`font-family: Oswald Regular`);
  expect(element1).toHaveStyle(`line-height: 2`);
  expect(element1).toHaveStyle(`font-weight: 300`);
  expect(element1).toHaveStyle(`color: #ffe6f7`);
});

test('support default as, heading variant from a theme and styling via css prop', () => {
  const t3 = render(
    <MarigoldProvider theme={theme}>
      <Text variant="heading" css={{ border: '1px solid black' }}>
        I am headline Text with border
      </Text>
    </MarigoldProvider>
  );
  let element3 = t3.getByText('I am headline Text with border');

  expect(element3).toHaveStyle(`font-family: Inter Black`);
  expect(element3).toHaveStyle('border: 1px solid black');
});
