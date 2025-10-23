import { renderHook } from '@testing-library/react';
import { ReactNode, createContext } from 'react';
import { Theme } from '../types/theme';
import { cn, cva } from '../utils';
import { UseClassNamesProps, useClassNames } from './useClassNames';
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
          small: 'size-10',
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
            small: 'size-10',
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

// handle errors because renderHook doesn't
const useErrorWrapper = ({ component, className }: UseClassNamesProps<any>) => {
  try {
    return (
      useClassNames({
        component,
        className,
      }),
      {
        wrapper,
      }
    );
  } catch (error) {
    return {
      error,
    };
  }
};

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
  expect(result.current).toMatchInlineSnapshot(`"align-center flex size-10"`);
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
  expect(result.current).toMatchInlineSnapshot(
    `"align-center flex size-10 w-22"`
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
  "container": "inline size-10",
  "icon": "block w-50 h-50",
}
`);
});

test('allows to pass in custom classNames for each slot', () => {
  const { result } = renderHook(
    () =>
      useErrorWrapper({
        component: 'HelpText',
        className: { container: 'custom-container', icon: 'fancy-item' },
      }),
    {
      wrapper,
    }
  );

  expect(result.current).toMatchInlineSnapshot(`
{
  "wrapper": [Function],
}
`);
});

// TODO: Handle conflicting classNames

// Error Handling
// ---------------
test('gracefully handles missing styles', () => {
  const { result } = renderHook(() =>
    useErrorWrapper({
      component: 'Button',

      className: { slot: 'foo-bar' },
    })
  );

  expect(result.current.error).toMatchInlineSnapshot(
    `[Error: Component "Button" is missing styles in the current theme.]`
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
    useErrorWrapper({ component: 'Component' })
  );

  expect(result.current.error).toMatchInlineSnapshot(
    `[Error: Component "Component" is missing styles in the current theme.]`
  );
});

test('component error if classname no object when using slots', () => {
  const { result } = renderHook(
    () =>
      useErrorWrapper({
        component: 'HelpText',
        className: 'bg-blue-800',
      }),
    { wrapper }
  );

  expect(result.current.error).toMatchInlineSnapshot(
    `[Error: "className" must be a object, when using a component with slots]`
  );
});

test('component error if there are not slots', () => {
  const { result } = renderHook(
    () =>
      useErrorWrapper({
        component: 'Button',
        className: {},
      }),
    { wrapper }
  );

  expect(result.current.error).toMatchInlineSnapshot(
    `[Error: "className" must be a string, when using a component without slots]`
  );
});

test('uses context size when size not provided', () => {
  const ComponentContext = createContext<{ size: string }>({ size: 'large' });

  const { result } = renderHook(
    () => useClassNames({ component: 'Button', context: ComponentContext }),
    {
      wrapper: ({ children }) => (
        <ComponentContext.Provider value={{ size: 'large' }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ComponentContext.Provider>
      ),
    }
  );

  expect(result.current).toMatchInlineSnapshot(`"align-center flex w-50 h-50"`);
});

test('uses context variant when not provided', () => {
  const ComponentContext = createContext<{ variant: string }>({
    variant: 'primary',
  });

  const { result } = renderHook(
    () => useClassNames({ component: 'HelpText', context: ComponentContext }),
    {
      wrapper: ({ children }) => (
        <ComponentContext.Provider value={{ variant: 'primary' }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ComponentContext.Provider>
      ),
    }
  );

  expect(result.current).toMatchInlineSnapshot(`
    {
      "container": "inline text-primary-500",
      "icon": "block text-secondary-800",
    }
  `);
});

test('uses fallback context when no context provider exists', () => {
  const { result } = renderHook(() => useClassNames({ component: 'Button' }), {
    wrapper,
  });

  // Should only use base styles with no size/variant from context
  expect(result.current).toBe('align-center flex');
});
