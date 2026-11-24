import * as system from './index';

test('does not export the style-prop class maps removed in v19', () => {
  const exported = Object.keys(system);

  expect(exported).not.toContain('fontWeight');
  expect(exported).not.toContain('textSize');
});

test('does not export the <SVG> component removed in v19', () => {
  expect(Object.keys(system)).not.toContain('SVG');
});
