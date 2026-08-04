import { vi } from 'vitest';
import { resolveScreens } from './resolveScreens';

test('returns theme screens directly when provided', () => {
  const screens = { sm: '40rem', md: '48rem' };

  const result = resolveScreens(screens);

  expect(result).toBe(screens);
});

test('falls back to CSS custom properties when theme screens is empty', () => {
  const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: () => '',
  } as unknown as CSSStyleDeclaration);

  const result = resolveScreens({});

  expect(result).toEqual({});
  spy.mockRestore();
});

test('reads all --breakpoint-* CSS custom properties when no theme screens', () => {
  const cssValues: Record<string, string> = {
    '--breakpoint-sm': '40rem',
    '--breakpoint-md': '48rem',
    '--breakpoint-lg': '64rem',
    '--breakpoint-xl': '80rem',
    '--breakpoint-2xl': '96rem',
  };
  const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: (prop: string) => cssValues[prop] ?? '',
  } as unknown as CSSStyleDeclaration);

  const result = resolveScreens();

  expect(result).toEqual({
    sm: '40rem',
    md: '48rem',
    lg: '64rem',
    xl: '80rem',
    '2xl': '96rem',
  });
  spy.mockRestore();
});

test('omits breakpoints that have no CSS value', () => {
  const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: (prop: string) =>
      prop === '--breakpoint-sm' ? '40rem' : '',
  } as unknown as CSSStyleDeclaration);

  const result = resolveScreens();

  expect(result).toEqual({ sm: '40rem' });
  spy.mockRestore();
});

test('returns empty object when undefined is passed and document has no CSS properties', () => {
  const spy = vi.spyOn(window, 'getComputedStyle').mockReturnValue({
    getPropertyValue: () => '',
  } as unknown as CSSStyleDeclaration);

  const result = resolveScreens(undefined);

  expect(result).toEqual({});
  spy.mockRestore();
});
