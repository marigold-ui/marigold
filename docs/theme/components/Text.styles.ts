import { ThemeComponent, cva } from '@marigold/system';

export const Text: ThemeComponent<'Text'> = cva(
  'leading-7 [&:not(:first-child)]:mt-6',
  {
    variants: {
      variant: {
        lead: 'text-muted-foreground text-xl',
        large: 'text-lg font-semibold',
        small: 'text-sm font-medium leading-none',
        muted: 'text-muted-foreground text-sm',
      },
    },
  }
);
