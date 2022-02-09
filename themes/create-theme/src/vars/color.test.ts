import * as color from './color';

test('colors adhere spec (<color name>-<hue>', () => {
  const { brand, ...colors } = color;
  Object.values(colors)
    .map(o => Object.keys(o))
    .flat()
    .forEach(name => {
      expect(name).toMatch(/^[a-z]+-[0-9]0$/);
    });
});

test('contains reservix brand color', () => {
  expect(color.brand).toMatchInlineSnapshot(`
    {
      "primary": "#fa8005",
    }
  `);
});
