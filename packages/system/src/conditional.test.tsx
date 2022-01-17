import { conditional } from './conditional';

test('returns an array of strings', () => {
  const variant = conditional('input', { checked: true, disabled: true });
  expect(variant).toEqual(expect.arrayContaining([expect.any(String)]));
});

test('returns the variant and the conditional states', () => {
  const variant = conditional('input', { checked: true, disabled: true });
  expect(['input', 'input.:checked', 'input.:disabled']).toEqual(
    expect.arrayContaining(variant)
  );
});

test('returns only truthy states', () => {
  const variant = conditional('input', { checked: true, disabled: false });
  expect(['input', 'input.:checked']).toEqual(expect.arrayContaining(variant));
});

test('removes dot from the end of the variant string', () => {
  // This happens if you have variant='' in your component and define __default in your theme
  const variant = conditional('input.', { checked: true, disabled: false });
  expect(['input', 'input.:checked']).toEqual(expect.arrayContaining(variant));
});

test('sets disabled at the last position in the returned array', () => {
  const variant = conditional('input', { disabled: true, checked: true });
  expect(['input', 'input.:checked', 'input.:disabled']).toEqual(
    expect.arrayContaining(variant)
  );
});
