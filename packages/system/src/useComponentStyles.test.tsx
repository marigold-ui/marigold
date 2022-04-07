import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { ThemeProvider } from './useTheme';

import { useComponentStyles } from './useComponentStyles';

// Setup
// ---------------
const theme = {
  /**
   * Design tokens will not applied in the tests,
   * but adding them will make sure that they are
   * REALLY not applied!
   */
  colors: {
    primary: '#0070f3',
    secondary: '#ff4081',
    white: '#f8f9fa',
    black: '#212529',
    blue: '#228be6',
    red: '#c92a2a',
  },
  fontSizes: {
    'small-1': '12px',
    'small-2': '14px',
    'medium-1': '16px',
    'medium-2': '18px',
    'large-1': '20px',
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
      state: {
        hover: {
          bg: 'blue',
        },
        error: {
          bg: 'red',
        },
      },
    },
    // Component with multiple parts
    Checkbox: {
      base: {
        container: {
          display: 'flex',
          alignItems: 'center',
          gap: 'small-1',
        },
        icon: {
          size: 'small-1',
        },
        label: {
          color: 'black',
          fontSize: 'small-2',
        },
      },
      state: {
        checked: {
          icon: {
            opacity: 1,
            bg: 'blue',
          },
        },
        unchecked: {
          icon: {
            opacity: 0,
          },
        },
        indeterminate: {
          icon: {
            opacity: 1,
          },
          label: {
            fontStyle: 'italic',
          },
        },
        error: {
          container: {
            border: '1px solid',
            borderColor: 'red',
          },
          icon: {
            fill: 'red',
          },
          label: {
            color: 'red',
          },
        },
      },
      size: {
        small: {
          container: {
            p: 'small-1',
          },
          icon: {
            size: 'small-1',
          },
        },
        medium: {
          container: {
            p: 'medium-1',
          },
          icon: {
            size: 'medium-1',
          },
          label: {
            fontSize: 'medium-2',
          },
        },
        large: {
          container: {
            p: 'large-1',
          },
          icon: {
            size: 'large-1',
          },
          label: {
            fontSize: 'large-1',
          },
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
describe('useComponentStyles (simple)', () => {
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

  test('works if variant does not exist', () => {
    const { result } = renderHook(
      () => useComponentStyles('Button', { variant: 'non-existing-variant' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(`
          {
            "appearance": "none",
            "bg": "white",
          }
      `);
  });

  test('base styles are applied together with variant', () => {
    const { result } = renderHook(
      () => useComponentStyles('Button', { variant: 'primary' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchObject({
      appearance: 'none',
      bg: 'white',
    });
  });

  test('get size styles for a component', () => {
    let view = renderHook(
      () => useComponentStyles('Button', { size: 'small' }),
      {
        wrapper,
      }
    );
    expect(view.result.current).toMatchInlineSnapshot(`
      {
        "appearance": "none",
        "bg": "white",
        "height": "small-1",
      }
    `);

    view = renderHook(() => useComponentStyles('Button', { size: 'medium' }), {
      wrapper,
    });
    expect(view.result.current).toMatchInlineSnapshot(`
      {
        "appearance": "none",
        "bg": "white",
        "height": "medium-1",
      }
    `);
  });

  test('works if size does not exist', () => {
    const { result } = renderHook(
      () => useComponentStyles('Button', { size: 'non-existing-size' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(`
      {
        "appearance": "none",
        "bg": "white",
      }
    `);
  });

  test('base styles are applied together with size', () => {
    const { result } = renderHook(
      () => useComponentStyles('Button', { size: 'small' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchObject({
      appearance: 'none',
      bg: 'white',
    });
  });

  test('get state styles for a component', () => {
    let view = renderHook(
      () => useComponentStyles('Button', { state: 'hover' }),
      {
        wrapper,
      }
    );
    expect(view.result.current).toMatchInlineSnapshot(`
      {
        "appearance": "none",
        "bg": "blue",
      }
    `);

    view = renderHook(() => useComponentStyles('Button', { state: 'error' }), {
      wrapper,
    });
    expect(view.result.current).toMatchInlineSnapshot(`
      {
        "appearance": "none",
        "bg": "red",
      }
    `);
  });

  test('works if state does not exist', () => {
    const { result } = renderHook(
      () => useComponentStyles('Button', { state: 'visited' }),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(`
      {
        "appearance": "none",
        "bg": "white",
      }
    `);
  });
});

describe('useComponentStyles (complex)', () => {
  test('get base styles for a component (with parts)', () => {
    const { result } = renderHook(
      () =>
        useComponentStyles(
          'Checkbox',
          {},
          { parts: ['container', 'icon', 'label'] }
        ),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(`
      {
        "container": {
          "alignItems": "center",
          "display": "flex",
          "gap": "small-1",
        },
        "icon": {
          "size": "small-1",
        },
        "label": {
          "color": "black",
          "fontSize": "small-2",
        },
      }
    `);
  });

  // test('get variant styles for a component (with parts)');
  // test('get size styles for a component (with parts)');
  // test('get state styles for a component (with parts)');

  test('returns empty objects if part does not exist', () => {
    const { result } = renderHook(
      () =>
        useComponentStyles(
          'Checkbox',
          {},
          { parts: ['container', 'non-existing-part'] }
        ),
      {
        wrapper,
      }
    );
    expect(result.current).toMatchInlineSnapshot(`
      {
        "container": {
          "alignItems": "center",
          "display": "flex",
          "gap": "small-1",
        },
        "icon": {
          "size": "small-1",
        },
        "label": {
          "color": "black",
          "fontSize": "small-2",
        },
        "non-existing-part": {},
      }
    `);
  });
});

// test('base styles are always added');
// test('override order: base < size < state < variant');
// test('override order: base < size < state < variant (with parts)');

// // example 'Button.state.hover' => 'Button:hover'
// test('transform state styles');
// test('transform state styles (with parts)');

// test('styles are not transpiled with tokens')

// test('usage with <Box>');
// test('usage with <Box> (with parts)');

// const Component = () => {
//   const r = useComponentStyles('name');
//   const f = useComponentStyles('name', {}, { parts: ['wrapper', 'icon'] });
//   console.log(f.wrapper, f.icon, f.name);
// };
