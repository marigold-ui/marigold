import { ThemeComponent, cva } from '@marigold/system';

export const Toast: ThemeComponent<'Toast'> = {
  toast: cva(
    [
      'group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-md border p-4 shadow-lg',
      'fixed top-0 right-0 z-50 flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:bottom-0 sm:flex-col md:max-w-[400px]',
    ],
    {
      variants: {
        variant: {
          default: 'border bg-background text-foreground',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  title: cva(['text-sm font-medium'], {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  description: cva(['text-muted-foreground text-sm'], {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  closeButton: cva(
    [
      'group focus-visible:border-ring focus-visible:ring-ring/50 absolute top-3 right-3 flex size-7 items-center justify-center rounded transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none',
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
