import type { ReactNode } from 'react';

export const resolveTextValue = (
  textValue: string | undefined,
  children: ReactNode
): string | undefined =>
  textValue ??
  (typeof children === 'string' || typeof children === 'number'
    ? String(children)
    : undefined);
