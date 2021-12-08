import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Slider } from './Slider';

const theme = {
  slider: {
    default: {
      fontFamily: 'Oswald Regular',
    },
    special: {
      fontFamily: 'Inter',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider title="slider" />
    </ThemeProvider>
  );
  const slider = screen.getByTitle(/slider/);

  expect(slider).toHaveStyle(`font-family: Oswald Regular`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider variant="special" title="slider" />
    </ThemeProvider>
  );
  const slider = screen.getByTitle(/slider/);

  expect(slider).toHaveStyle(`font-family: Inter`);
});

test('renders <input> element by default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider title="slider" />
    </ThemeProvider>
  );
  const slider = screen.getByTitle(/slider/);

  expect(slider instanceof HTMLInputElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider className="custom-class-name" title="slider" />
    </ThemeProvider>
  );
  const slider = screen.getByTitle(/slider/);

  expect(slider.className).toMatch('custom-class-name');
});
