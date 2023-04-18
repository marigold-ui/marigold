import { forwardRef } from 'react';

import type { PolymorphicComponent, PropsOf } from '@marigold/types';

export interface BoxProps extends PropsOf<typeof Box> {}

export const Box = forwardRef(({ as = 'div', children, ...props }, ref) => (
  <div {...props} ref={ref}>
    {children}
  </div>
)) as PolymorphicComponent<'div'>;
