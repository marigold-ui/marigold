import { ThemeComponent, cva } from '@marigold/system';

export const Checkbox: ThemeComponent<'Checkbox'> = {
  checkbox: cva({
    base: [
      'grid size-4 shrink-0 place-content-center rounded p-px',
      // One shared edge for every small boolean control. Weight and reasoning
      // live on the token, so Radio and GridSelectionIndicator cannot drift.
      'border border-control-edge bg-surface',
      'group-focus-visible/checkbox:ui-state-focus outline-none',
      // `text-disabled!` because `group-selected` and `group-indeterminate`
      // sort after `group-disabled`. Indeterminate needs its own fill rule
      // too, it never sets `data-selected`.
      'group-disabled/checkbox:group-selected/checkbox:bg-disabled-surface group-disabled/checkbox:group-indeterminate/checkbox:bg-disabled-surface group-disabled/checkbox:border-control-edge-disabled! group-disabled/checkbox:text-disabled! group-disabled/checkbox:cursor-not-allowed',
      'group-selected/checkbox:border-selected-bold group-selected/checkbox:bg-selected-bold group-selected/checkbox:text-selected-bold-foreground',
      'group-indeterminate/checkbox:border-selected-bold group-indeterminate/checkbox:bg-selected-bold group-indeterminate/checkbox:text-selected-bold-foreground',
      'group-hover/checkbox:group-disabled/checkbox:bg-disabled-surface',
      'group-read-only/checkbox:not-group-disabled/checkbox:not-group-selected/checkbox:not-group-indeterminate/checkbox:bg-control',
      'group-read-only/checkbox:group-selected/checkbox:border-selected-readonly group-read-only/checkbox:group-selected/checkbox:bg-selected-readonly',
      'group-read-only/checkbox:group-indeterminate/checkbox:border-selected-readonly group-read-only/checkbox:group-indeterminate/checkbox:bg-selected-readonly',
      // Each `:not()` outranks a state rule above, so removing one lets hover
      // repaint it. `disabled` isn't, its rule carries `!important`. Focus
      // needs none, its ring sits outside the border.
      'group-hover/checkbox:not-group-read-only/checkbox:not-group-selected/checkbox:not-group-indeterminate/checkbox:border-control-edge-hover',
    ],
  }),
  container: cva({
    base: [
      'grid grid-cols-[auto_1fr] gap-x-2 items-start',
      'cursor-pointer read-only:cursor-default',
      'group-data-[booleanfield]/booleanfield:grid-cols-subgrid group-data-[booleanfield]/booleanfield:col-span-full',
      'group-data-[orientation=vertical]/checkboxgroup:py-1',
      'group-data-[orientation=horizontal]/checkboxgroup:px-1.5',
    ],
  }),
  label: cva({
    base: [
      'flex items-start gap-1',
      'text-sm leading-4 group-[&]/checkboxgroup:font-normal font-medium text-foreground',
      'group-disabled/checkbox:text-disabled',
    ],
  }),
  group: cva({ base: 'flex flex-col' }),
};
