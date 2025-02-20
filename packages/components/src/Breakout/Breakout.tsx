import { ReactNode } from 'react';
import type { AriaRegionProps } from '@marigold/types';

export interface BreakoutProps extends AriaRegionProps {
  children?: ReactNode;
}

export const Breakout = ({ children }: BreakoutProps) => {
  return <div className="![grid-column:1/-1]">{children}</div>;
};
