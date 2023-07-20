import { ThemeComponent, cva } from '@marigold/system';

export const Message: ThemeComponent<'Message'> = {
  container: cva('not-prose rounded-lg p-4', {
    variants: {
      variant: {
        info: 'bg-bg-info text-text-info',
        warning: 'bg-bg-warning text-text-warning',
      },
    },
  }),
  icon: cva(''),
  title: cva('font-bold tracking-tight'),
  content: cva('text-sm [&_p]:leading-relaxed'),
};
