import { conditional } from './conditional';

test('returns the variant and the conditional states', () => {
  const variant = conditional('input', { checked: true, disabled: true });
  expect(variant).toMatchInlineSnapshot(`
    [
      "input",
      "input.:checked",
      "input.:disabled",
    ]
  `);
  // expect(['input', 'input.:checked', 'input.:disabled']).toEqual(
  //   expect.arrayContaining(variant)
  // );
});

test('returns only truthy states', () => {
  const variant = conditional('input', { checked: true, disabled: false });
  expect(variant).toMatchInlineSnapshot(`
    [
      "input",
      "input.:checked",
    ]
  `);
});

test('removes dot from the end of the variant string', () => {
  // This happens if you have variant='' in your component and define __default in your theme
  const variant = conditional('input.', { checked: true, disabled: false });
  expect(variant).toMatchInlineSnapshot(`
    [
      "input",
      "input.:checked",
    ]
  `);
});

test('sets disabled at the last position in the returned array', () => {
  const variant = conditional('input', { disabled: true, checked: true });
  expect(variant).toMatchInlineSnapshot(`
  [
    "input",
    "input.:checked",
    "input.:disabled",
  ]
`);
});
