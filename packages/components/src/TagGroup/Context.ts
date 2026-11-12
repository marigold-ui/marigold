import { createContext, use } from 'react';

export interface TagGroupContextProps {
  disabled?: boolean;
}

export const TagGroupContext = createContext<TagGroupContextProps>({});
export const useTagGroupContext = () => use(TagGroupContext);

/**
 * Set by `TagGroup` around the tags beyond `collapseAt`, so each `Tag` hides
 * itself while the group is collapsed. Context reaches a `Tag` even when the
 * consumer wraps it in their own component.
 */
export interface TagCollapseContextProps {
  hidden?: boolean;
}

export const TagCollapseContext = createContext<TagCollapseContextProps>({});
export const useTagCollapseContext = () => use(TagCollapseContext);
