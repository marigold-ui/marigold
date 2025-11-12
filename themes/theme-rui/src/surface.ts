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
  disabled: ['has-disabled:opacity-65'],
  error: [
    'group-invalid/field:border-destructive',
    'group-invalid/field:has-focus:border-destructive',
    'group-invalid/field:has-focus:ring-destructive/20',
  ],
  ring: ['ring-ring/25', 'has-focus:border-ring has-focus:ring-[3px]'],
};

export const input =
  'w-full min-w-0 rounded-[inherit] px-[calc(--spacing(3)-1px)] py-[calc(--spacing(2)-1px)] outline-none text-sm text-foreground';
