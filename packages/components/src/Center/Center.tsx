import { ReactNode } from 'react';
import type { GapSpaceProp } from '@marigold/system';
import { cn, createVar, gapSpace } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export interface CenterProps extends GapSpaceProp, AriaRegionProps {
  children?: ReactNode;
  /**
   * The maximum width of the container.
   * @default 100%
   */
  maxWidth?: string;
}

export const Center = ({
  maxWidth = '100%',
  space = 0,
  children,
  ...props
}: CenterProps) => {
  return (
    <div
      {...props}
      className={cn(
        'ms-[auto] me-[auto] box-content flex flex-col items-center justify-center',
        gapSpace[space],
        'max-w-(--maxWidth)'
      )}
      style={createVar({ maxWidth })}
    >
      {children}
    </div>
  );
};
