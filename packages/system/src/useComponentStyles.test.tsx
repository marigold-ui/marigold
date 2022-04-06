import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ThemeProvider } from './useTheme';

import { useComponentStyles } from './useComponentStyles';

// Setup
// ---------------
const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#ff4081',
    white: '#fff',
    black: '#000',
  },
  space: {
    none: 0,
    'small-1': 4,
    'medium-1': 8,
    'large-1': 16,
  },
  sizes: {
    none: 0,
    'small-1': 16,
    'medium-1': 32,
    'large-1': 48,
  },
  components: {
    // Component without parts
    Button: {
      base: {
        appearance: 'none',
        bg: 'white',
      },
      size: {
        small: {
          height: 'small-1',
        },
        medium: {
          height: 'medium-1',
        },
        large: {
          height: 'large-1',
        },
      },
      variant: {
        primary: {
          color: 'primary',
        },
        secondary: {
          color: 'secondary',
        },
      },
    },
    // Component with multiple parts
    Checkbox: {
      base: {
        container: {},
        icon: {},
        label: {},
      },
      state: {
        checked: {
          container: {},
          icon: {},
          label: {},
        },
        unchecked: {
          container: {},
          icon: {},
          label: {},
        },
        indeterminate: {
          container: {},
          icon: {},
          label: {},
        },
        error: {
          container: {},
          icon: {},
          label: {},
        },
      },
      size: {
        small: {
          container: {},
          icon: {},
          label: {},
        },
        medium: {
          container: {},
          icon: {},
          label: {},
        },
        large: {
          container: {},
          icon: {},
          label: {},
        },
      },
    },
  },
};

const wrapper: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

// Tests
// ---------------
test('get base styles for a component', () => {
  const { result } = renderHook(() => useComponentStyles('Button'), {
    wrapper,
  });
  expect(result.current).toMatchInlineSnapshot(`
    {
      "appearance": "none",
      "bg": "white",
    }
  `);
});

test('get variant styles for a component', () => {
  let view = renderHook(
    () => useComponentStyles('Button', { variant: 'primary' }),
    {
      wrapper,
    }
  );
  expect(view.result.current).toMatchInlineSnapshot(`
    {
      "appearance": "none",
      "bg": "white",
      "color": "primary",
    }
  `);

  view = renderHook(
    () => useComponentStyles('Button', { variant: 'secondary' }),
    {
      wrapper,
    }
  );
  expect(view.result.current).toMatchInlineSnapshot(`
    {
      "appearance": "none",
      "bg": "white",
      "color": "secondary",
    }
  `);
});

// test('works if variant does not exist');

// test('get size styles for a component');
// test('get state styles for a component');

// test('get base styles for a component (with parts)');
// test('get variant styles for a component (with parts)');
// test('get size styles for a component (with parts)');
// test('get state styles for a component (with parts)');

// test('base styles are always added');
// test('override order: base < variant < size < state');
// test('override order: base < variant < size < state (with parts)');

// // example 'Button.state.hover' => 'Button:hover'
// test('transform state styles');
// test('transform state styles (with parts)');

// test('usage with <Box>');
// test('usage with <Box> (with parts)');

// const Component = () => {
//   const r = useComponentStyles('name');
//   const f = useComponentStyles('name', {}, { parts: ['wrapper', 'icon'] });
//   console.log(f.wrapper, f.icon, f.name);
// };
