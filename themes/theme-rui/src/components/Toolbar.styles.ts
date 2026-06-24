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
  separator: cva({
    // A vertical hairline rule between clusters of controls in the horizontal
    // bar.
    base: 'mx-1 h-5 w-px shrink-0 self-center bg-border',
  }),
};
