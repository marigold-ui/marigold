import { ThemeComponent, cva } from '@marigold/system';

export const SelectList: ThemeComponent<'SelectList'> = {
  label: cva([
    'col-start-2 row-start-1 flex flex-nowrap items-start gap-2 font-semibold',
  ]),
  description: cva(['col-start-2 row-start-2 text-sm text-gray-700']),
  action: cva(['col-start-2 row-start-3']),
  image: cva(
    ['col-start-1 row-span-3 row-start-1 self-center object-contain'],
    {
      variants: {
        size: {
          small: 'h-8 w-8',
          default: 'h-10 w-10',
          large: 'h-16 w-16',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
};
