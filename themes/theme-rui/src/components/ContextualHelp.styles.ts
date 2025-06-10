import { ThemeComponent, cva } from '@marigold/system';

export const ContextualHelp: ThemeComponent<'ContextualHelp'> = {
  trigger: cva([
    'inline-flex items-center py-0.5 transition-colors justify-center hover:text-hover-foreground cursor-pointer hover:bg-gray-200 rounded-md focus:bg-gray-200',
  ]),
  popover: cva(
    'bg-white border border-gray-200 rounded shadow-md p-4 z-50 max-w-xs'
  ),
  dialog: cva('text-sm leading-normal'),
  title: cva('text-lg font-semibold mb-1'),
  content: cva('text-sm'),
};
