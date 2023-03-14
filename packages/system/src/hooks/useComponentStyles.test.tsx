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
    button: tv({
      base: 'border-none p-1',
      variants: {
        variant: {
          primary: 'bg-primary-700',
          secondary: 'bg-secondary-700',
        },
      },
    }),
    checkbox: tv({
      slots: {
        base: 'inline align-middle gap-4',
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
    console.log(result.current);
    expect(result.current).toEqual({});
  });

  test('returns empty object if component does not exist in theme', () => {
    const { result } = renderHook(
      () => useComponentStylesFromTV('NotExisting'),
      {
        wrapper,
      }
    );
    expect(result.current).toEqual({});
  });
});

// describe('useComponentStyles (simple)', () => {
//   test('get base styles for a component', () => {
//     const { result } = renderHook(() => useComponentStyles('Button'), {
//       wrapper,
//     });
//     expect(result.current).toMatchInlineSnapshot(`
//           {
//             "appearance": "none",
//             "bg": "white",
//           }
//       `);
//   });

//   test('returns empty object if component has no base styles', () => {
//     const { result } = renderHook(() => useComponentStyles('GotNoBase'), {
//       wrapper,
//     });
//     expect(result.current).toEqual({});
//   });

//   test('get variant styles for a component', () => {
//     let view = renderHook(
//       () => useComponentStyles('Button', { variant: 'primary' }),
//       {
//         wrapper,
//       }
//     );
//     expect(view.result.current).toMatchInlineSnapshot(`
//           {
//             "appearance": "none",
//             "bg": "white",
//             "color": "primary",
//           }
//       `);

//     view = renderHook(
//       () => useComponentStyles('Button', { variant: 'secondary' }),
//       {
//         wrapper,
//       }
//     );
//     expect(view.result.current).toMatchInlineSnapshot(`
//           {
//             "appearance": "none",
//             "bg": "white",
//             "color": "secondary",
//           }
//       `);
//   });

//   test('works if variant does not exist', () => {
//     const { result } = renderHook(
//       () => useComponentStyles('Button', { variant: 'non-existing-variant' }),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//           {
//             "appearance": "none",
//             "bg": "white",
//           }
//       `);
//   });

//   test('base styles are applied together with variant', () => {
//     const { result } = renderHook(
//       () => useComponentStyles('Button', { variant: 'primary' }),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchObject({
//       appearance: 'none',
//       bg: 'white',
//     });
//   });

//   test('get size styles for a component', () => {
//     let view = renderHook(
//       () => useComponentStyles('Button', { size: 'small' }),
//       {
//         wrapper,
//       }
//     );
//     expect(view.result.current).toMatchInlineSnapshot(`
//       {
//         "appearance": "none",
//         "bg": "white",
//         "height": "small-1",
//       }
//     `);

//     view = renderHook(() => useComponentStyles('Button', { size: 'medium' }), {
//       wrapper,
//     });
//     expect(view.result.current).toMatchInlineSnapshot(`
//       {
//         "appearance": "none",
//         "bg": "white",
//         "height": "medium-1",
//       }
//     `);
//   });

//   test('works if size does not exist', () => {
//     const { result } = renderHook(
//       () => useComponentStyles('Button', { size: 'non-existing-size' }),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//       {
//         "appearance": "none",
//         "bg": "white",
//       }
//     `);
//   });

//   test('base styles are applied together with size', () => {
//     const { result } = renderHook(
//       () => useComponentStyles('Button', { size: 'small' }),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchObject({
//       appearance: 'none',
//       bg: 'white',
//     });
//   });
// });

// describe('useComponentStyles (complex)', () => {
//   test('get base styles for a component (with parts)', () => {
//     const { result } = renderHook(
//       () =>
//         useComponentStyles(
//           'Checkbox',
//           {},
//           { parts: ['container', 'icon', 'label'] }
//         ),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//       {
//         "container": {
//           "alignItems": "center",
//           "display": "flex",
//           "gap": "small-1",
//         },
//         "icon": {
//           "height": "small-1",
//           "width": "small-1",
//         },
//         "label": {
//           "color": "black",
//           "fontSize": "small-2",
//         },
//       }
//     `);
//   });

//   test('get variant styles for a component (with parts)', () => {
//     const { result } = renderHook(
//       () =>
//         useComponentStyles(
//           'Checkbox',
//           { variant: 'pink' },
//           { parts: ['container', 'icon', 'label'] }
//         ),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//       {
//         "container": {
//           "alignItems": "center",
//           "display": "flex",
//           "gap": "small-1",
//         },
//         "icon": {
//           "height": "small-1",
//           "width": "small-1",
//         },
//         "label": {
//           "color": "pink",
//           "fontSize": "small-2",
//         },
//       }
//     `);
//   });

