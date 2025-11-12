/**
 * Separate this in:
 *
 * - surface: base -> "variants" with elevation
 * - state: disabled, readOnly, error, focus
 * - input (this is kind of "specially", maybe it really needs to be only on <input> elements)
 * - maybe "field" would also more sense or this is even more specific to inputs? (e.g. the `has-` does not work when using the focus stuff with buttons)
 * - focus still needs a "borderless" version
 */
export const surface = {
  base: [
    'relative inline-flex w-full',
    'bg-surface bg-clip-padding',
    'border border-surface-border rounded-surface',
    'has-default-state:shadow-xs transition transition-[box-shadow, border]',

    // ::before
    'before:pointer-events-none',
    'before:absolute',
    'before:inset-0',
    'before:rounded-[calc(var(--radius-surface)-1px)]', // this makes a 1px border
    'has-default-state:before:shadow-surface',
  ],
  disabled: [
    'disabled:cursor-not-allowed disabled:text-disabled-foreground disabled:bg-disabled',
  ],
  readOnly: ['group-read-only/field:bg-muted'],
  error: [
    'group-invalid/field:border-destructive',
    'group-invalid/field:has-focus:border-destructive',
    'group-invalid/field:has-focus:ring-destructive/20',
  ],
  ring: ['ring-ring/25', 'has-focus:border-ring has-focus:ring-[3px]'],
};

export const input =
  'w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)] outline-none text-sm text-foreground';
