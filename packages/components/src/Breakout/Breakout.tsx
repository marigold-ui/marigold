import { ReactNode } from 'react';
import type { AriaRegionProps } from '@marigold/types';

export interface BreakoutProps extends AriaRegionProps {
  children?: ReactNode;
}

export const Breakout = ({ children }: BreakoutProps) => (
  <div data-breakout className="col-span-full!">
    {children}
  </div>
);
