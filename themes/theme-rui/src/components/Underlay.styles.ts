import { ThemeComponent, cva } from '@marigold/system';

export const Underlay: ThemeComponent<'Underlay'> = cva({
  base: 'bg-overlay-backdrop px-4',
  variants: {
    variant: {
      // For overlays opened by a keyboard shortcut many times a day, such as
      // the CommandPalette. They appear and disappear at once, a fade would
      // only make them feel slow. Inherited by the overlay inside.
      instant: '[--fade-in-duration:0s] [--fade-out-duration:0s]',
    },
  },
});
