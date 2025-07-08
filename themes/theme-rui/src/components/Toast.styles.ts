import { ThemeComponent, cva } from '@marigold/system';

export const Toast: ThemeComponent<'Toast'> = {
  toast: cva([
    ' z-50 ',
    'max-w-sm w-full pointer-events-auto overflow-hidden rounded-md border shadow-lg bg-background text-foreground border-border',
    'grid grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] gap-x-1 gap-y-0',
    '[grid-template-areas:"icon_title_close""icon_description_description"] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    'p-4',
  ]),
  title: cva([
    'text-sm font-medium',
    '[grid-area:title]',
    'flex items-center mb-0',
  ]),
  description: cva([
    'text-muted-foreground text-sm',
    '[grid-area:description] mt-0',
  ]),
  closeButton: cva([
    '[grid-area:close] row-end-1',
    'ml-2',
    'flex items-center justify-center',
    'size-5 rounded transition-[color,box-shadow] outline-none',
    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground hover:text-hover-foreground',
  ]),
  icon: cva(
    [
      '[grid-area:icon]',
      'flex items-center justify-center',
      'h-6 w-6 leading-none ',
    ],
    {
      variants: {
        variant: {
          default: '',
          success: 'text-success-muted-accent',
          warning: 'text-warning-muted-accent',
          info: 'text-info-muted-accent',
          error: 'text-destructive-muted-accent',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  content: cva(['contents']),
};
