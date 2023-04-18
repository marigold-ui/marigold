import { createElement, forwardRef } from 'react';

import type { PolymorphicComponent, PropsOf } from '@marigold/types';

export interface BoxProps extends PropsOf<typeof Box> {}

export const Box = forwardRef(({ as = 'div', children, ...props }, ref) =>
  createElement(
    as,
    {
      ...props,
      ref,
    },
    children
  )
) as PolymorphicComponent<'div'>;
