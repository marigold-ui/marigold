import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Field } from './Field';
import { useStyles } from '@marigold/system';

const theme = {
  field: {
    default: {
      padding: '4px',
    },
    inputField: {
      padding: '8px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <ThemeProvider theme={theme}>
      <Field htmlFor="myId" label="label" />
    </ThemeProvider>
  );
  const field = screen.getByText(/label/);

  expect(field).toHaveStyle(`padding: 4px`);
});

test('accepts other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Field htmlFor="myId" label="inputField" variant="inputField" />
    </ThemeProvider>
  );
  const inputField = screen.getByText(/inputField/);

  expect(inputField).toHaveStyle(`padding: 8px`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Field htmlFor="myId" label="label" />
    </ThemeProvider>
  );
  const field = screen.getByText(/label/);

  expect(field instanceof HTMLLabelElement).toBeTruthy();
});

test('supports label prop', () => {
  render(<Field htmlFor="myId" label="Name" />);
  const field = screen.getByText(/Name/);

  expect(field).toBeDefined();
});

test('supports htmlFor prop', () => {
  render(<Field htmlFor="myId" label="Name" error="Validation error" />);
  const field = screen.getByText(/Name/);

  expect(field).toHaveAttribute('for');
});

test('supports error prop', () => {
  render(<Field htmlFor="myId" label="label" error="Validation error" />);
  const field = screen.getByText(/Validation/);

  expect(field).toBeDefined();
});

test('accepts custom styles prop className', () => {
  const TestComponent: React.FC = ({ children, ...props }) => {
    const classNames = useStyles({ css: { fontSize: '8px' } });
    return (
      <Field htmlFor="myId" label="label" className={classNames} {...props} />
    );
  };

  const { getByText } = render(
    <ThemeProvider theme={theme}>
      <TestComponent />
    </ThemeProvider>
  );
  const testelem = getByText('label');
  const field = getComputedStyle(testelem);

  expect(field.fontSize).toEqual('8px');
});
