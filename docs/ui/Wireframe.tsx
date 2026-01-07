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
      'border-secondary-300 rounded-lg border shadow-lg',
      // fill
      'to-secondary-100/80 from-secondary-50/30 bg-linear-to-b',
      'inset-shadow-[0_1px_0_0_--theme(--color-white/90%),0_2px_4px_--theme(--color-black/3%)]',
      // ::before
      'before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)]',
      'before:pointer-events-none before:shadow-[0_1px_--theme(--color-black/12%)]',
      className
    )}
  >
    {children}
  </div>
);
