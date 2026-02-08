import { ThemeComponent, cva } from '@marigold/system';

export const FileField: ThemeComponent<'FileField'> = {
  container: cva({ base: 'space-y-2 ' }),
  dropZone: cva({
    base: [
      'relative flex min-h-52 flex-col items-center overflow-hidden',
      'rounded-xl border border-dashed border-surface-border',
      'p-4 transition-[color,background] not-data-files:justify-center',
      'data-[drop-target=true]:bg-muted',
      'focus-visible:bg-focus/50',
    ],
  }),
  dropZoneContent: cva({
    base: 'flex flex-col items-center justify-center gap-2 px-4 py-3 text-center',
  }),
  dropZoneLabel: cva({ base: 'text-sm font-medium' }),
  item: cva({
    base: [
      "[grid-template-areas:'label_remove'_'description_remove'] grid-cols-[1fr_auto] gap-y-0.5 gap-x-2",
      'p-2',
      'ui-surface shadow-elevation-border',
    ],
  }),
  itemLabel: cva({ base: ['truncate text-[13px] font-medium'] }),
  itemDescription: cva({ base: ['text-muted-foreground text-xs'] }),
  itemRemove: cva({ base: ['flex items-center'] }),
};
