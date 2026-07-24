import type { PropsWithChildren } from 'react';
import { cn } from '@marigold/system';

export interface WireframeProps {
  className?: string;
}

export const Box = ({
  className,
  children,
}: PropsWithChildren<WireframeProps>) => (
  <div
    className={cn(
      'relative z-10 size-full bg-clip-padding',
      'rounded-lg border border-neutral-300 shadow-lg',
      'bg-linear-to-b from-neutral-100/30 to-neutral-200/80',
      'inset-shadow-[0_1px_0_0_--theme(--color-white/90%),0_2px_4px_--theme(--color-black/3%)]',
      'before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)]',
      'before:pointer-events-none before:shadow-[0_1px_--theme(--color-black/12%)]',
      className
    )}
  >
    {children}
  </div>
);
