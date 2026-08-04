import { type ThemeComponent, cva } from '@marigold/system';

export const BooleanField: ThemeComponent<'BooleanField'> = {
  container: cva({
    base: 'grid gap-x-2',
    variants: {
      variant: {
        default: 'grid-cols-[auto_1fr]',
        settings: 'grid-cols-[1fr_auto]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  description: cva({
    base: 'mt-0.5',
    variants: {
      variant: {
        default: 'col-start-2',
        settings: 'col-start-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
