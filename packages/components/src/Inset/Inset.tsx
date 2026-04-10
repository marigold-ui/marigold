import { ReactNode } from 'react';
import type {
  InsetSpacingTokens,
  SpaceProp,
  SpacingTokens,
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
       * @remarks `Scale | SpacingTokens`
       */
      spaceX?: SpaceProp<SpacingTokens>['space'];
      /**
       * Vertical padding for the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       * @remarks `Scale | SpacingTokens`
       */
      spaceY?: SpaceProp<SpacingTokens>['space'];
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
