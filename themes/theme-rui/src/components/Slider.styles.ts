import { ThemeComponent, cva } from '@marigold/system';

export const Slider: ThemeComponent<'Slider'> = {
  container: cva('*:aria-hidden:hidden'),
  track: cva([
    'relative bg-muted rounded-lg flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50',
  ]),
  selectedTrack: cva([
    'absolute bg-black data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full rounded-lg',
  ]),
  thumb: cva([
    'block h-5 w-5 rounded-full border-2 border-primary bg-white transition-colors',
    'focus-visible:util-focus-borderless-ring outline-none',
    'disabled:cursor-not-allowed',
  ]),
  output: cva('text-foreground text-sm'),
};
