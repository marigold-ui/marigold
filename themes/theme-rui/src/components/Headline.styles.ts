import { ThemeComponent, cva } from '@marigold/system';

export const Headline: ThemeComponent<'Headline'> = cva({
  variants: {
    size: {
      'level-1': 'text-3xl font-extrabold',
      'level-2': 'text-2xl font-bold',
      'level-3': 'text-xl font-semibold',
      'level-4': 'text-lg font-semibold',
      'level-5': 'text-base font-medium',
      'level-6': 'text-base font-normal',
    },
  },
});
