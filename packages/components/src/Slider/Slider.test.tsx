import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Slider } from './Slider';

const theme = {
  fonts: {
    regular: 'Oswald Regular',
    body: 'Inter',
  },
  label: {
    above: {
      fontSize: '14px',
    },
    inline: {
      fontSize: '8px',
    },
  },
  slider: {
    __default: {
      p: '16px',
    },
    default: {
      p: '8px',
    },
  },
  sliderThumb: {
    __default: {
      width: 16,
    },
    default: {
      width: 8,
    },
  },
};

test('supports default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider label="slider" id="slider" title="sliderTitle" />
    </ThemeProvider>
  );
  const sliderLabel = screen.getAllByTitle(/sliderTitle/)[0];

  expect(sliderLabel.firstChild).toHaveStyle(`padding: 16px`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider
        label="slider"
        id="slider"
        title="sliderTitle"
        variant="default"
      />
    </ThemeProvider>
  );
  const sliderLabel = screen.getAllByTitle(/sliderTitle/)[0];

  expect(sliderLabel.firstChild).toHaveStyle(`padding: 8px`);
});

test('supports default thumbVariant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider label="slider" id="slider" title="sliderTitle" />
    </ThemeProvider>
  );
  const sliderLabel = screen.getAllByTitle(/sliderTitle/)[1].parentElement;

  expect(sliderLabel?.parentElement).toHaveStyle(`width: 16px`);
});

test('accepts other thumbVariant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider
        label="slider"
        id="slider"
        title="sliderTitle"
        thumbVariant="default"
      />
    </ThemeProvider>
  );
  const sliderLabel = screen.getAllByTitle(/sliderTitle/)[1].parentElement;

  expect(sliderLabel?.parentElement).toHaveStyle(`width: 8px`);
});

test('supports default labelVariant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider label="slider" id="slider" />
    </ThemeProvider>
  );
  const sliderLabel = screen.getByText(/slider/);

  expect(sliderLabel).toHaveStyle(`font-size: 14px`);
});

test('accepts other labelVariant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider label="slider" labelVariant="inline" id="slider" />
    </ThemeProvider>
  );
  const sliderLabel = screen.getByText(/slider/);

  expect(sliderLabel).toHaveStyle(`font-size: 8px`);
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Slider label="slider" id="slider" title="sliderTitle" disabled />
    </ThemeProvider>
  );
  const slider = screen.getAllByTitle(/sliderTitle/);

  expect(slider[0]).toHaveAttribute(`disabled`);
  expect(slider[0]).toHaveStyle(`cursor: not-allowed`);
});

test('moves slider thumb like accepted', () => {});
