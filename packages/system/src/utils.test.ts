import { cva } from './utils';

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
