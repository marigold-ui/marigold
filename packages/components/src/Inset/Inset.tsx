import { ReactNode } from 'react';
import {
  cn,
  paddingSpace,
  paddingSpaceX,
  paddingSpaceY,
} from '@marigold/system';
import type {
  PaddingSpaceProp,
  PaddingSpacePropX,
  PaddingSpacePropY,
} from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

export type InsetProps =
  | (AriaRegionProps & {
      /**
       * The children of the component
       */
      children: ReactNode;
      space?: never;
      /**
       * Horizontal alignment for the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       */
      spaceX?: PaddingSpacePropX['spaceX'];
      /**
       * Vertical alignment for the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       */
      spaceY?: PaddingSpacePropY['spaceY'];
    })
  | (AriaRegionProps & {
      children: ReactNode;
      /**
       * The space between the children. You can see allowed tokens [here](../../foundations/design-tokens?theme=core#spacing).
       */
      space?: PaddingSpaceProp['space'];
      spaceX?: never;
      spaceY?: never;
    });

export const Inset = ({ space, spaceX, spaceY, children }: InsetProps) => (
  <div
    className={cn(
      space && paddingSpace[space],
      !space && spaceX && paddingSpaceX[spaceX],
      !space && spaceY && paddingSpaceY[spaceY]
    )}
  >
    {children}
  </div>
);
