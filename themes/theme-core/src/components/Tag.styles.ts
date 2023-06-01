import { ThemeComponent } from '@marigold/system';
import { cva } from 'class-variance-authority';

export const Tag: ThemeComponent<'Tag'> = {
  tag: cva([
    'flex items-center border border-primary-500 rounded bg-secondary-50',
    'py-[2px] px-1',
  ]),
  gridCell: cva('flex items-center gap-1'),
  closeButton: cva(
    'h-4 w-4 cursor-pointer border-none p-0 leading-normal outline-0 bg-transparent'
  ),
};
