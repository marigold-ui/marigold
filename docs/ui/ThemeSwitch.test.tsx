import { act, renderHook } from '@testing-library/react';
import React, { ReactNode } from 'react';
import { vi } from 'vitest';
import { b2bTheme, coreTheme } from '../theme';
import { MarigoldThemeSwitch, useThemeSwitch } from './ThemeSwitch';

const themes = {
  b2bTheme,
  coreTheme,
};

vi.mock('next/navigation', () => {
  const actual = vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(),
  };
});

afterEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

const wrapper = ({ children }: { children?: ReactNode }) => (
  <MarigoldThemeSwitch themes={themes} initial="b2b">
    {children}
  </MarigoldThemeSwitch>
);

test('returns the theme', () => {
  const { result } = renderHook(() => useThemeSwitch(), { wrapper });

  expect(result.current.current).toMatchInlineSnapshot(`"b2b"`);
});

test('switches the theme', async () => {
  // useRouter.mockReturnValue({ replace: vi.fn() });

  const { result } = renderHook(() => useThemeSwitch(), { wrapper });

  act(() => {
    result.current.updateTheme(coreTheme);
  });

  // @ts-ignore
  expect(result.current.current?.name).toMatchInlineSnapshot(`"core"`);
});
