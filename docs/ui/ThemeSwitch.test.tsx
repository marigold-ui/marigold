import { act, renderHook } from '@testing-library/react';
import React, { ReactNode } from 'react';

import { b2bTheme, coreTheme } from '../theme';
import { MarigoldThemeSwitch, useThemeSwitch } from './ThemeSwitch';

const themes = {
  b2bTheme,
  coreTheme,
};

const useRouter = require('next/navigation').useRouter;

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

beforeEach(() => {
  useRouter.mockReturnValue({ replace: jest.fn() });
});

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
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
  // useRouter.mockReturnValue({ replace: jest.fn() });

  const { result } = renderHook(() => useThemeSwitch(), { wrapper });

  act(() => {
    result.current.updateTheme(coreTheme);
  });

  // @ts-ignore
  expect(result.current.current?.name).toMatchInlineSnapshot(`"core"`);
});
