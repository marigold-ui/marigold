import { createContext, use } from 'react';

export interface TagGroupContextProps {
  disabled?: boolean;
}

export const TagGroupContext = createContext<TagGroupContextProps>({});
export const useTagGroupContext = () => use(TagGroupContext);
