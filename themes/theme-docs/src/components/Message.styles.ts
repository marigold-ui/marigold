import { ThemeComponent, cva } from '@marigold/system';

export const Message: ThemeComponent<'Message'> = {
  container: cva(
    [
      'not-prose rounded-lg p-4 items-center',
      'grid-cols-[min-content,auto] gap-1 [grid-template-areas:"icon_title_title""none_content_content"]',
    ],
    {
      variants: {
        variant: {
          info: 'bg-bg-info text-text-info',
          warning: 'bg-bg-warning text-text-warning',
        },
      },
    }
  ),
  icon: cva('size-6'),
  title: cva('mb-1 font-bold leading-none tracking-tight'),
  content: cva('text-sm [&_p]:leading-relaxed'),
};
