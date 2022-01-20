import {
  appendVariantState,
  conditional,
  ensureArray,
  ensureArrayVariant,
  ensureVariantDefault,
} from './variant';

test('ensure array', () => {
  expect(ensureArray('foo')).toEqual(['foo']);
  expect(ensureArray(['foo'])).toEqual(['foo']);
  expect(ensureArray(['foo', 'bar'])).toEqual(['foo', 'bar']);
  expect(ensureArray(undefined)).toEqual([]);
});

test('ensure variant default', () => {
  expect(ensureVariantDefault('foo.')).toEqual('foo');
  expect(ensureVariantDefault('foo')).toEqual('foo');
});

test('ensure array of variants', () => {
  expect(ensureArrayVariant('foo')).toEqual(['foo']);
  expect(ensureArrayVariant(['foo'])).toEqual(['foo']);
  expect(ensureArrayVariant(['foo', 'bar'])).toEqual(['foo', 'bar']);
  expect(ensureArrayVariant(undefined)).toEqual([]);
});

test('append variant state', () => {
  expect(appendVariantState('foo', 'checked')).toEqual('foo.:checked');
  expect(appendVariantState('foo', 'focus')).toEqual('foo.:focus');
  expect(appendVariantState('foo', 'disabled')).toEqual('foo.:disabled');
});

test('conditional variants', () => {
  expect(
    conditional('foo', {
      checked: true,
      focus: true,
      disabled: true,
    })
  ).toMatchInlineSnapshot(`
    [
      "foo",
      "foo.:checked",
      "foo.:focus",
      "foo.:disabled",
    ]
  `);

  expect(
    conditional('foo', {
      checked: true,
      focus: false,
      disabled: true,
    })
  ).toMatchInlineSnapshot(`
    [
      "foo",
      "foo.:checked",
      "foo.:disabled",
    ]
  `);
});

test('disabled is always last state variant', () => {
  const one = conditional('foo', {
    disabled: true,
    checked: true,
    focus: true,
  });

  expect(one[one.length - 1]).toMatchInlineSnapshot(`"foo.:disabled"`);

  const two = conditional('foo', {
    checked: true,
    disabled: true,
    focus: true,
  });

  expect(two[two.length - 1]).toMatchInlineSnapshot(`"foo.:disabled"`);
});
