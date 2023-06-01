import type { ReactNode } from 'react';
import { Headline } from '@marigold/components';

export interface GradientHeadlineProps {
  children: ReactNode;
}

export const GradientHeadline = ({ children }: GradientHeadlineProps) => (
  <Headline level="1" variant="gradient">
    <span>{children}</span>
  </Headline>
);
