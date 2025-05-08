import type RAC from 'react-aria-components';
import { TagGroup, TagList, TagListProps } from 'react-aria-components';
import { WidthProp, useClassNames } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { TagGroupHiddenInput } from './TagGroupHiddenInput';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children' | 'isRequired';

export interface TagGroupProps
  extends Omit<RAC.TagGroupProps, RemovedProps>,
    Pick<TagListProps<object>, 'items' | 'children'>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description'> {
  variant?: string;
  size?: string;

  /**
   * Sets the width of the field. You can see allowed tokens here: https://tailwindcss.com/docs/width
   * @default full
   */
  width?: WidthProp['width'];

  /**
   * The name of the field, used when submitting form data.
   */
  name?: string;

  /**
   * Provides content to display when there are no items in the tag list.
   */
  emptyState?: TagListProps<object>['renderEmptyState'];
}

// Component
// ---------------
const _TagGroup = ({
  width,
  items,
  children,
  emptyState,
  variant,
  size,
  name,
  ...rest
}: TagGroupProps) => {
  const classNames = useClassNames({ component: 'Tag', variant, size });

  return (
    <FieldBase as={TagGroup} {...rest}>
      <TagList
        items={items}
        className={classNames.listItems}
        renderEmptyState={emptyState}
      >
        {children}
      </TagList>
      {name ? <TagGroupHiddenInput name={name} /> : null}
    </FieldBase>
  );
};

export { _TagGroup as TagGroup };
