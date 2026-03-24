import { describe, expect, it, test } from 'vitest';
import { Accordion } from '../../../../themes/theme-rui/src/components/Accordion.styles';
import { Badge } from '../../../../themes/theme-rui/src/components/Badge.styles';
import { Button } from '../../../../themes/theme-rui/src/components/Button.styles';
import { cn, cva } from './className.utils';

describe('cva', () => {
  test('cva (simple)', () => {
    expect(cva({ base: ['text-sm'] })()).toMatchInlineSnapshot(`"text-sm"`);
  });

  test('cva (variants)', () => {
    const styles = cva({
      base: ['text-sm'],
      variants: {
        variant: {
          blue: 'text-blue-500',
        },
        size: {
          large: 'text-lg',
        },
      },
    });

    expect(styles()).toMatchInlineSnapshot(`"text-sm"`);
    expect(styles({ variant: 'blue' })).toMatchInlineSnapshot(
      `"text-sm text-blue-500"`
    );
    expect(styles({ size: 'large' })).toMatchInlineSnapshot(`"text-lg"`);
  });

  test('cva with multiple variants', () => {
    const styles = cva({
      base: ['px-4'],
      variants: {
        variant: {
          primary: 'bg-blue-500 text-white',
          secondary: 'bg-gray-200 text-gray-800',
        },
        size: {
          sm: 'text-sm py-1',
          md: 'text-base py-2',
          lg: 'text-lg py-3',
        },
      },
    });

    expect(styles({ variant: 'primary', size: 'sm' })).toMatchInlineSnapshot(
      `"px-4 bg-blue-500 text-white text-sm py-1"`
    );
    expect(styles({ variant: 'secondary', size: 'lg' })).toMatchInlineSnapshot(
      `"px-4 bg-gray-200 text-gray-800 text-lg py-3"`
    );
  });

  test('cva with default variants', () => {
    const styles = cva({
      base: ['base-class'],
      variants: {
        color: {
          red: 'text-red-500',
          blue: 'text-blue-500',
        },
      },
      defaultVariants: {
        color: 'red',
      },
    });

    expect(styles()).toMatchInlineSnapshot(`"base-class text-red-500"`);
    expect(styles({ color: 'blue' })).toMatchInlineSnapshot(
      `"base-class text-blue-500"`
    );
  });

  test('cva with class prop override', () => {
    const styles = cva({ base: ['text-sm'] });

    expect(styles({ class: 'text-lg' })).toMatchInlineSnapshot(`"text-lg"`);
  });

  test('exposes variants metadata on the returned function', () => {
    const variants = {
      variant: {
        primary: 'bg-blue-500',
        secondary: 'bg-gray-200',
      },
      size: {
        sm: 'text-sm',
        lg: 'text-lg',
      },
    };

    const styles = cva({
      base: ['px-4'],
      variants,
    }) as any;

    expect(styles.variants).toEqual(variants);
  });

  test('exposes defaultVariants metadata on the returned function', () => {
    const defaultVariants = { color: 'red' } as const;

    const styles = cva({
      base: ['base-class'],
      variants: {
        color: {
          red: 'text-red-500',
          blue: 'text-blue-500',
        },
      },
      defaultVariants,
    }) as any;

    expect(styles.defaultVariants).toEqual(defaultVariants);
  });

  test('exposes compoundVariants metadata on the returned function', () => {
    const compoundVariants = [
      { variant: 'primary' as const, size: 'sm' as const, class: 'font-bold' },
    ];

    const styles = cva({
      base: ['px-4'],
      variants: {
        variant: { primary: 'bg-blue-500' },
        size: { sm: 'text-sm' },
      },
      compoundVariants,
    }) as any;

    expect(styles.compoundVariants).toEqual(compoundVariants);
  });

  test('does not expose metadata when config has no variants', () => {
    const styles = cva({ base: ['text-sm'] }) as any;

    expect(styles.variants).toBeUndefined();
    expect(styles.defaultVariants).toBeUndefined();
    expect(styles.compoundVariants).toBeUndefined();
  });
});

describe('cva metadata on real theme styles', () => {
  test('introspect variant keys from a single-slot component (Button)', () => {
    expect(Object.keys(Button.variants!.variant)).toEqual([
      'primary',
      'secondary',
      'ghost',
      'destructive',
      'destructive-ghost',
      'link',
    ]);
    expect(Object.keys(Button.variants!.size)).toEqual([
      'default',
      'small',
      'large',
      'icon',
    ]);
  });

  test('introspect defaultVariants from a single-slot component (Button)', () => {
    expect(Button.defaultVariants).toEqual({
      variant: 'secondary',
      size: 'default',
    });
  });

  test('introspect compoundVariants from a single-slot component (Button)', () => {
    expect(Button.compoundVariants).toBeDefined();
    expect(Button.compoundVariants!.length).toBeGreaterThan(0);
  });

  test('introspect variant keys from a component without sizes (Badge)', () => {
    expect(Object.keys(Badge.variants!.variant)).toEqual([
      'default',
      'primary',
      'success',
      'warning',
      'info',
      'error',
      'admin',
      'master',
    ]);
    expect(Badge.defaultVariants).toEqual({ variant: 'default' });
  });

  test('introspect variants from a multi-slot component (Accordion)', () => {
    expect(Object.keys(Accordion.container.variants!.variant)).toEqual([
      'default',
      'card',
    ]);
    expect(Accordion.container.defaultVariants).toEqual({
      variant: 'default',
    });

    // Slot without variants has no metadata
    expect(Accordion.icon.variants).toBeUndefined();
  });

  test('style function still works after metadata is attached (Button)', () => {
    const classes = Button({ variant: 'primary', size: 'default' });

    expect(classes).toContain('ui-surface-contrast');
    expect(classes).toContain('text-sm');
  });
});

describe('cn', () => {
  it('should merge multiple class names', () => {
    expect(cn('px-4', 'py-2')).toBe('px-4 py-2');
  });

  it('should handle conditional classes', () => {
    const isActive = true;
    const isDisabled = false;

    expect(cn('px-4', isActive && 'py-2', isDisabled && 'py-4')).toBe(
      'px-4 py-2'
    );
  });

  it('should merge conflicting Tailwind classes', () => {
    expect(cn('px-4', 'px-8')).toBe('px-8');
  });

  it('should handle arrays of class names', () => {
    expect(cn(['px-4', 'py-2'], 'mx-auto')).toBe('px-4 py-2 mx-auto');
  });

  it('should filter out falsy values', () => {
    expect(cn('px-4', null, undefined, '', 'py-2')).toBe('px-4 py-2');
  });

  it('should handle nested class strings', () => {
    expect(cn('bg-white', 'text-gray-800 font-bold')).toBe(
      'bg-white text-gray-800 font-bold'
    );
  });

  it('should resolve Tailwind conflicts correctly', () => {
    expect(cn('text-sm', 'text-base')).toBe('text-base');
  });

  it('should handle complex combinations', () => {
    const hasError = true;
    const isLoading = false;
    const result = cn(
      'px-4 py-2',
      'text-white',
      'px-8',
      isLoading && 'bg-red-500',
      hasError && 'bg-blue-500'
    );

    expect(result).toBe('py-2 text-white px-8 bg-blue-500');
  });
});
