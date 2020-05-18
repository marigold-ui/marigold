import React from 'react';
import { render } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Text } from './Text';

const theme = {
  text: {
    span: {
      fontFamily: 'Oswald Regular',
      fontSize: '1rem',
      lineHeight: 2,
      fontWeight: 300,
      color: '#ffe6f7',
      display: 'inline-block',
    },
    p: {
      fontFamily: 'Oswald Regular',
      fontSize: '1rem',
      lineHeight: 2,
      fontWeight: 300,
      color: '#ffe6f7',
      display: 'inline-block',
      margin: '0 0 8px',
      ':last-child': {
        marginBottom: '16px',
      },
    },
  },
};

test('support default themeSection and variant from a theme', () => {
  const t1 = render(
    <MarigoldProvider theme={theme}>
      <Text variant="p">I am a paragraph</Text>
    </MarigoldProvider>
  );
  let element1 = t1.getByText('I am a paragraph');

  expect(element1).toHaveStyle(`font-family: Oswald Regular`);
  expect(element1).toHaveStyle(`line-height: 2`);
  expect(element1).toHaveStyle(`font-weight: 300`);
  expect(element1).toHaveStyle(`color: #ffe6f7`);
});

test('support default span from a theme and styling via css prop', () => {
  const t2 = render(
    <MarigoldProvider theme={theme}>
      <Text css={{ border: '1px solid black' }}>I am text with border</Text>
    </MarigoldProvider>
  );
  let element2 = t2.getByText('I am text with border');

  expect(element2).toHaveStyle('border: 1px solid black');
});
