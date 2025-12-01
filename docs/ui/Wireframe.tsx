import { cn } from '@marigold/system';

export interface WireframeProps {
  className?: string;
}

export const Box = ({ className }: WireframeProps) => (
  <div
    className={cn(
      'border-secondary-900/30 bg-secondary-50/25 h-8 w-full rounded-lg border',
      className
    )}
  />
);

export const Field = ({ className }: WireframeProps) => (
  <div className={cn('flex w-full flex-col gap-1', className)}>
    <div className="bg-secondary-900/30 h-3 w-20 rounded" />
    <Box />
  </div>
);
