import { normalize, getNormalizedStyles } from './normalize';

test.each(Object.entries(normalize))('base is included in %p', (_, value) => {
  expect(value).toMatchObject(normalize.base);
});

test('get normalized styles', () => {
  expect(getNormalizedStyles('a')).toMatchObject(normalize.a);
  expect(getNormalizedStyles('p')).toMatchObject(normalize.p);
});

test('return base normalzation for arbitrary components', () => {
  const Component = () => null;
  expect(getNormalizedStyles(Component)).toMatchObject(normalize.base);
});
