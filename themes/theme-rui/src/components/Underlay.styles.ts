import { ThemeComponent, cva } from '@marigold/system';

export const Underlay: ThemeComponent<'Underlay'> = cva({
  base: 'bg-overlay-backdrop px-4',
  variants: {
    variant: {
      // For overlays opened by a keyboard shortcut many times a day, such as
      // the CommandPalette. The default fade would make them feel slow, no
      // fade at all feels abrupt. A short one, and closing faster than
      // opening. The durations are set on the animation itself: the
      // `--fade-*-duration` tokens resolve on `:root`, so overriding them
      // here would change nothing.
      quick:
        'entering:[animation-duration:150ms]! exiting:[animation-duration:100ms]!',
    },
  },
});
