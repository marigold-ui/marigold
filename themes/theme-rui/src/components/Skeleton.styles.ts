import { type ThemeComponent, cva } from '@marigold/system';

export const Skeleton: ThemeComponent<'Skeleton'> = cva({
  // Fill derives from the text colour, so it stays visible on any ground.
  base: 'bg-current/(--alpha-100) motion-safe:animate-pulse',
  variants: {
    variant: {
      default: 'rounded',
      rounded: 'rounded-full',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
