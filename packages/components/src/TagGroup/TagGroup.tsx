import type RAC from 'react-aria-components';
import { TagGroup, TagList, TagListProps } from 'react-aria-components';
import { WidthProp, useClassNames } from '@marigold/system';
import { FieldBase, FieldBaseProps } from '../FieldBase/FieldBase';
import { TagGroupHiddenInput } from './TagGroupHiddenInput';
import { TagGroupRemoveAll } from './TagGroupRemoveAll';

// Props
// ---------------
type RemovedProps = 'className' | 'style' | 'children' | 'isRequired';

export interface TagGroupProps
  extends
    Omit<RAC.TagGroupProps, RemovedProps>,
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

  /**
   * Renders a "remove all" option, when a the `onRemove` prop is also set.
   * @default false
   */
  removeAll?: boolean;
}

// Component
// ---------------
const _TagGroup = ({
  items,
  children,
  emptyState,
  variant,
  size,
  name,
  removeAll,
  ...rest
}: TagGroupProps) => {
  const classNames = useClassNames({ component: 'Tag', variant, size });

  return (
    <FieldBase as={TagGroup} {...rest}>
      <div className={classNames.container}>
        <TagList
          items={items}
          className={classNames.listItems}
          renderEmptyState={emptyState}
        >
          {children}
        </TagList>
        {rest.onRemove && removeAll ? (
          <TagGroupRemoveAll
            className={classNames.removeAll}
            onRemove={rest.onRemove}
          />
        ) : null}
      </div>
      {name ? <TagGroupHiddenInput name={name} /> : null}
    </FieldBase>
  );
};

export { _TagGroup as TagGroup };
