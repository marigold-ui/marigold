import type { RefCallback } from 'react';
import { createContext, use } from 'react';

export interface TrayContextProps {
  classNames: {
    overlay: string;
    container: string;
    dragHandle: string;
    header: string;
    title: string;
    description: string;
    content: string;
    actions: string;
  };
  titleId?: string;
  hasTitle?: boolean;
  titleSlotRef?: RefCallback<Element>;
}

export const TrayContext = createContext<TrayContextProps>(
  null as unknown as TrayContextProps
);

export const useTrayContext = () => use(TrayContext);
