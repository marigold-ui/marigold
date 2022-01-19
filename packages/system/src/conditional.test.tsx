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
  const variant = conditional('input', { checked: true, error: false });
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
