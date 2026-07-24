import type { ReactNode } from 'react';
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
      p?: never;
      /**
       * Horizontal padding for the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       */
      px?: SpaceProp<PaddingSpacingTokens>['space'];
      /**
       * Vertical padding for the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       */
      py?: SpaceProp<PaddingSpacingTokens>['space'];
    })
  | (AriaRegionProps & {
      children: ReactNode;
      /**
       * The padding of the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       */
      p?: SpaceProp<InsetSpacingTokens>['space'];
      px?: never;
      py?: never;
    });

export const Inset = ({ p, px, py, children, ...props }: InsetProps) => (
  <div
    {...props}
    className={cn(
      p !== undefined && 'p-(--inset-p)',
      px !== undefined && 'px-(--inset-px)',
      py !== undefined && 'py-(--inset-py)'
    )}
    style={{
      ...(p !== undefined ? createSpacingVar('inset-p', `${p}`) : {}),
      ...(px !== undefined ? createSpacingVar('inset-px', `${px}`) : {}),
      ...(py !== undefined ? createSpacingVar('inset-py', `${py}`) : {}),
    }}
  >
    {children}
  </div>
);
