import { ThemeComponent, cva } from '@marigold/system';

export const IconButton: ThemeComponent<'IconButton'> = cva({
  variants: {
    variant: {
      navigation:
        'ui-button-base text-sm hover:ui-state-hover-ghost h-9 py-2 px-2.5 disabled:text-disabled disabled:cursor-not-allowed',
    },
  },
});
