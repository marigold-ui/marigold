import { cva, getColor } from './utils';

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

  // Support Tailwinds DEFAULT
  expect(getColor(theme, 'accent')).toMatchInlineSnapshot(
    `"default-accent-color"`
  );
});
