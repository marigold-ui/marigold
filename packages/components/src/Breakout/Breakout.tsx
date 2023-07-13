import React, { ReactNode } from 'react';
import { HtmlProps } from '@marigold/types';
import {
  cn,
  createVar,
  AlignmentProp,
  // alignmentX,
  // alignmentY,
  // AlignmentXProp,
  // AlignmentYProp,
} from '@marigold/system';

export interface BreakoutProps extends HtmlProps<'div'>, AlignmentProp {
  children?: ReactNode;
  height?: string;
}

export const Breakout = ({
  height,
  children,
  // alignX = 'left',
  // alignY = 'top',
  ...props
}: BreakoutProps) => {
  return (
    <div
      className={cn(
        'col-start-[1_!important] col-end-[-1_!important] w-full',
        // alignmentX[alignX],
        // alignmentY[alignY],
        // alignmentX[alignX] || alignmentY[alignY] ? 'flex' : 'block',
        'h-[--height]'
      )}
      style={createVar({ height })}
      {...props}
    >
      {children}
    </div>
  );
};
