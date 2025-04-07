import { ThemeComponent, cva } from '@marigold/system';

export const Drawer: ThemeComponent<'Drawer'> = {
  overlay: cva([
    'group/overlay',
    'entering:animate-slide-in-right exiting:animate-slide-out-right',
  ]),
  container: cva(
    [
      'relative grid-rows-[auto_1fr_auto]',
      'bg-surface-overlay border-input border-l shadow-lg',
      /**
       * The fade animation only start when entering is finished,
       * to prevent flickering we hide the elements during the
       * slide in animation.
       */
      // '*:group-entering/overlay:opacity-0',
      // '*:animate-fade-in *:[animation-duration:0.2s]',
      // '*:[animation-delay:var(--slide-in-duration)]',

      /**
       * The drawer's child elements will have a secondary fade-in-up animation,
       * which starts only after the drawer has fully slid in.
       *
       * To achieve this, we initially hide the children and allow them to remain
       * in their final animation state (using `animation-fill-mode`).
       * A slight delay is applied to each child to create a staggered fade-in-up effect.
       */

      '*:opacity-0 *:[animation-fill-mode:forwards]',
      '*:animate-fade-in-up *:[animation-delay:calc(var(--slide-in-duration)+(var(--i)*150ms))]',

      /**
       * Fade out content of the slider, looks smoother and less clutter.
       * Keep the "not-group-exiting" of the fade in animation, because
       * elements can only have one animation.
       */
      '*:group-exiting/overlay:animate-fade-out! *:group-exiting/overlay:[animation-delay:0s]!',
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
    'absolute top-3.5 right-3 z-50',
    'flex size-7 items-center justify-center rounded transition-[color,box-shadow]',
    'mixin-ring-focus-visible',
    '[&_svg]:size-4 [&_svg]:opacity-60 [&_svg]:transition-opacity hover:[&_svg]:opacity-100',
  ]),
  header: cva('border-border border-b px-6 py-4'),
  title: cva('font-semibold text-base'),
  content: cva('px-6 py-4 overflow-y-auto outline-none'),
  actions: cva(
    'flex flex-row gap-3 justify-end border-border border-t px-6 py-4'
  ),
};
