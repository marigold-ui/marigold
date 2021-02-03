import React from 'react';
import { render, screen } from '@testing-library/react';

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
  text: {
    body: {
      fontSize: 1,
      color: 'black',
    },
    heading: {
      fontSize: 3,
      color: 'primary',
    },
  },
  buttons: {
    primary: {
      color: 'white',
      bg: 'blue',
    },
    secondary: {
      color: 'black',
      bg: 'white',
    },
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
