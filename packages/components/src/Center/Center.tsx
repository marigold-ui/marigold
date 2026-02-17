import { ReactNode } from 'react';
import type { SpaceProp, SpacingTokens } from '@marigold/system';
import { cn, createSpacingVar, createVar } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export interface CenterProps extends AriaRegionProps {
  /**
   * Set the spacing between child elements.
   * @remarks `SpacingTokens<Tokens>`
   */
  space?: SpaceProp<SpacingTokens>['space'];

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
