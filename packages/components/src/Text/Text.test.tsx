import React from 'react';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';
import { ThemeProvider, useStyles } from '@marigold/system';

const theme = {
  text: {
    body: {
      fontFamily: 'Oswald Regular',
    },
    heading: {
      fontFamily: 'Inter',
    },
  },
};

test('accepts default variant', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Oswald Regular`);
});

test('accepts default <span>', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text>text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLSpanElement).toBeTruthy();
});

test('accepts as <p>', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text as="p">text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text instanceof HTMLParagraphElement).toBeTruthy();
});

test('variant works', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="body">text</Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`font-family: Oswald Regular`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Text variant="heading" textColor="#000">
        text
      </Text>
    </ThemeProvider>
  );
  const text = screen.getByText(/text/);

  expect(text).toHaveStyle(`color: rgb(0,0,0)`);
  expect(text).toHaveStyle(`font-family: Inter`);
});

test('accepts custom styles prop className', () => {
  const TestTextComponent: React.FC = ({ children, ...props }) => {
    const classNames = useStyles({ fontSize: '8px' });
    return (
      <Text className={classNames} {...props}>
        {children}
      </Text>
    );
  };

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <TestTextComponent>text</TestTextComponent>
    </ThemeProvider>
  );
  const testelem = getByText('text');
  const text = getComputedStyle(testelem);

  expect(text.fontSize).toEqual('8px');
});
