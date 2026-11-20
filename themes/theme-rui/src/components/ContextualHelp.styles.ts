import { ThemeComponent, cva } from '@marigold/system';

export const ContextualHelp: ThemeComponent<'ContextualHelp'> = {
  trigger: cva({
    base: [
      'inline-flex items-center justify-center rounded-full transition-[color,box-shadow]',
      'hover:ui-state-hover-ghost hover:text-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      // Room for the focus ring, layout unchanged.
      'p-1 -m-1',
      'focus-visible:ui-state-focus outline-none',
      'cursor-pointer ui-touch-hitbox',
    ],
    variants: {
      variant: {
        help: '',
        info: '',
      },
      size: {
        default: '[&_svg]:size-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  container: cva({
    base: [
      'outline-none',
      'ui-surface shadow-elevation-overlay ui-scrollbar',
      // 24px mirrors React Aria's 12px edge padding per side. A classic scrollbar can still eat into it.
      'data-small:max-w-[min(var(--container-3xs),100vw-24px)]',
      'data-medium:max-w-[min(var(--container-xs),100vw-24px)]',
      'data-large:max-w-[min(var(--container-md),100vw-24px)]',
    ],
  }),
  title: cva({ base: 'text-lg font-semibold px-5 pt-5 mb-1' }),
  description: cva({ base: 'text-secondary mb-1 text-sm px-5' }),
  content: cva({ base: 'text-sm px-5 pb-5 pt-1' }),
};
