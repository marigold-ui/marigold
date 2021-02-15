import React from 'react';
import { render, screen } from '@testing-library/react';

import { MarigoldProvider } from '@marigold/system';
import { Box } from './Box';

// Setup
// ---------------
const theme = {
  colors: {
    primary: 'hotpink',
    black: '#000',
    white: '#FFF',
    blue: '#2980b9',
  },
  space: [0, 2, 4, 8],
  sizes: [0, 8, 16, 32],
  borders: ['none', '1px solid black'],
  borderRadius: [0, 2, 4],
  opacities: [0, 0.5, 1],
  transitions: ['none', '1s opacity'],
  shadows: ['none', '3px 3px 5px 6px #ccc', 'inset 0 0 10px #000000'],
  variant: {
    color: 'primary',
    p: 2,
  },
};

// Tests
// ---------------
test('renders a <div> by default', () => {
  render(<Box>box</Box>);
  const box = screen.getByText(/box/);

  expect(box instanceof HTMLDivElement).toBeTruthy();
});

test('changes rendered element via as prop', () => {
  render(<Box as="span">box</Box>);
  const box = screen.getByText(/box/);

  expect(box instanceof HTMLSpanElement).toBeTruthy();
});

test('passes down HTML attributes', () => {
  render(
    <Box className="my-custom-class" id="box-id" disabled>
      box
    </Box>
  );
  const box = screen.getByText(/box/);

  expect(box.getAttribute('id')).toEqual('box-id');
  expect(box.getAttribute('disabled')).toMatch('');
  expect(box.getAttribute('class')).toMatch('my-custom-class');
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Box as="button" ref={ref}>
      button
    </Box>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test.each([
  [{ display: 'flex' }, 'display: flex'],
  [{ height: 1 }, 'height: 8px'],
  [{ width: 2 }, 'width: 16px'],
  [{ minWidth: 1 }, 'min-width: 8px'],
  [{ maxWidth: 3 }, 'max-width: 32px'],
  [{ position: 'absolute' }, 'position: absolute'],
  [{ top: 0 }, 'top: 0px'],
  [{ bottom: 1 }, 'bottom: 2px'],
  [{ right: 3 }, 'right: 8px'],
  [{ left: 2 }, 'left: 4px'],
  [{ zIndex: 1000 }, 'z-index: 1000'],
  [{ p: 1 }, 'padding: 2px'],
  [{ px: 1 }, 'padding-left: 2px', 'padding-right: 2px'],
  [{ py: 2 }, 'padding-top: 4px', 'padding-bottom: 4px'],
  [{ pt: 1 }, 'padding-top: 2px'],
  [{ pb: 1 }, 'padding-bottom: 2px'],
  [{ pl: 1 }, 'padding-left: 2px'],
  [{ pr: 1 }, 'padding-right: 2px'],
  [{ m: 1 }, 'margin: 2px'],
  [{ mx: 1 }, 'margin-left: 2px', 'margin-right: 2px'],
  [{ my: 2 }, 'margin-top: 4px', 'margin-bottom: 4px'],
  [{ mt: 1 }, 'margin-top: 2px'],
  [{ mb: 1 }, 'margin-bottom: 2px'],
  [{ ml: 1 }, 'margin-left: 2px'],
  [{ mr: 1 }, 'margin-right: 2px'],
  [{ flexDirection: 'column' }, 'flex-direction: column'],
  [{ flexWrap: 'wrap' }, 'flex-wrap: wrap'],
  [{ flexShrink: 5 }, 'flex-shrink: 5'],
  [{ flexGrow: 1 }, 'flex-grow: 1'],
  [{ alignItems: 'baseline' }, 'align-items: baseline'],
  [{ justifyContent: 'space-between' }, 'justify-content: space-between'],
  [{ bg: 'primary' }, 'background-color: hotpink'],
  [{ border: 1 }, 'border: 1px solid black'],
  [{ borderRadius: 2 }, 'border-radius: 4px'],
  [{ boxShadow: 1 }, 'box-shadow: 3px 3px 5px 6px #ccc'],
  [{ opacity: 1 }, 'opacity: 0.5'],
  [{ overflow: 'hidden' }, 'overflow: hidden'],
  [{ transition: 1 }, 'transition: 1s opacity'],
])('test %o', (...args) => {
  const props = args.shift();

  render(
    <MarigoldProvider theme={theme}>
      <Box {...props}>What's in the box!</Box>
    </MarigoldProvider>
  );

  const box = screen.getByText(`What's in the box!`);
  args.forEach((style: any) => {
    expect(box).toHaveStyle(style);
  });
});

test('support variants', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Box variant="variant">What's in the box!</Box>
    </MarigoldProvider>
  );

  const box = screen.getByText(`What's in the box!`);
  expect(box).toHaveStyle('color: hotpink');
  expect(box).toHaveStyle('padding: 4px');
});
