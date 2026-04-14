import { ReactNode } from 'react';
import type {
  InsetSpacingTokens,
  PaddingSpacingTokens,
  SpaceProp,
} from '@marigold/system';
import { cn, createSpacingVar } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export type InsetProps =
  | (AriaRegionProps & {
      /**
       * The children of the component
       */
      children: ReactNode;
      space?: never;
      /**
       * Horizontal padding for the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       * @remarks `Scale | PaddingSpacingTokens`
       */
      spaceX?: SpaceProp<PaddingSpacingTokens>['space'];
      /**
       * Vertical padding for the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       * @remarks `Scale | PaddingSpacingTokens`
       */
      spaceY?: SpaceProp<PaddingSpacingTokens>['space'];
    })
  | (AriaRegionProps & {
      children: ReactNode;
      /**
       * The padding of the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       * @remarks `Scale | InsetSpacingTokens`
       */
      space?: SpaceProp<InsetSpacingTokens>['space'];
      spaceX?: never;
      spaceY?: never;
    });

export const Inset = ({ space, spaceX, spaceY, children }: InsetProps) => (
  <div
    className={cn(
      space !== undefined && 'p-(--space)',
      spaceX !== undefined && 'px-(--spaceX)',
      spaceY !== undefined && 'py-(--spaceY)'
    )}
    style={{
      ...(space !== undefined ? createSpacingVar('space', `${space}`) : {}),
      ...(spaceX !== undefined ? createSpacingVar('spaceX', `${spaceX}`) : {}),
      ...(spaceY !== undefined ? createSpacingVar('spaceY', `${spaceY}`) : {}),
    }}
  >
    {children}
  </div>
);
