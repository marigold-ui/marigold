/**
 * Based on https://theme-ui.com/components/aspect-ratio
 */
import React, { ReactNode } from 'react';

import { HtmlProps } from '@marigold/types';
import { cn, createVar, aspect, AspectProp } from '@marigold/system';

export interface AspectProps extends HtmlProps<'div'>, AspectProp {
  children?: ReactNode;
  maxWidth?: string;
}

export const Aspect = ({
  ratio = 'square',
  maxWidth,
  children,
}: AspectProps) => (
  <div
    className={cn('overflow-hidden', aspect[ratio], 'max-w-[var(--maxWidth)]')}
    style={createVar({ maxWidth })}
  >
    {children}
  </div>
);
