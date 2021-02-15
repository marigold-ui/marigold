import React from 'react';
import { render, screen } from '@testing-library/react';
import { MarigoldProvider } from '@marigold/system';
import { Field } from '@marigold/components';
import { useStyles } from '@marigold/system';

const theme = {
  form: {
    field: {
      padding: '4px',
    },
    inputField: {
      padding: '8px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Field htmlFor="myId" label="label" />
    </MarigoldProvider>
  );
  const field = screen.getByText(/label/);

  expect(field).toHaveStyle(`padding: 4px`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Field htmlFor="myId" label="inputField" variant="inputField" />
    </MarigoldProvider>
  );
  const inputField = screen.getByText(/inputField/);

  expect(inputField).toHaveStyle(`padding: 8px`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Field htmlFor="myId" label="label" />
    </MarigoldProvider>
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
    const classNames = useStyles({ fontSize: '8px' });
    return (
      <Field htmlFor="myId" label="label" className={classNames} {...props} />
    );
  };

  const { getByText } = render(
    <MarigoldProvider theme={theme}>
      <TestComponent />
    </MarigoldProvider>
  );
  const testelem = getByText('label');
  const field = getComputedStyle(testelem);

  expect(field.fontSize).toEqual('8px');
});
