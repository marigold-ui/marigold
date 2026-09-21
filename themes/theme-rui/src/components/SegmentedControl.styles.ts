import { ThemeComponent, cva } from '@marigold/system';

export const SegmentedControl: ThemeComponent<'SegmentedControl'> = {
  // Outer track. Doesn't clip: the inner list is the scroll container, so option
  // focus rings survive this edge. Radius is per variant, not on `base`: twMerge
  // doesn't recognise `rounded-surface` as a radius utility, so it won't drop it
  // for a variant's arbitrary `rounded-[…]` and emit order would pick the winner.
  group: cva({
    base: 'group/segmented relative items-center',
    variants: {
      variant: {
        // `bg-control` matches the Switch groove and Slider rail; never paint it
        // twice. The 3px outer margin lives on the list, not here. Radius departs
        // from `rounded-surface` because nested rounded rects are only concentric
        // at `R_outer = R_inner + d`: the thumb's 8px plus its 3px inset, so 11px.
        // (The thumb's outset 1px rim doesn't change the sum: it widens the inner
        // arc to 9px and closes the gap to 2px.)
        default: 'bg-control rounded-[calc(var(--radius-surface)+3px)]',
        // No track to frame, so no gap to compensate for.
        ghost: 'rounded-surface',
      },
      size: {
        default: 'text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  // `p-[3px]` is the floor: a scrollport clips at its padding box, and the thumb's
  // outset `ui-state-focus` needs 3px of room. `-my-[3px]` cancels the height; a
  // negative `-mx` overflows the rounded track (broke at 320px). `scrollTo` defers
  // to `scroll-smooth` via `behavior: 'auto'`, and overscroll is contained (Tabs).
  list: cva({
    base: 'flex w-full items-center ui-scroll-mask-x p-[3px] -my-[3px] overscroll-x-contain motion-safe:scroll-smooth',
    variants: {
      variant: {
        default: 'gap-0',
        ghost: 'gap-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  // Positioning context for each segment; holds the sliding indicator. `shrink-0`
  // keeps each option at natural width so the row overflows (scrolls) instead of
  // compressing.
  field: cva({
    base: 'relative inline-flex shrink-0',
  }),
  // The clickable segment (a radio rendered as a button).
  option: cva({
    base: [
      'relative w-full',
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-surface font-medium',
      // Only the label color animates; bg stays out of the transition (instant-bg
      // convention, DST-1436). No press scale — the sliding indicator is the feedback.
      'cursor-pointer outline-none transition-[color]',
      'text-secondary selected:text-foreground',
      // Keyboard focus ring, inset 2px. This is the ghost variant's ring: no thumb,
      // so it hugs the cell. See `indicator` for where the default variant puts it.
      'focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-ring/50 focus-visible:-outline-offset-2',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        // Hover only brightens the label; the moving indicator is the background
        // affordance, and carries the focus ring too, so the cell suppresses its
        // own outline here. (Ghost keeps it, having no thumb.)
        default:
          'not-selected:hover:text-foreground focus-visible:outline-none',
        // Track-less: hover is a translucent overlay, applied on the selected item
        // too so it stays covered while the indicator slides in (matches Tabs).
        ghost: 'hover:ui-state-hover-ghost',
      },
      size: {
        // The thumb fills the segment, so px is the label's padding inside it.
        default: 'h-control px-3 [&_svg]:size-4',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }),
  indicator: cva({
    // Moved by react-aria's FLIP. `width` must be an explicit length, not derived
    // from inset, or it falls back to an auto width CSS can't interpolate and
    // snaps. Focus drops the transition so the thumb can't lag the arrow keys.
    base: 'absolute transition-[translate,width] duration-200 ease-out-quint group-has-[[data-focus-visible]]/segmented:transition-none motion-reduce:transition-none',
    variants: {
      variant: {
        // Flat `ui-control` thumb, inset 3px (not 4px: 30px tall, still clears the
        // focus ring, which is drawn here rather than on the cell, as the shared
        // `ui-state-focus` so it matches a focused Input). Rim alpha is solved from
        // `--control-alpha`: an outset rim composites over the track, and two layers
        // of one colour stack to `a + (1 - a) * x`, so inverting that gives 0.119 at
        // the current tokens. Derived, not hard-coded, because a hard-coded step
        // detunes when the track is retuned (it did: -0.08 left the rim at an
        // effective 0.31 against 0.26 on a field). Verified on rendered pixels:
        // #c0bfbf on `surface`, matching an Input on all four grounds.
        default:
          'inset-y-[3px] left-0 w-full ui-control [--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc((alpha_-_var(--control-alpha))_/_(1_-_var(--control-alpha))))] group-has-[[data-focus-visible]]/segmented:ui-state-focus',
        ghost: 'inset-y-0 left-0 w-full rounded-surface ui-state-hover-ghost',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