//   test('get size styles for a component (with parts)', () => {
//     const { result } = renderHook(
//       () =>
//         useComponentStyles(
//           'Checkbox',
//           { size: 'small' },
//           { parts: ['container', 'icon', 'label'] }
//         ),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//       {
//         "container": {
//           "alignItems": "center",
//           "display": "flex",
//           "gap": "small-1",
//           "p": "small-1",
//         },
//         "icon": {
//           "height": "small-1",
//           "width": "small-1",
//         },
//         "label": {
//           "color": "black",
//           "fontSize": "small-2",
//         },
//       }
//     `);
//   });

//   test('returns empty objects if part does not exist', () => {
//     const { result } = renderHook(
//       () =>
//         useComponentStyles(
//           'Checkbox',
//           {},
//           { parts: ['container', 'non-existing-part'] }
//         ),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current['non-existing-part']).toMatchInlineSnapshot(`{}`);
//   });

//   test('returns only requested parts', () => {
//     const { result } = renderHook(
//       () => useComponentStyles('Checkbox', {}, { parts: ['label'] }),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//       {
//         "label": {
//           "color": "black",
//           "fontSize": "small-2",
//         },
//       }
//     `);
//   });
// });

// describe('style superiority', () => {
//   test('override order: base < size < variant', () => {
//     const { result } = renderHook(
//       () =>
//         useComponentStyles('Button', {
//           size: 'small',
//           variant: 'pink',
//         }),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//       {
//         "appearance": "none",
//         "bg": "white",
//         "height": "small-1",
//       }
//     `);
//   });

//   test('override order: base < size < variant (with parts)', () => {
//     const { result } = renderHook(
//       () =>
//         useComponentStyles(
//           'Checkbox',
//           {
//             size: 'small',
//             variant: 'pink',
//           },
//           { parts: ['container', 'icon', 'label'] }
//         ),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//       {
//         "container": {
//           "alignItems": "center",
//           "display": "flex",
//           "gap": "small-1",
//           "p": "small-1",
//         },
//         "icon": {
//           "height": "small-1",
//           "width": "small-1",
//         },
//         "label": {
//           "color": "pink",
//           "fontSize": "small-2",
//         },
//       }
//     `);
//   });
// });

// describe('style usage', () => {
//   test('styles are not transpiled with tokens', () => {
//     const { result } = renderHook(
//       () =>
//         useComponentStyles('Button', {
//           size: 'small',
//           variant: 'pink',
//         }),
//       {
//         wrapper,
//       }
//     );
//     expect(result.current).toMatchInlineSnapshot(`
//       {
//         "appearance": "none",
//         "bg": "white",
//         "height": "small-1",
//       }
//     `);
//   });

//   test('usage with <Box>', () => {
//     const Button = ({ children }: { children?: ReactNode }) => {
//       const styles = useComponentStyles('Button');
//       return (
//         <Box __baseCSS={styles} data-testid="button">
//           {children}
//         </Box>
//       );
//     };

//     render(
//       <ThemeProvider theme={theme}>
//         <Button>Click me!</Button>
//       </ThemeProvider>
//     );

//     const element = screen.getByTestId('button');
//     expect(element).toHaveStyle('appearance: none');
//     expect(element).toHaveStyle(`background: ${theme.colors.white}`);
//   });

//   test('usage with <Box> (with parts)', () => {
//     const Checkbox = ({ children }: { children?: ReactNode }) => {
//       const styles = useComponentStyles(
//         'Checkbox',
//         {},
//         { parts: ['container', 'icon', 'label'] }
//       );
//       return (
//         <Box data-testid="container" __baseCSS={styles.container}>
//           <Box data-testid="label" as="label" __baseCSS={styles.label}>
//             {children}
//             <Box data-testid="icon" __baseCSS={styles.icon} />
//           </Box>
//         </Box>
//       );
//     };

//     render(
//       <ThemeProvider theme={theme}>
//         <Checkbox>Click me!</Checkbox>
//       </ThemeProvider>
//     );

//     const container = screen.getByTestId('container');
//     expect(container).toHaveStyle('display: flex');
//     expect(container).toHaveStyle('align-items: center');
//     expect(container).toHaveStyle(`gap: ${theme.space['small-1']}px`);

//     const label = screen.getByTestId('label');
//     expect(label).toHaveStyle(`color: ${theme.colors.black}`);
//     expect(label).toHaveStyle(`font-size: ${theme.fontSizes['small-2']}`);

//     const icon = screen.getByTestId('icon');
//     expect(icon).toHaveStyle(`height: ${theme.sizes['small-1']}px`);
//     expect(icon).toHaveStyle(`width: ${theme.sizes['small-1']}px`);
//   });
// });
