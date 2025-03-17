import { ThemeComponent, cva } from '@marigold/system';

export const IconButton: ThemeComponent<'IconButton'> = cva('', {
  variants: {
    variant: {
      navigation: [
        'border-border-base bg-bg-inverted text-text-base ease-ease-out h-component cursor-pointer rounded-xs border px-4 py-0 text-sm leading-[22px] transition-all duration-200 disabled:cursor-none',
        'disabled:border-border-base-disabled disabled:bg-bg-inverted-disabled disabled:text-text-base-disabled disabled:cursor-not-allowed',
        'pending:border-border-base-disabled pending:bg-bg-inverted-disabled pending:text-text-base-disabled pending:cursor-not-allowed',
        'focus-visible:outline-outline-focus focus-visible:outline focus-visible:outline-offset-1 outline-hidden',
        'hover:bg-bg-inverted-hover',
      ],
    },
  },
});
