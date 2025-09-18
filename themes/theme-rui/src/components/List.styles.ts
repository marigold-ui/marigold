import { ThemeComponent, cva } from '@marigold/system';

export const List: ThemeComponent<'List'> = {
  ul: cva('ml-6 list-outside list-disc space-y-1 marker:text-foreground/50', {
    variants: {
      variant: {
        default: '',
        small: '*:text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  ol: cva(
    'ml-6 list-outside list-decimal space-y-1 marker:text-foreground/50',
    {
      variants: {
        variant: {
          default: '',
          small: '*:text-sm',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    }
  ),
  item: cva(''),
};
