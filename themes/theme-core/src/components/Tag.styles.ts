import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva([
    'border-primary-500 bg-secondary-50 flex items-center rounded border',
    'px-1 py-[2px]',
  ]),
  gridCell: cva('flex items-center gap-1'),
  closeButton: cva(
    'h-4 w-4 cursor-pointer border-none bg-transparent p-0 leading-normal outline-0'
  ),
};
