import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Badge } from './Badge';

const theme = {
  badge: {
    default: {
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
  render(
    <ThemeProvider theme={theme}>
      <Badge className="custom-class-name" title="badge">
        badge
      </Badge>
    </ThemeProvider>
  );
  const badge = screen.getByTitle(/badge/);

  expect(badge.className).toMatch('custom-class-name');
});
