import type { RefObject } from 'react';
import { createContext } from 'react';

export interface AppShellContextValue {
  mainId: string;
  mainRef: RefObject<HTMLElement | null>;
}

export const AppShellContext = createContext<AppShellContextValue | null>(null);
