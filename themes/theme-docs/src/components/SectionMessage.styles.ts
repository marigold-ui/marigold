import { ThemeComponent, cva } from '@marigold/system';

export const SectionMessage: ThemeComponent<'SectionMessage'> = {
  container: cva({
    base: [
      'not-prose items-center rounded-lg p-4',
      "grid-cols-[min-content_auto] gap-1 [grid-template-areas:'icon_title_title''none_content_content']",
    ],
    variants: {
      variant: {
        info: 'bg-bg-info text-text-info',
        warning: 'bg-bg-warning text-text-warning',
      },
    },
  }),
  icon: cva({ base: 'size-6' }),
  title: cva({ base: 'mb-1 font-bold leading-none tracking-tight' }),
  content: cva({ base: 'text-sm [&_p]:leading-relaxed [&_code]:text-xs' }),
  close: cva({ base: 'h-5 w-5 text-center' }),
};
