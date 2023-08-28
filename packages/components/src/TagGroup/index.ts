import { Item } from '@react-stately/collections';

import { TagGroup } from './TagGroup';

export const Tag = Item as TagComponent;
Tag.Group = TagGroup;

/**
 * We need this so that TypeScripts allows us to add
 * additional properties to the component (function).
 */
type ItemComponent = typeof Item;
export interface TagComponent extends ItemComponent {
  Group: typeof TagGroup;
}
