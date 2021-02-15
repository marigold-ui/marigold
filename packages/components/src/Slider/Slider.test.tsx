import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Slider } from '@marigold/components';

const theme = {
  form: {
    slider: {
      fontFamily: 'Oswald Regular',
    },
    range: {
      fontFamily: 'Inter',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Slider title="slider" />
    </MarigoldProvider>
  );
  const slider = screen.getByTitle(/slider/);

  expect(slider).toHaveStyle(`font-family: Oswald Regular`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Slider variant="range" title="slider" />
    </MarigoldProvider>
  );
  const slider = screen.getByTitle(/slider/);

  expect(slider).toHaveStyle(`font-family: Inter`);
});

test('renders <input> element by default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Slider title="slider" />
    </MarigoldProvider>
  );
  const slider = screen.getByTitle(/slider/);

  expect(slider instanceof HTMLInputElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Slider className="custom-class-name" title="slider" />
    </MarigoldProvider>
  );
  const slider = screen.getByTitle(/slider/);

  expect(slider.className).toMatch('custom-class-name');
});
