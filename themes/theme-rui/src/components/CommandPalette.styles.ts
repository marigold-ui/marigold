import { ThemeComponent, cva } from '@marigold/system';
import {
  Menu,
  menuItemBase,
  menuItemIconMuted,
  menuItemLayout,
} from './Menu.styles';

// Rows share Menu's layout, icon treatment, variants and active fill
// (`focus-highlight`). A palette always has one active row and is mostly
// used by keyboard, so instead of Menu's keyboard ring the row adds a heavier
// label, its icon at full ink and the ↵ hint.
// The heavier label is a hairline text stroke, not `font-medium`: a real
// weight change widens the glyphs, so the label jumped whenever the active
// row followed the pointer. The stroke keeps every advance width. Inter has
// no grade axis that could do this natively. Description and key caps keep
// their own weight.
const itemActive = [
  'focus:[-webkit-text-stroke:0.02em_currentColor]',
  '[&_[slot=description]]:[-webkit-text-stroke:0] [&_kbd]:[-webkit-text-stroke:0]',
].join(' ');
const itemBase = `${menuItemBase} ${itemActive}`;
const itemIconMuted = `${menuItemIconMuted} focus:[&_svg]:text-foreground focus:[&_svg]:opacity-100`;

export const CommandPalette: ThemeComponent<'CommandPalette'> = {
  // Looks like an Input with a leading icon: the same `ui-control ui-input`
  // frame, and the icon and text at Input's offsets (icon at `left-2.5`,
  // text at `pl-8`). It is a button that opens the palette, but without a
  // press scale or button weight, so it doesn't read as an action.
  // The shortcut hint is hidden on touch screens, where there is no keyboard.
  trigger: cva({
    base: [
      'ui-control ui-input flex max-w-72 items-center gap-1.5 ps-2.5 text-start text-placeholder cursor-text outline-none',
      'focus-visible:ui-state-focus',
      'disabled:ui-state-disabled',
      '[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-secondary',
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
      // A short, barely visible scale on top of the Underlay's quick fade.
      // Reduced motion keeps only the fade.
      'motion-safe:entering:animate-scale-in motion-safe:exiting:animate-scale-out',
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
      'ui-scrollbar ui-scroll-mask-y min-h-0 flex-1 overflow-x-hidden p-1.5 outline-none sm:h-[min(360px,55vh)] sm:flex-none',
      'grid grid-cols-[auto_1fr_auto] content-start gap-y-0.5 *:col-span-full data-empty:content-center',
      '[&>section]:grid [&>section]:grid-cols-subgrid [&>section]:gap-y-0.5 [&>section>*]:col-span-full',
      '[&>section+section]:mt-3',
    ],
  }),
  group: cva({
    base: 'text-secondary px-2.5 pt-1 pb-1 text-xs font-medium',
  }),
  // Larger than a menu item, the palette being a primary navigation surface.
  // Icons and variants match Menu, the active state is the palette's own
  // (see `itemBase`).
  item: cva({
    base: [
      'group/option relative grid grid-cols-subgrid items-center cursor-pointer rounded-[calc(var(--radius-surface)-3px)] min-h-10 px-2.5 py-2 text-sm outline-hidden select-none text-nowrap max-sm:min-h-touch-target',
      ...menuItemLayout,
    ],
    variants: {
      variant: {
        default: `${itemBase} ${itemIconMuted}`,
        destructive: `text-destructive-accent focus:bg-destructive-accent/10 ${itemActive}`,
        master: `${itemBase} [&_.access-icon]:text-access-master-foreground`,
        admin: `${itemBase} [&_.access-icon]:text-access-admin-foreground`,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  label: Menu.label,
  description: Menu.description,
  keyboard: Menu.keyboard,
  // Places the Enter hint (a `Keyboard` key cap) on the active row. Keyboard only.
  enter: cva({
    base: 'col-start-3 row-span-full self-center justify-self-end ms-4 pointer-coarse:hidden',
  }),
  // The part of a label that matched the query.
  match: cva({ base: 'bg-transparent font-semibold text-current' }),
  // Fills the list's grid row, so the message is centred in the list.
  empty: cva({
    base: [
      'col-span-full flex w-full flex-col items-center gap-1 px-2 py-10 text-center text-sm text-secondary',
      '[&>svg]:mb-2 [&>svg]:size-6 [&>svg]:opacity-60',
      '[&_strong]:font-medium [&_strong]:text-foreground',
    ],
  }),
  // Same divider as Dialog and Drawer footers, no fill of its own. The legend
  // uses the same key caps as the header's Esc hint, with 12px secondary
  // labels (5.7:1 on the surface).
  footer: cva({
    base: [
      'flex h-10 shrink-0 items-center justify-between gap-3 px-4',
      'border-t border-border text-xs text-secondary',
    ],
  }),
  legend: cva({
    base: [
      'ms-auto flex items-center gap-4 [&>span]:inline-flex [&>span]:items-center [&>span]:gap-1.5',
      // Compact caps: the legend is a quiet reminder, not a call to action.
      // Smaller than the header's Esc cap and the ↵ on the active row.
      '[&_kbd]:h-4.5 [&_kbd]:min-w-4.5 [&_kbd]:px-1 [&_kbd]:py-0 [&_kbd]:text-[10px] [&_kbd]:leading-none',
    ],
  }),
};
