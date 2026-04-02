import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva({ base: '*:aria-hidden:hidden' }),
  track: cva({
    base: [
      'relative bg-border rounded-full flex w-full touch-none select-none items-center',
      'orientation-vertical:h-full orientation-vertical:w-auto orientation-vertical:flex-col',
      'disabled:bg-disabled-surface disabled:cursor-not-allowed',
    ],
  }),
  selectedTrack: cva({
    base: [
      'absolute bg-primary orientation-horizontal:h-full orientation-vertical:w-full rounded-full',
      'disabled:bg-disabled',
    ],
  }),
  thumb: cva({
    base: [
      'block h-5 w-5 rounded-full border-2 border-primary bg-surface',
      'shadow-elevation-border',
      'focus-visible:ui-state-focus outline-none',
      'disabled:cursor-not-allowed disabled:border-disabled disabled:shadow-none',
    ],
  }),
  output: cva({ base: 'text-foreground text-sm' }),
};
