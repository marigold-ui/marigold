import type { ThemeComponent } from '@marigold/system';
import { cva } from '@marigold/system';

export const Breadcrumbs: ThemeComponent<'Breadcrumbs'> = {
  container: cva(
    ['flex flex-wrap items-center gap-1.5 wrap-break-word text-sm sm:gap-2.5'],
    {
      variants: {
        variant: {
          default: 'text-foreground',
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
    }
  ),
  item: cva(
    'inline-flex items-center text-muted-foreground gap-1.5 sm:gap-2.5'
  ),
  link: cva('transition-colors hover:text-foreground cursor-pointer'),
  current: cva('font-normal text-foreground'),
};
