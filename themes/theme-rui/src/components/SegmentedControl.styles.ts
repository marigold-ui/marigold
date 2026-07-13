import { ThemeComponent, cva } from '@marigold/system';

export const SegmentedControl: ThemeComponent<'SegmentedControl'> = {
  // Outer track. Provides the surface (default variant). Doesn't clip: the inner
  // list is the scroll container, so option focus rings aren't cut at this edge.
  group: cva({
    base: 'group/segmented relative items-center rounded-surface',
    variants: {
      variant: {
        // Track matches the Switch's unselected track. The 4px outer margin lives
        // on the list (p-1), not here, so the edge thumbs' focus ring stays inside
        // the scroll container's clip.
        default: 'bg-control',
        ghost: '',
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
  // Inner scroll container: rows the options and scrolls them horizontally on
  // overflow, with an edge fade (`ui-scroll-mask-x`). A scrollport is the padding
  // box, so `p-1` is room *inside* the clip: it both insets the segments 4px from
  // the track edge and keeps the edge thumbs' focus ring from being clipped.
  // `-my-1` cancels the vertical 4px so it adds no height (only `px` is a real
  // inset; a negative `-mx` would overflow the rounded track — broke at 320px).
  //   - `motion-safe:scroll-smooth` makes the selection-reveal scroll animate for
  //     users who allow motion and jump instantly for those who don't; the
  //     component's `scrollTo` defers to it via `behavior: 'auto'` (matches Tabs).
  //   - `overscroll-x-contain` keeps horizontal overscroll from triggering the
  //     browser back/forward gesture at the track ends (matches Tabs).
  list: cva({
    base: 'flex w-full items-center ui-scroll-mask-x p-1 -my-1 overscroll-x-contain motion-safe:scroll-smooth',
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
      // Text is muted by default and turns to the foreground color on selection.
      'text-secondary selected:text-foreground',
      // Keyboard focus ring, inset 2px. This is the ghost variant's ring (no thumb,
      // so it hugs the cell); the default variant suppresses it and draws the ring
      // on the indicator instead.
      'focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-ring/50 focus-visible:-outline-offset-2',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        // Hover only brightens the label; the raised indicator is the background
        // affordance. The focus ring is drawn on the indicator (see below), so the
        // cell suppresses its own outline here. (Ghost keeps it, having no thumb.)
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
    // Moved/resized by react-aria's FLIP animation. `width` must be an explicit
    // length (w-full / calc), not derived from inset, or it falls back to an auto
    // width CSS can't interpolate and snaps instead of sliding.
    //
    // Keyboard nav switches instantly: dropping the transition on focus makes the
    // FLIP a no-op so the thumb doesn't lag the arrow keys. Pointer keeps the slide.
    base: 'absolute transition-[translate,width] duration-200 ease-out-quint group-has-[[data-focus-visible]]/segmented:transition-none motion-reduce:transition-none',
    variants: {
      variant: {
        // Raised thumb styled like the secondary Button (ui-control +
        // shadow-elevation-border). It fills its segment horizontally (left-0
        // w-full) so adjacent thumbs meet with no gap; the 4px top/bottom margin is
        // the inset-y, and the 4px end margin comes from the track's p-1 — so the
        // between-gap (0) and the outer margin are set independently.
        //   The keyboard focus ring is drawn here, not on the cell, so it wraps the
        // thumb exactly (offset-1 = flush with the thumb's 1px ring). Selection
        // follows focus, so the focused option is always the one under this thumb.
        //   On the dark charcoal-300 track, control-border's ground-adaptive firming
        // over-darkens the edge, so the alpha is stepped down 0.08 (token-derived).
        default:
          'inset-y-[4px] left-0 w-full ui-control shadow-elevation-border [--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_-_0.08))] group-has-[[data-focus-visible]]/segmented:outline-3 group-has-[[data-focus-visible]]/segmented:outline-solid group-has-[[data-focus-visible]]/segmented:outline-ring/50 group-has-[[data-focus-visible]]/segmented:outline-offset-1',
        // Resembles a ghost Button's surface.
        ghost: 'inset-y-0 left-0 w-full rounded-surface ui-state-hover-ghost',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
