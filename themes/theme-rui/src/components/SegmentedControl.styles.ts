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
  option: cva({
    base: [
      'relative z-10 w-full',
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-surface font-medium',
      // bg stays out of the transition list (DS-wide instant-bg convention,
      // see ui.css / DST-1436); only the label color animates. No press scale
      // (ui-press) — the sliding indicator is the selection feedback here.
      'cursor-pointer outline-none transition-[color]',
      // Text is muted by default and turns to the foreground color on selection.
      'text-secondary selected:text-foreground',
      // Keyboard focus reuses the shared focus ring helper (same as Tabs);
      // RAC RadioButton exposes it via [data-rac][data-focus-visible].
      'focus-visible:ui-state-focus',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        // Hover only brightens the label to the foreground color; the raised
        // ui-surface indicator already provides the background affordance, so
        // no extra hover background (keeps bg flips out of the picture).
        default: 'not-selected:hover:text-foreground',
        // Track-less: hover is a translucent overlay (shared helper), applied
        // on the selected item too so it stays covered while the indicator
        // slides in — no uncovered gap/flicker (matches Tabs).
        ghost: 'hover:ui-state-hover-ghost',
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
    // The indicator is moved/resized by react-aria's FLIP SharedElement, which
    // animates every property in this transition list. `width` must be an
    // explicit length (see variants: w-full / calc) — not derived from `inset`
    // left+right — or it falls back to an auto width that CSS can't interpolate,
    // so it would snap to its new size while only the position slides.
    base: 'absolute z-0 transition-[translate,width] duration-200 ease-out-quint motion-reduce:transition-none',
    variants: {
      variant: {
        // Raised surface like the Switch thumb; ~2px inset to the track edge.
        default:
          'inset-y-0.5 left-0.5 w-[calc(100%-4px)] ui-surface shadow-elevation-border',
        // Resembles a ghost Button's surface.
        ghost: 'inset-y-0 left-0 w-full rounded-surface ui-state-hover-ghost',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
