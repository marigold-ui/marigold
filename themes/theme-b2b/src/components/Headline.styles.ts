import { ThemeComponent, cva } from '@marigold/system';

export const Headline: ThemeComponent<'Headline'> = cva('', {
  variants: {
    size: {
      'level-1': 'text-2xl',
      'level-2': 'text-base',
      'level-3': 'text-sm',
      'level-4': 'text-[1.125rem]',
      'level-5': 'text-xs',
      'level-6': 'text-xs uppercase',
    },
  },
});
