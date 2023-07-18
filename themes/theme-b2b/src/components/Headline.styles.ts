import { ThemeComponent, cva } from '@marigold/system';

export const Headline: ThemeComponent<'Headline'> = cva('text-text-body', {
  variants: {
    size: {
      'level-1': 'mb-6 text-5xl font-black',
      'level-2': 'mb-2 mt-8 text-2xl font-black',
      'level-3': 'mb-2 mt-4 text-2xl font-black',
      'level-4': 'text-lg font-black',
      'level-5': 'text-base font-black',
      'level-6': 'text-base font-normal uppercase',
    },
  },
});
