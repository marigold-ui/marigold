import { cva, get, getColor } from './utils';

test('cva (simple)', () => {
  expect(cva(['text-sm'])()).toMatchInlineSnapshot(`"text-sm"`);
});

test('cva (variants)', () => {
  const styles = cva(['text-sm'], {
    variants: {
      variant: {
        blue: 'text-blue-500',
      },
      size: {
        large: 'text-lg',
      },
    },
  });

  expect(styles()).toMatchInlineSnapshot(`"text-sm"`);
  expect(styles({ variant: 'blue' })).toMatchInlineSnapshot(
    `"text-sm text-blue-500"`
  );
  expect(styles({ size: 'large' })).toMatchInlineSnapshot(`"text-lg"`);
});

test('get', () => {
  const obj = {
    root: 'root-value',
    nested: {
      value: {
        very: {
          deep: 'deeeeply-nested-value',
        },
        even: {
          more: {
            deep: 'can anybody hear me!?',
          },
        },
        DEFAULT: 'this-is-just-for-reference',
      },
    },
  };

  expect(get(obj, 'does.not.exist')).toMatchInlineSnapshot(`undefined`);
  expect(get(obj, 'does.not.exist', 'fallback')).toMatchInlineSnapshot(
    `"fallback"`
  );

  expect(get(obj, 'root')).toMatchInlineSnapshot(`"root-value"`);
  expect(get(obj, 'nested.value.very.deep')).toMatchInlineSnapshot(
    `"deeeeply-nested-value"`
  );
  expect(get(obj, 'nested.value.even.more.deep')).toMatchInlineSnapshot(
    `"can anybody hear me!?"`
  );

  expect(get(obj, 'nested.value')).toMatchInlineSnapshot(`
{
  "DEFAULT": "this-is-just-for-reference",
  "even": {
    "more": {
      "deep": "can anybody hear me!?",
    },
  },
  "very": {
    "deep": "deeeeply-nested-value",
  },
}
`);
});

test('getColor', () => {
  const theme = {
    colors: {
      brand: {
        100: 'brand-color',
      },
      accent: {
        DEFAULT: 'default-accent-color',
        hover: 'accent-hover-color',
      },
      text: {
        primary: {
          muted: 'muted-color',
        },
      },
    },
  };

  expect(getColor(theme, 'does-not-exist')).toMatchInlineSnapshot(`undefined`);
  expect(getColor(theme, 'does-not-exist', 'fallback')).toMatchInlineSnapshot(
    `"fallback"`
  );

  expect(getColor(theme, 'brand-100')).toMatchInlineSnapshot(`"brand-color"`);
  expect(getColor(theme, 'accent-hover')).toMatchInlineSnapshot(
    `"accent-hover-color"`
  );
  expect(getColor(theme, 'text-primary-muted')).toMatchInlineSnapshot(
    `"muted-color"`
  );

  // Support Tailwinds DEFAULT
  expect(getColor(theme, 'accent')).toMatchInlineSnapshot(
    `"default-accent-color"`
  );
});
