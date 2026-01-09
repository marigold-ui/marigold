import { ThemeComponent, cva } from '@marigold/system';

export const EmptyState: ThemeComponent<'EmptyState'> = {
  container: cva(['mx-auto flex max-w-sm flex-col items-center p-6']),
  title: cva(['text-lg']),
  description: cva(['text-muted-foreground', 'text-sm']),
  action: cva(['mt-6']),
};
