import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Breadcrumbs: ThemeComponent<'Breadcrumbs'> = {
  container: cva({
    base: [
      'flex flex-wrap items-center gap-1 wrap-break-word text-sm sm:gap-1.5 text-secondary',
    ],
    variants: {
      variant: {
        default: '',
      },
      size: {
        small: 'text-xs',
        default: 'text-sm',
        large: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  item: cva({
    base: 'inline-flex items-center',
    variants: {
      size: {
        // The chevron scales with the text so the separator stays a quiet
        // mark between crumbs instead of competing with them (its rendered
        // 16px default is chunky next to text-sm).
        small: 'gap-1 sm:gap-1.5 [&_svg]:size-3',
        default: 'gap-1.5 sm:gap-2.5 [&_svg]:size-3.5',
        large: 'gap-1.5 sm:gap-2.5 [&_svg]:size-4',
      },
    },
    defaultVariants: { size: 'default' },
  }),
  link: cva({
    base: 'transition-[color] hover:text-foreground cursor-pointer',
  }),
  // The current page reads a tier above the trail: medium weight (the theme's
  // emphasis weight, same as the sidebar's active pill) in the foreground ink.
  current: cva({ base: 'font-medium text-foreground' }),
};
