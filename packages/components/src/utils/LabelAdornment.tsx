import type { ReactNode } from 'react';
import { BadgeContext } from '../Badge/Context';

export const LabelAdornment = ({ children }: { children?: ReactNode }) => (
  <span className="inline-flex h-[1lh] shrink-0 items-center align-top">
    <BadgeContext value={{ size: 'inline' }}>{children}</BadgeContext>
  </span>
);
