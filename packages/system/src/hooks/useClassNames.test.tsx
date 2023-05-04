import React, { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { renderHook } from '@testing-library/react';

import { Theme } from '../types';
import { ThemeProvider } from './useTheme';
import { useClassNames } from './useClassNames';

const theme: Theme = {
  name: 'test-theme',
  components: {
    Component: tv({
      base: 'flex align-center',
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
    Slotty: tv({
      slots: {
        container: 'block',
        item: 'inline',
      },
      variants: {
        variant: {
          primary: {
            container: 'text-primary-500',
            item: 'text-secondary-800',
          },
        },
        size: {
          small: {
            container: 'w-10 h-10',
            item: 'w-50 h-50',
          },
        },
      },
    }),
  },
};

const wrapper = ({ children }: { children?: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// Single Element
// ---------------
test('return classnames (base only)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Component' }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(`"flex align-center"`);
});

test('return classnames (with variant)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Component', variant: 'primary' }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(
    `"flex align-center text-primary-500"`
  );
});

test('return classnames (with size)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Component', size: 'small' }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(`"flex align-center w-10 h-10"`);
});

test('allows to pass in custom classNames', () => {
  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'Component',
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
  const { result } = renderHook(() => useClassNames({ component: 'Slotty' }), {
    wrapper,
  });

  expect(result.current).toMatchInlineSnapshot(`
    {
      "base": "",
      "container": "block",
      "item": "inline",
    }
  `);
});

test('return classnames for slots (with variant)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Slotty', variant: 'primary' }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`
    {
      "base": "",
      "container": "block text-primary-500",
      "item": "inline text-secondary-800",
    }
  `);
});

test('return classnames for slots (with size)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Slotty', size: 'small' }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`
    {
      "base": "",
      "container": "block w-10 h-10",
      "item": "inline w-50 h-50",
    }
  `);
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

  expect(result.current).toMatchInlineSnapshot(`
    {
      "base": "",
      "container": "block custom-container",
      "item": "inline fancy-item",
    }
  `);
});

// Error Handling
// ---------------
test('gracefully handles missing styles', () => {
  // TODO
});
