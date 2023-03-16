import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { ThemeProvider } from './useTheme';

import { useComponentStylesFromTV } from './useComponentStyles';
import { tv } from 'tailwind-variants';
import { Box } from '../components';

// Setup
// ---------------

const theme = {
  name: 'test',
  components: {
    Button: tv({
      base: 'border-none p-1 text-black',
      variants: {
        variant: {
          primary: 'bg-primary-700',
          secondary: 'bg-secondary-700',
        },
        size: {
          small: 'p-4',
          medium: 'p-8',
        },
      },
    }),
    Checkbox: tv({
      base: 'inline align-middle gap-4',
      slots: {
        container: 'flex p-2 align-middle',
        icon: 'p-8 w-1',
        label: 'text-sm text-pink-500',
      },
      variants: {
        variant: {
          pink: {
            container: 'bg-pink-700',
            label: 'text-white',
            icon: 'bg-pink-200',
          },
        },
      },
    }),
  },
};

const wrapper = ({ children }: { children?: ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// Tests
// ---------------
describe('smoketests', () => {
  test('works without a theme', () => {
    const { result } = renderHook(() =>
      useComponentStylesFromTV('NotExisting')
    );

    expect(result.current).toEqual('');
  });

  test('returns empty string if component does not exist in theme', () => {
    const { result } = renderHook(
      () => useComponentStylesFromTV('NotExisting'),
      {
        wrapper,
      }
    );
    expect(result.current).toEqual('');
  });
});

describe('useComponentStyles (simple)', () => {
  test('get base styles for a component', () => {
    const { result } = renderHook(() => useComponentStylesFromTV('Button'), {
      wrapper,
    });

    expect(result.current).toMatchInlineSnapshot(
      `"border-none p-1 text-black"`
    );
  });

  test('returns empty string if component has no base styles', () => {
    const { result } = renderHook(() => useComponentStylesFromTV('GotNoBase'), {
      wrapper,
    });
    expect(result.current).toEqual('');
  });

  test('get variant styles for a component', () => {
    let view = renderHook(
      () => useComponentStylesFromTV('Button', { variant: 'primary' }),
      {
        wrapper,
      }
    );
    expect(view.result.current).toMatchInlineSnapshot(
      `"border-none p-1 text-black bg-primary-700"`
    );

    view = renderHook(
      () => useComponentStylesFromTV('Button', { variant: 'secondary' }),
      {
        wrapper,
      }
    );
    expect(view.result.current).toMatchInlineSnapshot(
      `"border-none p-1 text-black bg-secondary-700"`
    );
  });

  test('works if variant does not exist', () => {
    const { result } = renderHook(
      () =>
        useComponentStylesFromTV('Button', { variant: 'non-existing-variant' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(
      `"border-none p-1 text-black"`
    );
  });

  test('base styles are applied together with variant', () => {
    const { result } = renderHook(
      () => useComponentStylesFromTV('Button', { variant: 'primary' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(
      `"border-none p-1 text-black bg-primary-700"`
    );
  });

  test('get size styles for a component', () => {
    let view = renderHook(
      () => useComponentStylesFromTV('Button', { size: 'small' }),
      {
        wrapper,
      }
    );
    expect(view.result.current).toMatchInlineSnapshot(
      `"border-none text-black p-4"`
    );

    view = renderHook(
      () => useComponentStylesFromTV('Button', { size: 'medium' }),
      {
        wrapper,
      }
    );
    expect(view.result.current).toMatchInlineSnapshot(
      `"border-none text-black p-8"`
    );
  });

  test('works if size does not exist', () => {
    const { result } = renderHook(
      () => useComponentStylesFromTV('Button', { size: 'non-existing-size' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(
      `"border-none p-1 text-black"`
    );
  });

  test('base styles are applied together with size', () => {
    const { result } = renderHook(
      () => useComponentStylesFromTV('Button', { size: 'small' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(
      `"border-none text-black p-4"`
    );
  });
});

describe('useComponentStyles (complex)', () => {
  test('get base styles for a component (with parts)', () => {
    const { result } = renderHook(
      () =>
        useComponentStylesFromTV('Checkbox', {
          slots: ['container', 'icon', 'label'],
        }),
      {
        wrapper,
      }
    );
    expect(result.current.base()).toMatchInlineSnapshot(
      `"inline align-middle gap-4"`
    );
    expect(result.current.container()).toMatchInlineSnapshot(
      `"flex p-2 align-middle"`
    );
    expect(result.current.icon()).toMatchInlineSnapshot(`"p-8 w-1"`);
    expect(result.current.label()).toMatchInlineSnapshot(
      `"text-sm text-pink-500"`
    );
  });

  test('get variant styles for a component (with parts)', () => {
    const { result } = renderHook(
      () =>
        useComponentStylesFromTV('Checkbox', {
          variant: 'primary',
          slots: ['container', 'icon', 'label'],
        }),
      {
        wrapper,
      }
    );
    expect(result.current.base()).toMatchInlineSnapshot(
      `"inline align-middle gap-4"`
    );
    expect(result.current.container()).toMatchInlineSnapshot(
      `"flex p-2 align-middle"`
    );
    expect(result.current.icon()).toMatchInlineSnapshot(`"p-8 w-1"`);
    expect(result.current.label()).toMatchInlineSnapshot(
      `"text-sm text-pink-500"`
    );
  });

  test('get size styles for a component (with parts)', () => {
    const { result } = renderHook(
      () =>
        useComponentStylesFromTV('Checkbox', {
          size: 'small',
          slots: ['container', 'icon', 'label'],
        }),
      {
        wrapper,
      }
    );

    expect(result.current.base()).toMatchInlineSnapshot(
      `"inline align-middle gap-4"`
    );

    expect(result.current.container()).toMatchInlineSnapshot(
      `"flex p-2 align-middle"`
    );

    expect(result.current.icon()).toMatchInlineSnapshot(`"p-8 w-1"`);

    expect(result.current.label()).toMatchInlineSnapshot(
      `"text-sm text-pink-500"`
    );
  });

  test('returns only requested parts', () => {
    const { result } = renderHook(
      () => useComponentStylesFromTV('Checkbox', { slots: ['label'] }),
      {
        wrapper,
      }
    );
    expect(result.current.label()).toMatchInlineSnapshot(
      `"text-sm text-pink-500"`
    );
  });
});

describe('style superiority', () => {
  test('override order: base < size < variant', () => {
    const { result } = renderHook(
      () =>
        useComponentStylesFromTV('Button', {
          size: 'small',
          variant: 'primary',
        }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(
      `"border-none text-black bg-primary-700 p-4"`
    );
  });

  test('override order: base < size < variant (with parts)', () => {
    const { result } = renderHook(
      () =>
        useComponentStylesFromTV('Checkbox', {
          size: 'small',
          variant: 'primary',
          slots: ['container', 'icon', 'label'],
        }),
      {
        wrapper,
      }
    );
    expect(result.current.base()).toMatchInlineSnapshot(
      `"inline align-middle gap-4"`
    );
    expect(result.current.container()).toMatchInlineSnapshot(
      `"flex p-2 align-middle"`
    );
    expect(result.current.icon()).toMatchInlineSnapshot(`"p-8 w-1"`);
    expect(result.current.label()).toMatchInlineSnapshot(
      `"text-sm text-pink-500"`
    );
  });
});

describe('style usage', () => {
  test('styles are not transpiled with tokens', () => {
    const { result } = renderHook(
      () =>
        useComponentStylesFromTV('Button', {
          size: 'small',
          variant: 'primary',
        }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(
      `"border-none text-black bg-primary-700 p-4"`
    );
  });

  test('usage with <Box>', () => {
    const Button = ({ children }: { children?: ReactNode }) => {
      const styles = useComponentStylesFromTV('Button');
      return (
        <Box className={styles} data-testid="button">
          {children}
        </Box>
      );
    };

    render(
      <ThemeProvider theme={theme}>
        <Button>Click me!</Button>
      </ThemeProvider>
    );

    const element = screen.getByTestId('button');
    expect(element).toHaveStyle('border: none');
    expect(element).toHaveStyle('color:  rgb(0 0 0)');
  });

  test('usage with <Box> (with slots)', () => {
    const Checkbox = ({ children }: { children?: ReactNode }) => {
      const styles = useComponentStylesFromTV('Checkbox', {
        slots: ['container', 'icon', 'label'],
      });

      return (
        <Box data-testid="container" className={styles.container()}>
          <Box data-testid="label" as="label" className={styles.label()}>
            {children}
            <Box data-testid="icon" className={styles.icon()} />
          </Box>
        </Box>
      );
    };

    render(
      <ThemeProvider theme={theme}>
        <Checkbox>Click me!</Checkbox>
      </ThemeProvider>
    );

    const container = screen.getByTestId('container');
    expect(container).toHaveClass('flex p-2 align-middle');

    const label = screen.getByTestId('label');
    expect(label).toHaveClass('text-sm text-pink-500');

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveClass('p-8 w-1');
  });
});
