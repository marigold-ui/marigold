import { ReactNode } from 'react';
import type { GapSpaceProp } from '@marigold/system';
import { alignment, cn, gapSpace } from '@marigold/system';
import type { AriaRegionProps } from '@marigold/types';

// Props
// ---------------
export interface StackProps extends GapSpaceProp, AriaRegionProps {
  /**
   * Children of the component.
   */
  children?: ReactNode;

  /**
   * Stretch to fill space (vertical AND horizontal, useful if you want to change y alignment).
   * @default false
   */
  stretch?: boolean;

  /**
   * Horizontal alignment for the children.
   */
  alignX?: keyof typeof alignment.vertical.alignmentX;

  /**
   * Vertical alignment for the children.
   */
  alignY?: keyof typeof alignment.vertical.alignmentY;
}

// Component
// ---------------
export const Stack = ({
  children,
  space = 0,
  stretch = false,
  alignX,
  alignY,
  ...props
}: StackProps) => {
  return (
    <div
      className={cn(
        'flex flex-col',
        gapSpace[space],
        alignX && alignment?.vertical?.alignmentX[alignX],
        alignY && alignment?.vertical?.alignmentY[alignY],
        stretch && 'h-full w-full'
      )}
      {...props}
    >
      {children}
    </div>
  );
};
