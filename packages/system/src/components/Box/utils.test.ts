import { transformPseudos } from './utils';

describe('transform states', () => {
  test('returns a css object', () => {
    expect(transformPseudos({})).toEqual({});
    expect(
      transformPseudos({
        color: '#fa5252',
        padding: 10,
      })
    ).toMatchInlineSnapshot(`
      {
        "color": "#fa5252",
        "padding": 10,
      }
    `);
  });

  test.each([
    {
      name: ':hover',
      input: {
        '&:hover': {},
      },
      expected: {
        '&:hover, &[data-hover]': {},
      },
    },
    {
      name: ':focus',
      input: {
        '&:focus': {},
      },
      expected: {
        '&:focus, &[data-focus]': {},
      },
    },
    {
      name: ':focus-visible',
      input: {
        '&:focus-visible': {},
      },
      expected: {
        '&:focus-visible, &[data-focus-visible]': {},
      },
    },
    {
      name: ':active',
      input: {
        '&:active': {},
      },
      expected: {
        '&:active, &[data-active]': {},
      },
    },
    {
      name: ':disabled',
      input: {
        '&:disabled': {},
      },
      expected: {
        '&[disabled], &[aria-disabled=true], &[data-disabled]': {},
      },
    },
    {
      name: ':read-only',
      input: {
        '&:read-only': {},
      },
      expected: {
        '&[readonly], &[aria-readonly=true], &[data-read-only]': {},
      },
    },
    {
      name: ':checked',
      input: {
        '&:checked': {},
      },
      expected: {
        '&[aria-checked=true], &[data-checked]': {},
      },
    },
    {
      name: ':selected',
      input: {
        '&:selected': {},
      },
      expected: {
        '&[aria-selected=true], &[data-selected]': {},
      },
    },
    {
      name: ':indeterminate',
      input: {
        '&:indeterminate': {},
      },
      expected: {
        '&[aria-checked=mixed], &[data-indeterminate]': {},
      },
    },
    {
      name: ':error',
      input: {
        '&:error': {},
      },
      expected: {
        '&:invalid, &[aria-invalid=true], &[data-error]': {},
      },
    },
    {
      name: ':expanded',
      input: {
        '&:expanded': {},
      },
      expected: {
        '&[aria-expanded=true], &[data-expanded]': {},
      },
    },
    {
      name: ':in-group',
      input: {
        '&:in-group': {},
      },
      expected: {
        '[role=group] &, [data-group] &': {},
      },
    },
    {
      name: ':hover-group',
      input: {
        '&:hover-group': {},
      },
      expected: {
        '[role=group]:hover &, [role=group][data-hover] &, [data-group]:hover &, [data-group][data-hover] &':
          {},
      },
    },
    {
      name: ':focus-group',
      input: {
        '&:focus-group': {},
      },
      expected: {
        '[role=group]:focus &, [role=group][data-focus] &, [data-group]:focus &, [data-group][data-focus] &':
          {},
      },
    },
    {
      name: ':active-group',
      input: {
        '&:active-group': {},
      },
      expected: {
        '[role=group]:active &, [role=group][data-active] &, [data-group]:active &, [data-group][data-active] &':
          {},
      },
    },
    {
      name: ':error-group',
      input: {
        '&:error-group': {},
      },
      expected: {
        '[role=group]:invalid &, [role=group][aria-invalid=true] &, [role=group][data-error] &, [data-group]:invalid &, [data-group][aria-invalid=true] &, [data-group][data-error] &':
          {},
      },
    },
  ])('tramsform "$name" to selector', ({ input, expected }) => {
    expect(transformPseudos(input)).toEqual(expected);
  });

  test('transform nested pseudos', () => {
    expect(
      transformPseudos({
        padding: 8,
        '&:hover': {
          color: '#1864ab',
          '&:focus': {
            outline: '1px solid #228be6',
          },
        },
      })
    ).toMatchInlineSnapshot(`
      {
        "&:hover, &[data-hover]": {
          "&:focus, &[data-focus]": {
            "outline": "1px solid #228be6",
          },
          "color": "#1864ab",
        },
        "padding": 8,
      }
    `);
  });
});
