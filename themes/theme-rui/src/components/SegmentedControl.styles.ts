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
  // (`ui-scroll-mask-x`). `box-content p-1 -m-1` reserves room for the option
  // focus rings the scroll container's `overflow` would otherwise clip: the
  // `p-1` padding is the ring room, `-m-1` bleeds the scroller a matching 4px
  // past the track on every side so the rings overhang the track edge uniformly
  // (instead of being cut off, or insetting the options). `box-content` keeps
  // `w-full` equal to the track width so the options still sit flush to the
  // track edge — the padding grows the scroller outward, not the content.
  list: cva({
    base: 'flex w-full items-center ui-scroll-mask-x box-content p-1 -m-1',
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
