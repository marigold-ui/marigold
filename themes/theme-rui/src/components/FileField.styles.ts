import { ThemeComponent, cva } from '@marigold/system';

export const FileField: ThemeComponent<'FileField'> = {
  container: cva('space-y-2 '),
  dropZone: cva([
    'relative flex min-h-52 flex-col items-center overflow-hidden',
    'rounded-xl border border-dashed border-surface-border',
    'p-4 transition-[color,background] not-data-files:justify-center',
    'data-[drop-target=true]:bg-muted',
    'focus-visible:bg-focus/50',
  ]),
  dropZoneContent: cva(
    'flex flex-col items-center justify-center gap-2 px-4 py-3 text-center'
  ),
  dropZoneLabel: cva('text-sm font-medium'),
  item: cva([
    "[grid-template-areas:'label_remove'_'description_remove'] grid-cols-[1fr_auto] gap-y-0.5 gap-x-2",
    'p-2',
    'surface elevation-raised',
  ]),
  itemLabel: cva(['truncate text-[13px] font-medium']),
  itemDescription: cva([' text-muted-foreground text-xs']),
  itemRemove: cva(['flex items-center']),
};
