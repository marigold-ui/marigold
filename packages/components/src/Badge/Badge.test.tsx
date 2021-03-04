import React from 'react';
import { render, screen } from '@testing-library/react';
import { useStyles, ThemeProvider } from '@marigold/system';
import { Badge } from './Badge';

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
    <ThemeProvider theme={theme}>
      <Badge title="badge" />
    </ThemeProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge).toHaveStyle(`border-radius: 8px;`);
});

test('renders correct HTML element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Badge title="badge" />
    </ThemeProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge instanceof HTMLDivElement).toBeTruthy();
});

test('supports other variant than default', () => {
  render(
    <ThemeProvider theme={theme}>
      <Badge variant="fatBadge" title="badge" />
    </ThemeProvider>
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
    <ThemeProvider theme={theme}>
      <TestComponent>text</TestComponent>
    </ThemeProvider>
  );
  const testelem = getByText('text');
  const text = getComputedStyle(testelem);

  expect(text.fontSize).toEqual('8px');
});
