import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useClassname } from './useClassname';
import { ThemeProvider } from './useTheme';

// Setup
// ---------------
const theme = {
  colors: {
    primary: 'hotpink',
    black: '#000',
  },
  sizes: [0, 1, 2],
  text: {
    body: {
      fontSize: 1,
      color: 'black',
    },
    heading: {
      fontSize: 3,
      color: 'primary',
    },
  },
};

const wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

test('create a string classname', () => {
  const { result } = renderHook(() => useClassname({ color: 'primary' }), {
    wrapper,
  });
  expect(result.current).toEqual(expect.any(String));
});

test('create classnames from multiple intpus', () => {
  const { result } = renderHook(
    () => useClassname({ color: 'primary' }, { p: 2 }),
    {
      wrapper,
    }
  );
  expect(result.current).toEqual(expect.any(String));
});

test('create a unique classnames', () => {
  const { result: first } = renderHook(
    () => useClassname({ color: 'primary' }),
    {
      wrapper,
    }
  );
  const { result: second } = renderHook(
    () => useClassname({ color: 'black' }),
    {
      wrapper,
    }
  );
  expect(first.current).not.toEqual(second.current);
});
