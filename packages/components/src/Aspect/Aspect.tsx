/**
 * Based on https://theme-ui.com/components/aspect-ratio
 */
import React, { ReactNode } from 'react';

import { AspectProp, aspect, cn, createVar } from '@marigold/system';
import { HtmlProps } from '@marigold/types';

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
