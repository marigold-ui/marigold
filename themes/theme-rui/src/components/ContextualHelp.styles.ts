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
      'data-small:max-w-3xs data-medium:max-w-xs data-large:max-w-md',
    ],
  }),
  title: cva({ base: 'text-lg font-semibold px-5 pt-5 mb-1' }),
  content: cva({ base: 'text-sm px-5 pb-5 pt-1' }),
};
