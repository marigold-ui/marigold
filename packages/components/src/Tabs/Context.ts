import { ComponentStyleParts } from '@marigold/system';
import { createContext, useContext } from 'react';

export interface TabContextProps {
  styles: ComponentStyleParts<['tabs', 'tab', 'tabPanel']>;
}

export const TabContext = createContext<TabContextProps>({} as any);
export const useTabContext = () => useContext(TabContext);
