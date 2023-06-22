import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Text: ThemeComponent<'Text'> = cva('', {
  variants: {
    variant: {
      bold: ['font-bold'],
      muted: ['text-text-disabled'],
    },
  },
});
