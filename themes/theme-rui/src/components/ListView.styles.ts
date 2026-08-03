import { type ThemeComponent, cva } from '@marigold/system';

// A row is a two-column grid — text, then trailing actions — and every region
// claims its cell from CSS, never from JavaScript inspecting the children.
// Text lines auto-flow down column 1 (label first, then each description); the
// actions region spans that stack via `row-span-6` so it stays centered next
// to it. Six is a ceiling, not a count: the row has no row gap, so the rows a
// shorter stack leaves unused are 0-high and cost nothing. It is still a
// content-quantity assumption, and it degrades silently — past a label plus
// five `<Description>` lines the span stops covering the stack and the
// centering drifts. The structural fix is for the text column to be a single
// cell holding its own stack, which makes the span a literal `1`; that's a
// larger change than this component needs today, but the ceiling shouldn't
// outlive the beta.
//
// Leading media (an icon, an avatar, a logo) is deliberately not part of v1.
// Placing it needs a slot to attach a grid area to, and Marigold has no
// `IconContext`/`ImageContext` for one — `@marigold/icons` re-exports lucide
// directly, whose icons are plain SVG components. The alternative, keying
// placement on DOM position, would make authoring order part of the public API
// while every other region is order-free, so media waits for the slot work.
//
// `<Title>` and `<TextValue>` share `TEXT_CELL` on purpose: a row uses one or
// the other, and both are the row's primary text. Authoring both puts two grid
// items in the same cell, where they overlap rather than stack.
const TEXT_CELL = 'col-start-1 row-start-1 self-center';

export const ListView: ThemeComponent<'ListView'> = {
  list: cva({
    base: [
      'w-full outline-0 flex flex-col',
      '[--listview-item-px:var(--spacing-stretch-regular-x)]',
    ],
    variants: {
      // `default` is a bounded surface of its own (ring, shadow, radius).
      // `plain` drops that frame — divider lines only — so the list can sit
      // inside a container that already provides one, e.g. the Popover
      // notifications panel this component was built for.
      variant: {
        default: [
          'divide-y divide-border ui-surface shadow-elevation-border',
          '[--listview-item-radius:calc(var(--radius-surface)-1px)]',
        ],
        // Only `plain` is edge-aware. A bled `Panel.Content` /
        // `Panel.CollapsibleContent` / `Drawer.Content` publishes `--bleed-px`
        // (its own `--panel-px`), and a nested `plain` list adopts it as its
        // row padding: dividers and hover fill reach the container border while
        // the row text lines up with the container title, mirroring Table and
        // Accordion. Outside a bled container the fallback keeps the standalone
        // padding. `default` deliberately opts out — it carries its own frame,
        // so it shouldn't inherit the container's edge inset.
        plain: [
          'divide-y divide-border',
          '[--listview-item-px:var(--bleed-px,var(--spacing-stretch-regular-x))]',
        ],
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  item: cva({
    base: [
      'group/option relative grid items-center',
      // No column gap: the actions column collapses to 0 when a row has no
      // controls, and a gap would still inset the text by its width — enough
      // to break the alignment with a bled container's title that
      // `variant="plain"` exists for. The spacing rides on the actions region
      // itself (`ms-3`), so it only exists when the region does.
      'grid-cols-[minmax(0,1fr)_auto]',
      // `--listview-item-px` is set per variant on the list (see above): the
      // standalone padding by default, a bled container's `--bleed-px` for
      // `plain`.
      'px-(--listview-item-px) py-(--spacing-stretch-regular-y)',
      // State the touch-target floor rather than arriving at it: today's
      // vertical padding plus `text-sm`'s line height lands on exactly 44px
      // with nothing to spare, so a tighter token or a density variant would
      // drop below it silently. `ListBox` and `Menu` guard their rows the
      // same way.
      'max-sm:min-h-touch-target',
      'text-sm text-foreground outline-none',
      // `background` is deliberately absent: DST-1436 dropped it from hover
      // transitions across the theme so hover fills flip instantly, and
      // `ListBox`/`SelectList` carry the identical list. Don't widen this to
      // `transition-colors` — that re-adds the background easing.
      'transition-[border,color]',
      'hover:ui-state-hover',
      'focus-visible:ui-state-focus',
      'disabled:cursor-not-allowed disabled:text-disabled',
    ],
    variants: {
      variant: {
        // Rounding the first/last row to match the surface's own corners
        // belongs to the only variant that draws a surface — and the only one
        // that defines `--listview-item-radius`. On `base` the declaration
        // would be invalid at computed-value time under `plain` and fall back
        // to the initial `0` by accident rather than by intent.
        default:
          'first:rounded-t-(--listview-item-radius) last:rounded-b-(--listview-item-radius)',
        // `plain` deliberately changes nothing about the row itself: the
        // variant's work happens on the list (no frame) and through
        // `--listview-item-px`. Declared rather than omitted so the supported
        // set is readable from this slot too.
        plain: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }),
  label: cva({ base: TEXT_CELL }),
  title: cva({ base: TEXT_CELL }),
  description: cva({
    // No `row-start`: each description auto-flows onto the next row of the
    // text column, so a row can carry more than one metadata line.
    base: [
      'col-start-1 self-center',
      'text-xs font-normal text-secondary group-disabled/option:text-disabled',
    ],
  }),
  // Placement only. This class reaches the row's trailing control through
  // `ButtonContext`, so it lands either on a single `<Button>`/`<ActionMenu>`
  // or on the `<ButtonGroup>` wrapping several of them — and a `<ButtonGroup>`
  // brings its own `flex gap-1` layout, so repeating one here would give two
  // sources for the same decision.
  action: cva({
    base: 'col-start-2 row-start-1 row-span-6 self-center justify-self-end ms-3',
  }),
};
