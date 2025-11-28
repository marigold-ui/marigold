import { PropsWithChildren } from 'react';
import { cn } from '@marigold/system';

export const Block = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={cn(
      'rounded-lg border-2 border-dashed border-black/25 bg-black/5 p-4',
      className
    )}
  >
    {children}
  </div>
);
