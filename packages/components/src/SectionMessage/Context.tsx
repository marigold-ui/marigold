import { createContext, useContext } from 'react';

export const SectionMessageContext = createContext<{
  classNames: {
    container: string;
    icon: string;
    title: string;
    content: string;
  };
}>({} as any);

export const useSectionMessageContext = () => useContext(SectionMessageContext);
