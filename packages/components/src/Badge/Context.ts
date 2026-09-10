import { createContext } from 'react';

export interface BadgeContext {
  size?: string;
}

export const BadgeContext = createContext<BadgeContext>({});
