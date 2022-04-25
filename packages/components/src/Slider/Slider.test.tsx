import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Slider } from './Slider';

const theme = {
  colors: {
    primary: 'orange',
    secondary: 'blue',
    disabled: 'gray',
  },
  ...{
    components: {
      Slider: {
        base: {
          track: {
            color: 'green',
            '&:focus': {
              bg: 'primary',
            },
            '&:checked': {
              bg: 'secondary',
            },
            '&:disabled': {
              bg: 'disabled',
            },
          },
          thumb: {
            color: 'green',
            '&:focus': {
              bg: 'primary',
            },
            '&:disabled': {
              bg: 'disabled',
            },
          },
        },
      },
    },
  },
};

// test('supports theme with parts', () => {
//   render(
//     <ThemeProvider theme={theme}>
//       <Slider aria-label="slider" />
//     </ThemeProvider>
//   );
//   const sliderLabel = screen.getAllByLabelText(/sliderTitle/)[0];

//   expect(sliderLabel.firstChild).toHaveStyle(`padding: 16px`);
// });

// test('supports disabled prop', () => {
//   render(
//     <ThemeProvider theme={theme}>
//       <Slider label="slider" id="slider" title="sliderTitle" disabled />
//     </ThemeProvider>
//   );
//   const slider = screen.getAllByTitle(/sliderTitle/);

//   expect(slider[0]).toHaveAttribute(`disabled`);
//   expect(slider[0]).toHaveStyle(`cursor: not-allowed`);
// });
