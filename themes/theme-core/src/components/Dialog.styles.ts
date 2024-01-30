import { ThemeComponent, cva } from '@marigold/system';

export const Dialog: ThemeComponent<'Dialog'> = {
  container: cva('bg-bg-surface rounded-sm px-8 pb-8 pt-4', {
    variants: {
      size: {
        medium: 'w-[600px]',
      },
    },
  }),
  closeButton: cva([
    'relative right-[-24px] top-[-8px] size-6',
    'bg-bg-brand text-text-inverted',
    'border-border-brand rounded-sm border',
    'hover:bg-bg-brand-hover',
  ]),
};
