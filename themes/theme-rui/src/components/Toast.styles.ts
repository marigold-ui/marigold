import { ThemeComponent, cva } from '@marigold/system';

export const Toast: ThemeComponent<'Toast'> = {
  toast: cva(
    [
      'fixed top-4 right-4 z-50',
      'max-w-sm w-full pointer-events-auto overflow-hidden rounded-md border shadow-lg bg-background text-foreground border-border',
      'grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-x-1 gap-y-0',
      '[grid-template-areas:"title_close""description_description"]',
      'p-4',
    ],
    {
      variants: {
        variant: {
          default: 'border bg-background text-foreground  border-border',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  title: cva(
    ['text-sm font-medium', '[grid-area:title]', 'flex items-center mb-0'],
    {
      variants: {
        variant: {
          default: '',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  description: cva(
    ['text-muted-foreground text-sm', '[grid-area:description] mt-0'],
    {
      variants: {
        variant: {
          default: '',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  closeButton: cva(
    [
      '[grid-area:close] row-end-1',
      'ml-2', // Abstand zum Titel
      'flex items-center justify-center',
      'size-5 rounded transition-[color,box-shadow] outline-none',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
    ],
    {
      variants: {
        variant: {
          default: 'text-muted-foreground hover:text-foreground',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
};
