import { ThemeComponent, cva } from '@marigold/system';

export const Collapsible: ThemeComponent<'Collapsible'> = {
  container: cva('', {
    variants: {
      variant: {
        default: '',
        /**
         * Ensure that both the container and its panel do not create extra DOM boxes, preserving the layout
         * of the parent element. This allows the collapsible content to visually integrate with its surroundings
         * without affecting the parent’s box model.
         */
        link: 'expanded:contents expanded:*:contents',
      },
    },
  }),
  trigger: cva(
    [
      'inline-flex gap-2 whitespace-nowrap rounded-md font-medium transition-[color,box-shadow,transform]',
      'duration-150 active:scale-[0.98] pressed:scale-[0.98]',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0',
      'focus-visible:util-focus-ring outline-none disabled:util-disabled',
      'cursor-pointer',
    ],
    {
      variants: {
        variant: {
          default: '',
          link: 'text-link util-touch-hitbox',
        },
        size: {
          default: 'text-sm',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  ),
  content: cva(),
};
