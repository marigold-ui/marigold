import { ThemeComponent, cva } from '@marigold/system';

export const ContextualHelp: ThemeComponent<'ContextualHelp'> = {
  trigger: cva(
    [
      'inline-flex items-center p-0.5 transition-colors justify-center hover:text-hover-foreground cursor-pointer hover:bg-gray-200 rounded-md focus:bg-gray-200',
    ],
    {
      variants: {
        size: {
          small: 'w-4 h-4',
          medium: 'w-5 h-5',
          large: 'w-8 h-8',
        },
      },
      defaultVariants: {
        size: 'medium',
      },
    }
  ),
  popover: cva(
    'bg-white border border-gray-200 p-3 rounded shadow-md z-50 data-[small]:max-w-3xs data-[medium]:max-w-xs data-[large]:max-w-md'
  ),
  dialog: cva('text-sm leading-normal'),
  title: cva('text-lg font-semibold mb-1'),
  content: cva('text-sm'),
};
