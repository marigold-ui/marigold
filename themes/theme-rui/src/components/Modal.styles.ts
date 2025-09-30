import { ThemeComponent, cva } from '@marigold/system';

export const Modal: ThemeComponent<'Modal'> = cva(
  [
    '[--dialog-spacing-x:1rem]', // Minimal padding to the horizontal edges
    'max-h-[calc(100dvh-2rem)] h-[calc(100dvh-2rem)] w-full my-4', // Mobile: Full height and width with margin
    'sm:h-auto sm:max-h-[min(640px,80vh)] sm:my-0', // Desktop: Auto height with max and remove margin
    'sm:w-[min(calc(100%_-_var(--dialog-spacing-x)),calc(var(--dialog-width)_-_var(--dialog-spacing-x)))]', // Desktop: width with max and horizontal padding
  ],
  {
    variants: {
      size: {
        xsmall: '[--dialog-width:480px]', // "xs" breakpoint
        small: '[--dialog-width:640px]', // sm breakpoint
        medium: '[--dialog-width:768px]', // md breakpoint
      },
    },
    defaultVariants: {
      size: 'small',
    },
  }
);
