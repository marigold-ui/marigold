import React from 'react';
import { render } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Label } from './Label';

const theme = {
  form: {
    label: {
      fontFamily: 'Inter Regular',
      fontSize: 14,
      lineHeight: 24,
    },
    labels: {
      fontFamily: 'Arial Black',
      fontSize: 10,
    },
  },
};

test('support default label props and htmlFor', () => {
  const t1 = render(
    <MarigoldProvider theme={theme}>
      <Label htmlFor="labelId">I am a Label</Label>
    </MarigoldProvider>
  );
  let element1 = t1.getByText('I am a Label');

  expect(element1).toHaveStyle(`font-family: Inter Regular`);
  expect(element1).toHaveStyle(`font-size: 14px`);
  expect(element1).toHaveStyle(`line-height: 24`);
});

test('support variant, htmlFor and styling via css prop', () => {
  const t2 = render(
    <MarigoldProvider theme={theme}>
      <Label
        variant="labels"
        htmlFor="labelsId"
        css={{ border: '1px solid black' }}
      >
        I am a Label
      </Label>
    </MarigoldProvider>
  );
  let element2 = t2.getByText('I am a Label');

  expect(element2).toHaveStyle(`font-family: Arial Black`);
  expect(element2).toHaveStyle(`font-size: 10px`);
  expect(element2).toHaveStyle('border: 1px solid black');
});
