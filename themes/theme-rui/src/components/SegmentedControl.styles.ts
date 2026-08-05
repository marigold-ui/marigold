import { ThemeComponent, cva } from '@marigold/system';

export const SegmentedControl: ThemeComponent<'SegmentedControl'> = {
  // Outer track. Provides the surface (default variant). Doesn't clip: the inner
  // list is the scroll container, so option focus rings aren't cut at this edge.
  group: cva({
    base: 'group/segmented relative items-center rounded-surface',
    variants: {
      variant: {
        // Track matches the Switch groove and the Slider rail (`bg-control`, a
        // translucent fill — see the token docs; never paint it twice). The 2px
        // outer margin lives on the list (p-0.5), not here, so the list stays the
        // one element that defines the frame around the thumbs.
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
  // overflow, with an edge fade (`ui-scroll-mask-x`). `p-[3px]` insets the segments
  // 3px from the track edge, so 3px of frame shows to the left of the first thumb
  // and to the right of the last — the horizontal half of the frame around the
  // indicator (`inset-y-[3px]` below is the vertical half). Of those 3px the thumb's
  // own 1px rim takes the innermost, so 2px of bare track is what you see.
  // `-my-[3px]` cancels the vertical 3px so it adds no height (only `px` is a real
  // inset; a negative `-mx` would overflow the rounded track — broke at 320px).
  //   3px is also exactly the room the indicator's focus ring needs. A scrollport
  //   clips at its padding box, so this padding is the only space an outset ring can
  //   grow into, and `ui-state-focus` is `outline-3` at `outline-offset-0` — 3px.
  //   Don't drop below 3px without moving the ring inside the thumb: at 2px the
  //   first and last thumbs get a visibly shaved ring (verified).
  //   - `motion-safe:scroll-smooth` makes the selection-reveal scroll animate for
  //     users who allow motion and jump instantly for those who don't; the
  //     component's `scrollTo` defers to it via `behavior: 'auto'` (matches Tabs).
  //   - `overscroll-x-contain` keeps horizontal overscroll from triggering the
  //     browser back/forward gesture at the track ends (matches Tabs).
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
        // Hover only brightens the label; the moving indicator is the background
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
        // Flat control-surface thumb (ui-control): a well like the fields, not
        // a raised cap — the moving thumb and selection do the work. It fills
        // its segment horizontally (left-0 w-full) so adjacent thumbs meet with no
        // gap; the 3px top/bottom margin is the inset-y, and the 3px end margin
        // comes from the track's p-[3px] — so the between-gap (0) and the outer
        // margin are set independently. 3px rather than the original 4px so the
        // thumb carries more of the track (30px tall, was 28px), while still
        // clearing the focus ring — see the note on `list` above.
        //   The keyboard focus ring is drawn here, not on the cell, so it marks the
        // thumb exactly. Selection follows focus, so the focused option is always
        // the one under this thumb. It is the shared `ui-state-focus`, not a
        // hand-rolled outline, so a focused thumb matches a focused Input exactly:
        // that utility firms `--ui-border-color` to the opaque ring colour as well
        // as drawing the 3px outline, and the outline alone (what this used to do)
        // reads noticeably lighter than every other control without it.
        //   At rest, control-border's ground-adaptive firming over-darkens the edge
        // against the track, so the alpha is stepped down 0.08 (token-derived);
        // ui-state-focus overrides that on focus.
        default:
          'inset-y-[3px] left-0 w-full ui-control [--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_-_0.08))] group-has-[[data-focus-visible]]/segmented:ui-state-focus',
        // Resembles a ghost Button's surface.
        ghost: 'inset-y-0 left-0 w-full rounded-surface ui-state-hover-ghost',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
