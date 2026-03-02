import { ThemeComponent, cva } from '@marigold/system';

export const ContextualHelp: ThemeComponent<'ContextualHelp'> = {
  trigger: cva({
    base: [
      'inline-flex items-center justify-center rounded-full transition-[color,box-shadow]',
      'hover:ui-state-focus hover:text-foreground',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
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
      'p-5',
      'data-small:max-w-3xs data-medium:max-w-xs data-large:max-w-md',
    ],
  }),
  title: cva({ base: 'text-lg font-semibold mb-1' }),
  content: cva({ base: 'text-sm' }),
};
