import { ThemeComponent, cva } from '@marigold/system';

export const FileField: ThemeComponent<'FileField'> = {
  container: cva({ base: 'space-y-2 ' }),
  dropZone: cva({
    base: [
      'relative overflow-hidden transition-[color,background]',
      'data-[drop-target=true]:bg-muted',
      'focus-visible:bg-focus-highlight/50',
    ],
    variants: {
      size: {
        default: [
          'flex min-h-52 flex-col items-center rounded-xl',
          'border border-dashed border-control-border',
          'p-4 not-data-files:justify-center',
        ],
      },
    },
    defaultVariants: { size: 'default' },
  }),
  dropZoneContent: cva({
    base: 'flex flex-col items-center justify-center gap-2 px-4 py-3 text-center',
  }),
  dropZoneLabel: cva({ base: 'text-sm font-medium' }),
  item: cva({
    base: [
      "[grid-template-areas:'label_remove'_'description_remove'] grid-cols-[1fr_auto] gap-y-0.5 gap-x-2",
      'p-2',
      'ui-surface',
    ],
  }),
  itemLabel: cva({
    base: 'truncate font-medium',
    variants: {
      size: {
        default: 'text-[13px]',
        small: 'text-xs',
      },
    },
    defaultVariants: { size: 'default' },
  }),
  itemDescription: cva({
    base: 'text-secondary',
    variants: {
      size: {
        default: 'text-xs',
        small: 'text-xs',
      },
    },
    defaultVariants: { size: 'default' },
  }),
  itemRemove: cva({ base: ['flex items-center'] }),
};
