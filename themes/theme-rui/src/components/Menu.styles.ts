import { ThemeComponent, cva } from '@marigold/system';

const itemBase = 'text-foreground focus:bg-focus-highlight';

// Muted treatment for regular item icons. Access variants don't share it:
// their (only) icon is the access glyph, which keeps the full-opacity access
// foreground color instead.
const itemIconMuted = '[&_svg]:text-secondary [&_svg]:opacity-60';

export const Menu: ThemeComponent<'Menu'> = {
  container: cva({
    base: [
      // The surrounding Popover (or Tray) paints the overlay surface; the menu
      // renders flat inside it.
      'w-full',
      'text-foreground overflow-x-hidden p-1 outline-none overflow-y-auto',
    ],
  }),
  // Two-column grid: col 1 = optional icon, col 2 = label / description.
  // `<TextValue>` (label slot) → col 2 row 1; `<Description>` → col 2 row 2.
  // Plain children (text nodes, `<Badge>`, etc.) auto-place into the next
  // free cell, so items with extra inline content beyond label/description
  // should use explicit grid-area placement.
  item: cva({
    base: [
      'group/option relative grid grid-cols-[auto_1fr] items-center [&:has(>svg)]:gap-x-2 cursor-pointer rounded-[calc(var(--radius-surface)-3px)] p-2 text-sm outline-hidden select-none text-nowrap max-sm:min-h-touch-target',
      'disabled:cursor-not-allowed disabled:text-disabled',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:row-span-full [&_svg]:self-center',
    ],
    variants: {
      variant: {
        default: `${itemBase} ${itemIconMuted}`,
        destructive: 'text-destructive-accent focus:bg-destructive-accent/10',
        master: `${itemBase} [&_svg]:text-access-master-foreground`,
        admin: `${itemBase} [&_svg]:text-access-admin-foreground`,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }),
  section: cva({
    base: 'text-secondary p-2 text-xs font-medium border-t border-t-surface-border in-first:border-t-0',
  }),
  label: cva({ base: 'col-start-2 row-start-1' }),
  description: cva({
    base: 'col-start-2 row-start-2 text-secondary text-xs whitespace-normal group-disabled/option:text-disabled',
  }),
  button: cva({
    base: [
      'ui-button-base gap-2',
      'duration-150 active:scale-[0.97] pressed:not-aria-expanded:scale-[0.97]',
      'pending:ui-state-disabled',
    ],
    variants: {
      variant: {
        default: [
          // Neutral trigger = the secondary Button look. Disabled/pending come from
          // ui-button-base (disabled:ui-state-disabled + pending:ui-state-disabled).
          'ui-soft',
          'hover:[--ui-background-color:var(--color-soft-hover)] hover:[--soft-edge:var(--color-soft-edge-hover)]',
          'expanded:[--ui-background-color:var(--color-soft-hover)] expanded:[--soft-edge:var(--color-soft-edge-hover)]',
        ],
        ghost: 'hover:ui-state-hover',
      },
      size: {
        default: 'text-sm',
        small: 'text-xs',
        large: '',
        icon: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
    compoundVariants: [
      {
        variant: ['default', 'ghost'],
        class: 'items-center justify-center',
      },
      {
        variant: ['default', 'ghost'],
        size: 'default',
        class: 'h-control p-squish-relaxed [&_svg]:size-4',
      },
      {
        variant: ['default', 'ghost'],
        size: 'small',
        class: 'h-control-small px-3 [&_svg]:size-3.5',
      },
      {
        variant: ['default', 'ghost'],
        size: 'large',
        class: 'h-control-large px-8 [&_svg]:size-5',
      },
      {
        variant: ['default', 'ghost'],
        size: 'icon',
        class: 'size-control [&_svg]:size-4',
      },
    ],
  }),
};
