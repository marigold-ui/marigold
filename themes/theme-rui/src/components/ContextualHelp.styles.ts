import { ThemeComponent, cva } from '@marigold/system';

export const ContextualHelp: ThemeComponent<'ContextualHelp'> = {
  trigger: cva([
    'inline-flex items-center py-0.5 justify-center hover:text-hover-foreground cursor-pointer',
  ]),
  popover: cva(
    'bg-white border border-gray-200 rounded shadow-md p-4 z-50 max-w-xs'
  ),
  dialog: cva('text-sm leading-normal'),
};
