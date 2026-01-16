import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva('*:aria-hidden:hidden'),
  track: cva([
    'relative bg-muted rounded-lg flex w-full touch-none select-none items-center',
    'orientation-vertical:h-full orientation-vertical:w-auto orientation-vertical:flex-col disabled:opacity-50',
  ]),
  selectedTrack: cva([
    'absolute bg-black orientation-horizontal:h-full orientation-vertical:w-full rounded-lg',
  ]),
  thumb: cva([
    'block h-5 w-5 rounded-full border-2 border-primary bg-background transition-colors',
    'focus-visible:ui-state-focus outline-none',
    'disabled:cursor-not-allowed',
  ]),
  output: cva('text-foreground text-sm'),
};
