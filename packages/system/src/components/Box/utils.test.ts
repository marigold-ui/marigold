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
        '&:indeterminate, &[aria-checked=mixed], &[data-indeterminate]': {},
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
