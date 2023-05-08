import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@marigold/system';
import { Badge } from './Badge';

const theme = {
  radii: {
    none: 0,
    'small-1': 8,
    'medium-1': 16,
  },
  space: {
    none: 0,
    'small-1': 4,
  },
  components: {
    Badge: {
      base: {
        padding: 'small-1',
      },
      variant: {
        one: {
          borderRadius: 'small-1',
        },
        two: {
          borderRadius: 'medium-1',
        },
      },
    },
  },
};

test('renders as a "div" element', () => {
  render(
    <ThemeProvider theme={theme}>
      <Badge data-testid="badge" />
    </ThemeProvider>
  );

  const badge = screen.getByTestId('badge');
  expect(badge instanceof HTMLDivElement).toBeTruthy();
});

test('uses base styling form "Badge" in theme', () => {
  render(
    <ThemeProvider theme={theme}>
      <Badge data-testid="badge" />
    </ThemeProvider>
  );
  const badge = screen.getByTestId('badge');
  expect(badge).toHaveStyle(`padding: ${theme.space['small-1']}px`);
});

test('supports "Badge" variants from theme', () => {
  const { rerender } = render(
    <ThemeProvider theme={theme}>
      <Badge variant="one" data-testid="badge" />
    </ThemeProvider>
  );

  let badge = screen.getByTestId('badge');
  expect(badge).toHaveStyle(`border-radius: ${theme.radii['small-1']}px`);

  rerender(
    <ThemeProvider theme={theme}>
      <Badge variant="two" data-testid="badge" />
    </ThemeProvider>
  );

  badge = screen.getByTestId('badge');
  expect(badge).toHaveStyle(`border-radius: ${theme.radii['medium-1']}px`);
});
