import { ThemeComponent, cva } from '@marigold/system';

export const SegmentedControl: ThemeComponent<'SegmentedControl'> = {
  // Outer track. Provides the surface (default variant). Deliberately does not
  // clip — the inner list is the scroll container, so option focus rings can
  // bleed past this edge without being cut off.
  group: cva({
    base: 'group/segmented relative items-center rounded-surface',
    variants: {
      variant: {
        // Track matches the Switch's unselected track surface. The 4px outer
        // margin around the segments lives on the list (px-1), not here, so the
        // first/last thumb's focus ring stays inside the scroll container's clip
        // region instead of being cut off at the edge.
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
  // Inner scroll container: lays the options out in a row and scrolls them
  // horizontally when they overflow, with an edge-fade affordance
  // (`ui-scroll-mask-x`). A scroll container's scrollport is its *padding* box,
  // so padding here is room *inside* the clip region. `p-1` (4px all round) does
  // double duty: it is the 4px margin between the segments and the track edge,
  // and it keeps the first/last thumb's focus ring inside the clip region so the
  // ring is not cut off at the outer edge. `-my-1` bleeds the extra vertical 4px
  // back over the track (nothing there to overflow) so it adds no height; the
  // horizontal 4px is real width the segments sit inside.
  list: cva({
    base: 'flex w-full items-center ui-scroll-mask-x p-1 -my-1',
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
  // Positioning context for each segment; holds the sliding indicator.
  // `shrink-0` keeps each option at its natural width so the row overflows (and
  // scrolls) rather than compressing the segments.
  field: cva({
    base: 'relative inline-flex shrink-0',
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
      // Keyboard focus ring mirrors `ui-state-focus` (outline-3, ring/50), inset
      // 2px (`-outline-offset-2`). This is the ghost variant's ring: ghost has no
      // thumb, so the ring hugs the cell, and the inset keeps most of it inside so
      // the scroll container only clips ~1px at the very first/last segment's outer
      // edge (a flush ring lost much more). The default variant suppresses this and
      // draws its ring on the indicator instead (see indicator). RAC RadioButton
      // exposes the focus state via [data-rac][data-focus-visible].
      'focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-ring/50 focus-visible:-outline-offset-2',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        // Hover only brightens the label to the foreground color; the raised
        // ui-surface indicator already provides the background affordance, so
        // no extra hover background (keeps bg flips out of the picture). The
        // thumb's inset is asymmetric (4px top/bottom, 8px sides), so an outline
        // on the cell can't hug it on all sides. The focus ring is drawn on the
        // indicator itself instead (see below), so here the cell suppresses its
        // own outline. (Ghost keeps the base cell outline, having no thumb.)
        default:
          'not-selected:hover:text-foreground focus-visible:outline-none',
        // Track-less: hover is a translucent overlay (shared helper), applied
        // on the selected item too so it stays covered while the indicator
        // slides in — no uncovered gap/flicker (matches Tabs).
        ghost: 'hover:ui-state-hover-ghost',
      },
      size: {
        // The thumb fills the segment, so the option's px is the label's padding
        // inside the thumb. px-3 (12px) keeps clear space around the label.
        default: 'h-control px-3 [&_svg]:size-4',
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
    //
    // Keyboard navigation switches instantly: while an option shows its focus
    // ring the slide would visibly lag behind the arrow keys, so dropping the
    // transition (same `transition-property: none` mechanism as reduced motion)
    // makes the FLIP a no-op. Pointer selection keeps the slide.
    base: 'absolute z-0 transition-[translate,width] duration-200 ease-out-quint group-has-[[data-focus-visible]]/segmented:transition-none motion-reduce:transition-none',
    variants: {
      variant: {
        // Raised thumb styled like the secondary/default Button: ui-surface-control
        // gives it the --color-control-border edge with the lighter-top/darker-bottom
        // gradient, over shadow-elevation-border's lift. The thumb fills its segment
        // (inset-y-[4px] for the 4px top/bottom margin, but left-0 w-full horizontally)
        // so adjacent segments' thumbs meet with no gap between them. The 4px left/right
        // margin at the very ends comes from the track's px-1, not the thumb inset, so
        // the between-gap (0) and the outer margin (4px) are set independently.
        //   The keyboard focus ring is drawn here on the indicator (not the cell), so
        // it wraps the thumb exactly. outline-offset-1 sits it flush against the thumb's
        // 1px outset ring (no gap). Selection follows focus in a radio group, so the
        // focused option is always the selected one where this indicator lives;
        // group-has-[data-focus-visible] is what the cell's own outline used before.
        // transition-none (base) keeps the ring from lagging the slide.
        //   The thumb is the one control sitting on a dark ground (the charcoal-300
        // track), where control-border's ground-adaptive firming over-darkens the
        // edge. The track already separates the thumb (its fill is lighter than the
        // track), so we step the border alpha down 0.08 — token-derived, so it still
        // tracks any change to --color-control-border. The bevel follows it down.
        default:
          'inset-y-[4px] left-0 w-full ui-surface-control shadow-elevation-border [--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_-_0.08))] group-has-[[data-focus-visible]]/segmented:outline-3 group-has-[[data-focus-visible]]/segmented:outline-solid group-has-[[data-focus-visible]]/segmented:outline-ring/50 group-has-[[data-focus-visible]]/segmented:outline-offset-1',
        // Resembles a ghost Button's surface.
        ghost: 'inset-y-0 left-0 w-full rounded-surface ui-state-hover-ghost',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
};
