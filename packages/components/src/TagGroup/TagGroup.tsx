import type RAC from 'react-aria-components';
import { TagGroup, TagList, TagListProps } from 'react-aria-components';

import { WidthProp, useClassNames } from '@marigold/system';

import { FieldBase, FieldBaseProps } from '../FieldBase/_FieldBase';

// Props
// ---------------
type RemovedProps =
  | 'className'
  | 'style'
  | 'children'
  | 'isRequired'
  | 'isInvalid';

export interface TagGroupProps
  extends Omit<RAC.TagGroupProps, RemovedProps>,
    Pick<TagListProps<object>, 'items' | 'children' | 'renderEmptyState'>,
    Pick<FieldBaseProps<'label'>, 'label' | 'description' | 'errorMessage'> {
  variant?: string;
  size?: string;
  width?: WidthProp['width'];
  required?: boolean;
  error?: boolean;
  allowsRemoving?: boolean;
}

// Component
// ---------------
const _TagGroup = ({
  width,
  required,
  error,
  items,
  renderEmptyState,
  children,
  variant,
  size,
  ...rest
}: TagGroupProps) => {
  const props = {
    isRequired: required,
    isInvalid: error,
    ...rest,
  };
  const classNames = useClassNames({ component: 'Tag', variant, size });

  return (
    <FieldBase as={TagGroup} {...props}>
      <TagList
        items={items}
        renderEmptyState={renderEmptyState}
        className={classNames.listItems}
      >
        {children}
      </TagList>
    </FieldBase>
  );
};

export { _TagGroup as TagGroup };
