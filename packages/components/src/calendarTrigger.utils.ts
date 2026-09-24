import { expect } from 'storybook/test';

export const assertCalendarTriggerHitArea = (trigger: HTMLElement) => {
  const icon = trigger.querySelector('svg')!;

  const button = trigger.getBoundingClientRect();
  const glyph = icon.getBoundingClientRect();

  const left = Math.round(glyph.left - button.left);
  const right = Math.round(button.right - glyph.right);

  expect(left).toBeGreaterThan(0);
  expect(left).toBe(right);

  expect(
    document.elementFromPoint(glyph.left - 4, button.top + button.height / 2)
  ).toBe(trigger);
};
