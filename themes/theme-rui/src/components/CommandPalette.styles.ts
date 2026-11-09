import { ThemeComponent, cva } from '@marigold/system';

// Rows share Menu's icon treatment and variants, but not its active state.
// A palette always has one active row and is mostly used by keyboard, so the
// row is marked like the Sidebar's current page (`selected` fill, medium
// label, icon at full ink) plus a leading bar in `foreground`. The fill alone
// is about 1.5:1 against the surface, the bar carries the 3:1 that WCAG
// 1.4.11 asks of a state indicator. No keyboard ring, the bar replaces it.
// The bar's colour comes from the variant.
const activeBar =
  'focus:font-medium focus:after:absolute focus:after:inset-y-2 focus:after:start-1 focus:after:w-0.75 focus:after:rounded-full';
const itemBase = `text-foreground focus:bg-selected focus:after:bg-foreground ${activeBar}`;

// Muted treatment for regular item icons, as in Menu, at full ink on the
// active row. Access variants keep the full-opacity access colour on their
// glyph.
const itemIconMuted =
  '[&_svg]:text-secondary [&_svg]:opacity-60 focus:[&_svg]:text-foreground focus:[&_svg]:opacity-100';

export const CommandPalette: ThemeComponent<'CommandPalette'> = {
  // Reads as a search field in a header, but is a button that opens the palette.
  // The shortcut hint is hidden on touch screens, where there is no keyboard.
  trigger: cva({
    base: [
      'ui-button-base ui-soft h-control w-full max-w-72 gap-2 px-3 text-sm text-secondary',
      'hover:[--ui-background-color:var(--color-soft-hover)] hover:[--soft-edge:var(--color-soft-edge-hover)]',
      'focus-visible:ui-state-focus',
      '[&_svg]:size-4 [&_svg]:shrink-0',
      'pointer-coarse:[&_kbd]:hidden',
    ],
  }),
  // The Underlay centers its child. The palette sits in the upper part of the
  // viewport instead, so its height can change without the input moving.
  container: cva({
    base: [
      'self-start mt-[12vh] w-[min(calc(100%_-_2rem),640px)]',
      'flex flex-col max-h-[min(560px,80vh)]',
      'ui-surface shadow-elevation-overlay overflow-hidden',
      'entering:animate-fade-in exiting:animate-fade-out',
    ],
  }),
  // The search is the dialog's header, not a field inside it: no frame and a
  // divider towards the list in the same colour Dialog and Drawer use.
  header: cva({
    base: [
      'flex shrink-0 items-center gap-2.5 h-13 px-4',
      'border-b border-border',
      '[&>svg]:size-4.5 [&>svg]:shrink-0 [&>svg]:text-secondary',
      // Clear button: quiet, round, appears once there is a query.
      '[&>button]:flex [&>button]:size-6 [&>button]:shrink-0 [&>button]:items-center [&>button]:justify-center [&>button]:rounded-full [&>button]:text-secondary [&>button]:cursor-pointer',
      '[&>button]:hover:bg-hover [&>button]:hover:text-foreground [&>button]:focus-visible:ui-state-focus',
      // The Esc hint only makes sense with a keyboard.
      'pointer-coarse:[&>kbd]:hidden',
    ],
  }),
  input: cva({
    base: [
      'min-w-0 flex-1 bg-transparent text-[15px] font-medium text-foreground outline-none',
      'placeholder:font-normal placeholder:text-placeholder',
      '[&::-webkit-search-cancel-button]:hidden',
    ],
  }),
  // Same column layout as Menu (icon, label, keyboard; groups subgrid into
  // it), owned here so the palette's density can differ from a menu's. On
  // desktop the list keeps a fixed height, so the input and footer stay put
  // while typing.
  list: cva({
    base: [
      'ui-scroll-mask-y min-h-0 flex-1 overflow-x-hidden p-1.5 outline-none sm:h-[min(360px,55vh)] sm:flex-none',
      'grid grid-cols-[auto_1fr_auto] content-start gap-y-0.5 *:col-span-full data-empty:content-center',
      '[&>section]:grid [&>section]:grid-cols-subgrid [&>section]:gap-y-0.5 [&>section>*]:col-span-full',
    ],
  }),
  group: cva({
    base: 'text-secondary px-2.5 pt-3 pb-1 text-xs font-medium in-first:pt-1',
  }),
  // Larger than a menu item, the palette being a primary navigation surface.
  // Icons and variants match Menu, the active state is the palette's own
  // (see `itemBase`).
  item: cva({
    base: [
      'group/option relative grid grid-cols-subgrid items-center cursor-pointer rounded-[calc(var(--radius-surface)-3px)] min-h-10 px-2.5 py-2 text-sm outline-hidden select-none text-nowrap max-sm:min-h-touch-target',
      // Keep col 1 occupied, so labels without an icon still align.
      "before:content-[''] before:col-start-1 before:row-start-1",
      'disabled:cursor-not-allowed disabled:text-disabled',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:row-span-full [&_svg]:self-center',
      '[&>svg:first-child]:col-start-1 [&>svg:first-child]:me-2',
    ],
    variants: {
      variant: {
        default: `${itemBase} ${itemIconMuted}`,
        destructive: `text-destructive-accent focus:bg-destructive-accent/10 focus:after:bg-destructive-accent ${activeBar}`,
        master: `${itemBase} [&_.access-icon]:text-access-master-foreground`,
        admin: `${itemBase} [&_.access-icon]:text-access-admin-foreground`,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  label: cva({ base: 'col-start-2 row-start-1' }),
  description: cva({
    base: 'col-start-2 row-start-2 text-secondary text-xs whitespace-normal group-disabled/option:text-disabled',
  }),
  keyboard: cva({
    base: 'col-start-3 row-span-full self-center justify-self-end ps-4 text-secondary text-xs',
  }),
  // Places the Enter hint (a `Keyboard` key cap) on the active row. Keyboard only.
  enter: cva({
    base: 'col-start-3 row-span-full self-center justify-self-end ms-4 pointer-coarse:hidden',
  }),
  // The part of a label that matched the query.
  match: cva({ base: 'bg-transparent font-semibold text-current' }),
  empty: cva({
    base: [
      'flex flex-col items-center gap-1 px-2 py-10 text-center text-sm text-secondary',
      '[&_strong]:font-medium [&_strong]:text-foreground',
    ],
  }),
  // Same divider as Dialog and Drawer footers, no fill of its own. The legend
  // is as quiet as it can be while staying readable: 12px secondary text
  // (5.7:1 on the surface), bare key glyphs instead of key caps.
  footer: cva({
    base: [
      'flex shrink-0 items-center justify-between gap-3 px-4 py-1',
      'border-t border-border text-xs text-secondary',
    ],
  }),
  legend: cva({
    base: [
      'ms-auto flex items-center gap-3 [&>span]:inline-flex [&>span]:items-center [&>span]:gap-1',
      '[&_kbd]:min-w-0 [&_kbd]:border-0 [&_kbd]:bg-transparent [&_kbd]:p-0 [&_kbd]:font-normal [&_kbd]:text-inherit',
    ],
  }),
};
