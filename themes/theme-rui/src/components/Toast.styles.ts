import { ThemeComponent, cva } from '@marigold/system';

export const Toast: ThemeComponent<'Toast'> = {
  toast: cva([
    'surface shadow-elevation-overlay',
    'z-50',
    'max-w-sm w-full pointer-events-auto overflow-hidden text-foreground',
    'grid grid-cols-[auto_1fr_auto_auto] grid-rows-[auto_auto] gap-x-1 gap-y-0',
    "[grid-template-areas:'icon_title_action_close''icon_description_action_close'] focus-visible:state-focus outline-none",
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
    'focus-visible:state-focus-borderless outline-none text-muted-foreground hover:text-hover-foreground',
  ]),
  icon: cva(
    [
      '[grid-area:icon]',
      'flex items-center justify-center',
      'h-5 w-5 leading-none',
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
  'bottom-left': cva(['fixed bottom-4 left-4 flex flex-col-reverse']),
  'bottom-right': cva(['fixed bottom-4 right-4 flex flex-col-reverse']),
  'top-left': cva(['fixed top-4 left-4 flex flex-col']),
  'top-right': cva(['fixed top-4 right-4 flex flex-col']),
  top: cva([
    'fixed top-4 left-1/2 right-auto -translate-x-1/2 flex flex-col items-center w-auto align-middle',
  ]),
  bottom: cva([
    'fixed bottom-4 left-1/2 right-auto -translate-x-1/2 flex flex-col-reverse items-center w-auto align-middle',
  ]),
  action: cva(['[grid-area:action] flex items-start pl-4']),
};
