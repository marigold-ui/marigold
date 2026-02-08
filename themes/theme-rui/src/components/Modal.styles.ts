import { ThemeComponent, cva } from '@marigold/system';

export const Modal: ThemeComponent<'Modal'> = cva({
  base: [
    'sm:max-h-[min(640px,80vh)]',
    '[--dialog-spacing-x:1rem]', // Minimal padding to the horizontal edges
    'w-[min(calc(100%_-_var(--dialog-spacing-x)),calc(var(--dialog-width)_-_var(--dialog-spacing-x)))]',
  ],
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
});
