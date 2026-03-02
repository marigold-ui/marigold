import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ul: cva({
    base: 'ml-6 list-outside list-disc space-y-1 marker:text-foreground/50',
    variants: {
      size: {
        default: '',
        small: '*:text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  ol: cva({
    base: 'ml-6 list-outside list-decimal space-y-1 marker:text-foreground/50',
    variants: {
      size: {
        default: '',
        small: '*:text-sm',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }),
  item: cva({ base: '' }),
};
