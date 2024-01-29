import { ThemeComponent, cva } from '@marigold/system';

export const Message: ThemeComponent<'Message'> = {
  container: cva('not-prose relative w-full rounded-lg p-4 pl-11', {
    variants: {
      variant: {
        info: 'bg-bg-info text-text-info',
        warning: 'bg-bg-warning text-text-warning',
      },
    },
  }),
  icon: cva('absolute left-3 top-3 block size-6'),
  title: cva('mb-1 font-bold leading-none tracking-tight'),
  content: cva('text-sm [&_p]:leading-relaxed'),
};
