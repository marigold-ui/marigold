import type RAC from 'react-aria-components';
import { TagGroup, TagList, TagListProps } from 'react-aria-components';

import { WidthProp, useClassNames } from '@marigold/system';

import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children' | 'isRequired';

export interface TagGroupProps
  extends Omit<RAC.TagGroupProps, RemovedProps>,
    Pick<TagListProps<object>, 'items' | 'children' | 'renderEmptyState'>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description'> {
  variant?: string;
  size?: string;
  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];
  /**
   * Displays a remove button on each tag.
   * @default false
   */
  allowsRemoving?: boolean;
}

// Component
// ---------------
const _TagGroup = ({
  width,
  items,
  children,
  renderEmptyState,
  variant,
  size,
  ...rest
}: TagGroupProps) => {
  const classNames = useClassNames({ component: 'Tag', variant, size });

  return (
    <FieldBase as={TagGroup} {...rest}>
      <TagList
        items={items}
        className={classNames.listItems}
        renderEmptyState={renderEmptyState}
      >
        {children}
      </TagList>
    </FieldBase>
  );
};

export { _TagGroup as TagGroup };
