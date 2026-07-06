import { ThemeComponent, cva } from '@marigold/system';

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
      'relative grid grid-cols-[auto_1fr] items-center [&:has(>svg)]:gap-x-2 cursor-pointer rounded-[calc(var(--radius-surface)-3px)] p-2 text-sm outline-hidden select-none text-nowrap max-sm:min-h-11',
      'disabled:text-disabled',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:row-span-full [&_svg]:self-center',
    ],
    variants: {
      variant: {
        default:
          'text-foreground focus:bg-focus-highlight [&_svg]:text-secondary [&_svg]:opacity-60',
        destructive: 'text-destructive-accent focus:bg-destructive-accent/10',
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
    base: 'col-start-2 row-start-2 text-secondary text-xs whitespace-normal',
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
          'ui-surface-control shadow-elevation-border',
          'hover:[--ui-background-color:var(--color-hover)] hover:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.12))] hover:text-foreground',
          'expanded:[--ui-background-color:var(--color-hover)] expanded:[--ui-border-color:oklch(from_var(--color-control-border)_l_c_h_/_calc(alpha_+_0.12))]',
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
