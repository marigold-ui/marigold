import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Headline: ThemeComponent<'Headline'> = cva('font-black', {
  variants: {
    size: {
      'level-1': 'text-[2rem]',
      'level-2': 'text-2xl mb-6',
      'level-3': 'text-xl',
      'level-4': 'text-lg',
      'level-5': 'text-base',
      'level-6': 'text-[13px] uppercase',
    },
  },
});
