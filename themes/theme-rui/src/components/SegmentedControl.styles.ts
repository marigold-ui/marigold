import { ThemeComponent, cva } from '@marigold/system';

export const SegmentedControl: ThemeComponent<'SegmentedControl'> = {
  // Outer track. Provides the surface (default variant). Doesn't clip: the inner
  // list is the scroll container, so option focus rings aren't cut at this edge.
  // The radius is set per variant rather than once on `base`: twMerge doesn't
  // recognise `rounded-surface` as a radius utility, so it won't drop it in favour
  // of a variant's arbitrary `rounded-[…]` and emit order would decide the winner.
  group: cva({
    base: 'group/segmented relative items-center',
    variants: {
      variant: {
        // Track matches the Switch groove and the Slider rail (`bg-control`, a
        // translucent fill — see the token docs; never paint it twice). The 3px
        // outer margin lives on the list (p-[3px]), not here, so the list stays the
        // one element that defines the frame around the thumbs.
        //   The radius is the one place this component departs from the shared
        // `rounded-surface`, and it has to: two rounded rects nested with a gap are
        // only concentric when the outer radius is the inner radius plus that gap
        // (`R_outer = R_inner + d`). The thumb keeps `rounded-surface` (8px) and
        // sits 3px in, so the track needs 11px. Sharing one radius makes the outer
        // corner visibly tighter than the arc it frames. (The thumb's outset 1px
        // rim doesn't change the sum: it widens the inner arc to 9px but closes the
        // gap to 2px.) Derived from the token, so a retuned `--radius-surface`
        // stays concentric.
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
  // Inner scroll container: rows the options and scrolls them horizontally on
  // overflow, with an edge fade (`ui-scroll-mask-x`).
  //   `p-[3px]` is the frame around the thumbs (`inset-y-[3px]` below is its
  // vertical half), and 3px is the floor: a scrollport clips at its padding box,
  // so this is the only room the thumb's outset focus ring has to grow into, and
  // `ui-state-focus` needs 3px of it. Below that the first and last thumbs get a
  // visibly shaved ring. `-my-[3px]` cancels the vertical padding so it adds no
  // height; a negative `-mx` would overflow the rounded track (broke at 320px).
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
        //   At rest the rim is thinned, because ui-frame's rim is an *outset* ring:
        // it lands on the track, so it composites over `control` and reads denser
        // than the same token does on a field. Two layers of one colour stack to
        // `control-alpha + (1 - control-alpha) * a`, so solving that for
        // `control-border`'s alpha gives the thinned value below — 0.119 at the
        // current tokens. Derived from `--control-alpha` rather than hard-coded, so
        // retuning the track can't silently detune the rim (it did: the old
        // hand-tuned -0.08 was measured against the opaque charcoal-300 track and
        // left the rim at an effective 0.31 against 0.26 on a field). Verified on
        // rendered pixels: #c0bfbf on `surface`, matching an Input to within a
        // rounding unit on all four grounds. ui-state-focus overrides it on focus.
        default:
          'inset-y-[3px] left-0 w-full ui-control [--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc((alpha_-_var(--control-alpha))_/_(1_-_var(--control-alpha))))] group-has-[[data-focus-visible]]/segmented:ui-state-focus',
        // Resembles a ghost Button's surface.
        ghost: 'inset-y-0 left-0 w-full rounded-surface ui-state-hover-ghost',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
