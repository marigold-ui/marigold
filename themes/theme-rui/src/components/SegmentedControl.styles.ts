import { ThemeComponent, cva } from '@marigold/system';

export const SegmentedControl: ThemeComponent<'SegmentedControl'> = {
  // Outer track. Provides the surface (default variant). Deliberately does not
  // clip — the inner list is the scroll container, so option focus rings can
  // bleed past this edge without being cut off.
  group: cva({
    base: 'group/segmented relative items-center rounded-surface',
    variants: {
      variant: {
        // Track matches the Switch's unselected track surface.
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
  // (`ui-scroll-mask-x`). `box-content py-1 -my-1` reserves *vertical* room for
  // the option focus rings the scroll container's `overflow` would otherwise
  // clip: `py-1` is the ring room and `-my-1` bleeds the scroller a matching
  // 4px above/below the track so the rings overhang the top/bottom edge without
  // being cut off, while `box-content` keeps `w-full` equal to the track height.
  // The padding is intentionally vertical-only: a horizontal `-mx` would push
  // the scroll area past the track's rounded corners, so scrolled segments would
  // spill outside the track (and overflow the viewport on small screens). The
  // option focus rings are inset (see `option`), so they need no horizontal room.
  list: cva({
    base: 'flex w-full items-center ui-scroll-mask-x box-content py-1 -my-1',
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
      // Keyboard focus ring mirrors `ui-state-focus` (outline-3, ring/50) but is
      // inset 2px (`-outline-offset-2`) for both variants. Inset is what lets it
      // hug the `default` thumb (which sits 2px inside the cell) instead of
      // leaving a gap, and — because the inset ring stays inside the cell rather
      // than drawing outward past it — it is not clipped at the track edges by
      // the scroll container on the first/last segment (which a flush ring was,
      // in the `ghost` variant). RAC RadioButton exposes the focus state via
      // [data-rac][data-focus-visible].
      'focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-ring/50 focus-visible:-outline-offset-2',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        // Hover only brightens the label to the foreground color; the raised
        // ui-surface indicator already provides the background affordance, so
        // no extra hover background (keeps bg flips out of the picture). The
        // thumb is inset 2px, so the focus radius is bumped by 2px: an inset
        // outline's corner radius is `border-radius + outline-offset`, so
        // `surface + 2px` and `-outline-offset-2` land the ring back on the
        // `rounded-surface` radius — its corners sit snug against the thumb.
        default:
          'not-selected:hover:text-foreground focus-visible:rounded-[calc(var(--radius-surface)_+_2px)]',
        // Track-less: hover is a translucent overlay (shared helper), applied
        // on the selected item too so it stays covered while the indicator
        // slides in — no uncovered gap/flicker (matches Tabs).
        ghost: 'hover:ui-state-hover-ghost',
      },
      size: {
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
