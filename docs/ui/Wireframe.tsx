import { cn } from '@marigold/system';

export interface WireframeProps {
  className?: string;
}

export const Box = ({ className }: WireframeProps) => (
  <div
    className={cn(
      'z-10',
      'bg-secondary-50/25 relative size-full bg-clip-padding',
      'border-secondary-300 rounded-lg border shadow-xs',
      'before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)]',
      'before:pointer-events-none before:shadow-[0_1px_--theme(--color-black/12%)]',
      className
    )}
  />
);
