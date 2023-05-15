import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Badge: ThemeComponent<'Badge'> = cva(
  'inline-flex align-middle text-xxsmall rounded-3xl whitespace-nowrap px-2 py-0.5',
  {
    variants: {
      variant: {
        info: 'text-info-text bg-info-bg',
        dark: 'text-dark-text bg-dark-bg',
      },
    },
  }
);
