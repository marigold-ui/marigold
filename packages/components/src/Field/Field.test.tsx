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
  render(<Field htmlFor="myId" label="Name" />);
  const field = screen.getByText(/Name/);

  expect(field).toHaveAttribute('for');
});

test('supports required prop', () => {
  render(<Field htmlFor="myId" label="label" required />);
  const fieldLabel = screen.getByText(/label/);

  expect(fieldLabel.nextSibling).toBeDefined();
  expect(fieldLabel.nextSibling instanceof SVGElement).toBeTruthy();
});

test('supports error and errorMessage prop', () => {
  render(
    <Field htmlFor="myId" label="label" error errorMessage="Validation error" />
  );

  const errorMessage = screen.getByText(/Validation/);
  expect(errorMessage).toBeDefined();
});

test('supports disabled prop', () => {
  render(<Field htmlFor="myId" label="label" disabled />);
  const fieldLabel = screen.getByText(/label/);
  expect(fieldLabel.nextSibling).toHaveAttribute('disabled');
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
  const fieldLabel = getByText('label');
  expect(fieldLabel.nextSibling).toHaveStyle(`fontSize: 8px`);
});
