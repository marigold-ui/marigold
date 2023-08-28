import { renderHook } from '@testing-library/react-hooks';
import React, { ReactNode } from 'react';

import { Theme } from '../types';
import { cn, cva } from '../utils';
import { useClassNames } from './useClassNames';
import { ThemeProvider } from './useTheme';

const theme: Theme = {
  name: 'test-theme',
  components: {
    Button: cva('align-center flex', {
      variants: {
        variant: {
          primary: 'text-primary-500',
          secondary: 'text-secondary-800',
        },
        size: {
          small: 'h-10 w-10',
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
            small: 'h-10 w-10',
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
  expect(result.current).toMatchInlineSnapshot(`"align-center flex"`);
});

test('returns a string', () => {
  const { result } = renderHook(() => useClassNames({ component: 'Button' }), {
    wrapper,
  });

  const classNames: string | undefined = result.current;

  expect(classNames).toBeTruthy();
});

test('return classnames (with variant)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Button', variant: 'primary' }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(
    `"align-center flex text-primary-500"`
  );
});

test('return classnames (with size)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'Button', size: 'small' }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(`"align-center flex h-10 w-10"`);
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
    `"align-center flex supi-dupi extra delicious-500"`
  );
});

test('handles conflicting classnames', () => {
  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'Button',
        size: 'small',
        className: 'w-22',
      }),
    { wrapper }
  );
  expect(result.current).toMatchInlineSnapshot(`"align-center flex h-10 w-22"`);
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

  expect(result.current).toMatchInlineSnapshot(`
    {
      "container": "inline",
      "icon": "block",
    }
  `);
});

test('return classnames for slots (with variant)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'HelpText', variant: 'primary' }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`
    {
      "container": "inline text-primary-500",
      "icon": "block text-secondary-800",
    }
  `);
});

test('return classnames for slots (with size)', () => {
  const { result } = renderHook(
    () => useClassNames({ component: 'HelpText', size: 'small' }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`
    {
      "container": "inline h-10 w-10",
      "icon": "block w-50 h-50",
    }
  `);
});

test('allows to pass in custom classNames for each slot', () => {
  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'HelpText',
        className: { container: 'custom-container', icon: 'fancy-item' },
      }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`
    {
      "container": "inline custom-container",
      "icon": "block fancy-item",
    }
  `);
});

// TODO: Handle conflicting classNames

// Error Handling
// ---------------
test('gracefully handles missing styles', () => {
  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'Button',
        // @ts-expect-error
        className: { slot: 'foo-bar' },
      }),
    {
      wrapper,
    }
  );

  expect(result.error).toMatchInlineSnapshot(
    `[Error: "className" must be a string, when using a component without slots]`
  );
});

// Additional Style Props
test('additional style props are supported', () => {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'Button',
        className: cn(['gap-8 custom-classname', alignment['center']]),
      }),
    {
      wrapper,
    }
  );
  expect(result.current).toMatchInlineSnapshot(
    `"align-center flex gap-8 custom-classname text-center"`
  );
});

test('additional style props are supported for slots', () => {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'HelpText',
        className: {
          container: `custom-container ${alignment['center']}`,
          icon: `fancy-item ${alignment['right']}`,
        },
      }),
    {
      wrapper,
    }
  );
  expect(result.current).toMatchInlineSnapshot(`
    {
      "container": "inline custom-container text-center",
      "icon": "block fancy-item text-right",
    }
  `);
});

test('component not found throw error', () => {
  const { result } = renderHook(() =>
    // @ts-expect-error
    useClassNames({ component: 'Component' })
  );

  expect(result.error).toMatchInlineSnapshot(
    `[Error: Component "Component" is missing styles in the current theme.]`
  );
});

test('component error if classname no object when using slots', () => {
  const { result } = renderHook(
    () =>
      useClassNames({
        component: 'HelpText',
        // @ts-expect-error
        className: 'bg-blue-800',
      }),
    { wrapper }
  );

  expect(result.error).toMatchInlineSnapshot(
    `[Error: "className" must be a object, when using a component with slots]`
  );
});
