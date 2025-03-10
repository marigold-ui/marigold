import { ThemeComponent, cva } from '@marigold/system';

export const IconButton: ThemeComponent<'IconButton'> = cva('', {
  variants: {
    variant: {
      navigation: [
        'rounded-xs border-none px-8 leading-[48px] h-component outline-hidden',
        'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1',
        'disabled:text-text-base-disabled disabled:bg-bg-base-disabled disabled:cursor-not-allowed',
        'pending:text-text-base-disabled pending:bg-bg-base-disabled pending:cursor-not-allowed',
      ],
    },
  },
});
