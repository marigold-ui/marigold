import { ThemeComponent, cva } from '@marigold/system';

export const SegmentedControl: ThemeComponent<'SegmentedControl'> = {
  group: cva({
    base: 'group/segmented relative items-center',
    variants: {
      variant: {
        // Track matches the Switch's unselected track surface.
        default: 'gap-0 rounded-surface bg-control',
        ghost: 'gap-1',
      },
      size: {
        default: 'text-sm',
        small: 'text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  // Positioning context for each segment; holds the sliding indicator.
  field: cva({
    base: 'relative inline-flex',
  }),
  // The clickable segment (a radio rendered as a button).
  item: cva({
    base: [
      'relative z-10 w-full',
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-surface font-medium',
      'cursor-pointer outline-none transition-[color,transform] ui-press',
      'text-secondary selected:text-foreground not-selected:hover:text-foreground',
      'focus-visible:ui-state-focus',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        default: '',
        // Unselected segments hover like a ghost Button.
        ghost: 'not-selected:hover:ui-state-hover-ghost',
      },
      size: {
        default: 'h-control px-3 [&_svg]:size-4',
        small: 'h-control-small px-2.5 [&_svg]:size-3.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  indicator: cva({
    base: 'absolute z-0 transition-[translate,width] duration-150 ease-out-quint motion-reduce:transition-none',
    variants: {
      variant: {
        // Raised surface like the Switch thumb; ~2px inset to the track edge.
        default: 'inset-0.5 ui-surface shadow-elevation-border',
        // Resembles a ghost Button's surface.
        ghost: 'inset-0 rounded-surface bg-current/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
