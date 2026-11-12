import { ReactNode } from 'react';
import type RAC from 'react-aria-components';
import { Tag as RACTag } from 'react-aria-components/TagGroup';
import { cn, useClassNames } from '@marigold/system';
import { CloseButton } from '../CloseButton/CloseButton';
import { useTagCollapseContext, useTagGroupContext } from './Context';
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

const Tag = ({ variant, size, children, disabled, ...rest }: TagProps) => {
  let textValue = typeof children === 'string' ? children : undefined;

  const classNames = useClassNames({ component: 'Tag', variant, size });
  const { disabled: groupDisabled } = useTagGroupContext();
  const { hidden: collapsed } = useTagCollapseContext();

  const props = {
    isDisabled: disabled ?? groupDisabled,
    hidden: collapsed,
    ...rest,
  };

  return (
    <RACTag
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
    </RACTag>
  );
};

Tag.Group = TagGroup;
export { Tag };
