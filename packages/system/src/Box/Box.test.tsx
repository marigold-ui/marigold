import React from 'react';
import { render } from '@testing-library/react';
import { ThemeContext } from '../emotion';
import { SpacingProps } from '../categories';

import { Box } from './Box';

// Setup
// ---------------
const theme = {
  colors: {
    primary: 'hotpink',
    black: '#111',
    white: '#000',
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
test('render a <div> by default', () => {
  const { getByText } = render(<Box>I am Box!</Box>);
  const result = getByText('I am Box!');

  expect(result instanceof HTMLDivElement).toBeTruthy();
});

test('change rendered element via "as" prop', () => {
  const { getByText } = render(<Box as="span">I am Box!</Box>);
  const result = getByText('I am Box!');

  expect(result instanceof HTMLSpanElement).toBeTruthy();
});

test('pass down all HTML attributes', () => {
  const { getByText } = render(
    <Box id="id" disabled>
      I am Box!
    </Box>
  );
  const result = getByText('I am Box!');

  expect(result.getAttribute('id')).toEqual('id');
  expect(result.getAttribute('disabled')).toMatch('');
});

test('apply some base css styling for normalization', () => {
  const { getByText } = render(<Box>I am Box!</Box>);
  const element = getByText('I am Box!');

  expect(element).toHaveStyle('box-sizing: border-box');
  expect(element).toHaveStyle('margin: 0');
  expect(element).toHaveStyle('min-width: 0');
});

test('forward ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <Box as="button" type="button" ref={ref}>
      I am a button!
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

  const { getByText } = render(<Button>I am Custom Button!</Button>);
  const element = getByText('I am Custom Button!');

  expect(element).toHaveStyle('border: 1px solid black');
});

test('use design tokens for scale values', () => {
  const { getByText } = render(<Box css={{ px: 1 }}>I am Component!</Box>);
  const element = getByText('I am Component!');

  expect(element).toHaveStyle(`padding-left: 4px`);
  expect(element).toHaveStyle(`padding-right: 4px`);
});

test('interpolate responsive values', () => {
  const { getByText } = render(<Box css={{ px: [1, 2] }}>I am Component!</Box>);
  const element = getByText('I am Component!');

  expect(element).toHaveStyle(`padding-left: 4px`);
  expect(element).toHaveStyle(`padding-right: 4px`);
});

test('support style props for spacing', () => {
  const Button: React.FC = ({ children }) => (
    <Box as="button" my="2">
      {children}
    </Box>
  );
  const { getByText } = render(<Button>I am Custom Button!</Button>);
  const element = getByText('I am Custom Button!');

  expect(element).toHaveStyle(`margin-top: 8px`);
  expect(element).toHaveStyle(`margin-bottom: 8px`);
});

test('support variants from theme', () => {
  const Text: React.FC<{ variant?: keyof typeof theme.text }> = ({
    variant = 'body',
    children,
  }) => (
    <Box themeSection="text" variant={variant}>
      {children}
    </Box>
  );

  // Body Text
  const t1 = render(
    <ThemeContext.Provider value={theme}>
      <Text>I am a body text!</Text>
    </ThemeContext.Provider>
  );
  let element = t1.getByText('I am a body text!');

  expect(element).toHaveStyle(`color: ${theme.colors.black}`);
  expect(element).toHaveStyle(`font-size: 14px`);

  // Heading Text
  const t2 = render(
    <ThemeContext.Provider value={theme}>
      <Text variant="heading">I am a heading text!</Text>
    </ThemeContext.Provider>
  );
  element = t2.getByText('I am a heading text!');

  expect(element).toHaveStyle(`color: ${theme.colors.primary}`);
  expect(element).toHaveStyle(`font-size: 20px`);
});

test('order of application: base < theme < style props', () => {
  const Button: React.FC<
    {
      variant?: keyof typeof theme.buttons;
    } & SpacingProps
  > = ({ children, variant = 'secondary', ...props }) => (
    <Box
      as="button"
      {...props}
      css={{
        display: 'inline-block',
        color: 'hotpink',
        border: 0,
        px: 2,
        py: 1,
      }}
      themeSection="buttons"
      variant={variant}
    >
      {children}
    </Box>
  );

  const t1 = render(
    <ThemeContext.Provider value={theme}>
      <Button>Click me!</Button>
    </ThemeContext.Provider>
  );
  let element = t1.getByText('Click me!');

  // Added via css prop
  expect(element).toHaveStyle('display: inline-block');
  expect(element).toHaveStyle('border: 0');
  expect(element).toHaveStyle('padding-left: 8px');
  expect(element).toHaveStyle('padding-right: 8px');
  expect(element).toHaveStyle('padding-top: 4px');
  expect(element).toHaveStyle('padding-bottom: 4px');

  // Added via variant
  expect(element).toHaveStyle(`color: ${theme.colors.black}`); // overrides "hotpink"
  expect(element).toHaveStyle(`background-color: ${theme.colors.white}`);

  t1.rerender(
    <ThemeContext.Provider value={theme}>
      <Button px="3" py="4">
        Click me!
      </Button>
    </ThemeContext.Provider>
  );
  element = t1.getByText('Click me!');

  expect(element).toHaveStyle('padding: 32px 16px 32px 16px');
  expect(element).not.toHaveStyle('padding-left: 8px');
  expect(element).not.toHaveStyle('padding-right: 8px');
  expect(element).not.toHaveStyle('padding-top: 4px');
  expect(element).not.toHaveStyle('padding-bottom: 4px');
});
