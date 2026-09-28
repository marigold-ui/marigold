import type { ReactNode } from 'react';
import { AddonContext } from './AddonContext';

export const LabelAdornment = ({ children }: { children?: ReactNode }) => (
  <span className="inline-flex h-lh shrink-0 items-center gap-1 align-top">
    <AddonContext value={{ size: 'inline' }}>{children}</AddonContext>
  </span>
);
