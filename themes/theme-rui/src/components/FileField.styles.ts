import { ThemeComponent, cva } from '@marigold/system';

export const FileField: ThemeComponent<'FileField'> = {
  container: cva('space-y-2 '),
  dropZone: cva(
    'data-[drop-target=true]:bg-muted border-input has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]'
  ),
  dropZoneContent: cva(
    'flex flex-col items-center justify-center gap-2 px-4 py-3 text-center'
  ),
  dropZoneLabel: cva('text-sm font-medium'),
  item: cva('flex min-w-0 flex-col gap-0.5'),
  itemLabel: cva('truncate text-[13px] font-medium'),
  itemDescription: cva('text-muted-foreground text-xs'),
};
