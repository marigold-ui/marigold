import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva(
    [
      'not-prose items-center rounded-lg p-4',
      'grid-cols-[min-content_auto] gap-1 [grid-template-areas:"icon_title_title""none_content_content"]',
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
  content: cva('text-sm [&_p]:leading-relaxed [&_code]:text-xs'),
};
