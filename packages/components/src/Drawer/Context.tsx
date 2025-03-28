import { createContext, useContext } from 'react';
import { ThemeComponentParts } from '@marigold/system';

export const DrawerContext = createContext<{
  classNames: { [Part in ThemeComponentParts<'Drawer'>]: string };
}>({
  classNames: {
    container: 'bg-background',
    closeButton: '',
    header: '',
    content: '',
    actions: '',
  },
});
export const useDrawerContext = () => useContext(DrawerContext);
