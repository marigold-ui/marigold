import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva({ base: '*:aria-hidden:hidden' }),
  track: cva({
    base: [
      'relative bg-border rounded-full flex w-full touch-none select-none items-center',
      'orientation-vertical:h-full orientation-vertical:w-auto orientation-vertical:flex-col',
      'group-disabled/field:bg-disabled-surface group-disabled/field:cursor-not-allowed',
    ],
  }),
  selectedTrack: cva({
    base: [
      'absolute bg-primary orientation-horizontal:h-full orientation-vertical:w-full rounded-full',
      'group-disabled/field:bg-disabled',
    ],
  }),
  thumb: cva({
    base: [
      'block h-5 w-5 rounded-full border-2 border-primary bg-surface',
      'focus-visible:ui-state-focus outline-none',
      'group-disabled/field:cursor-not-allowed group-disabled/field:border-disabled group-disabled/field:bg-disabled-surface',
    ],
  }),
  output: cva({
    base: 'text-foreground text-sm group-disabled/field:text-disabled',
  }),
};
