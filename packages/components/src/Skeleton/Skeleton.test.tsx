import { render, screen } from '@testing-library/react';
import { Basic, Rounded, Sizes } from './Skeleton.stories';

// Placeholders are aria-hidden, so they only show up with `hidden: true`.
const getSkeletons = () =>
  screen
    .getAllByRole('generic', { hidden: true })
    .filter(el => el.getAttribute('aria-hidden') === 'true');

test('hides the placeholder from assistive technology', () => {
  render(<Basic.Component />);

  const [skeleton] = getSkeletons();

  expect(skeleton).toBeEmptyDOMElement();
  expect(screen.queryAllByRole('generic')).not.toContain(skeleton);
});

test('sizes itself from width and height', () => {
  render(<Basic.Component width="1/2" height={6} />);

  const [skeleton] = getSkeletons();

  expect(skeleton.style.getPropertyValue('--width')).toBe(
    'calc((1 / 2) * 100%)'
  );
  expect(skeleton.style.getPropertyValue('--height')).toBe(
    'calc(var(--spacing) * 6)'
  );
});

test('defaults to full width and one line of text', () => {
  render(<Sizes.Component />);

  // The second placeholder in the story sets neither width nor height.
  const skeleton = getSkeletons()[1];

  expect(skeleton.style.getPropertyValue('--width')).toBe('100%');
  expect(skeleton.style.getPropertyValue('--height')).toBe(
    'calc(var(--spacing) * 4)'
  );
});

test('styles the rounded variant differently from the default', () => {
  render(<Rounded.Component />);

  const [avatar, line] = getSkeletons();

  expect(avatar.className).not.toBe(line.className);
});
