import type { ReactNode } from 'react';
import { BadgeContext } from '../Badge/Context';

export const LabelAdornment = ({ children }: { children?: ReactNode }) => (
  <span className="inline-flex h-lh shrink-0 items-center gap-1 align-top">
    <BadgeContext value={{ size: 'inline' }}>{children}</BadgeContext>
  </span>
);
