import { ThemeComponent, cva } from '@marigold/system';

export const Text: ThemeComponent<'Text'> = cva('', {
  variants: {
    variant: {
      muted: ['text-text-base-disabled'],
    },
  },
});
