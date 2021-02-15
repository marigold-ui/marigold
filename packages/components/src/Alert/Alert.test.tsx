import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStyles, MarigoldProvider } from '@marigold/system';
import { Alert } from '@marigold/components';

const theme = {
  alerts: {
    info: {
      alignItems: 'center',
    },
    danger: {
      alignItems: 'right',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Alert title="default">Default</Alert>
    </MarigoldProvider>
  );
  const alert = screen.getByTitle(/default/);

  expect(alert).toHaveStyle(`align-items: center`);
});

test('accepts other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Alert title="danger" variant="danger">
        Danger
      </Alert>
    </MarigoldProvider>
  );
  const alert = screen.getByTitle(/danger/);

  expect(alert).toHaveStyle(`align-items: right`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Alert title="default">Default</Alert>
    </MarigoldProvider>
  );
  const alert = screen.getByTitle(/default/);

  expect(alert instanceof HTMLDivElement).toBeTruthy();
});

test('accepts custom styles prop className', () => {
  const TestComponent: React.FC = ({ children, ...props }) => {
    const classNames = useStyles({ fontSize: '8px' });
    return (
      <Alert className={classNames} {...props}>
        {children}
      </Alert>
    );
  };

  const { getByText } = render(
    <MarigoldProvider theme={theme}>
      <TestComponent>text</TestComponent>
    </MarigoldProvider>
  );
  const testelem = getByText('text');
  const text = getComputedStyle(testelem);

  expect(text.fontSize).toEqual('8px');
});
