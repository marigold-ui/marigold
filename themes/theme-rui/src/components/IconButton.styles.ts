import { ThemeComponent, cva } from '@marigold/system';

export const IconButton: ThemeComponent<'IconButton'> = cva({
  variants: {
    variant: {
      navigation:
        'ui-button-base text-sm hover:ui-state-hover-ghost h-control py-2 px-2.5',
    },
  },
});
