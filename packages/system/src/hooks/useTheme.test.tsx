import { renderHook } from '@testing-library/react';
import { ReactNode } from 'react';
import { cva } from '../utils/className.utils';
import { ThemeProvider, useTheme } from './useTheme';

// Setup
// ---------------

const theme = {
  name: 'test',
  components: {
    Button: cva({
      base: 'border-none p-1',
      variants: {
        variant: {
          primary: 'bg-primary-700',
          secondary: 'bg-secondary-700',
        },
      },
    }),
  },
};

const wrapper = ({ children }: { children?: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

test('returns the theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });
  expect(result.current).toEqual(theme);
});

test('return classnames from theme', () => {
  const { result } = renderHook(() => useTheme(), { wrapper });

  const button = result.current.components!.Button;

  expect(button?.()).toEqual('border-none p-1');
  expect(button?.({ variant: 'primary' })).toEqual(
    'border-none p-1 bg-primary-700'
  );
});
