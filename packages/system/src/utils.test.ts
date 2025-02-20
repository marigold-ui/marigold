import { cva, ensureCssVar, get, isValidCssCustomPropertyName } from './utils';

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

test('is valid css property name', () => {
  expect(isValidCssCustomPropertyName('valid')).toBeTruthy();
  expect(isValidCssCustomPropertyName('red-500')).toBeTruthy();
  expect(isValidCssCustomPropertyName('H3llo')).toBeTruthy();

  expect(isValidCssCustomPropertyName('#333')).toBeFalsy();
  expect(isValidCssCustomPropertyName('hsl(1 1 100)')).toBeFalsy();
});

test('get ccs var', () => {
  expect(ensureCssVar('blue-100')).toMatchInlineSnapshot(
    `"var(--blue-100, blue-100)"`
  );
  expect(ensureCssVar('hotpink')).toMatchInlineSnapshot(
    `"var(--hotpink, hotpink)"`
  );
  expect(ensureCssVar('#111')).toMatchInlineSnapshot(`"#111"`);
  expect(ensureCssVar('hsl(2 0.5 90)')).toMatchInlineSnapshot(
    `"hsl(2 0.5 90)"`
  );
});
