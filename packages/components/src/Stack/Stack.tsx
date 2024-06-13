import { ReactNode } from 'react';

import {
  AlignmentProp,
  GapSpaceProp,
  alignment,
  cn,
  gapSpace,
} from '@marigold/system';

// Props
// ---------------
export interface StackProps extends AlignmentProp, GapSpaceProp {
  children?: ReactNode;

  /**
   * Stretch to fill space (vertical AND horizontal, useful if you want to change y alignment).
   * @default false
   */
  stretch?: boolean;

  /**
   * Horizontal alignment for the children.
   * @default none
   */
  alignX?: keyof typeof alignment.vertical.alignmentX;

  /**
   * Vertical alignment for the children.
   * @default none
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
