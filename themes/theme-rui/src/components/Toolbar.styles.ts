import { type ThemeComponent, cva } from '@marigold/system';

export const Toolbar: ThemeComponent<'Toolbar'> = {
  container: cva({
    base: [
      'flex w-full items-center',
      // Children align on their input baseline so a SearchField, Select and
      // Button sit on the same line.
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    ],
    variants: {
      size: {
        default: 'gap-2',
        small: 'gap-1',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  group: cva({
    base: 'flex items-center gap-1',
  }),
  actions: cva({
    // Takes the space left by the pinned controls so this region (not the pinned
    // controls) is the one that shrinks, collapsing its buttons into the "More"
    // menu; `min-w-0` allows that shrink and `relative` anchors the measurement
    // layer. Actions stay packed next to the pinned controls — no forced
    // right-alignment, so there is no gap when the bar is wide.
    base: 'relative flex min-w-0 flex-1 items-center',
    variants: {
      size: {
        default: 'gap-2',
        small: 'gap-1',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  separator: cva({
    // A vertical hairline rule between clusters of controls in the horizontal
    // bar.
    base: 'mx-1 h-5 w-px shrink-0 self-center bg-border',
  }),
};
