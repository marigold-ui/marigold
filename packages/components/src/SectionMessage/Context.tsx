import { createContext, use } from 'react';

export const SectionMessageContext = createContext<{
  classNames: {
    container: string;
    icon: string;
    title: string;
    description: string;
    content: string;
  };
}>({} as any);

export const useSectionMessageContext = () => use(SectionMessageContext);
