import { ThemeComponent, cva } from '@marigold/system';

export const Modal: ThemeComponent<'Modal'> = cva({
  base: [
    // Var so `fullscreen` can raise the cap past 80vh.
    'sm:max-h-[var(--dialog-max-h,min(640px,80vh))]',
    '[--dialog-spacing-x:1rem]', // Minimal margin to the horizontal viewport edges
    '[--dialog-spacing-y:1rem]', // Minimal margin to the vertical viewport edges
    'w-[min(calc(100%_-_var(--dialog-spacing-x)),calc(var(--dialog-width)_-_var(--dialog-spacing-x)))]',
  ],
  variants: {
    size: {
      xsmall: '[--dialog-width:480px]', // "xs" breakpoint
      small: '[--dialog-width:640px]', // sm breakpoint
      medium: '[--dialog-width:768px]', // md breakpoint
      large: '[--dialog-width:1024px]', // lg breakpoint
      // Fills the viewport minus a small margin at every breakpoint.
      fullscreen: [
        '[--dialog-width:100vw]',
        '[--dialog-max-h:calc(100dvh_-_var(--dialog-spacing-y))]',
        'h-[calc(100dvh_-_var(--dialog-spacing-y))]',
      ],
    },
  },
  defaultVariants: {
    size: 'small',
  },
});
