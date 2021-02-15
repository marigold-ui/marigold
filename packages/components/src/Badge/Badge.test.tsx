import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStyles, MarigoldProvider } from '@marigold/system';
import { Badge } from '@marigold/components';

const theme = {
  content: {
    badge: {
      borderRadius: '8px',
    },
    fatBadge: {
      borderRadius: '12px',
    },
  },
};

test('supports default variant and themeSection', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`border-radius: 8px;`);
});

test('renders correct HTML element', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge instanceof HTMLDivElement).toBeTruthy();
});

test('supports custom borderColor prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" borderColor="#000" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`border: 1px solid #000`);
});

test('supports custom backgroundColor prop', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge title="badge" backgroundColor="#1ee" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`background: #1ee`);
});

test('supports other variant than default', () => {
  render(
    <MarigoldProvider theme={theme}>
      <Badge variant="fatBadge" title="badge" />
    </MarigoldProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`border-radius: 12px;`);
});

test('accepts custom styles prop className', () => {
  const TestComponent: React.FC = ({ children, ...props }) => {
    const classNames = useStyles({ fontSize: '8px' });
    return (
      <Badge className={classNames} {...props}>
        {children}
      </Badge>
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
