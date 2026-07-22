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
      'text-foreground overflow-x-hidden p-1 outline-none overflow-y-auto space-y-px',
      // Breathing room around dividers (the shared <Divider> rendered between items).
      '[&_[role=separator]]:my-1',
    ],
  }),
  // Grid: col 1 = icon/checkmark, col 2 = label/description, col 3 = keyboard.
  item: cva({
    base: [
      'group/option relative grid grid-cols-[auto_1fr_auto] items-center [&:has(>svg)]:gap-x-2 cursor-pointer rounded-[calc(var(--radius-surface)-3px)] p-2 text-sm outline-hidden select-none text-nowrap max-sm:min-h-11',
      'disabled:cursor-not-allowed disabled:text-disabled',
      '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:size-4 [&_svg]:row-span-full [&_svg]:self-center',
      // Selection visuals like ListBox: checkmark reserves col 1, row highlights on select. Don't also add a leading icon.
      '[&_.selection-indicator]:invisible [&_.selection-indicator]:text-foreground [&_.selection-indicator]:opacity-100',
      'selected:bg-selected selected:[&_.selection-indicator]:visible',
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
  // Shortcut hint, right-aligned in col 3 and vertically centered.
  keyboard: cva({
    base: 'col-start-3 row-span-full self-center justify-self-end ps-4 text-secondary text-xs',
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
