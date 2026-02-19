import { ThemeComponent, cva } from '@marigold/system';

export const Headline: ThemeComponent<'Headline'> = cva({
  base: '*:no-underline',
  variants: {
    size: {
      'level-1':
        'scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl',
      'level-2':
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
      'level-3': 'scroll-m-20 text-2xl font-semibold tracking-tight',
      'level-4': 'scroll-m-20 text-xl font-semibold tracking-tight',
      'level-5': 'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
      'level-6': 'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
    },
  },
});
