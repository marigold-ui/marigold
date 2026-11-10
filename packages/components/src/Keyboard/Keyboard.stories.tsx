import { expect } from 'storybook/test';
import preview from '.storybook/preview';
import { Stack } from '../Stack/Stack';
import { Keyboard } from './Keyboard';

const meta = preview.meta({
  title: 'Components/Keyboard',
  component: Keyboard,
});

export const Basic = meta.story({
  tags: ['component-test'],
  args: {
    children: '⌘K',
  },
  render: ({ children, ...args }) => <Keyboard {...args}>{children}</Keyboard>,
});

Basic.test(
  'renders its children',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    await expect(canvas.getByText('⌘K')).toBeInTheDocument();
  }
);

/**
 * The key cap on each ground it lands on.
 *
 * Fill and border derive from the cap's own text colour (`currentColor`), so
 * the cap stays a light tint on a plain surface, a selected row, a destructive
 * row and a dark ground alike, instead of an opaque box.
 */
export const OnBackgrounds = meta.story({
  tags: ['component-test'],
  args: {
    children: '⌘K',
  },
  render: ({ children, ...args }) => {
    const row = (label: string) => (
      <>
        <span>{label}</span>
        <Keyboard {...args}>{children}</Keyboard>
      </>
    );

    return (
      <Stack space={4}>
        <div className="bg-surface flex items-center justify-between gap-3 rounded border p-4 text-sm">
          {row('Surface')}
        </div>
        <div className="bg-background text-foreground flex items-center justify-between gap-3 rounded border p-4 text-sm">
          {row('Background')}
        </div>
        <div className="bg-selected text-foreground flex items-center justify-between gap-3 rounded p-4 text-sm font-medium">
          {row('Selected row')}
        </div>
        <div className="bg-destructive-accent/10 text-destructive-accent flex items-center justify-between gap-3 rounded p-4 text-sm font-medium">
          {row('Destructive row')}
        </div>
        <div className="bg-primary text-primary-foreground flex items-center justify-between gap-3 rounded p-4 text-sm">
          {row('Primary')}
        </div>
      </Stack>
    );
  },
});

/**
 * Paints a computed colour onto a transparent pixel and reads its alpha back,
 * so the check holds whatever colour syntax the browser serialises to.
 */
const alphaOf = (color: string) => {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) throw new Error('No 2D canvas context');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return ctx.getImageData(0, 0, 1, 1).data[3];
};

OnBackgrounds.test(
  'keeps the cap translucent and in the surrounding font on every ground',
  { parameters: { chromatic: { disableSnapshot: true } } },
  async ({ canvas }) => {
    const caps = canvas.getAllByText('⌘K');

    await expect(caps).toHaveLength(5);

    for (const cap of caps) {
      const alpha = alphaOf(getComputedStyle(cap).backgroundColor);

      await expect(alpha).toBeGreaterThan(0);
      await expect(alpha).toBeLessThan(255);
      await expect(getComputedStyle(cap).fontFamily).toBe(
        getComputedStyle(cap.parentElement!).fontFamily
      );
    }
  }
);
