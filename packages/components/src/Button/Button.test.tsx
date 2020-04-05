import React from 'react';
import { render } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Button } from './Button';

const theme = {
  button: {
    primary: {
      fontFamily: 'Inter',
      fontSize: '16px',
      heigth: '48px',
      lineHeight: '46px',
      border: '2px',
      fontWeight: 400,
      color: '#ffffff',
      bg: '#fa8005',
      paddingY: '32px',
    },
  },
};

test('support default themeSection and custom variant from a theme', () => {
  const t1 = render(
    <MarigoldProvider theme={theme}>
      <Button variant="primary">I am a Button</Button>
    </MarigoldProvider>
  );
  let element1 = t1.getByText('I am a Button');

  expect(element1).toHaveStyle(`font-family: Inter`);
  expect(element1).toHaveStyle(`font-size: 16px`);
  expect(element1).toHaveStyle(`color: #ffffff`);
  expect(element1).toHaveStyle(`border: 2px`);
});

test('support default themeSection, variant and custom styling via css prop', () => {
  const t2 = render(
    <MarigoldProvider theme={theme}>
      <Button css={{ color: '#ffffff', border: '2px' }}>I am a Button</Button>
    </MarigoldProvider>
  );
  let element2 = t2.getByText('I am a Button');

  expect(element2).toHaveStyle(`color: rgb(255, 255, 255)`);
  expect(element2).toHaveStyle(`border: 2px`);
});
