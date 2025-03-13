import { ThemeComponent, cva } from '@marigold/system';

export const Headline: ThemeComponent<'Headline'> = cva('', {
  variants: {
    size: {
      'level-1': 'text-5xl font-black',
      'level-2': 'text-3xl font-black',
      'level-3': 'text-2xl font-black',
      'level-4': 'text-lg font-black',
      'level-5': 'text-base font-black',
      'level-6': 'text-base font-normal',
    },
  },
});
