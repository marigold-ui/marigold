import { ThemeComponent, cva } from '@marigold/system';

export const Text: ThemeComponent<'Text'> = cva('', {
  variants: {
    variant: {
      bold: ['font-bold'],
      muted: ['text-text-disabled'],
    },
  },
});
