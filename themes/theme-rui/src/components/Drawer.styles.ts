import { ThemeComponent, cva } from '@marigold/system';

// TODO: origin has a default border color ... see https://github.com/origin-space/originui/blob/8d5fe3fce5187fe70b9c68920fdcbdacc67de62e/app/globals.css#L172C1-L180C2

export const Drawer: ThemeComponent<'Drawer'> = {
  container: cva(
    [
      'relative grid-rows-[auto_1fr_auto]',
      'bg-surface-overlay border-input border-l shadow-lg',
    ],
    {
      variants: {
        size: {
          default: 'w-80',
        },
      },
      defaultVariants: {
        size: 'default',
      },
    }
  ),
  closeButton: cva([
    'absolute top-3.5 right-3',
    'flex size-7 items-center justify-center rounded transition-[color,box-shadow]',
    'mixin-ring-focus-visible',
    '[&_svg]:size-4 [&_svg]:opacity-60 [&_svg]:transition-opacity hover:[&_svg]:opacity-100',
  ]),
  header: cva('border-border border-b px-6 py-4'),
  title: cva('font-semibold text-base'),
  content: cva('px-6 py-4 overflow-y-auto'),
  actions: cva(
    'flex flex-row gap-3 justify-end border-border border-t px-6 py-4'
  ),
};
