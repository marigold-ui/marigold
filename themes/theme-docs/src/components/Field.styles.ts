import { ThemeComponent, cva } from '@marigold/system';

export const Field: ThemeComponent<'Field'> = cva('grid gap-y-0.5', {
  variants: {
    variant: {
      default: 'gap-y-0.5',
      floating: [
        'grid-cols-[min-content_auto] grid-rows-[auto_auto] gap-x-5',
        'items-center',
      ],
    },
  },
});
