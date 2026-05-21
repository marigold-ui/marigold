import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Tag } from 'react-aria-components/TagGroup';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { useTagGroupContext } from './Context';
import { TagGroup } from './TagGroup';

type RemovedProps = 'className' | 'style' | 'isDisabled';

// Props
// ---------------
export interface TagProps extends Omit<RAC.TagProps, RemovedProps> {
  variant?: string;
  size?: string;
  children?: ReactNode;
  disabled?: boolean;
}

const _Tag = ({ variant, size, children, disabled, ...rest }: TagProps) => {
  let textValue = typeof children === 'string' ? children : undefined;

  const classNames = useClassNames({ component: 'Tag', variant, size });
  const { disabled: groupDisabled } = useTagGroupContext();

  const props = {
    isDisabled: disabled ?? groupDisabled,
    ...rest,
  };

  return (
    <Tag
      textValue={textValue}
      {...props}
      className={cn('data-selection-mode:cursor-pointer', classNames.tag)}
    >
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <CloseButton className={classNames.closeButton} slot="remove" />
          )}
        </>
      )}
    </Tag>
  );
};

_Tag.Group = TagGroup;
export { _Tag as Tag };
