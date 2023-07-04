import React, { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { b2bTheme, coreTheme } from '../../../theme';
import { MarigoldThemeSwitch, useThemeSwitch } from './ThemeSwitch';

const themes = {
  b2bTheme: b2bTheme,
  coreTheme: coreTheme,
};
const wrapper = ({ children }: { children?: ReactNode }) => (
  <MarigoldThemeSwitch themes={themes} initial="b2bTheme">
    {children}
  </MarigoldThemeSwitch>
);

test('returns the theme', () => {
  const { result } = renderHook(() => useThemeSwitch(), { wrapper });

  expect(result.current.current).toMatchInlineSnapshot(`"b2bTheme"`);
});

test('switches the theme', async () => {
  const { result } = renderHook(() => useThemeSwitch(), { wrapper });
  act(() => {
    result.current.setTheme(coreTheme);
  });

  // @ts-ignore
  expect(result.current.current?.name).toMatchInlineSnapshot(`"core"`);
});
