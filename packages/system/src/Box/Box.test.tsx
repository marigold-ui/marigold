import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeContext } from '../emotion';
import { SpacingProps } from '../categories';

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

test('passes down all HTML attributes', () => {
  render(
    <Box id="box-id" disabled>
      box
    </Box>
  );
  const box = screen.getByText(/box/);

  expect(box.getAttribute('id')).toEqual('box-id');
  expect(box.getAttribute('disabled')).toMatch('');
});

test('apply some base css styling for normalization', () => {
  render(<Box>box</Box>);
  const box = screen.getByText(/box/);

  expect(box).toHaveStyle(`box-sizing: border-box`);
});

test('forward ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Box as="button" ref={ref}>
      button
    </Box>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('apply default styling via css prop', () => {
  const Button: React.FC = ({ children }) => (
    <Box as="button" css={{ border: '1px solid black' }}>
      {children}
    </Box>
  );
  render(<Button>button</Button>);
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`border: 1px solid black`);
});

test('use design tokens for scale values', () => {
  render(<Box css={{ px: 1 }}>box</Box>);
  const box = screen.getByText(/box/);

  expect(box).toHaveStyle(`padding-left: 4px`);
  expect(box).toHaveStyle(`padding-right: 4px`);
});

test('interpolate responsive values', () => {
  render(<Box css={{ px: [1, 2] }}>box</Box>);
  const box = screen.getByText(/box/);

  expect(box).toHaveStyle(`padding-left: 4px`);
  expect(box).toHaveStyle(`padding-right: 4px`);
});

test('support style props for spacing', () => {
  const Button: React.FC = ({ children }) => (
    <Box as="button" my="2">
      {children}
    </Box>
  );
  render(<Button>button</Button>);
  const button = screen.getByText(/button/);

  expect(button).toHaveStyle(`margin-top: 8px`);
  expect(button).toHaveStyle(`margin-bottom: 8px`);
});

test('supports variants from theme', () => {
  const Text: React.FC<{ variant?: keyof typeof theme.text }> = ({
    variant = 'body',
    children,
  }) => (
    <Box themeSection="text" variant={variant}>
      {children}
    </Box>
  );

  // Body Text
  render(
    <ThemeContext.Provider value={theme}>
      <Text>body</Text>
    </ThemeContext.Provider>
  );
  const body = screen.getByText(/body/);

  expect(body).toHaveStyle(`font-size: 14px`);
  expect(body).toHaveStyle(`color: ${theme.colors.black}`);

  // Heading Text
  render(
    <ThemeContext.Provider value={theme}>
      <Text variant="heading">heading</Text>
    </ThemeContext.Provider>
  );
  const heading = screen.getByText(/heading/);

  expect(heading).toHaveStyle(`font-size: 20px`);
  expect(heading).toHaveStyle(`color: ${theme.colors.primary}`);
});

test('order of application: base < theme < style props', () => {
  const Button: React.FC<
    {
      variant?: keyof typeof theme.buttons;
    } & SpacingProps
  > = ({ children, variant = 'secondary', ...props }) => (
    <Box
      {...props}
      as="button"
      themeSection="buttons"
      variant={variant}
      css={{
        display: 'inline-block',
        color: 'hotpink',
        border: 0,
        px: 2,
        py: 1,
      }}
    >
      {children}
    </Box>
  );

  render(
    <ThemeContext.Provider value={theme}>
      <Button>button</Button>
    </ThemeContext.Provider>
  );
  const button = screen.getByText(/button/);

  // Added via css prop
  expect(button).toHaveStyle(`display: inline-block`);
  expect(button).toHaveStyle(`border: 0`);
  expect(button).toHaveStyle(`padding-left: 8px`);
  expect(button).toHaveStyle(`padding-right: 8px`);
  expect(button).toHaveStyle(`padding-top: 4px`);
  expect(button).toHaveStyle(`padding-bottom: 4px`);

  // Added via variant
  expect(button).toHaveStyle(`color: ${theme.colors.black}`); // overrides "hotpink"
  expect(button).toHaveStyle(`background-color: ${theme.colors.white}`);

  render(
    <ThemeContext.Provider value={theme}>
      <Button px="3" py="4">
        variantbutton
      </Button>
    </ThemeContext.Provider>
  );
  const variantbutton = screen.getByText(/variantbutton/);

  expect(variantbutton).toHaveStyle(`padding: 32px 16px 32px 16px`);
  expect(variantbutton).not.toHaveStyle(`padding-left: 8px`);
  expect(variantbutton).not.toHaveStyle(`padding-right: 8px`);
  expect(variantbutton).not.toHaveStyle(`padding-top: 4px`);
  expect(variantbutton).not.toHaveStyle(`padding-bottom: 4px`);
});
