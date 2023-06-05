import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Badge: ThemeComponent<'Badge'> = cva(
  'text-xxsmall inline-flex whitespace-nowrap rounded-3xl px-2 py-0.5 align-middle',
  {
    variants: {
      variant: {
        info: 'text-text-light bg-bg-info',
      },
    },
  }
);
