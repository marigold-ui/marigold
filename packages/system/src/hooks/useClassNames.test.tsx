import React, { ReactNode } from 'react';
import { cva } from 'class-variance-authority';

import { renderHook } from '@testing-library/react';

import { Theme } from '../types';
import { ThemeProvider } from './useTheme';
import { useClassNames } from './useClassNames';

const theme: Theme = {
  name: 'test-theme',
  components: {
    Button: cva('flex align-center', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
        },
        size: {
          small: 'w-10 h-10',
          large: 'w-50 h-50',
        },
      },
    }),
    HelpText: {
      container: cva('inline', {
        variants: {
          variant: {
            primary: 'text-primary-500',
          },
          size: {
            small: 'w-10 h-10',
          },
        },
      }),
      icon: cva('block', {
        variants: {
          variant: {
            primary: 'text-secondary-800',
          },
          size: {
            small: 'w-50 h-50',
          },
        },
      }),
    },
  },
};

const wrapper = ({ children }: { children?: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// Single Element
// ---------------
test('return classnames (base only)', () => {
  const { result } = renderHook(() => useClassNames({ component: 'Button' }), {
    wrapper,
  });
  expect(result.current).toMatchInlineSnapshot(`undefined`);
});

test('return classnames (with variant)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Button', variant: 'primary' }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(`undefined`);
});

test('return classnames (with size)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Button', size: 'small' }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(`undefined`);
});

test('allows to pass in custom classNames', () => {
  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'Button',
        className: 'supi-dupi extra delicious-500',
      }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(
    `"flex align-center supi-dupi extra delicious-500"`
  );
});

// Multiple Elements (slots)
// ---------------
test('return classnames for slots (base only)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'HelpText' }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`undefined`);
});

test('return classnames for slots (with variant)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'HelpText', variant: 'primary' }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`undefined`);
});

test('return classnames for slots (with size)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Slotty', size: 'small' }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`undefined`);
});

test('allows to pass in custom classNames for each slot', () => {
  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'Slotty',
        className: { container: 'custom-container', item: 'fancy-item' },
      }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`undefined`);
});

// Error Handling
// ---------------
test('gracefully handles missing styles', () => {
  // TODO
});
