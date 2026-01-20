import { ReactNode } from 'react';
import type { SpaceProp } from '@marigold/system';
import { cn, createSpacingVar, createVar } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export interface CenterProps
  extends
    SpaceProp<'section' | 'fieldY' | 'container' | 'group'>,
    AriaRegionProps {
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
        'mx-auto box-content flex flex-col items-center justify-center gap-y-(--space)',
        'max-w-(--maxWidth)'
      )}
      style={{
        ...createVar({ maxWidth }),
        ...createSpacingVar('space', `${space}`),
      }}
    >
      {children}
    </div>
  );
};
