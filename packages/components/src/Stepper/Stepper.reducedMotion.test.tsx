import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Controlled } from './Stepper.stories';

const motion = vi.hoisted(() => ({ reduced: false }));

vi.mock('motion/react', async importOriginal => ({
  ...(await importOriginal<typeof import('motion/react')>()),
  useReducedMotion: () => motion.reduced,
}));

const nextFrame = () =>
  new Promise<void>(resolve => requestAnimationFrame(() => resolve()));

// The current marker shows its step number next to the indicator.
const indicatorOffset = (stepNumber: string) => {
  const number = screen.getByText(stepNumber);
  // eslint-disable-next-line testing-library/no-node-access
  const indicator = number.previousElementSibling as HTMLElement;
  // eslint-disable-next-line testing-library/no-node-access
  const marker = indicator.parentElement as HTMLElement;
  return (
    indicator.getBoundingClientRect().left - marker.getBoundingClientRect().left
  );
};

test('moves the current-step indicator without gliding', async () => {
  const user = userEvent.setup();
  motion.reduced = false;
  render(<Controlled.Component />);
  // Same module `MotionFeatures` loads, so its layout features are in.
  await import('../motionFeatures.js');
  await nextFrame();

  // Control: without reduced motion the indicator is still mid-glide.
  await user.click(screen.getByRole('button', { name: /Account/ }));
  await nextFrame();
  await nextFrame();
  const gliding = indicatorOffset('1');

  motion.reduced = true;
  await user.click(screen.getByRole('button', { name: /Profile/ }));
  await nextFrame();
  await nextFrame();

  expect(Math.abs(gliding)).toBeGreaterThan(1);
  expect(indicatorOffset('2')).toBeCloseTo(0, 0);
});
