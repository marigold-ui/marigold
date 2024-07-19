import { ThemeComponent, cva } from '@marigold/system';

export const Field: ThemeComponent<'Field'> = cva('grid gap-y-0.5', {
  variants: {
    variant: {
      default: 'gap-y-0.5',
      floating: 'relative grid-cols-1 grid-rows-[auto_auto]',
    },
  },
});
