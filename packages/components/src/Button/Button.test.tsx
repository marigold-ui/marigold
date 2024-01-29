import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Facebook } from '@marigold/icons';
import { Theme, ThemeProvider, cva } from '@marigold/system';

import { Button } from './Button';

const theme: Theme = {
  name: 'test',
  components: {
    Button: cva('align-center flex disabled:bg-gray-600', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
        },
        size: {
          small: 'size-10',
          large: 'w-50 h-50',
        },
      },
    }),
  },
};

test('sets some base styles', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveClass('flex align-center');
});

test('supports base styling classes', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toMatchInlineSnapshot(`
<button
  class="items-center justify-center gap-[0.5ch] align-center flex disabled:bg-gray-600"
  data-rac=""
  type="button"
>
  button
</button>
`);
});

test('supports default size', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button size="small">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveClass(`w-10 h-10`);
});

test('accepts other variants', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button variant="secondary">button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button).toHaveClass('text-secondary-800');
  expect(button).toMatchInlineSnapshot(`
<button
  class="items-center justify-center gap-[0.5ch] align-center flex disabled:bg-gray-600 text-secondary-800"
  data-rac=""
  type="button"
>
  button
</button>
`);
});

test('renders <button> element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
});

test('add icon in button works as expected', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button>
        <Facebook size={30} data-testid="facebook" />
        iconbutton
      </Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/iconbutton/);
  const icon = screen.getByTestId(/facebook/);

  expect(button instanceof HTMLButtonElement).toBeTruthy();
  expect(button).toHaveClass('flex align-center');
  expect(icon).toHaveAttribute('width', '30px');
});

test('supports onPress', () => {
  const onPress = jest.fn();
  render(
    <ThemeProvider theme={theme}>
      <Button onPress={onPress} data-testid="button">
        Some Button
      </Button>
    </ThemeProvider>
  );

  const button = screen.getByTestId('button');
  fireEvent.click(button);

  expect(onPress).toHaveBeenCalled();
});

test('forwards ref', () => {
  const ref = React.createRef<HTMLButtonElement>();
  render(
    <ThemeProvider theme={theme}>
      <Button ref={ref}>button</Button>
    </ThemeProvider>
  );

  expect(ref.current instanceof HTMLButtonElement).toBeTruthy();
});

test('supports disabled prop', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button disabled>button</Button>
    </ThemeProvider>
  );
  const button = screen.getByText(/button/);
  expect(button).toHaveAttribute('disabled');
  expect(button).toHaveClass('disabled:bg-gray-600');
});

test('allows to take full width', () => {
  render(
    <ThemeProvider theme={theme}>
      <Button fullWidth>button</Button>
    </ThemeProvider>
  );

  const button = screen.getByText(/button/);
  expect(button).toHaveClass('w-full');
});
