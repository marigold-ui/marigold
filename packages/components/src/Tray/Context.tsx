import { createContext, use } from 'react';

export interface TrayContextProps {
  classNames: {
    overlay: string;
    container: string;
    dragHandle: string;
    header: string;
    title: string;
    content: string;
    actions: string;
  };
}

export const TrayContext = createContext<TrayContextProps>(
  null as unknown as TrayContextProps
);

export const useTrayContext = () => use(TrayContext);
